import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import SidebarV2 from "@/components/dashboard/SidebarV2";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="grid min-h-screen w-full md:grid-cols-1 ">
      {/* <Sidebar /> */}
      {/* <SidebarV2 />/ */}
      {/* <Sidebar/> */}
      <div className="flex flex-col">
        <Navbar session={session} />
        {children}
      </div>
    </div>
  );
}
