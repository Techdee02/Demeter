'use client';

import { AppLayout } from '@/components/dashboard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { FileText } from 'lucide-react';

export default function ReportsPage() {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--color-terracotta)] to-[var(--color-savanna)] flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-[var(--color-soil)]">
              Reports
            </h1>
            <p className="text-[var(--color-bark)] mt-1">
              Farm performance analytics and exports
            </p>
          </div>
        </div>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>This feature is under development</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-[var(--color-terracotta)] mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-[var(--color-soil)] mb-2">
                Reports & Analytics
              </h3>
              <p className="text-[var(--color-bark)] max-w-md mx-auto">
                This page will provide detailed farm reports, historical data analysis, 
                performance metrics, and exportable documents for record keeping.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
