import { AppLayout } from '@/components/dashboard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-[var(--color-soil)]">
              Dashboard
            </h1>
            <p className="text-[var(--color-bark)] mt-1">
              Welcome back, Amina 👋
            </p>
          </div>
          <Badge variant="healthy" size="lg">
            Farm Status: Healthy
          </Badge>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card hover="glow">
            <CardHeader>
              <CardTitle className="text-base">Soil Moisture</CardTitle>
              <CardDescription>Current Level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--color-water)]">42%</div>
              <Badge variant="low" size="sm" className="mt-2">Optimal</Badge>
            </CardContent>
          </Card>

          <Card hover="glow">
            <CardHeader>
              <CardTitle className="text-base">Temperature</CardTitle>
              <CardDescription>Average Today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--color-primary)]">28°C</div>
              <Badge variant="moderate" size="sm" className="mt-2">Normal</Badge>
            </CardContent>
          </Card>

          <Card hover="glow">
            <CardHeader>
              <CardTitle className="text-base">Crop Health</CardTitle>
              <CardDescription>Overall Score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--color-healthy)]">87%</div>
              <Badge variant="healthy" size="sm" className="mt-2">Excellent</Badge>
            </CardContent>
          </Card>

          <Card hover="glow">
            <CardHeader>
              <CardTitle className="text-base">Risk Level</CardTitle>
              <CardDescription>7-Day Forecast</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--color-low)]">Low</div>
              <Badge variant="low" size="sm" className="mt-2">15% Risk</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>Farm Overview</CardTitle>
            <CardDescription>
              Real-time monitoring and AI-powered insights for your maize farm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-[var(--color-dust)] rounded-lg">
              <p className="text-[var(--color-bark)]">
                3D Farm Visualization will appear here
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Status */}
        <div className="text-center pt-4">
          <Badge variant="primary" size="lg">
            ✓ Layout Shell Complete | Task 4/18
          </Badge>
        </div>
      </div>
    </AppLayout>
  );
}
