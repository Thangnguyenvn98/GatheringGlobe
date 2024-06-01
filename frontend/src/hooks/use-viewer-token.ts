import { fetchViewerToken } from "@/services/api";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [viewerName, setViewerName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await fetchViewerToken(hostIdentity);
        setToken(viewerToken);
        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };
        const name = decodedToken?.name;
        const identity = decodedToken?.jti;
        if (identity) {
          setIdentity(identity);
        }
        if (name) {
          setViewerName(name);
        }
      } catch {
        toast.error("Something went wrong");
      }
    };
    createToken();
  }, [hostIdentity]);

  return { token, viewerName, identity };
};
