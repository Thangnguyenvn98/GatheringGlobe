import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { useMemo, useState } from "react";
import { ConnectionState } from "livekit-client";

import StreamChatHeader, { ChatHeaderSkeleton } from "./StreamChatHeader";
import StreamChatForm, { ChatFormSkeleton } from "./StreamChatForm";
import { useChatSidebar } from "@/hooks/use-chat-sidebar";
import StreamChatList, { ChatListSkeleton } from "./StreamChatList";
import { ChatVariant } from "@/hooks/use-chat-sidebar";
import StreamChatCommunity from "./StreamChatCommunity";

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
  const { variant } = useChatSidebar((state) => state);

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
      {variant === ChatVariant.CHAT && (
        <>
          <StreamChatList messages={reverseMessages} isHidden={isHidden} />
          <StreamChatForm
            value={value}
            onSubmit={onSubmit}
            onChange={onChange}
            isHidden={isHidden}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <>
          <StreamChatCommunity
            viewerName={viewerName}
            hostName={hostName}
            isHidden={isHidden}
          />
        </>
      )}
    </div>
  );
}

export const StreamChatSkeleton = () => {
  return (
    <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
};
