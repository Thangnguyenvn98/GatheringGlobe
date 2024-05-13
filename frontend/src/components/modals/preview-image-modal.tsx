import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";

export const ImagePreviewModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "previewImage";
  const { imageUrl } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="flex justify-center items-center p-0 sm:max-w-[1000px] sm:max-h-[1000px]">
        <div className="bg-white p-4 relative rounded-lg min-w-full max-h-full overflow-auto">
          {imageUrl && (
            <div className="max-h-[1000px]">
              <img
                src={imageUrl}
                alt="Full Size"
                className="object-contain w-full h-full"
              />
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-2xl hover:underline absolute top-2"
              >
                Full Size
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
