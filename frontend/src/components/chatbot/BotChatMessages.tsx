import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import MarkdownLite from "./MarkdownLite";
import useBotMessagesStore from "@/hooks/use-bot-messages-store";

interface BotChatMessageProps extends HTMLAttributes<HTMLDivElement> {}

const BotChatMessages = ({ className, ...props }: BotChatMessageProps) => {
  const { messages } = useBotMessagesStore();
  const inverseMessages = [...messages].reverse();

  return (
    <div
      {...props}
      className={cn(
        "flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch",
        className,
      )}
    >
      <div className="flex-1 flex-grow" />
      {inverseMessages.map((message) => (
        <div key={message.id} className="chat-message">
          <div
            className={cn("flex items-end", {
              "justify-end": message.isUserMessage,
            })}
          >
            <div
              className={cn(
                "flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden",
                {
                  "order-1 items-end": message.isUserMessage,
                  "order-2 items-start": !message.isUserMessage,
                },
              )}
            >
              <p
                className={cn("px-4 py-2 rounded-lg", {
                  "bg-blue-600 text-white": message.isUserMessage,
                  "bg-gray-200 text-gray-900": !message.isUserMessage,
                })}
              >
                <MarkdownLite message={message.message} />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BotChatMessages;
