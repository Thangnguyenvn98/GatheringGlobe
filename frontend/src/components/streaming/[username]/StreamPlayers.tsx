import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream } from "@/types/stream";
import { User } from "@/types/user";
import { LiveKitRoom } from "@livekit/components-react";
import { useChatSidebar } from "@/hooks/use-chat-sidebar";
import { cn } from "@/lib/utils";
import Video, { VideoSkeleton } from "./Video";
import StreamChat from "../StreamChat";
import StreamChatToggle from "./StreamChatToggle";
import { ChatSkeleton } from "./StreamChatList";
import Header from "./Header";
import InfoCard from "./InfoCard";

interface StreamPlayersProps {
  user: User;
  stream: Stream;
}
const StreamPlayers = ({ user, stream }: StreamPlayersProps) => {
  const serverUrl = import.meta.env.VITE_REACT_APP_LIVEKIT_WS_URL;

  const { token, viewerName, identity } = useViewerToken(user._id);
  //  console.log({token,viewerName,identity})
  const { collapsed } = useChatSidebar((state) => state);

  if (!token || !viewerName || !identity) {
    return (
      <div>
        <StreamPlayersSkeleton />
      </div>
    );
  }
  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <StreamChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={serverUrl}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2",
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostName={user.username} hostIdentity={user._id} />
          <Header
            hostName={user.username}
            hostIdentity={user._id}
            imageUrl={user?.imageUrl}
            name={stream.name}
          />
          <InfoCard
            stream={stream}
            hostIdentity={user._id}
            hostName={user.username}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl || ""}
          />
        </div>
        <div className={cn("col-span-1", collapsed && "hidden")}>
          <StreamChat
            viewerName={viewerName}
            hostName={user.username}
            hostIdentity={user._id}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayersSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span=1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
      </div>
      <div className="col-span-1">
        <ChatSkeleton />
      </div>
    </div>
  );
};

export default StreamPlayers;
