import { Button } from "@/components/ui/button";
import { ElementRef, useRef, useState, useTransition } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Stream } from "@/types/stream";
import { editStreamDetails } from "@/services/api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { UploadDropzone } from "@/lib/uploadthing";
import Hint from "@/components/ui/Hint";
import { Trash } from "lucide-react";
interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
  hostName: string;
  stream: Stream;
}

interface StreamDetailsUpdateData {
  name?: string;
  thumbnailUrl?: string | null;
  streamId: string;
}
const InfoModal = ({
  initialName,
  hostName,
  stream,
  initialThumbnailUrl,
}: InfoModalProps) => {
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
  const queryClient = useQueryClient();
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const updateStreamDetails = (updatedData: StreamDetailsUpdateData) => {
    startTransition(() => {
      editStreamDetails(updatedData)
        .then(() => {
          toast.success("Stream updated");
          closeRef.current?.click();
          queryClient.invalidateQueries({ queryKey: ["user", hostName] });
        })
        .catch((error) => {
          console.error("Failed to update the stream:", error);
          toast.error("Failed to update the stream.");
        });
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(thumbnailUrl, hostName);

    const hasNameChanged = name !== initialName;
    const hasThumbnailChanged = thumbnailUrl !== initialThumbnailUrl;

    if (!hasNameChanged && !hasThumbnailChanged) {
      toast.error("No changes were made.");
      return;
    }

    const dataToSend = {
      streamId: stream._id,
      ...(hasNameChanged && { name }),
      ...(hasThumbnailChanged && { thumbnailUrl }),
    };

    updateStreamDetails(dataToSend);
  };

  const onRemove = () => {
    setThumbnailUrl(""); // Clear the thumbnail URL state
    updateStreamDetails({ streamId: stream._id, thumbnailUrl: null }); // Send null to remove the thumbnail
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} size={"sm"} className="ml-auto text-white">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-14">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={name}
              placeholder="Stream name"
              disabled={isPending}
              onChange={onChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 ">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint label="Remove thumbnail" asChild side="left">
                    <Button
                      type="button"
                      disabled={isPending}
                      className="h-auto w-auto p-1.5"
                      onClick={onRemove}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>
                <img
                  src={thumbnailUrl}
                  alt={"Thumbnail"}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: { color: "#000000" },
                    allowedContent: { color: "#FFFFFF" },
                  }}
                  skipPolling
                  onClientUploadComplete={(res) => {
                    const newThumbnailUrl = res?.[0]?.url;
                    if (newThumbnailUrl) {
                      setThumbnailUrl(newThumbnailUrl);
                      // Introduce a delay before updating the stream details
                      setTimeout(() => {
                        updateStreamDetails({
                          streamId: stream._id,
                          thumbnailUrl: newThumbnailUrl,
                          name: name, // Ensure name is included if necessary
                        });
                      }, 500);
                    }
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <DialogClose asChild ref={closeRef}>
              <Button variant={"ghost"} className="bg-slate-400" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit" variant="primary">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
