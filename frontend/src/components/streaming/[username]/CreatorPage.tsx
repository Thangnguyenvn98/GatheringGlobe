import StreamPlayers from "../Streamplayer/StreamPlayers";
import { User } from "@/types/user";
import { Stream } from "@/types/stream";

interface CreatorPageProps {
  user: User;
  stream: Stream;
}

const CreatorPage = ({ user, stream }: CreatorPageProps) => {
  return (
    <div className="h-full">
      <StreamPlayers user={user} stream={stream} />
    </div>
  );
};

export default CreatorPage;
