import { useCurrentUser, useCurrentUserByUsername } from "@/services/queries";
import { useParams } from "react-router-dom";
import StreamPlayers from "../Streamplayer/StreamPlayers";
import ErrorPage from "./ErrorPage";

const CreatorPage = () => {
  const { username } = useParams<{ username: string }>();
  const { data: externalUser, isLoading: isLoadingExternalUser } =
    useCurrentUser();
  const { data: user, isLoading: isLoadingUser } = useCurrentUserByUsername(
    username || "",
  );

  if (isLoadingUser || isLoadingExternalUser) {
    return <div>Loading...</div>;
  }

  if (!user || user._id !== externalUser?._id || !user.stream) {
    return <ErrorPage />;
  }

  return (
    <div className="h-full">
      <StreamPlayers user={user} stream={user.stream} />
    </div>
  );
};

export default CreatorPage;
