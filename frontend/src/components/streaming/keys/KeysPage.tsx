import UrlCard from "./UrlCard";
import { useCurrentStream, useCurrentUser } from "@/services/queries";
import { KeyCard } from "./KeysCard";
import ConnectModal from "./ConnectModal";

const KeysPage = () => {
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();
  const { data: stream, isLoading: isLoadingStream } = useCurrentStream(
    currentUser?._id || "",
  );

  if (isLoadingUser || isLoadingStream) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  if (!currentUser) {
    return <div>User not found</div>; // Handling no user found
  }

  if (!stream) {
    return <div>Stream not found</div>; // Handling no stream found
  }
  console.log("stream", stream);
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal currentUser={currentUser} />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
};

export default KeysPage;
