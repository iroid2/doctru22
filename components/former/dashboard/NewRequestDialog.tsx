
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import React, { useState } from 'react'
import { Button } from "../ui/button"
import { Upload } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

export default  function NewRequestDialog({ onRequestCreated }: { onRequestCreated: () => void }) {
    
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)
      setError(null)
      try {
      //   await createNewRequest({ title, description })
        setIsOpen(false)
        setTitle('')
        setDescription('')
        onRequestCreated()
      } catch (err) {
        setError('Failed to create request. Please try again.')
      }
      setIsSubmitting(false)
    }
  
    return (
      <div className="bg-white">
        <Dialog  open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Upload className="mr-2 h-4 w-4" /> New Request
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Request</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Request'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      </div>
    )
  }
