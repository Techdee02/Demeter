import { 
  AppLayout, 
  RiskGauge, 
  RiskBreakdown, 
  SensorCard, 
  SimulationPanel,
  ForecastChart,
  RecommendationBanner 
} from '@/components/dashboard';
import { FarmDigitalTwin } from '@/components/3d';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

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

        {/* Recommendation Banner */}
        <RecommendationBanner
          severity="warning"
          title="Moderate water stress predicted in 3 days"
          description="Consider irrigation on Day 75. Soil moisture projected to drop below optimal range."
          metadata={{
            daysUntil: 3,
            impactPercent: 5,
            confidence: 85,
          }}
          action={{
            label: 'View Details',
            onClick: () => console.log('View details clicked'),
          }}
        />

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
                <div className="flex justify-center py-4">
                  <RiskGauge value={15} size="lg" />
                </div>
                <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                  <RiskBreakdown
                    items={[
                      { label: 'Water Stress', value: 8 },
                      { label: 'Heat Stress', value: 12 },
                      { label: 'Disease Risk', value: 3 },
                    ]}
                    size="sm"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Sensor Cards */}
            <SensorCard
              type="moisture"
              value={42}
              unit="%"
              status="low"
              statusLabel="Optimal"
              minValue={0}
              maxValue={100}
              optimalRange="35-45%"
              lastUpdated="2 min ago"
              trend="stable"
            />

            <SensorCard
              type="temperature"
              value={28}
              unit="°C"
              status="moderate"
              statusLabel="Normal"
              minValue={15}
              maxValue={45}
              optimalRange="22-30°C"
              lastUpdated="2 min ago"
              trend="up"
            />

            <SensorCard
              type="humidity"
              value={68}
              unit="%"
              status="healthy"
              statusLabel="Good"
              minValue={0}
              maxValue={100}
              optimalRange="60-80%"
              lastUpdated="2 min ago"
              trend="stable"
            />
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
              <div className="aspect-square">
                <FarmDigitalTwin 
                  growthStage={0.8} 
                  healthPercentage={87}
                  className="w-full h-full"
                />
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
            <SimulationPanel />

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
            <ForecastChart />
          </div>
        </div>

        {/* Status Badge */}
        <div className="text-center pt-4">
          <Badge variant="primary" size="lg">
            ✓ Dashboard Components Complete | Tasks 1-13/18
          </Badge>
        </div>
      </div>
    </AppLayout>
  );
}
