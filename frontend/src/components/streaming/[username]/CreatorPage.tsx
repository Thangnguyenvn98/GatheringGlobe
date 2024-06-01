import { useCurrentUser, useCurrentUserByUsername } from "@/services/queries";
import { useParams } from "react-router-dom";
import StreamPlayers from "./StreamPlayers";

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
    return <div>Unauthorized</div>;
  }

  return (
    <div className="h-full">
      <StreamPlayers user={user} stream={user.stream} />
    </div>
  );
};

export default CreatorPage;
