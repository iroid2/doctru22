import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Upload } from "lucide-react";

type Document = {
    id: string;
    title: string;
    date: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    currentStage: string;
    progress: number;
    file?: File;
    description:string;
    document:any
  }
export default function DocumentUploadForm() {
    const [isNewRequestDialogOpen, setIsNewRequestDialogOpen] = useState(false);
    const {register,handleSubmit, formState: { errors } } = useForm<Document>()
  async function onSubmit(data:Document) {
    console.log(data)
  }
  return (
    <Dialog open={isNewRequestDialogOpen} onOpenChange={setIsNewRequestDialogOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Request</DialogTitle>
        <DialogDescription>Fill out the form below to submit a new request.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Request Title</Label>
          <Input id="title" {...register('title', { required: 'Title is required' })} placeholder="Enter request title" />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register('description', { required: 'Description is required' })} placeholder="Provide details about your request" />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="document">Upload Document</Label>
          <div className="flex items-center justify-center w-full">
            <label htmlFor="document" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">PDF, DOCX, or TXT (MAX. 10MB)</p>
              </div>
              <input id="document" type="file" className="hidden" {...register('document', { 
                required: 'Document is required',
                validate: {
                  lessThan10MB: (files) => files[0]?.size < 10000000 || 'Max 10MB',
                  acceptedFormats: (files) =>
                    ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(files[0]?.type) ||
                    'Only PDF, DOCX or TXT files are allowed'
                }
              })} accept=".pdf,.docx,.txt" />
            </label>
          </div>
          {/* {errors.document && <p className="text-red-500 text-sm">{errors.document.message}</p>} */}
        </div>
        <DialogFooter>
          <Button type="submit">Submit Request</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
  )
}
