import { User } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

export default function DashboardHeader({ title }: { title: string }) {
  return (
    <div>
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">{title} Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <User className="mr-2 h-4 w-4" /> Profile
            </Button>
            <Button variant="secondary" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
