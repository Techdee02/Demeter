'use client';

import { AlertCircle, AlertTriangle, Info, CheckCircle, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

type AlertSeverity = 'critical' | 'warning' | 'info' | 'success';

interface RecommendationBannerProps {
  severity: AlertSeverity;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
  metadata?: {
    daysUntil?: number;
    impactPercent?: number;
    confidence?: number;
  };
}

const severityConfig: Record<AlertSeverity, {
  icon: React.ComponentType<{ className?: string }>;
  borderColor: string;
  bgColor: string;
  iconColor: string;
  badgeVariant: 'critical' | 'severe' | 'moderate' | 'healthy';
}> = {
  critical: {
    icon: AlertCircle,
    borderColor: 'var(--color-critical)',
    bgColor: 'rgba(184, 53, 43, 0.05)',
    iconColor: 'var(--color-critical)',
    badgeVariant: 'critical',
  },
  warning: {
    icon: AlertTriangle,
    borderColor: 'var(--color-moderate)',
    bgColor: 'rgba(212, 168, 83, 0.05)',
    iconColor: 'var(--color-moderate)',
    badgeVariant: 'moderate',
  },
  info: {
    icon: Info,
    borderColor: 'var(--color-water)',
    bgColor: 'rgba(61, 126, 166, 0.05)',
    iconColor: 'var(--color-water)',
    badgeVariant: 'moderate',
  },
  success: {
    icon: CheckCircle,
    borderColor: 'var(--color-healthy)',
    bgColor: 'rgba(74, 124, 89, 0.05)',
    iconColor: 'var(--color-healthy)',
    badgeVariant: 'healthy',
  },
};

export function RecommendationBanner({
  severity,
  title,
  description,
  action,
  onDismiss,
  metadata,
}: RecommendationBannerProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <div
      className="relative rounded-lg border-l-4 p-4 shadow-md transition-all"
      style={{
        borderLeftColor: config.borderColor,
        backgroundColor: config.bgColor,
      }}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0">
          <Icon className="h-5 w-5" style={{ color: config.iconColor }} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-[var(--color-soil)]">{title}</h4>
            {metadata?.daysUntil !== undefined && (
              <Badge variant={config.badgeVariant} size="sm">
                {metadata.daysUntil === 0 ? 'Today' : `In ${metadata.daysUntil} days`}
              </Badge>
            )}
          </div>
          <p className="text-sm text-[var(--color-bark)]">{description}</p>
          
          {/* Metadata row */}
          {(metadata?.impactPercent !== undefined || metadata?.confidence !== undefined) && (
            <div className="flex items-center gap-4 mt-2 text-xs text-[var(--color-bark)]">
              {metadata.impactPercent !== undefined && (
                <span>
                  Expected impact: <span className="font-medium">{metadata.impactPercent > 0 ? '+' : ''}{metadata.impactPercent}% yield</span>
                </span>
              )}
              {metadata.confidence !== undefined && (
                <span>
                  Confidence: <span className="font-medium">{metadata.confidence}%</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {action && (
            <Button variant="outline" size="sm" onClick={action.onClick}>
              {action.label}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="p-1 rounded-md text-[var(--color-bark)] hover:text-[var(--color-soil)] hover:bg-[var(--color-dust)] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// List of multiple recommendations
interface RecommendationListProps {
  recommendations: Array<{
    id: string;
    severity: AlertSeverity;
    title: string;
    description: string;
    daysUntil?: number;
    impactPercent?: number;
  }>;
  onAction?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export function RecommendationList({ recommendations, onAction, onDismiss }: RecommendationListProps) {
  if (recommendations.length === 0) {
    return (
      <RecommendationBanner
        severity="success"
        title="All Clear"
        description="No immediate actions needed. Your farm is in good condition."
      />
    );
  }

  return (
    <div className="space-y-3">
      {recommendations.map((rec) => (
        <RecommendationBanner
          key={rec.id}
          severity={rec.severity}
          title={rec.title}
          description={rec.description}
          metadata={{
            daysUntil: rec.daysUntil,
            impactPercent: rec.impactPercent,
          }}
          action={onAction ? { label: 'View Details', onClick: () => onAction(rec.id) } : undefined}
          onDismiss={onDismiss ? () => onDismiss(rec.id) : undefined}
        />
      ))}
    </div>
  );
}

// Sample recommendations for demo
export const sampleRecommendations = [
  {
    id: '1',
    severity: 'warning' as AlertSeverity,
    title: 'Moderate water stress predicted in 3 days',
    description: 'Consider irrigation on Day 75. Soil moisture projected to drop below optimal range.',
    daysUntil: 3,
    impactPercent: 5,
  },
  {
    id: '2',
    severity: 'info' as AlertSeverity,
    title: 'Optimal fertilizer application window',
    description: 'Weather conditions favorable for NPK application in the next 48 hours.',
    daysUntil: 1,
    impactPercent: 8,
  },
];
