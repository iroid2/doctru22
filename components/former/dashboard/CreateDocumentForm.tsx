// "use client";

// import React, { useState, useCallback } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { createDocument } from '@/actions/document';
// import { useRouter } from 'next/navigation';
// import { useDropzone } from 'react-dropzone';

// type FormInputs = {
//   title: string;
//   description: string;
//   file: FileList;
// };

// export default function CreateDocumentForm() {
//   const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [file, setFile] = useState<File | null>(null);
//   const router = useRouter();

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     setFile(acceptedFiles[0]);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   const onSubmit: SubmitHandler<FormInputs> = async (data) => {
//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append('title', data.title);
//     formData.append('description', data.description);
//     if (file) {
//       formData.append('file', file);
//     }

//     try {
//       const newDocument = await createDocument(formData);
//       console.log('Document created:', newDocument);
//       router.push('/dashboard');
//     } catch (error) {
//       console.error('Error creating document:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <div>
//         <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//           Title
//         </label>
//         <input
//           id="title"
//           {...register("title", { required: "Title is required" })}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//         {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
//       </div>
//       <div>
//         <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//           Description
//         </label>
//         <textarea
//           id="description"
//           {...register("description", { required: "Description is required" })}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//         {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
//       </div>
//       <div {...getRootProps()} className="dropzone">
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <p>Drop the files here ...</p>
//         ) : (
//           <p>Drag 'n' drop some files here, or click to select files</p>
//         )}
//       </div>
//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//       >
//         {isSubmitting ? 'Submitting...' : 'Create Document'}
//       </button>
//     </form>
//   );
// }