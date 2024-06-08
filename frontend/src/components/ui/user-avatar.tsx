import { LiveBadge } from "../live-badge";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

interface UserAvatarProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
  showBadge?: boolean;
}

export const UserAvatar = ({
  username,
  imageUrl,
  isLive,
  showBadge,
}: UserAvatarProps) => {
  const canShowBadge = showBadge && isLive;
  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "ring-2 ring-rose-500 border border-background ",
        )}
      >
        <AvatarImage src={imageUrl} alt={username} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

export const UserAvatarSkeleton = () => {
  return <Skeleton className="rounded-full" />;
};
