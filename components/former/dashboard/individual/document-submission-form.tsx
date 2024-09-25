import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
// import { createDocument } from "@/actions/document";
import MultipleImageInput from "./MultipleFile";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DocumentSubmissionForm() {
  const { register, handleSubmit, reset } = useForm<DocumentProps>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const initialImages = [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ];
  const [productImages, setProductImages] = useState(initialImages);

  interface DocumentProps {
    title: string;
    description: string;
    documentLink: string;
    status?: "PENDING" | "APPROVED" | "REJECTED";
    userId: string;
    currentStep?: "NORMAL_USER" | "SECRETARY" | "HEAD_OF_DEPARTMENT";
  }

  async function onSubmit(documentData: DocumentProps) {
    setIsSubmitting(true);
    documentData.documentLink = productImages[0];
    try {
      // await createDocument(documentData);
      toast.success("Document created successfully!");
      setOpen(false);
      setIsSubmitting(false);
      router.push("/dashboard");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Failed to create", error);
      setIsSubmitting(false);
    }
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Submit New Documents</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] overflow-y-scroll h-[90vh]">
        <DialogHeader>
          <DialogTitle>Submit Document</DialogTitle>
          <DialogDescription>
            Fill in the details and upload your document here. Click submit when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" className="col-span-3" {...register("title")} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                {...register("description")}
                className="col-span-3"
              />
            </div>

            <MultipleImageInput
              title="Product Images"
              imageUrls={productImages}
              setImageUrls={setProductImages}
              endpoint="mailAttachments"
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={` px-6 py-3 mt-2  bg-blue-700 text-white rounded-[5px] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </DialogFooter>
        </form>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
