import { useParams } from "react-router-dom";
import WatchChannel from "./WatchChannel";

const WatchRoom = () => {
  const { roomName } = useParams();

  return <WatchChannel roomName={roomName || ""} />;
};

export default WatchRoom;
