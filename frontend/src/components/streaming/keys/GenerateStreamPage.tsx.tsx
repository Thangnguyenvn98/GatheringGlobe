import UrlCard from "./UrlCard";
import { useCurrentStream, useCurrentUser } from "@/services/queries";
import { KeyCard } from "./KeysCard";
import ConnectModal from "./ConnectModal";
import ToggleCard from "@/components/toggle-card";
import { Link } from "react-router-dom";
import { SiObsstudio } from "react-icons/si";

const GenerateStreamPage = () => {
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

  console.log(stream.usedOBS);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Generate a Stream Connection</h1>
        <ConnectModal currentUser={currentUser} />
      </div>

      <div className="space-y-4">
        <div className="mt-4 p-4 bg-muted border rounded-xl">
          <h2 className="font-bold">How to Start Regular Streaming</h2>
          <ol className="list-decimal list-inside">
            <li>
              1. Make sure the <strong>Use OBS For Streaming</strong> is toggle
              off.
            </li>
            <li>
              2. Head to the following link:{" "}
              <Link
                to={`/stream/${currentUser.username}`}
                className="text-blue-500 underline"
              >
                {`http://gatheringglobe.com/stream/${currentUser.username}`}
              </Link>
            </li>
            <li>
              3. Click on the <strong>Start Streaming</strong> button.
            </li>
          </ol>
        </div>
        <UrlCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
        <ToggleCard
          userId={currentUser._id}
          streamId={stream._id}
          field="usedObs"
          value={stream.usedOBS}
          label="Use OBS For Streaming"
        />

        <div className="mt-4 p-4 bg-muted border rounded-xl">
          <h2 className="font-bold">How to Use Connect Modal for OBS</h2>
          <ol className="list-decimal list-inside">
            <li>
              1. Open the Connect Modal by clicking the{" "}
              <strong>Generate OBS connection</strong> button.
            </li>
            <li>2. Copy the Server URL from the URL Card above.</li>
            <li>3. Copy the Stream Key from the Key Card above.</li>
            <li>
              4. Open OBS and navigate to <strong>Settings</strong> &rarr;{" "}
              <strong>Stream</strong> under Controls Tab.
            </li>
            <li>
              5. Set <strong>Service</strong> to <strong>Custom</strong>.
            </li>
            <li>
              6. Paste the URL and Stream Key into the appropriate fields.
            </li>
            <li>
              7. Click <strong>OK</strong> to save the settings.
            </li>
            <li>
              8. Start streaming by clicking the{" "}
              <strong>Start Streaming</strong> button in OBS.
            </li>
          </ol>
          <div className="flex gap-x-4 items-center">
            <p>
              Here is the link to OBS Software Download if you don't have it
              installed &rarr;{" "}
            </p>
            <a
              href="https://obsproject.com/download"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline"
            >
              https://obsproject.com/download
            </a>
            <SiObsstudio size={40} fill="blue" color="blue" />
          </div>
          <p className="mt-4 text-red-500 font-bold">
            Warning: If you have not turned OBS off manually, regular streaming
            will not work. Make sure to stop streaming from OBS before switching
            to regular streaming.
          </p>
          <p className="mt-4">
            Note: Whether you are streaming with or without OBS, you will use
            the same link:{" "}
            <Link
              to={`/stream/${currentUser.username}`}
              className="text-blue-500 underline"
            >
              {`http://gatheringglobe.com/stream/${currentUser.username}`}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GenerateStreamPage;
