import { Skeleton } from "@/components/ui/skeleton";

interface ThumbnailProps {
  isLive: boolean;
  src: string | null;
  fallback: string;
  username: string;
}
const Thumbnail = ({ isLive, src, fallback, username }: ThumbnailProps) => {
  let content;
  if (!src) {
    content = (
      <div className="bg-background flex flex-col items-center gap-y-4 justify-center h-full w-full transition-transform group-hover:translate-x-2 group-hover:-transalte-y-1 rounded-md">
        <img
          src={fallback}
          className="group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md object-cover transition-transform"
          alt="Thumbnail"
        />
      </div>
    );
  } else {
    content = (
      <img
        src={src}
        className="group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md object-cover transition-transform"
        alt="Thumbnail"
      />
    );
  }
  return (
    <div className="group aspect-video relative rounded-md cursor-pointer">
      <div className="bg-blue-600 opacity-0 rounded-md absolute inset-0 transition-opacity flex items-center justify-center group-hover:opacity-100" />
      {content}
    </div>
  );
};

export default Thumbnail;

export const ThumbnailSkeleton = () => {
  return (
    <div className="group aspect-video relative rounded-xl cursor-pointer">
      <Skeleton className="w-full h-full" />
    </div>
  );
};
