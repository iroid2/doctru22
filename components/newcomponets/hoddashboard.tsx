'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, Eye, CheckCircle, XCircle, MessageSquare, FileText, User } from 'lucide-react'

type Comment = {
  id: string;
  user: string;
  date: string;
  content: string;
}

type TimelineEvent = {
  date: string;
  action: string;
  user: string;
}

type Requisition = {
  id: string;
  title: string;
  submitter: string;
  submittedDate: string;
  description: string;
  status: 'Pending Final Approval' | 'Approved' | 'Rejected';
  comments: Comment[];
  timeline: TimelineEvent[];
}

export default function HeadOfDepartmentDashboard() {
  const [requisitions, setRequisitions] = useState<Requisition[]>([
    {
      id: '1',
      title: 'Office Supplies Request',
      submitter: 'John Doe',
      submittedDate: '2023-09-15',
      description: 'Request for new office supplies including pens, notebooks, and printer paper.',
      status: 'Pending Final Approval',
      comments: [
        { id: '1', user: 'Jane Smith', date: '2023-09-16', content: 'Quantities seem reasonable. Recommend approval.' },
        { id: '2', user: 'Mike Johnson', date: '2023-09-17', content: 'Agreed. Within budget for this quarter.' }
      ],
      timeline: [
        { date: '2023-09-15', action: 'Submitted', user: 'John Doe' },
        { date: '2023-09-16', action: 'Reviewed by Undersecretary', user: 'Jane Smith' },
        { date: '2023-09-17', action: 'Forwarded for Final Approval', user: 'Mike Johnson' }
      ]
    },
    {
      id: '2',
      title: 'Travel Expense Reimbursement',
      submitter: 'Alice Brown',
      submittedDate: '2023-09-14',
      description: 'Reimbursement request for travel expenses incurred during the conference in New York.',
      status: 'Pending Final Approval',
      comments: [
        { id: '3', user: 'Bob Wilson', date: '2023-09-15', content: 'All receipts are in order. Expenses align with company policy.' },
        { id: '4', user: 'Carol Davis', date: '2023-09-16', content: 'Confirmed conference attendance. Recommend approval.' }
      ],
      timeline: [
        { date: '2023-09-14', action: 'Submitted', user: 'Alice Brown' },
        { date: '2023-09-15', action: 'Reviewed by Finance', user: 'Bob Wilson' },
        { date: '2023-09-16', action: 'Forwarded for Final Approval', user: 'Carol Davis' }
      ]
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRequisition, setSelectedRequisition] = useState<Requisition | null>(null)
  const [feedback, setFeedback] = useState('')

  const filteredRequisitions = requisitions.filter(req => 
    req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.submitter.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewRequisition = (req: Requisition) => {
    setSelectedRequisition(req)
    setFeedback('')
  }

  const handleApprove = (id: string) => {
    console.log(`Approved requisition ${id}`)
    console.log(`Feedback: ${feedback}`)
    // Implement approval logic here
  }

  const handleReject = (id: string) => {
    console.log(`Rejected requisition ${id}`)
    console.log(`Feedback: ${feedback}`)
    // Implement rejection logic here
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Head of Department Dashboard</h1>
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
          icon={<Search className="h-4 w-4 text-gray-500" />}
          {...({} as any)} // Type assertion
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Requisitions Pending Final Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              {filteredRequisitions.map((req) => (
                <div key={req.id} className="mb-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{req.title}</h3>
                      <p className="text-sm text-gray-500">Submitted by {req.submitter} on {req.submittedDate}</p>
                    </div>
                    <Badge>{req.status}</Badge>
                  </div>
                  <Button size="sm" onClick={() => handleViewRequisition(req)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
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
            {selectedRequisition ? (
              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">{selectedRequisition.title}</h3>
                      <p className="text-sm text-gray-500">Submitted by {selectedRequisition.submitter} on {selectedRequisition.submittedDate}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Description</h4>
                      <p>{selectedRequisition.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Your Feedback</h4>
                      <Textarea
                        placeholder="Enter your feedback here..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={() => handleApprove(selectedRequisition.id)}>Approve</Button>
                      <Button variant="outline" onClick={() => handleReject(selectedRequisition.id)}>Reject</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="comments">
                  <ScrollArea className="h-[300px]">
                    {selectedRequisition.comments.map((comment) => (
                      <div key={comment.id} className="mb-4 p-4 border rounded-lg">
                        <div className="flex items-center mb-2">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>{comment.user[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{comment.user}</p>
                            <p className="text-sm text-gray-500">{comment.date}</p>
                          </div>
                        </div>
                        <p>{comment.content}</p>
                      </div>
                    ))}
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="timeline">
                  <ScrollArea className="h-[300px]">
                    {selectedRequisition.timeline.map((event, index) => (
                      <div key={index} className="flex items-start mb-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mr-4">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{event.action}</p>
                          <p className="text-sm text-gray-500">{event.date}</p>
                          <p className="text-sm">{event.user}</p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <FileText className="h-16 w-16 text-gray-400 mb-4" />
                <p className="text-gray-500">Select a requisition to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}