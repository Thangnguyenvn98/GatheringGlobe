import { UploadDropzone, UploadButton } from "@/lib/uploadthing";
import React from "react";
import { useEffect } from "react";

const BACKEND_URL = "http://localhost:5050";
const UploadThingComponent = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <WhatServer />
      <div>
        <UploadButton
          endpoint="thumbnailUploader"
          skipPolling
          onClientUploadComplete={(file) => {
            console.log("uploaded", file);
            alert("Upload complete");
          }}
          onUploadError={(error) => {
            console.error(error, error.cause);
            alert("Upload failed");
          }}
        />
        <UploadDropzone
          endpoint="thumbnailUploader"
          skipPolling
          onClientUploadComplete={(file) => {
            console.log("uploaded", file);
            alert("Upload complete");
          }}
          onUploadError={(error) => {
            console.error(error, error.cause);
            alert("Upload failed");
          }}
        />
      </div>
    </div>
  );
};

export default UploadThingComponent;

function WhatServer() {
  const [serverResponse, setServerResponse] = React.useState<string>("");
  useEffect(() => {
    fetch(new URL("/api", BACKEND_URL))
      .then((res) => res.text())
      .then(setServerResponse);
  }, []);

  return (
    <h1 className="text-xl font-bold">
      {serverResponse || "Getting server..."}
    </h1>
  );
}
