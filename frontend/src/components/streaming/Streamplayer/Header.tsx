import { UserAvatar } from "@/components/ui/user-avatar";
import { VerifiedMark } from "@/components/ui/verified-mark";
import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import { UserIcon } from "lucide-react";

interface HeaderProps {
  imageUrl?: string;
  hostName: string;
  hostIdentity: string;
  name: string;
}

const Header = ({ imageUrl, hostIdentity, hostName, name }: HeaderProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);
  const isLive = !!participant;
  const participantCount = participants.length - 1;

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={
            imageUrl ||
            `https://api.dicebear.com/5.x/open-peeps/svg?seed=${imageUrl}2&size=64&face=smile,cute`
          }
          username={hostName}
          isLive={isLive}
          showBadge
          size={"lg"}
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">{hostName}</h2>
            <VerifiedMark />
          </div>
          <p className="text-sm font-semibold">{name}</p>
          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
              <UserIcon className="h-4 w-4" />
              <p>
                {participantCount}{" "}
                {participantCount === 1 ? "viewer" : "viewers"}
              </p>
            </div>
          ) : (
            <p className="font-semibold text-xs text-muted-foreground">
              Offline
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
