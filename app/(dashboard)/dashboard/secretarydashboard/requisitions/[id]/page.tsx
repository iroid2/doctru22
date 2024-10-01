import { getDocumentById } from '@/actions/document';
import DocumentInfo from '@/components/newcomponets/DocumentInfo';
import React from 'react'

export default async function page({params:{id}}:{params:{id:string}}) {
    const document = await getDocumentById(id);
  return (
    <div className='flex justify-center gap-4 items-center py-8 px-24'>
        <DocumentInfo document={document}/>
        <div className="">
        <iframe src={document.documentLink} width="600" height="400"></iframe>
        </div>
    </div>
  )
}
