import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { useMemo, useState } from "react";
import { ConnectionState } from "livekit-client";

import StreamChatHeader from "./[username]/StreamChatHeader";
import StreamChatForm from "./[username]/StreamChatForm";
// import { useChatSidebar } from "@/hooks/use-chat-sidebar";
import StreamChatList from "./[username]/StreamChatList";

interface ChatLiveKitProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
}

export default function StreamChat({
  hostName,
  hostIdentity,
  viewerName,
}: ChatLiveKitProps) {
  const { chatMessages: messages, send } = useChat();
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const [value, setValue] = useState("");

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isOnline;

  const reverseMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const onChange = (value: string) => {
    setValue(value);
    console.log(hostName, viewerName);
  };

  const onSubmit = () => {
    if (!send) return;
    send(value);
    setValue("");
  };

  return (
    <div className="flex flex-col border-l border-b pt-0 bg-slate-900 h-[calc(100vh-110px)] ">
      <StreamChatHeader />
      <StreamChatList messages={reverseMessages} isHidden={isHidden} />
      <StreamChatForm
        value={value}
        onSubmit={onSubmit}
        onChange={onChange}
        isHidden={isHidden}
      />
    </div>
  );
}
