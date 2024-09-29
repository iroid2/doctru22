"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Send, Upload, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useUploadThing } from "@/utils/useUploadThing";
import { createDocument, getAllDocuments } from "@/actions/document";

// Update the Requisition type to match your document structure
type Requisition = {
  id: string;
  title: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  documentLink?: string;
  description: string;
  currentStep: string;
};

// Form input types
type FormInputs = {
  title: string;
  description: string;
  document: FileList; // FileList to handle file uploads
};

export default function IndividualDashboardV3() {
  // Replace the useState initialization with fetched data
  const [requisitions, setRequisitions] = useState<Requisition[]>([]);

  // Fetch documents when the component mounts
  useEffect(() => {
    async function fetchDocuments() {
      try {
        const documents = await getAllDocuments();
        if (documents) {
          setRequisitions(documents.map(doc => ({
            id: doc.id,
            title: doc.title,
            status: doc.currentStep as "PENDING" | "APPROVED" | "REJECTED",
            createdAt: new Date(doc.createdAt).toISOString().split("T")[0],
            documentLink: doc.documentLink,
            description: doc.description,
            currentStep: doc.currentStep
          })));
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
        toast.error("Failed to load requisitions. Please try again.");
      }
    }

    fetchDocuments();
  }, []);

  // Initialize React Hook Form
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();

  // Hook to handle document uploads using UploadThing
  const { startUpload, isUploading } = useUploadThing("requisitionDocuments");

  // Handle form submission
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    // console.log(data)
   
    try {
      // Ensure a documt has been selected for upload
      
      if (data.document && data.document.length > 0) {
        // Convert FileList to an array of files for UploadThing
        const filesArray = Array.from(data.document);

        // Start the file upload process
        const uploadResult = await startUpload(filesArray);

        // Check if the upload succeeded and returned a valid result
        if (uploadResult && uploadResult.length > 0) {
          const documentLink = uploadResult[0].url; // Get the document URL

          // Create the document in the database
          const newDocument = await createDocument({
            title: data.title,
            description: data.description,
            documentLink,
            currentStep: "PENDING" // Adjust this based on your schema
          });

          // Add the new document to the state
          setRequisitions(prev => [{
            id: newDocument.id,
            title: newDocument.title,
            status: "PENDING",
            createdAt: new Date(newDocument.createdAt).toISOString().split("T")[0],
            documentLink: newDocument.documentLink,
            description: newDocument.description,
            currentStep: newDocument.currentStep
          }, ...prev]);

          // Reset the form after successful submission
          reset();

          // Notify the user of successful submission
          toast.success("Requisition submitted successfully.");
          return newDocument
        } else {
          throw new Error("Failed to upload the document.");
        }
      } else {
        throw new Error("No document selected.");
      }
    } catch (error) {
      console.error("Error submitting requisition:", error);
      toast.error("There was an issue submitting your requisition. Please try again.");
    }
  };

  // Helper function to get the status icon based on the requisition status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "Approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Requisitions Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Requisitions overview card */}
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Requisitions</span>
                <Badge variant="secondary">{requisitions.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Pending</span>
                <Badge variant="secondary">{requisitions.filter((r) => r.status === "PENDING").length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Approved</span>
                <Badge variant="secondary">{requisitions.filter((r) => r.status === "APPROVED").length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Rejected</span>
                <Badge variant="secondary">{requisitions.filter((r) => r.status === "REJECTED").length}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent requisitions card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Requisitions</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {requisitions.map((req) => (
                <div key={req.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(req.status)}
                    <div>
                      <p className="font-medium">{req.title}</p>
                      <p className="text-sm text-gray-500">Submitted on {req.createdAt}</p>
                    </div>
                  </div>
                  <Badge>{req.status}</Badge>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* New requisition submission form */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>New Requisition Submission</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Title input */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <Input
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  placeholder="Enter requisition title"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>

              {/* Description input */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea
                  id="description"
                  {...register("description", { required: "Description is required" })}
                  placeholder="Enter requisition details"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>

              {/* Document upload input */}
              <div>
                <label htmlFor="document" className="block text-sm font-medium text-gray-700">
                  Upload Document
                </label>
                <Input
                  id="document"
                  type="file"
                  {...register("document", { required: "Document is required" })}
                />
                {errors.document && <p className="text-red-500 text-sm mt-1">{errors.document.message}</p>}
              </div>

              {/* Submit button */}
              <Button type="submit" className="w-full flex items-center justify-center" disabled={isUploading}>
                {isUploading ? "Uploading..." : "Submit Requisition"}
                <Upload className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
