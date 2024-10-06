import { Bell, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AllUsersDashboard() {
  // In a real application, you'd fetch the user's name from your auth system
  const userName = "John Doe"

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 bg-primary text-primary-foreground">
        <h1 className="text-2xl font-bold">Welcome Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Log out</span>
          </Button>
        </div>
      </header>
      
      <main className="flex-grow p-6 bg-background">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome, {userName}!</CardTitle>
            <CardDescription>Thank you for logging in. Your account is currently pending approval.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Your account has been successfully created, but you haven't been assigned any roles yet. Here's what you need to know:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>An administrator will review your account and assign appropriate roles.</li>
              <li>This process typically takes 1-2 business days.</li>
              <li>You'll receive an email notification once your account has been approved and roles have been assigned.</li>
              <li>After approval, you'll have access to additional dashboards and features based on your assigned roles.</li>
            </ul>
            <div className="mt-6 p-4 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">If you have any questions or concerns, please contact our support team at support@example.com</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}