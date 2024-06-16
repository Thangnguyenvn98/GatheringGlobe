import { Switch } from "./ui/switch";
import toast from "react-hot-toast";
import { useTransition } from "react";
import { editStreamDetails } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";

interface ToggleCardProps {
  label: string;
  value: boolean;
  field: string;
  streamId: string;
  userId: string;
}
const ToggleCard = ({
  label,
  value,
  field,
  streamId,
  userId,
}: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const onChange = () => {
    startTransition(() => {
      editStreamDetails({
        streamId: streamId,
        [field]: !value,
      })
        .then(() => {
          toast.success("Stream updated");
          queryClient.invalidateQueries({
            queryKey: ["stream", userId],
          });
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  };

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            disabled={isPending}
            onCheckedChange={onChange}
            checked={value}
          >
            {value ? "On" : "Off"}{" "}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default ToggleCard;
