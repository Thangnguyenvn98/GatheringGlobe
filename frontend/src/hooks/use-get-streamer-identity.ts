import { useEffect, useState } from "react";
import { useParticipants } from "@livekit/components-react";
import { Participant } from "livekit-client";

const useStreamer = () => {
  const participants = useParticipants();
  const [streamer, setStreamer] = useState<Participant | null>(null);

  useEffect(() => {
    // Find the participant with canPublish permission
    const foundStreamer = participants.find(
      (participant) => participant.permissions?.canPublish === true,
    );
    setStreamer(foundStreamer ? foundStreamer : null); // Handle undefined explicitly
  }, [participants]);

  return streamer;
};

export default useStreamer;
