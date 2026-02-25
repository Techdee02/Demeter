import { AppLayout } from '@/components/dashboard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-[var(--color-soil)]">
              Farm Dashboard
            </h1>
            <p className="text-[var(--color-bark)] mt-1">
              Amina's Maize Farm · Kaduna State, Nigeria
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="healthy" size="lg">
              Overall Health: 87%
            </Badge>
            <Button variant="primary">Run Simulation</Button>
          </div>
        </div>

        {/* Alert Banner */}
        <Card variant="elevated" className="border-l-4 border-[var(--color-moderate)]">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-[var(--color-moderate)] mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-[var(--color-soil)]">
                  Moderate water stress predicted in 3 days
                </p>
                <p className="text-sm text-[var(--color-bark)] mt-1">
                  Consider irrigation on Day 72. Expected 5% yield improvement if action taken.
                </p>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Risk Gauge & Sensors */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Risk Gauge Card */}
            <Card hover="glow">
              <CardHeader>
                <CardTitle>Current Risk Level</CardTitle>
                <CardDescription>7-day forecast analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-48 bg-[var(--color-dust)] rounded-lg">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[var(--color-low)]">LOW</div>
                    <div className="text-sm text-[var(--color-bark)] mt-2">15% Risk Score</div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-bark)]">Water Stress</span>
                    <Badge variant="low" size="sm">8%</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-bark)]">Heat Stress</span>
                    <Badge variant="low" size="sm">12%</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-bark)]">Disease Risk</span>
                    <Badge variant="healthy" size="sm">3%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sensor Cards */}
            <Card hover="glow">
              <CardHeader>
                <CardTitle className="text-base">Soil Moisture</CardTitle>
                <CardDescription>Real-time sensor data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-[var(--color-water)]">42%</div>
                  <Badge variant="low" size="sm">Optimal</Badge>
                </div>
                <div className="mt-3 h-2 bg-[var(--color-dust)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-water)]" style={{ width: '42%' }} />
                </div>
                <p className="text-xs text-[var(--color-bark)] mt-2">
                  Field capacity: 35-45% · Last updated: 2 min ago
                </p>
              </CardContent>
            </Card>

            <Card hover="glow">
              <CardHeader>
                <CardTitle className="text-base">Temperature</CardTitle>
                <CardDescription>Average today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-[var(--color-primary)]">28°C</div>
                  <Badge variant="moderate" size="sm">Normal</Badge>
                </div>
                <p className="text-xs text-[var(--color-bark)] mt-2">
                  High: 32°C · Low: 24°C
                </p>
              </CardContent>
            </Card>

            <Card hover="glow">
              <CardHeader>
                <CardTitle className="text-base">Humidity</CardTitle>
                <CardDescription>Current level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-[var(--color-cloud)]">68%</div>
                  <Badge variant="healthy" size="sm">Good</Badge>
                </div>
                <p className="text-xs text-[var(--color-bark)] mt-2">
                  Ideal range: 60-80%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - 3D Farm Visualization */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <Card variant="elevated" padding="none">
              <div className="p-6 border-b border-[var(--color-border)]">
                <CardTitle>Farm Digital Twin</CardTitle>
                <CardDescription className="mt-1">
                  Interactive 3D visualization · Growth Stage: V12 (Tasseling)
                </CardDescription>
              </div>
              <div className="aspect-square bg-gradient-to-br from-[var(--color-dust)] to-[var(--color-leaf)]/10">
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🌾</div>
                    <p className="text-[var(--color-bark)] font-medium">
                      3D Farm Scene
                    </p>
                    <p className="text-sm text-[var(--color-bark)]/70 mt-2">
                      Three.js visualization loading...
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-card)] border-t border-[var(--color-border)]">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-bark)]">Healthy Plants</span>
                  <span className="font-medium text-[var(--color-healthy)]">2,847 / 3,000</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Simulation Panel */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">What-If Simulator</CardTitle>
                <CardDescription>Test scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    💧 Add Irrigation
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    🌧️ Heavy Rainfall
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    ☀️ Heat Wave
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    🌱 Apply Fertilizer
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Growth Progress</CardTitle>
                <CardDescription>Days to maturity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-[var(--color-bark)]">Day 72 of 120</span>
                      <span className="font-medium text-[var(--color-soil)]">60%</span>
                    </div>
                    <div className="h-3 bg-[var(--color-dust)] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-growth" style={{ width: '60%' }} />
                    </div>
                  </div>
                  <p className="text-xs text-[var(--color-bark)]">
                    Estimated harvest: 48 days (April 15, 2026)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="primary" size="sm" className="w-full">
                    Schedule Irrigation
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    View Full Report
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full">
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row - Forecast Chart */}
          <div className="col-span-12">
            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>14-Day Forecast</CardTitle>
                    <CardDescription>Predicted stress levels and weather conditions</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-[var(--color-dust)] rounded-lg flex items-center justify-center">
                  <p className="text-[var(--color-bark)]">
                    Recharts forecast visualization will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Status Badge */}
        <div className="text-center pt-4">
          <Badge variant="primary" size="lg">
            ✓ Dashboard Grid Structure Complete | Task 5/18
          </Badge>
        </div>
      </div>
    </AppLayout>
  );
}
