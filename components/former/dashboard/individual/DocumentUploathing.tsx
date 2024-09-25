import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { UploadButton } from "@/utils/uploadthing";
 
import Image from "next/image";
import React from "react";
type docInputProps = {
title: string;
docUrl: string;
setDocUrl: any;
endpoint: any;
};
export default function DocInput({
title,
docUrl,
setDocUrl,
endpoint,
}: docInputProps) {
return (
<Card className="overflow-hidden">
  <CardHeader>
    <CardTitle>{title}</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid gap-2">
      <Image
        alt={title}
        className="h-40 w-full rounded-md object-cover"
        height="300"
        src={docUrl}
        width="300"
      />
      {/* <UploadButton
        className="col-span-full"
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
 
          setDocUrl(res[0].url);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      /> */}
    </div>
  </CardContent>
</Card>
 
);
}
 