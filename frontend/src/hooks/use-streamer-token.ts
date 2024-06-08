import { fetchStreamerToken } from "@/services/api";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useStreamerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [streamerName, setStreamerName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const streamerToken = await fetchStreamerToken(hostIdentity);
        setToken(streamerToken);
        const decodedToken = jwtDecode(streamerToken) as JwtPayload & {
          name?: string;
        };
        const name = decodedToken?.name;
        const identity = decodedToken?.jti;
        if (identity) {
          setIdentity(identity);
        }
        if (name) {
          setStreamerName(name);
        }
      } catch {
        toast.error("Something went wrong");
      }
    };
    createToken();
  }, [hostIdentity]);

  return { token, streamerName, identity };
};
