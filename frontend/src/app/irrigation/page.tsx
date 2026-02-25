'use client';

import { AppLayout } from '@/components/dashboard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Droplets } from 'lucide-react';

export default function IrrigationPage() {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--color-water)] to-[var(--color-terracotta)] flex items-center justify-center">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-[var(--color-soil)]">
              Irrigation
            </h1>
            <p className="text-[var(--color-bark)] mt-1">
              Smart water management and scheduling
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
              <Droplets className="w-16 h-16 text-[var(--color-water)] mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-[var(--color-soil)] mb-2">
                Irrigation Management
              </h3>
              <p className="text-[var(--color-bark)] max-w-md mx-auto">
                This page will provide irrigation scheduling, soil moisture tracking, 
                water usage optimization, and automated irrigation control.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
