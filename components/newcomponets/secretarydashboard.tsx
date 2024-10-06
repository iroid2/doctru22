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
                      <p className="text-sm text-gray-500">Submitted by kkfkfk on </p>
                    </div>
                    <Badge>{req.documentStatus}</Badge>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <Link href={`/dashboard/secretarydashboard/requisitions/${req.id}`} className='flex gap-1 bg-slate-800 rounded-lg justify-center items-center text-white px-4 py-2'>
                      <Eye className="" />
                      View
                    </Link>
                    {/* <Button size="sm" variant="outline" onClick={() => handleApprove(req.id)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleReject(req.id)}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button> */}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
