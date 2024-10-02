
 
import { getAllDocuments } from '@/actions/document';
import HODDashboard from '@/components/newcomponets/hoddashboard'
import React from 'react'

export default async function page() {
  const documents = await getAllDocuments();
  const allDocuments = documents.filter((document: any) => document.secretaryStatus === true);
  return (
    <div>
        <HODDashboard allDocuments={allDocuments}/>
    </div>
  )
}
