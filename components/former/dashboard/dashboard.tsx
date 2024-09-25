'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Clock, AlertCircle, CheckCircle, Search, User, Filter } from "lucide-react"
import { useState, useEffect } from 'react'
import DashboardCard from "./DashboardCard"
import DashboardHeader from "./DashboardHeader"

// Update Document type to include sentToSecretary
type Document = {
  id: string;
  title: string;
  requester: string;
  date: string;
  status: string;
  currentStage: string;
  sentToSecretary: boolean;
}

export default function AdminDashboard({ role }: { role: 'SECRETARY' | 'HEAD_OF_DEPARTMENT' }, {title}:{title:string}) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/documents')
      const data = await response.json()
      // Filter documents for secretary
      const filteredData = role === 'SECRETARY' 
        ? data.filter((doc: Document) => doc.sentToSecretary && doc.status === 'Pending')
        : data
      setDocuments(filteredData)
    } catch (err) {
      setError('Failed to fetch documents. Please try again.')
    }
    setIsLoading(false)
  }

  const filteredDocuments = documents.filter(doc =>
    (doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || doc.status === statusFilter)
  )

  const handleApprove = async (docId: string) => {
    try {
      await fetch(`/api/documents/${docId}/approve`, { method: 'POST' })
      await fetchDocuments()
    } catch (err) {
      setError('Failed to approve document. Please try again.')
    }
  }

  const handleReject = async (docId: string) => {
    try {
      await fetch(`/api/documents/${docId}/reject`, { method: 'POST' })
      await fetchDocuments()
    } catch (err) {
      setError('Failed to reject document. Please try again.')
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
     <DashboardHeader title="Secretary"/>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Tabs defaultValue="pending-approvals" className="space-y-4">
          <TabsList className="flex flex-wrap justify-start gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pending-approvals">Pending Approvals</TabsTrigger>
            <TabsTrigger value="all-documents">All Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <DashboardCard icon={<FileText className="h-4 w-4" />} title="Total Documents" value={documents.length.toString()} />
              <DashboardCard icon={<Clock className="h-4 w-4" />} title="Pending" value={documents.filter(doc => doc.status === 'Pending').length.toString()} />
              <DashboardCard icon={<AlertCircle className="h-4 w-4" />} title="Rejected" value={documents.filter(doc => doc.status === 'Rejected').length.toString()} />
              <DashboardCard icon={<CheckCircle className="h-4 w-4" />} title="Approved" value={documents.filter(doc => doc.status === 'Approved').length.toString()} />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {documents.slice(0, 5).map(doc => (
                    <li key={doc.id}>{doc.title} - {doc.status} on {doc.date}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending-approvals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search documents..."
                      className="pl-10 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                {isLoading ? (
                  <p>Loading documents...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left">Document ID</th>
                          <th className="text-left">Title</th>
                          <th className="text-left">Requester</th>
                          <th className="text-left">Date</th>
                          <th className="text-left">Current Stage</th>
                          <th className="text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDocuments.filter(doc => doc.status === 'Pending').map((doc) => (
                          <tr key={doc.id}>
                            <td>{doc.id}</td>
                            <td>{doc.title}</td>
                            <td>{doc.requester}</td>
                            <td>{doc.date}</td>
                            <td>{doc.currentStage}</td>
                            <td>
                              <div className="flex flex-wrap gap-2">
                                <Button variant="outline" size="sm">View</Button>
                                <Button size="sm" onClick={() => handleApprove(doc.id)}>Approve</Button>
                                <Button variant="destructive" size="sm" onClick={() => handleReject(doc.id)}>Reject</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all-documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search documents..." 
                      className="pl-10 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="status-filter">Filter by Status:</Label>
                    <select 
                      id="status-filter" 
                      className="border rounded p-1"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left">Document ID</th>
                        <th className="text-left">Title</th>
                        <th className="text-left">Requester</th>
                        <th className="text-left">Date</th>
                        <th className="text-left">Status</th>
                        <th className="text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDocuments.map((doc) => (
                        <tr key={doc.id}>
                          <td>{doc.id}</td>
                          <td>{doc.title}</td>
                          <td>{doc.requester}</td>
                          <td>{doc.date}</td>
                          <td>{doc.status}</td>
                          <td><Button variant="link">View Details</Button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 ReqTracks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}