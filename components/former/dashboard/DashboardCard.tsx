import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function DashboardCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
        </CardContent>
      </Card>
    )
  }
