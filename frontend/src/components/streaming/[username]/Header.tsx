import { VerifiedMark } from "@/components/ui/verified-mark";
import { cn } from "@/lib/utils";
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
        {isLive && (
          <div className="absolute z-10 h-11 w-11 ml-2 animate-ping rounded-full bg-red-600 dark:bg-red-400" />
        )}
        <img
          className={cn(
            "z-20 h-16 w-16 rounded-full border-2 border-white bg-gray-500 dark:border-zinc-900",
            isLive && "ring-2 ring-red-600",
          )}
          src={`https://api.dicebear.com/5.x/open-peeps/svg?seed=${hostIdentity}&size=64&face=smile,cute`}
          alt={hostName}
        />

        {isLive && (
          <div className="absolute z-30 mt-14 w-12 ml-2  rounded-xl border-2 border-white bg-red-600 p-1 text-center text-xs font-bold uppercase text-white transition-all dark:border-zinc-900">
            Live
          </div>
        )}
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
