import { Participant, Track } from "livekit-client";
import { useCallback, useRef, useState } from "react";
import { StartAudio, useTracks } from "@livekit/components-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/ui/icon";

interface LiveVideoProps {
  participant?: Participant;
}
const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useTracks(Object.values(Track.Source))
    .filter((track) => track.participant.identity === participant?.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  const onVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMuted(e.target.value === "0");
      setVolume(+e.target.value);
      if (videoRef?.current) {
        videoRef.current.muted = e.target.value === "0";
        videoRef.current.volume = +e.target.value * 0.01;
      }
    },
    [],
  );

  const onToggleMute = useCallback(() => {
    setMuted(!muted);
    setVolume(muted ? 50 : 0);
    if (videoRef?.current) {
      videoRef.current.muted = !muted;
      videoRef.current.volume = muted ? 0.5 : 0;
    }
  }, [muted]);

  const onFullScreen = useCallback(() => {
    if (isFullScreen) {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullScreen(false);
    } else if (wrapperRef.current) {
      wrapperRef.current.requestFullscreen().catch((err) => console.error(err));
      setIsFullScreen(true);
    }
  }, [isFullScreen]);

  return (
    <TooltipProvider delayDuration={300}>
      <div className="relative h-full flex" ref={wrapperRef}>
        <video ref={videoRef} width="100%" />
        <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
          <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-t from-neutral-900 px-4">
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger>
                  <div className="text-white" onClick={onToggleMute}>
                    {muted ? (
                      <Icons.volumeOff className="h-6 w-6 hover:scale-110 hover:transition-all" />
                    ) : (
                      <Icons.volumeOn className="h-6 w-6 hover:scale-110 hover:transition-all" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{muted ? "Unmute" : "Mute"}</TooltipContent>
              </Tooltip>
              <input
                type="range"
                onChange={onVolumeChange}
                className="ml-1 h-0.5 w-24 cursor-pointer appearance-none rounded-full bg-white accent-white"
                value={volume}
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Tooltip>
                <TooltipTrigger>
                  <div className="text-white" onClick={onFullScreen}>
                    {isFullScreen ? (
                      <Icons.minimize className="h-5 w-5 hover:scale-110 hover:transition-all" />
                    ) : (
                      <Icons.maximize className="h-5 w-5 hover:scale-110 hover:transition-all" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        <StartAudio
          label="Click to allow audio playback"
          className="absolute top-0 h-full w-full bg-red-500 bg-opacity-75 text-white"
        />
      </div>
    </TooltipProvider>
  );
};

export default LiveVideo;
