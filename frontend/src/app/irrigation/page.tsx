'use client';

import { useState } from 'react';
import { AppLayout, InsightCard } from '@/components/dashboard';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useDashboardData } from '@/lib/api';
import {
  Droplets, Timer, TrendingDown, TrendingUp, Calendar,
  DollarSign, Zap, Power, Play, Pause, Settings,
  Clock, CheckCircle2, AlertCircle, Loader2, CloudRain,
  ThermometerSun, Wind, Gauge, MapPin, Activity
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';

// Soil moisture data by zone
const moistureByZone = [
  { zone: 'North Field', moisture: 42, optimal: 65, status: 'critical', lastIrrigation: '3 days ago', nextScheduled: 'Today, 6:00 AM' },
  { zone: 'South Field', moisture: 58, optimal: 65, status: 'moderate', lastIrrigation: '1 day ago', nextScheduled: 'Tomorrow, 6:00 AM' },
  { zone: 'East Field', moisture: 68, optimal: 65, status: 'optimal', lastIrrigation: '12 hours ago', nextScheduled: 'In 2 days' },
  { zone: 'West Field', moisture: 52, optimal: 65, status: 'moderate', lastIrrigation: '2 days ago', nextScheduled: 'Today, 2:00 PM' },
];

// Historical water usage (liters)
const waterUsageData = [
  { date: 'Feb 19', usage: 2400, rainfall: 0, evapotranspiration: 320, efficiency: 87 },
  { date: 'Feb 20', usage: 2200, rainfall: 0, evapotranspiration: 340, efficiency: 85 },
  { date: 'Feb 21', usage: 2600, rainfall: 0, evapotranspiration: 350, efficiency: 88 },
  { date: 'Feb 22', usage: 1800, rainfall: 8, evapotranspiration: 310, efficiency: 90 },
  { date: 'Feb 23', usage: 1200, rainfall: 12, evapotranspiration: 280, efficiency: 92 },
  { date: 'Feb 24', usage: 2000, rainfall: 0, evapotranspiration: 330, efficiency: 89 },
  { date: 'Feb 25', usage: 2300, rainfall: 0, evapotranspiration: 340, efficiency: 87 },
  { date: 'Feb 26', usage: 2500, rainfall: 0, evapotranspiration: 360, efficiency: 86 },
];

// Moisture trend over last 7 days
const moistureTrendData = [
  { date: 'Feb 19', north: 58, south: 68, east: 72, west: 62 },
  { date: 'Feb 20', north: 54, south: 65, east: 70, west: 58 },
  { date: 'Feb 21', north: 50, south: 62, east: 68, west: 55 },
  { date: 'Feb 22', north: 62, south: 72, east: 78, west: 68 },
  { date: 'Feb 23', north: 68, south: 75, east: 80, west: 72 },
  { date: 'Feb 24', north: 58, south: 68, east: 75, west: 65 },
  { date: 'Feb 25', north: 50, south: 62, east: 70, west: 58 },
  { date: 'Feb 26', north: 42, south: 58, east: 68, west: 52 },
];

// Irrigation schedule for next 7 days
const irrigationSchedule = [
  { 
    date: 'Today, Feb 26', 
    zones: ['North Field', 'West Field'],
    time: '6:00 AM - 8:30 AM',
    amount: '25mm',
    duration: '2.5 hours',
    status: 'scheduled',
    reason: 'Critical moisture levels'
  },
  {
    date: 'Tomorrow, Feb 27',
    zones: ['South Field'],
    time: '6:00 AM - 7:30 AM',
    amount: '15mm',
    duration: '1.5 hours',
    status: 'scheduled',
    reason: 'Preventive watering'
  },
  {
    date: 'Feb 28',
    zones: ['All Zones'],
    time: 'Skipped',
    amount: '0mm',
    duration: '0 hours',
    status: 'cancelled',
    reason: 'Rain forecasted (8mm)'
  },
  {
    date: 'Mar 1',
    zones: ['North Field', 'West Field'],
    time: '6:00 AM - 8:00 AM',
    amount: '20mm',
    duration: '2 hours',
    status: 'projected',
    reason: 'Post-rain assessment'
  },
];

export default function IrrigationPage() {
  const farmId = '1';
  const { farm, forecast, isLoading } = useDashboardData(farmId);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [autoMode, setAutoMode] = useState(true);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto">
              <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
            </div>
            <p className="text-[13px] text-[var(--color-stone)]">Loading irrigation data...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-semibold text-[var(--color-soil)] tracking-tight">
              Irrigation Management
            </h1>
            <p className="text-[13px] text-[var(--color-stone)]">
              Smart water scheduling & soil moisture monitoring
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoMode(!autoMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                autoMode
                  ? 'bg-[var(--color-emerald)] text-white'
                  : 'bg-black/[0.03] text-[var(--color-stone)] hover:bg-black/[0.06]'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              {autoMode ? 'Auto Mode' : 'Manual Mode'}
            </button>
            <Button variant="primary" size="sm">
              <Settings className="w-3.5 h-3.5" />
              Configure
            </Button>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InsightCard
            priority="critical"
            title="Critical Moisture - North Field"
            description="Soil moisture at 42%, immediate irrigation required"
            daysUntil={0}
            impactPercent={-15}
            confidence={95}
            action={{
              label: 'Start Irrigation',
              onClick: () => console.log('Start irrigation'),
            }}
          />
          <InsightCard
            priority="opportunity"
            title="Rain Forecast - Skip Tomorrow"
            description="8mm rain expected Feb 28, automatic schedule adjustment"
            daysUntil={2}
            impactPercent={12}
            confidence={88}
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-4 lg:gap-5">
          
          {/* Current Status Cards */}
          <div className="col-span-12 lg:col-span-3">
            <div className="space-y-4">
              <StatusCard
                icon={Droplets}
                label="Avg Moisture"
                value="55%"
                target="65%"
                status="below"
                color="#3B82F6"
              />
              <StatusCard
                icon={Timer}
                label="Next Irrigation"
                value="2.5 hrs"
                target="Today 6:00 AM"
                status="scheduled"
                color="#059669"
              />
              <StatusCard
                icon={TrendingDown}
                label="Water Saved"
                value="840L"
                target="This week"
                status="positive"
                color="#FBBF24"
              />
              <StatusCard
                icon={DollarSign}
                label="Cost Savings"
                value="$24"
                target="vs traditional"
                status="positive"
                color="#059669"
              />
            </div>
          </div>

          {/* Moisture Trends */}
          <div className="col-span-12 lg:col-span-9">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Soil Moisture Trends</h3>
                    <p className="text-[12px] text-[var(--color-stone)]">7-day moisture levels by zone</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/[0.03]">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="text-[11px] text-[var(--color-stone)]">North</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/[0.03]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-emerald)]" />
                      <span className="text-[11px] text-[var(--color-stone)]">South</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/[0.03]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                      <span className="text-[11px] text-[var(--color-stone)]">East</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/[0.03]">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span className="text-[11px] text-[var(--color-stone)]">West</span>
                    </div>
                  </div>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moistureTrendData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="optimalZone" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#059669" stopOpacity={0.1} />
                          <stop offset="100%" stopColor="#059669" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="0" stroke="rgba(0,0,0,0.04)" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        width={30}
                        domain={[0, 100]}
                      />
                      <Tooltip content={<MoistureTooltip />} />
                      {/* Optimal zone band */}
                      <Area
                        type="monotone"
                        dataKey={() => 75}
                        stroke="none"
                        fill="url(#optimalZone)"
                      />
                      <Area
                        type="monotone"
                        dataKey={() => 55}
                        stroke="none"
                        fill="#fff"
                      />
                      <Line
                        type="monotone"
                        dataKey="north"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="south"
                        stroke="#059669"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="east"
                        stroke="#E2725B"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="west"
                        stroke="#F59E0B"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 flex items-center gap-1.5 p-2 rounded-lg bg-[var(--color-emerald)]/10">
                  <Activity className="w-3.5 h-3.5 text-[var(--color-emerald)]" />
                  <p className="text-[11px] text-[var(--color-stone)]">
                    Green zone (55-75%) indicates optimal moisture range
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Zone Control Cards */}
          <div className="col-span-12">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Zone Control</h3>
                    <p className="text-[12px] text-[var(--color-stone)]">Real-time monitoring & manual control</p>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500 text-white text-[12px] font-medium hover:bg-blue-600 transition-colors">
                    <Play className="w-3.5 h-3.5" />
                    Start All Zones
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {moistureByZone.map((zone) => (
                    <ZoneCard key={zone.zone} zone={zone} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Water Usage Analytics */}
          <div className="col-span-12 lg:col-span-8">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Water Usage & Efficiency</h3>
                    <p className="text-[12px] text-[var(--color-stone)]">
                      Daily consumption vs evapotranspiration
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[18px] font-semibold text-blue-500">88%</p>
                    <p className="text-[11px] text-[var(--color-stone)]">Avg efficiency</p>
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={waterUsageData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="0" stroke="rgba(0,0,0,0.04)" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        yAxisId="left"
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        width={35}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        width={30}
                      />
                      <Tooltip content={<WaterUsageTooltip />} />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="usage"
                        stroke="#3B82F6"
                        fill="url(#usageGradient)"
                        strokeWidth={2}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="evapotranspiration"
                        stroke="#F59E0B"
                        strokeWidth={2}
                        dot={false}
                        strokeDasharray="5 5"
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="rainfall"
                        fill="#059669"
                        radius={[4, 4, 0, 0]}
                        opacity={0.6}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 flex items-center justify-center gap-4 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-2 bg-blue-500/30" />
                    <span className="text-[var(--color-stone)]">Irrigation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-0.5 bg-amber-500" style={{ borderTop: '2px dashed' }} />
                    <span className="text-[var(--color-stone)]">ET Demand</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-[var(--color-emerald)]/60 rounded-sm" />
                    <span className="text-[var(--color-stone)]">Rainfall</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Irrigation Schedule */}
          <div className="col-span-12 lg:col-span-4">
            <Card variant="bento" className="h-full">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Schedule</h3>
                    <p className="text-[12px] text-[var(--color-stone)]">Next 7 days</p>
                  </div>
                  <Calendar className="w-4 h-4 text-[var(--color-stone)]" />
                </div>
                <div className="space-y-3">
                  {irrigationSchedule.map((schedule, idx) => (
                    <ScheduleCard key={idx} schedule={schedule} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weather Impact */}
          <div className="col-span-12 lg:col-span-6">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="mb-4">
                  <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Weather Impact</h3>
                  <p className="text-[12px] text-[var(--color-stone)]">Environmental factors affecting irrigation</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <WeatherFactorCard
                    icon={ThermometerSun}
                    label="Temperature"
                    value="32°C"
                    impact="High ET"
                    color="#F59E0B"
                  />
                  <WeatherFactorCard
                    icon={CloudRain}
                    label="Rainfall"
                    value="8mm"
                    impact="Expected"
                    color="#3B82F6"
                  />
                  <WeatherFactorCard
                    icon={Wind}
                    label="Wind Speed"
                    value="12 km/h"
                    impact="Moderate"
                    color="#78716C"
                  />
                </div>
                <div className="mt-4 p-3 rounded-lg bg-blue-500/10">
                  <p className="text-[12px] text-[var(--color-stone)]">
                    <span className="font-semibold text-blue-600">Smart adjustment:</span> Schedule modified to account for upcoming rainfall. Saving 850L of water.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Status */}
          <div className="col-span-12 lg:col-span-6">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="mb-4">
                  <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">System Status</h3>
                  <p className="text-[12px] text-[var(--color-stone)]">Equipment health & performance</p>
                </div>
                <div className="space-y-3">
                  <SystemStatusItem
                    label="Water Pump 1"
                    status="active"
                    detail="Running - 2,400 L/hr"
                  />
                  <SystemStatusItem
                    label="Water Pump 2"
                    status="idle"
                    detail="Standby mode"
                  />
                  <SystemStatusItem
                    label="Soil Sensors"
                    status="active"
                    detail="4/4 online, last update 2 min ago"
                  />
                  <SystemStatusItem
                    label="Valve Controller"
                    status="active"
                    detail="All zones operational"
                  />
                  <SystemStatusItem
                    label="Weather Station"
                    status="active"
                    detail="Connected, real-time data"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// Status Card Component
interface StatusCardProps {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string;
  target: string;
  status: 'below' | 'above' | 'scheduled' | 'positive';
  color: string;
}

function StatusCard({ icon: Icon, label, value, target, status, color }: StatusCardProps) {
  return (
    <Card variant="bento">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          {status === 'positive' && <TrendingUp className="w-4 h-4 text-[var(--color-emerald)]" />}
          {status === 'below' && <TrendingDown className="w-4 h-4 text-[var(--color-primary)]" />}
        </div>
        <p className="text-[20px] font-semibold text-[var(--color-soil)] mb-0.5">{value}</p>
        <p className="text-[12px] text-[var(--color-stone)] mb-1">{label}</p>
        <p className="text-[11px] text-[var(--color-stone)]">{target}</p>
      </CardContent>
    </Card>
  );
}

// Zone Card Component
interface ZoneCardProps {
  zone: typeof moistureByZone[0];
}

function ZoneCard({ zone }: ZoneCardProps) {
  const statusColors = {
    critical: { bg: '#E2725B', text: '#E2725B' },
    moderate: { bg: '#F59E0B', text: '#F59E0B' },
    optimal: { bg: '#059669', text: '#059669' },
  };
  
  const statusColor = statusColors[zone.status as keyof typeof statusColors];
  const moisturePercent = (zone.moisture / zone.optimal) * 100;
  
  return (
    <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-[13px] font-semibold text-[var(--color-soil)] mb-1">{zone.zone}</h4>
          <div 
            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
            style={{ 
              backgroundColor: `${statusColor.bg}15`,
              color: statusColor.text,
            }}
          >
            {zone.status.toUpperCase()}
          </div>
        </div>
        <MapPin className="w-4 h-4 text-[var(--color-stone)]" />
      </div>
      
      <div className="mb-3">
        <div className="flex items-end gap-1 mb-1">
          <span className="text-[24px] font-semibold" style={{ color: statusColor.text }}>
            {zone.moisture}%
          </span>
          <span className="text-[12px] text-[var(--color-stone)] mb-1">/ {zone.optimal}%</span>
        </div>
        <div className="w-full h-1.5 bg-black/[0.05] rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all"
            style={{ 
              width: `${moisturePercent}%`,
              backgroundColor: statusColor.bg,
            }}
          />
        </div>
      </div>
      
      <div className="space-y-1.5 mb-3 text-[11px]">
        <div className="flex items-center justify-between">
          <span className="text-[var(--color-stone)]">Last irrigation</span>
          <span className="font-medium text-[var(--color-soil)]">{zone.lastIrrigation}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[var(--color-stone)]">Next scheduled</span>
          <span className="font-medium text-[var(--color-soil)]">{zone.nextScheduled}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="flex-1 py-1.5 rounded-lg bg-blue-500 text-white text-[11px] font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-1">
          <Play className="w-3 h-3" />
          Start
        </button>
        <button className="px-3 py-1.5 rounded-lg bg-black/[0.03] text-[var(--color-stone)] text-[11px] font-medium hover:bg-black/[0.06] transition-colors">
          <Settings className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

// Schedule Card Component
interface ScheduleCardProps {
  schedule: typeof irrigationSchedule[0];
}

function ScheduleCard({ schedule }: ScheduleCardProps) {
  const statusConfig = {
    scheduled: { icon: Clock, color: '#3B82F6', bg: '#3B82F615' },
    cancelled: { icon: AlertCircle, color: '#78716C', bg: '#78716C15' },
    projected: { icon: Calendar, color: '#F59E0B', bg: '#F59E0B15' },
  };
  
  const config = statusConfig[schedule.status as keyof typeof statusConfig];
  const Icon = config.icon;
  
  return (
    <div className="p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-white/20">
      <div className="flex items-start gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: config.bg }}>
          <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-semibold text-[var(--color-soil)]">{schedule.date}</p>
          <p className="text-[11px] text-[var(--color-stone)]">{schedule.time}</p>
        </div>
      </div>
      <div className="ml-9 space-y-1">
        <p className="text-[11px] text-[var(--color-stone)]">
          <span className="font-medium text-[var(--color-soil)]">{schedule.zones.join(', ')}</span>
        </p>
        <p className="text-[11px] text-[var(--color-stone)]">
          {schedule.amount} • {schedule.duration}
        </p>
        <p className="text-[10px] text-[var(--color-stone)] italic">{schedule.reason}</p>
      </div>
    </div>
  );
}

// Weather Factor Card
interface WeatherFactorCardProps {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string;
  impact: string;
  color: string;
}

function WeatherFactorCard({ icon: Icon, label, value, impact, color }: WeatherFactorCardProps) {
  return (
    <div className="p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-white/20 text-center">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${color}15` }}>
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <p className="text-[16px] font-semibold text-[var(--color-soil)] mb-0.5">{value}</p>
      <p className="text-[11px] text-[var(--color-stone)] mb-1">{label}</p>
      <p className="text-[10px] text-[var(--color-stone)]">{impact}</p>
    </div>
  );
}

// System Status Item
interface SystemStatusItemProps {
  label: string;
  status: 'active' | 'idle' | 'warning';
  detail: string;
}

function SystemStatusItem({ label, status, detail }: SystemStatusItemProps) {
  const statusConfig = {
    active: { color: '#059669', icon: CheckCircle2 },
    idle: { color: '#78716C', icon: Pause },
    warning: { color: '#F59E0B', icon: AlertCircle },
  };
  
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-white/20">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${config.color}15` }}>
        <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-semibold text-[var(--color-soil)]">{label}</p>
        <p className="text-[11px] text-[var(--color-stone)]">{detail}</p>
      </div>
    </div>
  );
}

// Custom Tooltips
function MoistureTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-3 min-w-[140px]">
      <p className="font-semibold text-[12px] text-[var(--color-soil)] mb-2">{label}</p>
      <div className="space-y-1">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-[var(--color-stone)] capitalize">{entry.dataKey}</span>
            <span className="text-[11px] font-medium" style={{ color: entry.color }}>
              {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WaterUsageTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-3 min-w-[160px]">
      <p className="font-semibold text-[12px] text-[var(--color-soil)] mb-2">{label}</p>
      <div className="space-y-1">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-[var(--color-stone)] capitalize">{entry.dataKey === 'evapotranspiration' ? 'ET' : entry.dataKey}</span>
            <span className="text-[11px] font-medium" style={{ color: entry.color }}>
              {entry.value} {entry.dataKey === 'efficiency' ? '%' : entry.dataKey === 'rainfall' ? 'mm' : 'L'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
