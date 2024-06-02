import { Skeleton } from "@/components/ui/skeleton";
import StreamChatToggle from "./StreamChatToggle";

const StreamChatHeader = () => {
  return (
    <div className="relative p-3 border-b">
      <div className="absolute left-2 top-2 hidden lg:block">
        <StreamChatToggle />
      </div>
      <p className="font-semibold text-primary text-center text-white">
        Stream Chat
      </p>
    </div>
  );
};

export default StreamChatHeader;

export const ChatHeaderSkeleton = () => {
  return (
    <div className="relative p-3 border-b hidden md:block">
      <Skeleton className="absolute h-6 w-6 left-3 top-3" />
      <Skeleton className="w-28 h-6 mx-auto" />
    </div>
  );
};
