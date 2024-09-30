import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from '../ui/scroll-area';
import { Bell, Send, Upload, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Badge } from '../ui/badge';
import { getAllDocuments } from '@/actions/document';

export default async function UserRequisitions({documents}:{documents:any}) {
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
    // async function fetchDocuments() {
    //     try {
          
      
    //           // if (documents) {
    //           //   setRequisitions(documents.map(doc => ({
                  
    //           //   })));
    //           // }
    //         } catch (error) {
    //           console.error("Error fetching documents:", error);
    //           toast.error("Failed to load requisitions. Please try again.");
    //         }
    //       }
    
  return (
    <div>
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
                      <p className="text-sm text-gray-500">Submitted on {req.createdAt}</p>
                    </div>
                  </div>
                  <Badge>{req.status}</Badge>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
    </div>
  )
}
