'use client';

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
import { useDashboardData, useRecommendations } from '@/lib/api';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  // Fetch dashboard data with React Query
  const farmId = '1'; // Default farm - Amina's Maize Farm
  const { farm, sensors, risk, forecast, isLoading, isError } = useDashboardData(farmId);
  const { data: recommendations } = useRecommendations(farmId);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--color-primary)] mx-auto" />
            <p className="text-[var(--color-bark)]">Loading farm data...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (isError || !farm.data) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <p className="text-[var(--color-bark)]">Error loading farm data. Please try again.</p>
        </div>
      </AppLayout>
    );
  }

  const farmData = farm.data;
  const sensorData = sensors.data || [];
  const riskData = risk.data;
  const recommendationData = recommendations?.filter(r => r.status === 'pending') || [];

  // Get sensor values
  const moistureSensor = sensorData.find(s => s.sensorType === 'moisture');
  const tempSensor = sensorData.find(s => s.sensorType === 'temperature');
  const humiditySensor = sensorData.find(s => s.sensorType === 'humidity');

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-slide-in-up">
          <div>
            <h1 className="font-display text-3xl font-bold text-[var(--color-soil)]">
              Farm Dashboard
            </h1>
            <p className="text-[var(--color-bark)] mt-1">
              {farmData.name} · {farmData.location.region}, {farmData.location.country}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="healthy" size="lg">
              Overall Health: {farmData.healthPercentage}%
            </Badge>
            <Button variant="primary">Run Simulation</Button>
          </div>
        </div>

        {/* Recommendation Banner */}
        {recommendationData.length > 0 && (
          <div className="animate-slide-in-down">
            <RecommendationBanner
              severity={recommendationData[0].severity}
              title={recommendationData[0].title}
              description={recommendationData[0].description}
              metadata={{
                daysUntil: recommendationData[0].daysUntilDeadline,
                impactPercent: recommendationData[0].impactPercent,
                confidence: recommendationData[0].confidence,
              }}
              action={{
                label: 'View Details',
                onClick: () => console.log('View details clicked'),
              }}
            />
          </div>
        )}

        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-6 stagger-fade">
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
                  <RiskGauge value={riskData?.overallRisk || 0} size="lg" />
                </div>
                {riskData && (
                  <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                    <RiskBreakdown
                      items={riskData.breakdown.map(b => ({
                        label: b.type.replace('_', ' '),
                        value: b.score,
                      }))}
                      size="sm"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sensor Cards */}
            {moistureSensor && (
              <SensorCard
                type="moisture"
                value={moistureSensor.value}
                unit={moistureSensor.unit}
                status={moistureSensor.status}
                statusLabel={moistureSensor.status}
                minValue={moistureSensor.optimalRange.min}
                maxValue={moistureSensor.optimalRange.max}
                optimalRange={`${moistureSensor.optimalRange.min}-${moistureSensor.optimalRange.max}${moistureSensor.unit}`}
                lastUpdated="2 min ago"
                trend={moistureSensor.trend}
              />
            )}

            {tempSensor && (
              <SensorCard
                type="temperature"
                value={tempSensor.value}
                unit={tempSensor.unit}
                status={tempSensor.status}
                statusLabel={tempSensor.status}
                minValue={tempSensor.optimalRange.min}
                maxValue={tempSensor.optimalRange.max}
                optimalRange={`${tempSensor.optimalRange.min}-${tempSensor.optimalRange.max}${tempSensor.unit}`}
                lastUpdated="2 min ago"
                trend={tempSensor.trend}
              />
            )}

            {humiditySensor && (
              <SensorCard
                type="humidity"
                value={humiditySensor.value}
                unit={humiditySensor.unit}
                status={humiditySensor.status}
                statusLabel={humiditySensor.status}
                minValue={humiditySensor.optimalRange.min}
                maxValue={humiditySensor.optimalRange.max}
                optimalRange={`${humiditySensor.optimalRange.min}-${humiditySensor.optimalRange.max}${humiditySensor.unit}`}
                lastUpdated="2 min ago"
                trend={humiditySensor.trend}
              />
            )}
          </div>

          {/* Middle Column - 3D Farm Visualization */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <Card variant="elevated" padding="none" className="hover-lift">
              <div className="p-6 border-b border-[var(--color-border)]">
                <CardTitle>Farm Digital Twin</CardTitle>
                <CardDescription className="mt-1">
                  Interactive 3D visualization · Growth Stage: {farmData.growthStage.replace('_', ' ')}
                </CardDescription>
              </div>
              <div className="aspect-square">
                <FarmDigitalTwin 
                  growthStage={farmData.healthPercentage / 100} 
                  healthPercentage={farmData.healthPercentage}
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 bg-[var(--bg-card)] border-t border-[var(--color-border)]">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-bark)]">Healthy Plants</span>
                  <span className="font-medium text-[var(--color-healthy)]">{farmData.healthyPlants.toLocaleString()} / {farmData.totalPlants.toLocaleString()}</span>
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
