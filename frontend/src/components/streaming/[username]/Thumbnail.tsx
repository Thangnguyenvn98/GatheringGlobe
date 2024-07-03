import { LiveBadge } from "@/components/live-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/ui/user-avatar";

interface ThumbnailProps {
  isLive: boolean;
  src: string | null;
  fallback: string;
  username: string;
}

const Thumbnail = ({
  isLive = false,
  src,
  fallback,
  username,
}: ThumbnailProps) => {
  let content;
  console.log(isLive);
  if (!src) {
    content = (
      <div className="flex items-center justify-center h-full w-full rounded-md bg-gray-200">
        <UserAvatar
          showBadge
          username={username}
          imageUrl={fallback}
          isLive={isLive}
        />
      </div>
    );
  } else {
    content = (
      <img
        src={src}
        className="w-full h-full rounded-md object-cover"
        alt="Thumbnail"
      />
    );
  }
  return (
    <div className="group aspect-video relative rounded-md cursor-pointer overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:translate-x-2">
      {content}

      {isLive && (
        <div className="absolute top-2 left-2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

export default Thumbnail;

export const ThumbnailSkeleton = () => {
  return (
    <div className="group aspect-video relative rounded-xl cursor-pointer">
      <Skeleton className="w-full h-full" />
    </div>
  );
};
