import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatSidebar } from "@/hooks/use-chat-sidebar";
import Hint from "@/components/ui/Hint";

const StreamChatToggle = () => {
  const { collapsed, onCollapse, onExpand } = useChatSidebar((state) => state);

  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };

  const label = collapsed ? "Expand" : "Collapse";
  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant={"ghost"}
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="h-4 w-4 text-white" />
      </Button>
    </Hint>
  );
};

export default StreamChatToggle;
