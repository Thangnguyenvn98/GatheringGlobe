/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "../ui/button";
import { Paperclip, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
declare const cloudinary: any;

interface CloudinaryUploadError {
  message: string;
}

interface CloudinaryUploadResult {
  event: string;
  info: {
    secure_url: string;
  };
}
interface ImageUploadProps {
  onChange?: (url: string) => void; // Optional prop for handling image URL changes
  className?: string;
  iconClassName?: string;
  multiple?: boolean;
  value?: string[];
  disabled?: boolean;
  name?: string;
}

const CLOUDNAME = import.meta.env.VITE_CLOUDINARY_CLOUDNAME || "";
const UPLOADPRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";
const ImageUpload: React.FC<ImageUploadProps> = ({
  name = "",
  onChange,
  className = "",
  iconClassName = "",
  multiple = false,
  value = [],
  disabled,
}) => {
  const [localImages, setLocalImages] = useState<string[]>(value);
  const formMethods = useFormContext(); // This might return undefined if not within a form context
  const { setValue } = formMethods || {}; // Safely destructure setValue, it will be undefined if formMethods is undefined

  useEffect(() => {
    if (setValue && localImages.length > 0) {
      setValue(name, [...localImages]);
    }
  }, [localImages, setValue]);

  const handleNewImage = (newUrl: string) => {
    setLocalImages((prev) => [...prev, newUrl]);
    if (onChange) {
      onChange(newUrl); // Call the onChange prop if provided
    }
  };

  const handleRemoveImage = (urlToRemove: string) => {
    console.log(localImages);
    setLocalImages((prev) => prev.filter((url) => url !== urlToRemove));
  };

  const openCloudinaryWidget = () => {
    const myWidget = cloudinary.createUploadWidget(
      {
        cloudName: CLOUDNAME,
        uploadPreset: UPLOADPRESET,
        multiple,
        sources: ["local", "url"],
      },
      (error: CloudinaryUploadError | null, result: CloudinaryUploadResult) => {
        if (!error && result && result.event === "success") {
          handleNewImage(result.info.secure_url);
        }
      },
    );

    myWidget.open();
  };

  return (
    <div className={cn(className)}>
      <Button
        disabled={disabled}
        type="button"
        onClick={openCloudinaryWidget}
        className="bg-transparent hover:bg-transparent"
      >
        <Paperclip className={cn(iconClassName)} />
      </Button>
      <div className="flex flex-wrap">
        {!onChange &&
          localImages.map((url) => (
            <div
              key={url}
              className="relative w-[200px] h-[200px] rounded-md overflow-hidden m-2"
            >
              <div className="z-10 absolute top-2 right-2">
                <Button
                  type="button"
                  onClick={() => handleRemoveImage(url)}
                  variant="destructive"
                  size="icon"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <img
                src={url}
                alt="Uploaded image"
                className="object-cover w-full h-full"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageUpload;
