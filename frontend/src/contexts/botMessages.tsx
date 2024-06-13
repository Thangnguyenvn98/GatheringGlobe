import { ChatBotUserMessage } from "@/types/chatBotUserMessage";
import { nanoid } from "nanoid";
import { ReactNode, createContext, useState } from "react";

export const BotMessagesContext = createContext<{
  //type for the context
  messages: ChatBotUserMessage[];
  isMessageUpdating: boolean;
  addMessage: (messages: ChatBotUserMessage[]) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  setIsMessageUpdating: (isUpdating: boolean) => void;
}>({
  //Create default value
  messages: [],
  isMessageUpdating: false,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
});

export function BotMessagesProvider({ children }: { children: ReactNode }) {
  const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatBotUserMessage[]>([
    {
      id: nanoid(),
      message: "Hello, how can I help you?",
      isUserMessage: false,
    },
  ]);

  const addMessage = (newMessages: ChatBotUserMessage[]) => {
    setMessages((prevMessages) => [...prevMessages, ...newMessages]);
  };

  const removeMessage = (id: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id),
    );
  };

  const updateMessage = (
    id: string,
    updateFn: (prevText: string) => string,
  ) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) => {
        if (message.id === id) {
          return {
            ...message,
            message: updateFn(message.message),
          };
        }
        return message;
      }),
    );
  };

  return (
    <BotMessagesContext.Provider
      value={{
        messages,
        addMessage,
        removeMessage,
        updateMessage,
        isMessageUpdating,
        setIsMessageUpdating,
      }}
    >
      {children}
    </BotMessagesContext.Provider>
  );
}
