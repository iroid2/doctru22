import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  requisitionDocuments: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 2 },
   
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "iroid" };
  })  
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;



