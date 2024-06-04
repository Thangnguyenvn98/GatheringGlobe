import {
  useCurrentUserByUsername,
  useGetCurrentBlockByUserId,
} from "@/services/queries";
import { useParams } from "react-router-dom";
import StreamPlayers, {
  StreamPlayersSkeleton,
} from "../Streamplayer/StreamPlayers";
import NotFoundPage from "./NotFoundPage";
import ErrorPage from "./ErrorPage";

const ViewerPage = () => {
  const { username } = useParams<{ username: string }>();
  const { data: user, isLoading } = useCurrentUserByUsername(username || "");
  const { data: blockData, isLoading: isLoadingBlock } =
    useGetCurrentBlockByUserId(user?._id || "");
  if (!user || !user.stream) {
    return <NotFoundPage />;
  }
  if (isLoadingBlock || isLoading) {
    return (
      <div className="h-full">
        <StreamPlayersSkeleton />
      </div>
    );
  }
  if (blockData?.isBlocked) {
    return <ErrorPage />;
  }
  console.log(blockData);

  return <StreamPlayers user={user} stream={user.stream} />;
};

export default ViewerPage;
