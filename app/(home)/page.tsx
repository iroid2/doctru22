import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center text-center'>
      <h2 className='text-4xl font-bold text-slate-900'>Requisition Management</h2>
      <Link href="/login" className='px-4 py-1 font-xs rounded-xl bg-slate-900 mt-6'>
      Login to your account
      </Link>
    </div>
  )
}
