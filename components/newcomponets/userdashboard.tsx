"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Send, Upload, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useUploadThing } from "@/utils/useUploadThing";
import { createDocument, getAllDocuments } from "@/actions/document";
import { useSession } from "next-auth/react";
import CreateRequisitionForm from "./CreateRequisitionForm";
import Link from "next/link";
// import SubmitButton from "../FormInputs/SubmitButton";


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



export default function IndividualDashboardV3({allDocuments}:{allDocuments:any}) {
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
  const {data:session,status}=useSession();
 
  if (status !== "authenticated" || !session?.user) {
    console.log("sign in")
  }
  const currentUserId = session?.user.id;
  console.log(currentUserId);
  const documents = allDocuments?.filter((doc: any) => doc.userId === currentUserId);
 
  // useEffect(() => {
  //   if (status === "authenticated" && session?.user) {
  //     const currentUserId = session.user.id;
  //     const userDocuments = allDocuments?.filter((doc: any) => doc.userId === currentUserId);
  //     setDocuments(userDocuments);
  //   }
  // }, [allDocuments, session, status]);


 

  // Hook to handle document uploads using UploadThing
  const { startUpload, isUploading } = useUploadThing("requisitionDocuments");

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Requisitions Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/userdashboard/new" className="bg-slate-950 px-4 py-1 rounded-lg text-white">Create Requisition</Link>
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
                <Badge variant="secondary">{documents?.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Pending</span>
                <Badge variant="secondary">{documents.filter((r:any) => r.status === "PENDING").length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Approved</span>
                <Badge variant="secondary">{documents?.filter((r:any) => r.status === "APPROVED").length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Rejected</span>
                <Badge variant="secondary">{documents?.filter((r:any) => r.status === "REJECTED").length}</Badge>
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
              {documents?.map((req:any,i:any) => (
                
                <div key={req.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(req.status)}
                    <div>
                      <p className="font-medium">{req.title}</p>
                      <p className="text-sm text-gray-500">Submitted on {new Date(req.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Badge>{req.documentStatus}</Badge>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
