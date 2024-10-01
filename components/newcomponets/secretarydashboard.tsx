'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"
import { Bell, Search, Eye, CheckCircle, XCircle, Clock, FileText } from 'lucide-react'
import DocumentInfo from './DocumentInfo'
import Link from 'next/link'

// Define Requisition type with the same structure
type Requisition = {
  id: string;
  title: string;
  submitter: string;
  submittedDate: string;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  timeline: {
    date: string;
    action: string;
    user: string;
  }[];
}

export default function UnderSecretaryDashboard({ allDocuments }: { allDocuments: any }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRequisition, setSelectedRequisition] = useState<Requisition | null>(null)

  // Filter documents based on search
  const filteredRequisitions = allDocuments.filter((req: any) =>
    req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewRequisition = (req: any) => {
    setSelectedRequisition(req)
  }

  const handleApprove = (id: string) => {
    console.log(`Approved requisition ${id}`)
    // Implement approval logic here
  }

  const handleReject = (id: string) => {
    console.log(`Rejected requisition ${id}`)
    // Implement rejection logic here
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Undersecretary Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search requisitions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pending Requisitions</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              {filteredRequisitions.map((req: any) => (
                <div key={req.id} className="mb-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{req.title}</h3>
                      <p className="text-sm text-gray-500">Submitted by {req.user.name} on {req.submittedDate}</p>
                    </div>
                    <Badge>Pending</Badge>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <Link href={`/dashboard/secretarydashboard/requisitions/${req.id}`} className='flex gap-1 bg-slate-800 rounded-lg justify-center items-center text-white px-4 py-2'>
                      <Eye className="" />
                      View
                    </Link>
                    <Button size="sm" variant="outline" onClick={() => handleApprove(req.id)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleReject(req.id)}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Requisition Details</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <DocumentInfo/> */}
            {/* {selectedRequisition ? (
              <DocumentInfo/>
              // <Tabs defaultValue="details">
              //   <TabsList>
              //     <TabsTrigger value="details">Details</TabsTrigger>
              //     <TabsTrigger value="timeline">Timeline</TabsTrigger>
              //   </TabsList>
              //   <TabsContent value="details">
              //     <div className="space-y-4">
              //       <div>
              //         <h3 className="font-semibold">{selectedRequisition.title}</h3>
              //         <p className="text-sm text-gray-500">Submitted by {selectedRequisition.submitter} on {selectedRequisition.submittedDate}</p>
              //       </div>
              //       <div>
              //         <h4 className="font-semibold">Description</h4>
              //         <p>{selectedRequisition.description}</p>
              //       </div>
              //       <div className="flex space-x-2">
              //         <Button onClick={() => handleApprove(selectedRequisition.id)}>Approve</Button>
              //         <Button variant="outline" onClick={() => handleReject(selectedRequisition.id)}>Reject</Button>
              //       </div>
              //     </div>
              //   </TabsContent>
              //   <TabsContent value="timeline">
              //     <ScrollArea className="h-[300px]">
              //       {selectedRequisition.timeline.map((event, index) => (
              //         <div key={index} className="flex items-start mb-4">
              //           <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mr-4">
              //             {event.action === 'Submitted' ? (
              //               <FileText className="h-4 w-4 text-blue-600" />
              //             ) : (
              //               <Clock className="h-4 w-4 text-blue-600" />
              //             )}
              //           </div>
              //           <div>
              //             <p className="font-semibold">{event.action}</p>
              //             <p className="text-sm text-gray-500">{event.date}</p>
              //             <p className="text-sm">{event.user}</p>
              //           </div>
              //         </div>
              //       ))}
              //     </ScrollArea>
              //   </TabsContent>
              // </Tabs>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <FileText className="h-16 w-16 text-gray-400 mb-4" />
                <p className="text-gray-500">Select a requisition to view details</p>
              </div>
            )} */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
