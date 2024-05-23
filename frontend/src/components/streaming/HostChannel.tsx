import { useCurrentUser, useStreamerToken } from "@/services/queries";
import { LiveKitRoom, MediaDeviceMenu } from "@livekit/components-react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import HostControls from "./host-control";
import Chat from "./StreamChat";

const HostChannel = ({ roomName }: { roomName: string }) => {
  const livekitWsUrl = import.meta.env.VITE_REACT_APP_LIVEKIT_WS_URL || "";
  const { data: currentUser } = useCurrentUser();
  const { data: streamerToken } = useStreamerToken(currentUser?.username || "");
  const [streamerName, setStreamerName] = useState("");

  useEffect(() => {
    if (streamerToken) {
      const payload = jwtDecode(streamerToken);
      setStreamerName(payload.jti || currentUser?.username || "");
    }
  }, [streamerToken, currentUser?.username]);

  if (!currentUser || !roomName) {
    return <div>Loading...</div>;
  }
  return (
    <LiveKitRoom token={streamerToken} serverUrl={livekitWsUrl}>
      <div className="flex h-full flex-1">
        <div className="flex-1 flex-col container  relative">
          <HostControls slug={roomName || ""} />
          {/* Include your video components here for the host */}
        </div>
        <div className="sticky hidden w-80 border-l md:block">
          <div className="absolute top-0 bottom-0 right-0 flex h-full w-full flex-col gap-2 p-2">
            <Chat participantName={streamerName} />
          </div>
        </div>
      </div>
    </LiveKitRoom>
  );
};

export default HostChannel;
