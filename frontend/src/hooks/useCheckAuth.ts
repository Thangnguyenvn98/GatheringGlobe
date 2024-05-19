// src/hooks/useCheckAuth.ts
import { useEffect } from "react";
import { useAuthQuery } from "@/services/queries";

const useCheckAuth = () => {
  const { refetch } = useAuthQuery();
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await refetch();
      } catch (error) {
        console.error("Error validating token", error);
      }
    };

    checkAuthentication();
  }, [refetch]);
};

export default useCheckAuth;
