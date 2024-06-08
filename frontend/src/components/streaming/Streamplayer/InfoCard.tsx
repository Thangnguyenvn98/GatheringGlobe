import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";
import InfoModal from "../../modals/info-modal";
import { Stream } from "@/types/stream";

interface InfoCardProps {
  hostIdentity: string;
  viewerIdentity: string;
  name: string;
  thumbnailUrl: string | null;
  stream: Stream;
  hostName: string;
}
const InfoCard = ({
  hostIdentity,
  viewerIdentity,
  name,
  thumbnailUrl,
  stream,
  hostName,
}: InfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) return null;

  return (
    <div className="px-4">
      <div className="rounded-xl bg-black">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="rounded-md bg-blue-500  p-2 h-auto w-auto">
            <Pencil className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-sm lg:text-lg font-semibold text-white capitalize">
              Edit your stream info
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Maximize your visibility
            </p>
          </div>
          <InfoModal
            initialName={name}
            stream={stream}
            hostName={hostName}
            initialThumbnailUrl={thumbnailUrl}
          />
        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4 text-white">
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Name</h3>
            <p className="text-sm font-semibold">{name}</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Thumbnail</h3>
            {thumbnailUrl && (
              <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
                <img
                  src={thumbnailUrl}
                  alt="thumbnail"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
