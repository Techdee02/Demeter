'use client';

import { cn } from '@/lib/utils';

type LocalRiskCategory = 'critical' | 'severe' | 'moderate' | 'low' | 'healthy';

interface RiskGaugeProps {
  value: number; // 0-100
  label?: string;
  variant?: 'radial' | 'linear';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animate?: boolean;
}

const riskColors: Record<LocalRiskCategory, string> = {
  critical: 'var(--color-critical)',
  severe: 'var(--color-severe)',
  moderate: 'var(--color-moderate)',
  low: 'var(--color-low)',
  healthy: 'var(--color-healthy)',
};

const riskLabels: Record<LocalRiskCategory, string> = {
  critical: 'Critical',
  severe: 'Severe',
  moderate: 'Moderate',
  low: 'Low',
  healthy: 'Healthy',
};

function getRiskCategory(value: number): LocalRiskCategory {
  if (value >= 80) return 'critical';
  if (value >= 60) return 'severe';
  if (value >= 40) return 'moderate';
  if (value >= 20) return 'low';
  return 'healthy';
}

const sizeConfig = {
  sm: { radialSize: 120, strokeWidth: 8, fontSize: 'text-xl' },
  md: { radialSize: 160, strokeWidth: 10, fontSize: 'text-3xl' },
  lg: { radialSize: 200, strokeWidth: 12, fontSize: 'text-4xl' },
};

export function RiskGauge({
  value,
  label,
  variant = 'radial',
  size = 'md',
  showLabel = true,
  animate = true,
}: RiskGaugeProps) {
  const clampedValue = Math.max(0, Math.min(100, value));
  const riskCategory = getRiskCategory(clampedValue);
  const color = riskColors[riskCategory];
  const riskLabel = label || riskLabels[riskCategory];
  const config = sizeConfig[size];

  if (variant === 'linear') {
    return (
      <LinearGauge
        value={clampedValue}
        color={color}
        riskLabel={riskLabel}
        showLabel={showLabel}
        animate={animate}
        size={size}
      />
    );
  }

  return (
    <RadialGauge
      value={clampedValue}
      color={color}
      riskLabel={riskLabel}
      showLabel={showLabel}
      animate={animate}
      config={config}
    />
  );
}

interface RadialGaugeProps {
  value: number;
  color: string;
  riskLabel: string;
  showLabel: boolean;
  animate: boolean;
  config: typeof sizeConfig.md;
}

function RadialGauge({ value, color, riskLabel, showLabel, animate, config }: RadialGaugeProps) {
  const { radialSize, strokeWidth, fontSize } = config;
  const radius = (radialSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Create a semi-circle (180 degrees = half circumference)
  const halfCircumference = circumference / 2;
  const strokeDashoffset = halfCircumference - (value / 100) * halfCircumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: radialSize, height: radialSize / 2 + 20 }}>
        <svg
          width={radialSize}
          height={radialSize / 2 + strokeWidth}
          className="overflow-visible"
        >
          {/* Background arc */}
          <path
            d={describeArc(radialSize / 2, radialSize / 2, radius, 180, 360)}
            fill="none"
            stroke="var(--color-dust)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Value arc */}
          <path
            d={describeArc(radialSize / 2, radialSize / 2, radius, 180, 180 + (value / 100) * 180)}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className={animate ? 'transition-all duration-700 ease-out' : ''}
          />
          {/* Tick marks */}
          {[0, 25, 50, 75, 100].map((tick) => {
            const angle = 180 + (tick / 100) * 180;
            const tickRadius = radius + strokeWidth / 2 + 8;
            const x = radialSize / 2 + tickRadius * Math.cos((angle * Math.PI) / 180);
            const y = radialSize / 2 + tickRadius * Math.sin((angle * Math.PI) / 180);
            return (
              <text
                key={tick}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-[var(--color-bark)] text-[10px]"
              >
                {tick}
              </text>
            );
          })}
        </svg>
        {/* Center value */}
        <div
          className="absolute left-1/2 -translate-x-1/2 text-center"
          style={{ bottom: 0 }}
        >
          <div className={cn(fontSize, 'font-bold')} style={{ color }}>
            {Math.round(value)}%
          </div>
          {showLabel && (
            <div className="text-sm text-[var(--color-bark)] mt-1">{riskLabel}</div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to describe an SVG arc path
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

interface LinearGaugeProps {
  value: number;
  color: string;
  riskLabel: string;
  showLabel: boolean;
  animate: boolean;
  size: 'sm' | 'md' | 'lg';
}

const linearSizeConfig = {
  sm: { height: 'h-2', spacing: 'space-y-1' },
  md: { height: 'h-3', spacing: 'space-y-2' },
  lg: { height: 'h-4', spacing: 'space-y-3' },
};

function LinearGauge({ value, color, riskLabel, showLabel, animate, size }: LinearGaugeProps) {
  const config = linearSizeConfig[size];
  
  return (
    <div className={cn('w-full', config.spacing)}>
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--color-bark)]">{riskLabel}</span>
          <span className="font-medium" style={{ color }}>{Math.round(value)}%</span>
        </div>
      )}
      <div className={cn('w-full bg-[var(--color-dust)] rounded-full overflow-hidden', config.height)}>
        <div
          className={cn(
            'h-full rounded-full',
            animate && 'transition-all duration-700 ease-out'
          )}
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      {/* Gradient legend */}
      <div className="flex justify-between text-[10px] text-[var(--color-bark)]">
        <span>Healthy</span>
        <span>Critical</span>
      </div>
    </div>
  );
}

// Compound component for risk breakdown
interface RiskBreakdownProps {
  items: Array<{
    label: string;
    value: number;
  }>;
  size?: 'sm' | 'md';
}

export function RiskBreakdown({ items, size = 'sm' }: RiskBreakdownProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <RiskGauge
          key={item.label}
          value={item.value}
          label={item.label}
          variant="linear"
          size={size}
          showLabel
        />
      ))}
    </div>
  );
}
