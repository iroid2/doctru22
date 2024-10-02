
import { getAllDocuments } from '@/actions/document';
import SecretaryDashboard from '@/components/newcomponets/secretarydashboard'
import UserDashboard from '@/components/newcomponets/userdashboard'
import React from 'react'

export default async function page() {
  const allDocuments = await getAllDocuments();
  

  return (
    <div>
        <SecretaryDashboard allDocuments={allDocuments}/>
    </div>
  )
}
