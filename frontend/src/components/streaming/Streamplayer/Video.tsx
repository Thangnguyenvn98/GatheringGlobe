import { ConnectionState, Track } from "livekit-client";
import {
  useConnectionState,
  useTracks,
  useRemoteParticipant,
} from "@livekit/components-react";
import OffLineVideo from "./OffLineVideo";
import LoadingVideo from "./LoadingVideo";
import { Skeleton } from "@/components/ui/skeleton";
import LiveVideo from "./LiveVideo";

interface VideoProps {
  hostName: string;
  hostIdentity: string;
}

const Video = ({ hostName, hostIdentity }: VideoProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OffLineVideo username={hostName} />;
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo label={connectionState} />;
  } else {
    content = <LiveVideo participant={participant} />;
  }

  return <div className="aspect-video border-b group relative">{content}</div>;
};

export default Video;

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-x">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
};
