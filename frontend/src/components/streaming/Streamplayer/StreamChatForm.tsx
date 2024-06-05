import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface StreamChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
}

const StreamChatForm = ({
  onSubmit,
  value,
  onChange,
  isHidden,
}: StreamChatFormProps) => {
  const isDisabled = isHidden;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!value || isDisabled) return;
    onSubmit();
  };

  if (isHidden) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <div className="w-full ">
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn("border-white text-white")}
        />
      </div>
      <div className="ml-auto">
        <Button
          type="submit"
          size="sm"
          disabled={isDisabled}
          variant={"primary"}
        >
          Chat
        </Button>
      </div>
    </form>
  );
};

export default StreamChatForm;

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-1" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};
