import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
  clearAuthenticated: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      clearAuthenticated: () => set({ isAuthenticated: false }),
    }),
    {
      name: "auth-session",
    },
  ),
);

export default useAuthStore;
