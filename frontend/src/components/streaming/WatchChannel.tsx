import { LiveKitRoom } from "@livekit/components-react";
import { useEffect, useState } from "react";
import WatchingAsBar from "./watching-as-bar";
import StreamPlayerWrapper from "./StreamPlayer";
import ChannelInfo from "./channel-info";
import { jwtDecode } from "jwt-decode";
import { useCurrentUser, useViewerToken } from "@/services/queries";
import Chat from "./StreamChat";

const WatchChannel = ({ roomName }: { roomName: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: viewerToken } = useViewerToken(
    roomName || "",
    currentUser?.username || "",
  );
  const [viewerName, setViewerName] = useState("");
  const livekitWsUrl = import.meta.env.VITE_REACT_APP_LIVEKIT_WS_URL || "";

  useEffect(() => {
    if (viewerToken) {
      const payload = jwtDecode(viewerToken);
      console.log(payload);
      setViewerName(payload.jti || currentUser?.username || "");
    }
  }, [viewerToken, currentUser?.username]);

  if (!viewerToken || !viewerName) {
    return <div>Loading...</div>;
  }
  return (
    <LiveKitRoom
      token={viewerToken}
      serverUrl={livekitWsUrl}
      className="flex flex-1 flex-col"
    >
      <WatchingAsBar viewerName={viewerName} />
      <div className="flex h-full flex-1">
        <div className="flex-1 flex-col container">
          <StreamPlayerWrapper streamerIdentity={roomName || ""} />
          <ChannelInfo
            streamerIdentity={roomName || ""}
            viewerIdentity={viewerName}
          />
        </div>
        <div className="sticky hidden w-80 border-l md:block">
          <div className="absolute top-0 bottom-0 right-0 flex h-full w-full flex-col gap-2 p-2">
            <Chat participantName={viewerName} />
          </div>
        </div>
      </div>
    </LiveKitRoom>
  );
};

export default WatchChannel;
