import {
  Participant,
  Track,
  createLocalTracks,
  type LocalTrack,
} from "livekit-client";
import { useLocalParticipant, useTracks } from "@livekit/components-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { StartAudio } from "@livekit/components-react";
import { Button } from "@/components/ui/button";

interface Video2Props {
  participant?: Participant;
}

const Video2 = ({ participant }: Video2Props) => {
  const [videoTrack, setVideoTrack] = useState<LocalTrack>();
  const [audioTrack, setAudioTrack] = useState<LocalTrack>();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUnpublishing, setIsUnpublishing] = useState(false);
  const videoEl = useRef<HTMLVideoElement>(null);

  const { localParticipant } = useLocalParticipant();
  useTracks(Object.values(Track.Source))
    .filter((track) => track.participant.identity === participant?.identity)
    .forEach((track) => {
      if (videoEl.current) {
        track.publication.track?.attach(videoEl.current);
      }
    });
  const createTracks = async () => {
    const tracks = await createLocalTracks({ audio: true, video: true });
    tracks.forEach((track) => {
      switch (track.kind) {
        case Track.Kind.Video: {
          if (videoEl?.current) {
            track.attach(videoEl.current);
          }
          setVideoTrack(track);
          break;
        }
        case Track.Kind.Audio: {
          setAudioTrack(track);
          break;
        }
      }
    });
  };

  useEffect(() => {
    void createTracks();
  }, []);

  useEffect(() => {
    return () => {
      videoTrack?.stop();
      audioTrack?.stop();
    };
  }, [videoTrack, audioTrack]);

  const togglePublishing = useCallback(async () => {
    if (isPublishing && localParticipant) {
      setIsUnpublishing(true);

      if (videoTrack) {
        void localParticipant.unpublishTrack(videoTrack);
      }
      if (audioTrack) {
        void localParticipant.unpublishTrack(audioTrack);
      }

      await createTracks();

      setTimeout(() => {
        setIsUnpublishing(false);
      }, 2000);
    } else if (localParticipant) {
      if (videoTrack) {
        void localParticipant.publishTrack(videoTrack);
      }
      if (audioTrack) {
        void localParticipant.publishTrack(audioTrack);
      }
    }

    setIsPublishing((prev) => !prev);
  }, [audioTrack, isPublishing, localParticipant, videoTrack]);

  return (
    <div className="aspect-video border-b group relative">
      <div className="relative h-full flex">
        <video ref={videoEl} width="100%" />
        <div className="absolute bottom-16 left-4 z-10">
          {isPublishing ? (
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-700"
              onClick={() => void togglePublishing()}
              disabled={isUnpublishing}
            >
              {isUnpublishing ? "Stopping..." : "Stop stream"}
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => void togglePublishing()}
              className="animate-pulse"
            >
              Start stream
            </Button>
          )}
        </div>
        <StartAudio
          label="Click to allow audio playback"
          className="absolute top-0 h-full w-full bg-red-500 bg-opacity-75 text-white"
        />
      </div>
    </div>
  );
};

export default Video2;
