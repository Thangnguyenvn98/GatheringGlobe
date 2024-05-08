// src/hooks/useCheckAuth.ts
import { useEffect } from "react";
import useAuthStore from "./use-auth-store";
import { validateToken } from "@/services/api";

const useCheckAuth = () => {
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await validateToken();
        useAuthStore.getState().setAuthenticated(true);
      } catch (error) {
        useAuthStore.getState().clearAuthenticated();
      }
    };

    checkAuthentication();
  }, []);
};

export default useCheckAuth;
