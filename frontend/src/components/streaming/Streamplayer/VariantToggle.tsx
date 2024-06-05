import { Button } from "@/components/ui/button";
import { ChatVariant, useChatSidebar } from "@/hooks/use-chat-sidebar";
import Hint from "@/components/ui/Hint";
import { MessageSquare, Users } from "lucide-react";

const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSidebar((state) => state);

  const isChat = variant === ChatVariant.CHAT;

  const Icon = isChat ? MessageSquare : Users;

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
    onChangeVariant(newVariant);
  };

  const label = isChat ? "Go back to chat" : "Community";
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

export default VariantToggle;
