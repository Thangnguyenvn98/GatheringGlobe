import { WifiOff } from "lucide-react";

interface OffLineVideoProps {
  username: string;
}

const OffLineVideo = ({ username }: OffLineVideoProps) => {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center bg-black">
      <WifiOff className="h-10 w-10 text-muted-foreground" />
      <p className="text-muted-foreground">{username} is offline</p>
    </div>
  );
};

export default OffLineVideo;
