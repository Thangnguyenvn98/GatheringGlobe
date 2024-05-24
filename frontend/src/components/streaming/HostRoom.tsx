import { useParams } from "react-router-dom";
import HostChannel from "./HostChannel";

const HostRoom = () => {
  const { roomName } = useParams();

  return <HostChannel roomName={roomName || ""} />;
};

export default HostRoom;
