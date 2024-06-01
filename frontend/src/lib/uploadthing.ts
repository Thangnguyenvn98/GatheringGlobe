import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
  type GenerateTypedHelpersOptions,
} from "@uploadthing/react";

import type { OurFileRouter } from "../../../backend/src/uploadthing";

const BACKEND_URL = "http://localhost:5050";

const initOpts = {
  url: BACKEND_URL,
} satisfies GenerateTypedHelpersOptions;

export const UploadButton = generateUploadButton<OurFileRouter>(initOpts);
export const UploadDropzone = generateUploadDropzone<OurFileRouter>(initOpts);

export const { useUploadThing } = generateReactHelpers<OurFileRouter>(initOpts);
