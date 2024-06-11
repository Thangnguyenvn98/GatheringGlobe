import BioModal from "@/components/modals/bio-modal";
import { VerifiedMark } from "@/components/ui/verified-mark";

interface AboutCardProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string;
}
const AboutCard = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  bio,
}: AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost =
    viewerIdentity === hostAsViewer || viewerIdentity === hostIdentity;

  return (
    <div className="px-4">
      <div className="group rounded-xl bg-black p-4 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex text-white items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            About {hostName}
            <VerifiedMark />
          </div>
          {isHost && <BioModal initialValue={bio} hostName={hostName} />}
        </div>

        <p className="text-sm text-white break-words">
          {bio || "This user prefers to keep an air of mystery about them."}
        </p>
      </div>
    </div>
  );
};

export default AboutCard;
