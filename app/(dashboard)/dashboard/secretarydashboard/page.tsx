
import { getAllDocuments, rejectDocument } from '@/actions/document';
import SecretaryDashboard from '@/components/newcomponets/secretarydashboard'
import UserDashboard from '@/components/newcomponets/userdashboard'
import React from 'react'

export default async function page() {
  const allDocuments = await getAllDocuments();
  // console.log(allDocuments);
 // Import the rejectDocument function from your actions file




  return (
    <div>
        <SecretaryDashboard allDocuments={allDocuments}/>
    </div>
  )
}
