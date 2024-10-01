// "use client";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { CalendarIcon, CheckCircle, FileTextIcon, UserIcon, X } from "lucide-react";
// import { useState } from "react";
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
// import { approveBySecretary, rejectBySecretary } from "@/actions/document";
// import { revalidatePath } from "next/cache";
// import Link from "next/link";

// export default function DocumentInfo({ document }: { document: any }) {
//   // convert date to string
//   const date = document.createdAt.toString().split("T")[0];
//   const [loading, setLoading] = useState(false);
//   const [secretaryStatus, setSecretaryStatus] = useState(document.secretaryStatus); 
//   const router = useRouter();

//   const handleApprove = async () => {
//     setLoading(true);
//     try {
//       // Approve the document by its id
//       const updatedDocument = await approveBySecretary(document.id);

//       if (updatedDocument) {
//         toast.success("Document approved successfully!");
//         setSecretaryStatus(true);
//         revalidatePath(`/dashboard/userdashboard`);
//       }
//     } catch (error) {
//       toast.error("Failed to approve the document.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleReject = async () => {
//     setLoading(true);
//     try {
//       // reject the document by its id
//       const updatedDocument = await rejectBySecretary(document.id);

//       if (updatedDocument) {
//         toast.success("Document rejected successfully!");
//         setSecretaryStatus(true);
//         revalidatePath(`/dashboard/userdashboard`);
//       }
//     } catch (error) {
//       toast.error("Failed to reject the document.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-2xl">
//       <CardHeader>
//         <CardTitle>{document.title}</CardTitle>
//       </CardHeader>
//       <CardContent className="grid gap-4">
//         <div className="grid gap-2">
//           <p className="text-sm text-muted-foreground">{document.description}</p>
//           <Link
//             href={document.documentLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-sm text-primary hover:underline"
//           >
//             <FileTextIcon className="inline-block w-4 h-4 mr-1" />
//             View Document
//           </Link>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           {/* Secretary Status */}
//           <div className="flex flex-col space-y-1">
//             <span className="text-sm font-semibold text-blue-600">Secretary Status</span>
//             {document.documentStatus === 'REJECTED' ? (
//               <p className="text-red-600">Rejected</p>
//             ) : secretaryStatus ? (
//               <p className="text-green-600">Approved</p>
//             ) : (
//               <p className="text-orange-600">Pending</p>
//             )}
//           </div>

//           {/* HOD Status */}
//           <div className="flex flex-col space-y-1">
//             <span className="text-sm font-semibold text-blue-600">HOD Status</span>
//             {document.hodStatus ? (
//               <p className="text-green-600">Approved</p>
//             ) : (
//               <p className="text-orange-600">Pending</p>
//             )}
//           </div>

//           {/* Document Status */}
//           <div className="flex flex-col space-y-1">
//             <span className="text-sm font-semibold text-blue-600">Document Status</span>
//             <p className="text-orange-600">{document.documentStatus}</p>
//           </div>
//         </div>

//         <div className="grid gap-2">
//           <div className="flex items-center">
//             <UserIcon className="w-4 h-4 mr-2" />
//             <span className="text-sm">Created by: {document.user.name}</span>
//           </div>
//           <div className="flex items-center">
//             <CalendarIcon className="w-4 h-4 mr-2" />
//             <span className="text-sm">Created at: {date}</span>
//           </div>
//         </div>

//         <div className="flex w-full m-4 px-8 justify-between">
//           <button type="button"
//             onClick={handleApprove} // Call handleApprove on button click
//             className="flex gap-2 bg-slate-950 text-white px-4 py-1 rounded-lg justify-center items-center"
//             disabled={loading}
//           >
//             <CheckCircle className="h-4 w-4 mr-2" />
//             {loading ? 'Approving...' : 'Approve'}
//           </button>
//           <button type="button"
//             onClick={handleReject} // Call handleApprove on button click
//             className="flex gap-2 bg-slate-950 text-white px-4 py-1 rounded-lg justify-center items-center"
//             disabled={loading}
//           >
//             <X className="h-4 w-4 mr-2" />
//             {loading ? 'Rejecting...' : 'Reject'}
//           </button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, CheckCircle, FileTextIcon, UserIcon, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { approveBySecretary, rejectBySecretary } from "@/actions/document";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default function DocumentInfo({ document }: { document: any }) {
  // Convert date to string
  const date = document.createdAt.toString().split("T")[0];

  // Separate loading states for Approve and Reject
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const [secretaryStatus, setSecretaryStatus] = useState(document.secretaryStatus);
  const router = useRouter();

  // Approve document
  const handleApprove = async () => {
    setLoadingApprove(true);
    try {
      const updatedDocument = await approveBySecretary(document.id);

      if (updatedDocument) {
        toast.success("Document approved successfully!");
        setSecretaryStatus(true);
        revalidatePath(`/dashboard/userdashboard`);
      }
    } catch (error) {
      toast.error("Failed to approve the document.");
    } finally {
      setLoadingApprove(false); // Reset loading state for approve
    }
  };

  // Reject document
  const handleReject = async () => {
    setLoadingReject(true);
    try {
      const updatedDocument = await rejectBySecretary(document.id);

      if (updatedDocument) {
        toast.success("Document rejected successfully!");
        setSecretaryStatus(true);
        revalidatePath(`/dashboard/userdashboard`);
      }
    } catch (error) {
      toast.error("Failed to reject the document.");
    } finally {
      setLoadingReject(false); // Reset loading state for reject
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{document.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <p className="text-sm text-muted-foreground">{document.description}</p>
          <Link
            href={document.documentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            <FileTextIcon className="inline-block w-4 h-4 mr-1" />
            View Document
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Secretary Status */}
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold text-blue-600">Secretary Status</span>
            {document.documentStatus === 'REJECTED' ? (
              <p className="text-red-600">Rejected</p>
            ) : secretaryStatus ? (
              <p className="text-green-600">Approved</p>
            ) : (
              <p className="text-orange-600">Pending</p>
            )}
          </div>

          {/* HOD Status */}
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold text-blue-600">HOD Status</span>
            {document.hodStatus ? (
              <p className="text-green-600">Approved</p>
            ) : (
              <p className="text-orange-600">Pending</p>
            )}
          </div>

          {/* Document Status */}
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold text-blue-600">Document Status</span>
            <p className="text-orange-600">{document.documentStatus}</p>
          </div>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <UserIcon className="w-4 h-4 mr-2" />
            <span className="text-sm">Created by: {document.user.name}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2" />
            <span className="text-sm">Created at: {date}</span>
          </div>
        </div>

        <div className="flex w-full m-4 px-8 justify-between">
          {/* Approve Button */}
          <button
            type="button"
            onClick={handleApprove}
            className="flex gap-2 bg-slate-950 text-white px-4 py-1 rounded-lg justify-center items-center"
            disabled={loadingApprove || loadingReject} // Disable if either loading state is true
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            {loadingApprove ? 'Approving...' : 'Approve'}
          </button>

          {/* Reject Button */}
          <button
            type="button"
            onClick={handleReject}
            className="flex gap-2 bg-slate-950 text-white px-4 py-1 rounded-lg justify-center items-center"
            disabled={loadingApprove || loadingReject} // Disable if either loading state is true
          >
            <X className="h-4 w-4 mr-2" />
            {loadingReject ? 'Rejecting...' : 'Reject'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
