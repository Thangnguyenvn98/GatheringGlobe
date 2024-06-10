import toast from "react-hot-toast";
import { useTransition } from "react";
import { MinusCircle } from "lucide-react";
import Hint from "@/components/ui/Hint";
import { Button } from "@/components/ui/button";
import { cn, stringToColor } from "@/lib/utils";
import { blockUser } from "@/services/api";

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

const CommunityItem = ({
  hostName,
  viewerName,
  participantIdentity,
  participantName,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition();
  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;
  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;
    startTransition(() => {
      blockUser(participantIdentity)
        .then(() => toast.success(`Blocked ${participantName}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none",
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="block">
          <Button
            variant="ghost"
            disabled={isPending}
            onClick={handleBlock}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <MinusCircle className="text-muted-foreground h-4 w-4" />
          </Button>
        </Hint>
      )}
    </div>
  );
};

export default CommunityItem;
