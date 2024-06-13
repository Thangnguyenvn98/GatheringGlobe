import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, useContext, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { nanoid } from "nanoid";
import { ChatBotUserMessage } from "@/types/chatBotUserMessage";
import { useMutation } from "@tanstack/react-query";
import { BotMessagesContext } from "@/contexts/botMessages";
import useBotMessagesStore from "@/hooks/use-bot-messages-store";

interface BotChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const BotChatInput: FC<BotChatInputProps> = ({ className, ...props }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);
  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    isMessageUpdating,
    setIsMessageUpdating,
  } = useBotMessagesStore();

  const { mutate: sendMessage, isLoading } = useMutation({
    mutationFn: async (message: ChatBotUserMessage) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/chatbot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [message],
          }),
        },
      );
      return response.text();
    },
    onSuccess: (stream) => {
      if (!stream) throw new Error("No stream found");
      const id = nanoid();
      const responseMessage: ChatBotUserMessage = {
        id,
        isUserMessage: false,
        message: stream,
      };
      setIsMessageUpdating(true);

      addMessage([responseMessage]);
      setIsMessageUpdating(false);
      setInput("");
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    },
  });

  return (
    <div {...props} className={cn("border-t border-zinc-300", className)}>
      <TextareaAutosize
        ref={textareaRef}
        rows={2}
        maxRows={4}
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
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
        placeholder="Write a message ..."
        className="peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6"
      />
    </div>
  );
};

export default BotChatInput;
