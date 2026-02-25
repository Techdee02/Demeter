'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

interface ForecastDataPoint {
  day: string;
  date: string;
  riskScore: number;
  soilMoisture: number;
  temperature: number;
  rainfall: number;
}

interface ForecastChartProps {
  data?: ForecastDataPoint[];
  showTemperature?: boolean;
  showMoisture?: boolean;
  showRainfall?: boolean;
}

// Sample data for 14-day forecast
const defaultData: ForecastDataPoint[] = [
  { day: 'Today', date: 'Feb 25', riskScore: 15, soilMoisture: 42, temperature: 28, rainfall: 0 },
  { day: 'D+1', date: 'Feb 26', riskScore: 18, soilMoisture: 40, temperature: 29, rainfall: 0 },
  { day: 'D+2', date: 'Feb 27', riskScore: 22, soilMoisture: 38, temperature: 30, rainfall: 0 },
  { day: 'D+3', date: 'Feb 28', riskScore: 35, soilMoisture: 34, temperature: 31, rainfall: 0 },
  { day: 'D+4', date: 'Mar 1', riskScore: 42, soilMoisture: 30, temperature: 32, rainfall: 0 },
  { day: 'D+5', date: 'Mar 2', riskScore: 38, soilMoisture: 32, temperature: 30, rainfall: 5 },
  { day: 'D+6', date: 'Mar 3', riskScore: 25, soilMoisture: 38, temperature: 28, rainfall: 12 },
  { day: 'D+7', date: 'Mar 4', riskScore: 18, soilMoisture: 45, temperature: 27, rainfall: 8 },
  { day: 'D+8', date: 'Mar 5', riskScore: 15, soilMoisture: 48, temperature: 26, rainfall: 2 },
  { day: 'D+9', date: 'Mar 6', riskScore: 12, soilMoisture: 46, temperature: 27, rainfall: 0 },
  { day: 'D+10', date: 'Mar 7', riskScore: 14, soilMoisture: 44, temperature: 28, rainfall: 0 },
  { day: 'D+11', date: 'Mar 8', riskScore: 18, soilMoisture: 41, temperature: 29, rainfall: 0 },
  { day: 'D+12', date: 'Mar 9', riskScore: 22, soilMoisture: 38, temperature: 30, rainfall: 0 },
  { day: 'D+13', date: 'Mar 10', riskScore: 20, soilMoisture: 36, temperature: 29, rainfall: 3 },
];

const COLORS = {
  risk: '#C65D3B',      // Terracotta
  moisture: '#3D7EA6',  // Water blue
  temperature: '#D97B3D', // Warm orange
  rainfall: '#6B7B8C',  // Cloud gray
  grid: '#E8DFD0',      // Dust
  text: '#8B7355',      // Bark
};

export function ForecastChart({ 
  data = defaultData,
  showTemperature = true,
  showMoisture = true,
  showRainfall = true,
}: ForecastChartProps) {
  return (
    <Card variant="elevated">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>14-Day Stress Forecast</CardTitle>
            <CardDescription>Predicted risk levels and weather conditions</CardDescription>
          </div>
          <div className="flex gap-3 text-xs">
            <LegendItem color={COLORS.risk} label="Risk Score" />
            {showMoisture && <LegendItem color={COLORS.moisture} label="Moisture" />}
            {showTemperature && <LegendItem color={COLORS.temperature} label="Temperature" />}
            {showRainfall && <LegendItem color={COLORS.rainfall} label="Rainfall" />}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.risk} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.risk} stopOpacity={0} />
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
              
              <XAxis 
                dataKey="day" 
                tick={{ fill: COLORS.text, fontSize: 11 }}
                axisLine={{ stroke: COLORS.grid }}
                tickLine={false}
              />
              
              <YAxis 
                yAxisId="risk"
                domain={[0, 100]}
                tick={{ fill: COLORS.text, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              
              <YAxis 
                yAxisId="temp"
                orientation="right"
                domain={[20, 40]}
                hide={!showTemperature}
                tick={{ fill: COLORS.text, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}°`}
              />

              <Tooltip content={<CustomTooltip />} />

              {/* Risk area fill */}
              <Area
                yAxisId="risk"
                type="monotone"
                dataKey="riskScore"
                stroke={COLORS.risk}
                fill="url(#riskGradient)"
                strokeWidth={2}
              />

              {/* Soil moisture line */}
              {showMoisture && (
                <Line
                  yAxisId="risk"
                  type="monotone"
                  dataKey="soilMoisture"
                  stroke={COLORS.moisture}
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                />
              )}

              {/* Temperature line */}
              {showTemperature && (
                <Line
                  yAxisId="temp"
                  type="monotone"
                  dataKey="temperature"
                  stroke={COLORS.temperature}
                  strokeWidth={2}
                  dot={false}
                />
              )}

              {/* Rainfall bars would go here if we used BarChart */}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Critical threshold marker */}
        <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <ThresholdIndicator level="Low" range="0-20%" color="#4A7C59" />
              <ThresholdIndicator level="Moderate" range="20-40%" color="#D4A853" />
              <ThresholdIndicator level="High" range="40-60%" color="#D97B3D" />
              <ThresholdIndicator level="Critical" range="60%+" color="#B8352B" />
            </div>
            <span className="text-[var(--color-bark)]">
              Peak risk: Day 4 (42%)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className="w-3 h-0.5 rounded" style={{ backgroundColor: color }} />
      <span className="text-[var(--color-bark)]">{label}</span>
    </div>
  );
}

function ThresholdIndicator({ level, range, color }: { level: string; range: string; color: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[var(--color-bark)]">{level}: {range}</span>
    </div>
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const data = payload[0]?.payload as ForecastDataPoint;
  
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-lg shadow-lg p-3">
      <p className="font-medium text-sm text-[var(--color-soil)]">{label} ({data?.date})</p>
      <div className="mt-2 space-y-1 text-xs">
        <div className="flex justify-between gap-4">
          <span className="text-[var(--color-bark)]">Risk Score</span>
          <span style={{ color: COLORS.risk }} className="font-medium">{data?.riskScore}%</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[var(--color-bark)]">Soil Moisture</span>
          <span style={{ color: COLORS.moisture }} className="font-medium">{data?.soilMoisture}%</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[var(--color-bark)]">Temperature</span>
          <span style={{ color: COLORS.temperature }} className="font-medium">{data?.temperature}°C</span>
        </div>
        {data?.rainfall > 0 && (
          <div className="flex justify-between gap-4">
            <span className="text-[var(--color-bark)]">Rainfall</span>
            <span style={{ color: COLORS.rainfall }} className="font-medium">{data?.rainfall}mm</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Compact sparkline version for cards
interface SparklineChartProps {
  data: number[];
  color?: string;
  height?: number;
}

export function SparklineChart({ data, color = COLORS.risk, height = 40 }: SparklineChartProps) {
  const chartData = data.map((value, index) => ({ value, index }));
  
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
