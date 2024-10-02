import React, { useState, useEffect } from 'react';
import Pdfinput from "../FormInputs/PdfInput";
import SubmitButton from "../FormInputs/SubmitButton copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { createDocument } from '@/actions/document';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import Link from 'next/link';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import QRCode from 'qrcode';

// Form input types
type FormInputs = {
  title: string;
  description: string;
  document: FileList; // FileList to handle file uploads
};

export default function CreateRequisitionForm() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [qrUrl, setQrUrl] = useState("");

  // Automatically generate QR code when the PDF URL is set
  useEffect(() => {
    if (pdfUrl) {
      generateQrCode();
    }
  }, [pdfUrl]);

  async function generateQrCode() {
    try {
      if (pdfUrl) {
        const dataUrl = await QRCode.toDataURL(pdfUrl);
        setQrUrl(dataUrl);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate QR code.");
    }
  }

  async function onSubmit(data: any) {
    if (status !== "authenticated" || !session?.user) {
      return toast.error("You must be logged in to submit a requisition.");
    }

    data.userId = session.user.id;
    data.documentLink = pdfUrl;
    data.qrCode = qrUrl; // Set the QR code URL to the form data
    console.log(data)

    try {
      const res = await createDocument(data);
      if (res) {
        toast.success("Requisition created successfully!");
        router.push("/dashboard/userdashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create requisition.");
    }
  }

  // Initialize React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  return (
    <div className='w-full flex-col flex justify-center items-center py-8'>
      <div className="py-6 flex gap-24">
        <Button>Cancel</Button>
        <Link href="/dashboard/userdashboard" className='bg-slate-950 text-white px-4 py-1 rounded-lg flex justify-center items-center'>
          View All Requisitions
        </Link>
      </div>
      <Card className="lg:col-span-3 w-3/5">
        <CardHeader>
          <CardTitle>New Requisition Submission</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
                placeholder="Enter requisition title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* Description input */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <Textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                placeholder="Enter requisition details"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            {/* PDF input */}
            <Pdfinput
              label="PDF resource"
              pdfUrl={pdfUrl}
              setPdfUrl={setPdfUrl}
              endpoint="requisitionDocuments"
            />

            {/* QR Code section */}
            {qrUrl && (
              <div className="mt-4">
                <img src={qrUrl} alt="QR Code" />
              </div>
            )}

            {/* Submit button */}
            <div className="flex justify-center text-center items-center">
              <SubmitButton
                isLoading={loading}
                buttonTitle="Create Requisition"
                LoadingButtonTitle="Creating please wait..."
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
