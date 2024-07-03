import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { nanoid } from "nanoid";
import { ChatBotUserMessage } from "@/types/chatBotUserMessage";
import { useMutation } from "@tanstack/react-query";
import useBotMessagesStore from "@/hooks/use-bot-messages-store";
import { CornerDownLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { sendChatBotMessage } from "@/services/api";

interface BotChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const BotChatInput: FC<BotChatInputProps> = ({ className, ...props }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);
  const { addMessage, removeMessage, setIsMessageUpdating } =
    useBotMessagesStore();

  const { mutate: sendMessage, isPending } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: sendChatBotMessage,
    onMutate: (message: ChatBotUserMessage) => {
      addMessage([message]);
    },
    onSuccess: (stream) => {
      if (!stream) throw new Error("No stream found");
      const id = nanoid();
      const responseMessage: ChatBotUserMessage = {
        id,
        isUserMessage: false,
        message: stream,
      };

      addMessage([responseMessage]);
      setIsMessageUpdating(true);
      setInput("");
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
      setIsMessageUpdating(false);
    },
    onError: (_, message) => {
      toast.error("Something went wrong. Please try again.");
      removeMessage(message.id);
      textareaRef.current?.focus();
    },
  });

  return (
    <div {...props} className={cn("border-t border-zinc-300", className)}>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();

              const message: ChatBotUserMessage = {
                id: nanoid(),
                isUserMessage: true,
                message: input,
              };

              sendMessage(message);
            }
          }}
          rows={2}
          maxRows={4}
          value={input}
          autoFocus
          disabled={isPending}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a message..."
          className=" pr-10 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:outline-none pl-2  text-sm sm:leading-6 focus:border-b-indigo-600  focus:border-b-2  "
        />

        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border bg-white border-gray-200 px-1 font-sans text-xs text-gray-400">
            {isPending ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <CornerDownLeft className="w-3 h-3" />
            )}
          </kbd>
        </div>
      </div>
    </div>
  );
};

export default BotChatInput;
