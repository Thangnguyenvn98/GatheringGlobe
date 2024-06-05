import { create } from "zustand";

export enum ChatVariant {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}

interface ChatSidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  variant: ChatVariant;
  onChangeVariant: (variant: ChatVariant) => void;
}

export const useChatSidebar = create<ChatSidebarStore>((set) => ({
  collapsed: false,
  onExpand: () => set({ collapsed: false }),
  onCollapse: () => set({ collapsed: true }),
  variant: ChatVariant.CHAT,
  onChangeVariant: (variant: ChatVariant) => set({ variant }),
}));
