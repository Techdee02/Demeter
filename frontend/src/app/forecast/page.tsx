'use client';

import { useState } from 'react';
import { AppLayout, ForecastChart, InsightCard } from '@/components/dashboard';
import { Card, CardContent } from '@/components/ui/Card';
import { useDashboardData } from '@/lib/api';
import {
  TrendingUp, Cloud, Droplets, Sun, Wind, Thermometer,
  Calendar, DollarSign, Target, Sprout, Loader2, ArrowUp,
  ArrowDown, Minus, AlertCircle, CloudRain, Zap
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, ReferenceLine } from 'recharts';

// Extended 30-day forecast data
const extendedForecast = [
  { date: 'Feb 27', temp: 28, rain: 0, moisture: 42, gdd: 12, confidence: 95 },
  { date: 'Feb 28', temp: 29, rain: 0, moisture: 40, gdd: 13, confidence: 95 },
  { date: 'Mar 1', temp: 31, rain: 0, moisture: 38, gdd: 15, confidence: 92 },
  { date: 'Mar 2', temp: 32, rain: 0, moisture: 36, gdd: 16, confidence: 92 },
  { date: 'Mar 3', temp: 30, rain: 2, moisture: 45, gdd: 14, confidence: 90 },
  { date: 'Mar 4', temp: 28, rain: 8, moisture: 58, gdd: 12, confidence: 88 },
  { date: 'Mar 5', temp: 27, rain: 12, moisture: 65, gdd: 11, confidence: 88 },
  { date: 'Mar 6', temp: 26, rain: 5, moisture: 62, gdd: 10, confidence: 85 },
  { date: 'Mar 7', temp: 28, rain: 0, moisture: 58, gdd: 12, confidence: 82 },
  { date: 'Mar 8', temp: 29, rain: 0, moisture: 54, gdd: 13, confidence: 82 },
  { date: 'Mar 9', temp: 30, rain: 0, moisture: 50, gdd: 14, confidence: 80 },
  { date: 'Mar 10', temp: 31, rain: 0, moisture: 46, gdd: 15, confidence: 78 },
  { date: 'Mar 11', temp: 32, rain: 0, moisture: 42, gdd: 16, confidence: 78 },
  { date: 'Mar 12', temp: 33, rain: 0, moisture: 38, gdd: 17, confidence: 75 },
  { date: 'Mar 13', temp: 31, rain: 3, moisture: 48, gdd: 15, confidence: 72 },
  { date: 'Mar 14', temp: 29, rain: 6, moisture: 56, gdd: 13, confidence: 70 },
  { date: 'Mar 15', temp: 28, rain: 4, moisture: 60, gdd: 12, confidence: 68 },
  { date: 'Mar 16', temp: 29, rain: 0, moisture: 56, gdd: 13, confidence: 65 },
  { date: 'Mar 17', temp: 30, rain: 0, moisture: 52, gdd: 14, confidence: 65 },
  { date: 'Mar 18', temp: 31, rain: 0, moisture: 48, gdd: 15, confidence: 62 },
  { date: 'Mar 19', temp: 32, rain: 0, moisture: 44, gdd: 16, confidence: 60 },
  { date: 'Mar 20', temp: 30, rain: 8, moisture: 58, gdd: 14, confidence: 58 },
  { date: 'Mar 21', temp: 28, rain: 10, moisture: 68, gdd: 12, confidence: 55 },
  { date: 'Mar 22', temp: 27, rain: 5, moisture: 70, gdd: 11, confidence: 55 },
  { date: 'Mar 23', temp: 28, rain: 0, moisture: 66, gdd: 12, confidence: 52 },
  { date: 'Mar 24', temp: 29, rain: 0, moisture: 62, gdd: 13, confidence: 50 },
  { date: 'Mar 25', temp: 30, rain: 0, moisture: 58, gdd: 14, confidence: 50 },
  { date: 'Mar 26', temp: 31, rain: 0, moisture: 54, gdd: 15, confidence: 48 },
  { date: 'Mar 27', temp: 32, rain: 0, moisture: 50, gdd: 16, confidence: 45 },
  { date: 'Mar 28', temp: 30, rain: 4, moisture: 58, gdd: 14, confidence: 45 },
];

// Yield prediction data (kg/ha over season)
const yieldPredictionData = [
  { week: 'Week 1', predicted: 1200, upper: 1350, lower: 1050, actual: 1180 },
  { week: 'Week 2', predicted: 1800, upper: 2000, lower: 1600, actual: 1820 },
  { week: 'Week 3', predicted: 2400, upper: 2650, lower: 2150, actual: 2380 },
  { week: 'Week 4', predicted: 2900, upper: 3200, lower: 2600, actual: 2920 },
  { week: 'Week 5', predicted: 3350, upper: 3700, lower: 3000, actual: null },
  { week: 'Week 6', predicted: 3700, upper: 4100, lower: 3300, actual: null },
  { week: 'Week 7', predicted: 4000, upper: 4450, lower: 3550, actual: null },
  { week: 'Week 8', predicted: 4250, upper: 4750, lower: 3750, actual: null },
  { week: 'Week 9', predicted: 4450, upper: 5000, lower: 3900, actual: null },
  { week: 'Week 10', predicted: 4600, upper: 5200, lower: 4000, actual: null },
];

// Market price forecast
const priceForecastData = [
  { month: 'Feb', price: 2.8, trend: 'stable' },
  { month: 'Mar', price: 2.9, trend: 'up' },
  { month: 'Apr', price: 3.2, trend: 'up' },
  { month: 'May', price: 3.5, trend: 'up' },
  { month: 'Jun', price: 3.3, trend: 'down' },
  { month: 'Jul', price: 3.0, trend: 'down' },
];

// Growing degree days accumulation
const gddData = [
  { date: 'Week 1', accumulated: 98, optimal: 100 },
  { date: 'Week 2', accumulated: 203, optimal: 210 },
  { date: 'Week 3', accumulated: 315, optimal: 320 },
  { date: 'Week 4', accumulated: 432, optimal: 430 },
  { date: 'Week 5', accumulated: 546, optimal: 540 },
  { date: 'Week 6', accumulated: 658, optimal: 650 },
  { date: 'Week 7', accumulated: 772, optimal: 760 },
  { date: 'Week 8', accumulated: 885, optimal: 870 },
];

export default function ForecastingPage() {
  const farmId = '1';
  const { farm, forecast, isLoading } = useDashboardData(farmId);
  const [forecastRange, setForecastRange] = useState<'14d' | '30d'>('30d');
  const [viewMode, setViewMode] = useState<'weather' | 'yield' | 'market'>('weather');

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto">
              <Loader2 className="h-6 w-6 animate-spin text-[var(--color-primary)]" />
            </div>
            <p className="text-[13px] text-[var(--color-stone)]">Loading forecasts...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const forecastData = forecast.data;
  const displayData = forecastRange === '14d' ? extendedForecast.slice(0, 14) : extendedForecast;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-semibold text-[var(--color-soil)] tracking-tight">
              Forecasting & Predictions
            </h1>
            <p className="text-[13px] text-[var(--color-stone)]">
              Extended forecasts, yield predictions & market trends
            </p>
          </div>
          <div className="flex items-center gap-2">
            {['14d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setForecastRange(range as any)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                  forecastRange === range
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-black/[0.03] text-[var(--color-stone)] hover:bg-black/[0.06]'
                }`}
              >
                {range === '14d' ? '14 Days' : '30 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Forecast Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InsightCard
            priority="opportunity"
            title="Optimal Planting Window"
            description="Rainfall expected Mar 4-7, ideal for next planting cycle"
            daysUntil={6}
            impactPercent={15}
            confidence={88}
          />
          <InsightCard
            priority="warning"
            title="Heat Wave Alert"
            description="Extended high temperatures (32-33°C) predicted Mar 11-14"
            daysUntil={13}
            impactPercent={-8}
            confidence={75}
          />
          <InsightCard
            priority="healthy"
            title="Favorable Conditions"
            description="Yield projections remain on track for 4,600 kg/ha target"
            daysUntil={0}
            impactPercent={8}
            confidence={82}
          />
        </div>

        {/* Main Forecast Grid */}
        <div className="grid grid-cols-12 gap-4 lg:gap-5">
          
          {/* Weather Metrics Cards */}
          <div className="col-span-12 lg:col-span-3">
            <div className="space-y-4">
              <WeatherMetricCard
                icon={CloudRain}
                label="Total Rainfall"
                value="67mm"
                subtext="Next 30 days"
                trend="up"
                trendValue="+12mm vs avg"
                color="#3B82F6"
              />
              <WeatherMetricCard
                icon={Thermometer}
                label="Avg Temperature"
                value="29.8°C"
                subtext="Next 14 days"
                trend="up"
                trendValue="+1.2°C"
                color="#F59E0B"
              />
              <WeatherMetricCard
                icon={Sun}
                label="GDD Accumulated"
                value="885"
                subtext="On track"
                trend="stable"
                trendValue="+15 vs optimal"
                color="#FBBF24"
              />
            </div>
          </div>

          {/* Extended Weather Forecast Chart */}
          <div className="col-span-12 lg:col-span-9">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Extended Weather Forecast</h3>
                    <p className="text-[12px] text-[var(--color-stone)]">
                      Temperature, rainfall & soil moisture predictions
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/[0.03]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                      <span className="text-[11px] text-[var(--color-stone)]">Temperature</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/[0.03]">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="text-[11px] text-[var(--color-stone)]">Rainfall</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/[0.03]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-emerald)]" />
                      <span className="text-[11px] text-[var(--color-stone)]">Moisture</span>
                    </div>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={displayData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#E2725B" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="#E2725B" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#059669" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="#059669" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="0" stroke="rgba(0,0,0,0.04)" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        interval={forecastRange === '30d' ? 2 : 0}
                      />
                      <YAxis 
                        yAxisId="left"
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        width={30}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        width={30}
                      />
                      <Tooltip content={<ForecastTooltip />} />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="temp"
                        stroke="#E2725B"
                        fill="url(#tempGradient)"
                        strokeWidth={2}
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="rain"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                        opacity={0.6}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="moisture"
                        stroke="#059669"
                        strokeWidth={2}
                        dot={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-[var(--color-stone)]">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Confidence decreases beyond 14 days</span>
                  </div>
                  <div className="text-[var(--color-stone)]">
                    Updated: Feb 26, 10:42 AM
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Yield Prediction */}
          <div className="col-span-12 lg:col-span-8">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Yield Prediction</h3>
                    <p className="text-[12px] text-[var(--color-stone)]">
                      Projected harvest with confidence intervals
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-[20px] font-semibold text-[var(--color-emerald)]">4,600 kg/ha</p>
                      <p className="text-[11px] text-[var(--color-stone)]">Projected yield</p>
                    </div>
                  </div>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={yieldPredictionData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#059669" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#059669" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="0" stroke="rgba(0,0,0,0.04)" vertical={false} />
                      <XAxis 
                        dataKey="week" 
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        width={35}
                      />
                      <Tooltip content={<YieldTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="upper"
                        stroke="none"
                        fill="url(#yieldGradient)"
                      />
                      <Area
                        type="monotone"
                        dataKey="lower"
                        stroke="none"
                        fill="#fff"
                      />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#059669"
                        strokeWidth={2.5}
                        dot={false}
                        strokeDasharray="5 5"
                      />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#059669"
                        strokeWidth={2.5}
                        dot={{ fill: '#059669', r: 4 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 flex items-center justify-center gap-4 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-0.5 bg-[var(--color-emerald)]" />
                    <span className="text-[var(--color-stone)]">Actual</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-0.5 bg-[var(--color-emerald)] opacity-50" style={{ borderTop: '1px dashed' }} />
                    <span className="text-[var(--color-stone)]">Predicted</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-2 bg-[var(--color-emerald)]/20" />
                    <span className="text-[var(--color-stone)]">Confidence Band (±10%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Growing Degree Days */}
          <div className="col-span-12 lg:col-span-4">
            <Card variant="bento" className="h-full">
              <CardContent className="p-5">
                <div className="mb-4">
                  <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Growing Degree Days</h3>
                  <p className="text-[12px] text-[var(--color-stone)]">Heat unit accumulation</p>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={gddData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gddGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FBBF24" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#FBBF24" stopOpacity={0.05} />
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
                        width={35}
                      />
                      <Tooltip content={<GDDTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="accumulated"
                        stroke="#FBBF24"
                        fill="url(#gddGradient)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="optimal"
                        stroke="#78716C"
                        strokeWidth={1.5}
                        strokeDasharray="3 3"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-[var(--color-stone)]">Accumulated</span>
                    <span className="font-semibold text-[var(--color-soil)]">885 GDD</span>
                  </div>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-[var(--color-stone)]">Expected at harvest</span>
                    <span className="font-semibold text-[var(--color-soil)]">1,350 GDD</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[var(--color-emerald)]/10">
                    <Zap className="w-3.5 h-3.5 text-[var(--color-emerald)]" />
                    <span className="text-[11px] text-[var(--color-stone)]">Tracking above optimal curve</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market Price Forecast */}
          <div className="col-span-12 lg:col-span-6">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Market Price Forecast</h3>
                    <p className="text-[12px] text-[var(--color-stone)]">Projected commodity prices ($/kg)</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[var(--color-emerald)]/10">
                    <TrendingUp className="w-3.5 h-3.5 text-[var(--color-emerald)]" />
                    <span className="text-[12px] font-medium text-[var(--color-emerald)]">+25% trend</span>
                  </div>
                </div>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceForecastData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#059669" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#059669" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="0" stroke="rgba(0,0,0,0.04)" vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        width={30}
                      />
                      <Tooltip content={<PriceTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#059669"
                        fill="url(#priceGradient)"
                        strokeWidth={2.5}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 p-3 rounded-lg bg-black/[0.02]">
                  <p className="text-[12px] text-[var(--color-stone)]">
                    <span className="font-semibold text-[var(--color-soil)]">April-May</span> shows optimal pricing window.
                    Consider strategic harvest timing for maximum revenue.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Season Planning */}
          <div className="col-span-12 lg:col-span-6">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="mb-4">
                  <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Season Planning</h3>
                  <p className="text-[12px] text-[var(--color-stone)]">Key milestones & recommendations</p>
                </div>
                <div className="space-y-3">
                  <SeasonMilestone
                    icon={Sprout}
                    title="Next Planting Window"
                    date="Mar 4-7"
                    status="upcoming"
                    description="Rainfall expected, optimal soil moisture for germination"
                  />
                  <SeasonMilestone
                    icon={Droplets}
                    title="Critical Irrigation Period"
                    date="Mar 11-14"
                    status="attention"
                    description="High temperatures, ensure adequate water supply"
                  />
                  <SeasonMilestone
                    icon={Target}
                    title="Mid-Season Assessment"
                    date="Mar 20"
                    status="scheduled"
                    description="Evaluate crop health and adjust fertilization plan"
                  />
                  <SeasonMilestone
                    icon={Calendar}
                    title="Projected Harvest"
                    date="Apr 28-May 5"
                    status="projected"
                    description="Optimal timing based on GDD accumulation and market prices"
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

// Weather Metric Card Component
interface WeatherMetricCardProps {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string;
  subtext: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
  color: string;
}

function WeatherMetricCard({ icon: Icon, label, value, subtext, trend, trendValue, color }: WeatherMetricCardProps) {
  const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Minus;
  const trendColor = trend === 'up' ? '#E2725B' : trend === 'down' ? '#059669' : '#78716C';
  
  return (
    <Card variant="bento">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <div className="flex items-center gap-1" style={{ color: trendColor }}>
            <TrendIcon className="w-3.5 h-3.5" />
          </div>
        </div>
        <p className="text-[20px] font-semibold text-[var(--color-soil)] mb-0.5">{value}</p>
        <p className="text-[12px] text-[var(--color-stone)] mb-1">{label}</p>
        <p className="text-[11px] text-[var(--color-stone)]">{trendValue}</p>
      </CardContent>
    </Card>
  );
}

// Season Milestone Component
interface SeasonMilestoneProps {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  date: string;
  status: 'upcoming' | 'attention' | 'scheduled' | 'projected';
  description: string;
}

function SeasonMilestone({ icon: Icon, title, date, status, description }: SeasonMilestoneProps) {
  const statusColors = {
    upcoming: { bg: '#059669', text: '#059669' },
    attention: { bg: '#E2725B', text: '#E2725B' },
    scheduled: { bg: '#3B82F6', text: '#3B82F6' },
    projected: { bg: '#FBBF24', text: '#FBBF24' },
  };
  
  const statusColor = statusColors[status];
  
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-white/20">
      <div 
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${statusColor.bg}15` }}
      >
        <Icon className="w-4 h-4" style={{ color: statusColor.text }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-[13px] font-semibold text-[var(--color-soil)]">{title}</h4>
          <span className="text-[11px] font-medium whitespace-nowrap" style={{ color: statusColor.text }}>
            {date}
          </span>
        </div>
        <p className="text-[11px] text-[var(--color-stone)]">{description}</p>
      </div>
    </div>
  );
}

// Custom Tooltips
function ForecastTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-3 min-w-[140px]">
      <p className="font-semibold text-[12px] text-[var(--color-soil)] mb-2">{label}</p>
      <div className="space-y-1">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-[var(--color-stone)] capitalize">{entry.dataKey}</span>
            <span className="text-[11px] font-medium" style={{ color: entry.color }}>
              {entry.dataKey === 'temp' ? `${entry.value}°C` : 
               entry.dataKey === 'rain' ? `${entry.value}mm` : 
               `${entry.value}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function YieldTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-3 min-w-[160px]">
      <p className="font-semibold text-[12px] text-[var(--color-soil)] mb-2">{label}</p>
      <div className="space-y-1">
        {payload.filter((p: any) => p.value !== null).map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-[var(--color-stone)] capitalize">{entry.dataKey}</span>
            <span className="text-[11px] font-medium text-[var(--color-emerald)]">
              {entry.value} kg/ha
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GDDTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-3 min-w-[140px]">
      <p className="font-semibold text-[12px] text-[var(--color-soil)] mb-2">{label}</p>
      <div className="space-y-1">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-[var(--color-stone)] capitalize">{entry.dataKey}</span>
            <span className="text-[11px] font-medium" style={{ color: entry.color }}>
              {entry.value} GDD
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriceTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-3 min-w-[120px]">
      <p className="font-semibold text-[12px] text-[var(--color-soil)] mb-2">{label}</p>
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-[var(--color-stone)]">Price</span>
        <span className="text-[12px] font-semibold text-[var(--color-emerald)]">
          ${payload[0].value}/kg
        </span>
      </div>
    </div>
  );
}
