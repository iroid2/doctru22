// "use client"
import { getAllDocuments } from '@/actions/document'
import { getKitUsers } from '@/actions/users';
import UserDashboard from '@/components/newcomponets/userdashboard'
import { useSession } from 'next-auth/react';
import React from 'react'

export default async function page() {
  const allDocuments = await getAllDocuments();
  // const users=await getKitUsers();
  // const user=await users.findUnique(()=>{user})
  // const allDocuments = userDocuments?.filter((doc: any) => doc.userId === user.Id);
  
  return (
    <div>
        <UserDashboard allDocuments={allDocuments}/>
    </div>
  )
}
