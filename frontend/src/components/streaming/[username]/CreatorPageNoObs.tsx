import StreamPlayers2 from "../Streamplayer/Streamplayers2";
import { User } from "@/types/user";
import { Stream } from "@/types/stream";

interface CreatorPageNoObsProps {
  user: User;
  stream: Stream;
}

const CreatorPageNoObs = ({ user, stream }: CreatorPageNoObsProps) => {
  return (
    <div className="h-full">
      <StreamPlayers2 user={user} stream={stream} />
    </div>
  );
};

export default CreatorPageNoObs;
