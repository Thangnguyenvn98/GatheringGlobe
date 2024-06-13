// stores/useBotMessagesStore.js
import { ChatBotUserMessage } from "@/types/chatBotUserMessage";
import { create } from "zustand";

interface BotMessageStore {
  messages: ChatBotUserMessage[];
  addMessage: (message: ChatBotUserMessage[]) => void;
  clearMessages: () => void;
  removeMessage: (id: string) => void;
  isMessageUpdating: boolean;
  setIsMessageUpdating: (isUpdating: boolean) => void;
}

const useBotMessagesStore = create<BotMessageStore>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, ...message] })),
  clearMessages: () => set({ messages: [] }),
  removeMessage: (id) =>
    set((state) => ({ messages: state.messages.filter((m) => m.id !== id) })),
  isMessageUpdating: false,
  setIsMessageUpdating: (isUpdating) => set({ isMessageUpdating: isUpdating }),
}));

export default useBotMessagesStore;
