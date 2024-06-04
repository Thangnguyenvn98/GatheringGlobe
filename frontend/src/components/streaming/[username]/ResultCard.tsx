import { Link } from "react-router-dom";
import { Stream } from "@/types/stream";
import Thumbnail from "./Thumbnail";

interface ResultCardProps {
  data: Stream;
}

const ResultCard = ({ data }: ResultCardProps) => {
  const username =
    typeof data.userId === "object" ? data.userId.username : "unknown";
  const userImageUrl =
    typeof data.userId === "object" ? data.userId.imageUrl : "unknown";
  return (
    <Link to={`/stream/${username}/watch`}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          isLive={data.isLive}
          src={data.thumbnailUrl || ""}
          fallback={
            userImageUrl ||
            `https://api.dicebear.com/5.x/open-peeps/svg?seed=${userImageUrl}2&size=64&face=smile,cute`
          }
          username={username}
        />
        {data.isLive && <div></div>}
      </div>
    </Link>
  );
};

export default ResultCard;
