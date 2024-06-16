import { useCurrentUser, useCurrentUserByUsername } from "@/services/queries";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import CreatorPage from "./CreatorPage";
import CreatorPageNoObs from "./CreatorPageNoObs";

const CreatorPageWrapper = () => {
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

  const usedOBS = user?.stream?.usedOBS;

  return (
    <>
      {usedOBS ? (
        <CreatorPage user={user} stream={user.stream} />
      ) : (
        <CreatorPageNoObs user={user} stream={user.stream} />
      )}
    </>
  );
};

export default CreatorPageWrapper;
