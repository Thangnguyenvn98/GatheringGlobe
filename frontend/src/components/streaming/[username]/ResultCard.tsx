import { Link } from "react-router-dom";
import { Stream } from "@/types/stream";
import Thumbnail, { ThumbnailSkeleton } from "./Thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { LiveBadge } from "@/components/live-badge";
import { UserAvatar } from "@/components/ui/user-avatar";

interface ResultCardProps {
  data: Stream;
}

const ResultCard = ({ data }: ResultCardProps) => {
  const username =
    typeof data.userId === "object" ? data.userId.username : "unknown";
  const userImageUrl =
    typeof data.userId === "object" ? data.userId.imageUrl : "unknown";
  return (
    <Link to={`/stream/${username}/watch`}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          isLive={data.isLive}
          src={data.thumbnailUrl || ""}
          fallback={
            userImageUrl ||
            `https://api.dicebear.com/5.x/open-peeps/svg?seed=${userImageUrl}2&size=64&face=smile,cute`
          }
          username={username}
        />
        {data.isLive && (
          <div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
            <LiveBadge />
          </div>
        )}
        <div className="flex gap-x-3">
          <UserAvatar
            username={username}
            imageUrl={
              userImageUrl ||
              `https://api.dicebear.com/5.x/open-peeps/svg?seed=${userImageUrl}2&size=64&face=smile,cute`
            }
            isLive={data.isLive}
          />
          <div className="flex flex-col text-sm overflor-hidden">
            <p className="truncate font-semibold hover:text-blue-500">
              {data.name}
            </p>
            <p className="text-muted-foreground">{username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResultCard;

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
};
