'use client';

import { AlertCircle, AlertTriangle, Lightbulb, CheckCircle, ArrowRight, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type InsightPriority = 'critical' | 'warning' | 'opportunity' | 'healthy';

interface InsightCardProps {
  priority: InsightPriority;
  title: string;
  description: string;
  daysUntil?: number;
  impactPercent?: number;
  confidence?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const priorityConfig: Record<InsightPriority, {
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  glowColor: string;
  label: string;
}> = {
  critical: {
    icon: AlertCircle,
    accentColor: '#E2725B',
    glowColor: 'rgba(226, 114, 91, 0.2)',
    label: 'Critical',
  },
  warning: {
    icon: AlertTriangle,
    accentColor: '#FBBF24',
    glowColor: 'rgba(251, 191, 36, 0.15)',
    label: 'Warning',
  },
  opportunity: {
    icon: Lightbulb,
    accentColor: '#059669',
    glowColor: 'rgba(5, 150, 105, 0.15)',
    label: 'Opportunity',
  },
  healthy: {
    icon: CheckCircle,
    accentColor: '#86EFAC',
    glowColor: 'rgba(134, 239, 172, 0.15)',
    label: 'Healthy',
  },
};

export function InsightCard({
  priority,
  title,
  description,
  daysUntil,
  impactPercent,
  confidence,
  action,
  className,
}: InsightCardProps) {
  const config = priorityConfig[priority];
  const Icon = config.icon;
  
  const urgencyText = daysUntil !== undefined
    ? daysUntil === 0 
      ? 'Action needed today' 
      : daysUntil === 1 
        ? 'Critical tomorrow' 
        : `Critical in ${daysUntil} days`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-md border border-white/20',
        'shadow-[0_8px_32px_rgba(0,0,0,0.06)]',
        'transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]',
        className
      )}
      style={{
        boxShadow: `0 8px 32px ${config.glowColor}, 0 4px 20px rgba(0,0,0,0.04)`,
      }}
    >
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${config.accentColor} 0%, transparent 60%)`,
        }}
      />
      
      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            {/* Icon with accent background */}
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ 
                backgroundColor: `${config.accentColor}15`,
                color: config.accentColor,
              }}
            >
              <Icon className="w-[18px] h-[18px]" />
            </div>
            
            <div>
              {/* Priority label */}
              <span 
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: config.accentColor }}
              >
                {config.label}
              </span>
              <h4 className="text-[15px] font-semibold text-[var(--color-soil)] tracking-tight leading-tight">
                {title}
              </h4>
            </div>
          </div>
          
          {/* Urgency badge */}
          {urgencyText && (
            <div 
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium"
              style={{ 
                backgroundColor: `${config.accentColor}12`,
                color: config.accentColor,
              }}
            >
              <Clock className="w-3 h-3" />
              {urgencyText}
            </div>
          )}
        </div>
        
        {/* Description */}
        <p className="text-[13px] text-[var(--color-stone)] leading-relaxed mb-4">
          {description}
        </p>
        
        {/* Metrics row */}
        {(impactPercent !== undefined || confidence !== undefined) && (
          <div className="flex items-center gap-5 mb-4">
            {impactPercent !== undefined && (
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[var(--color-emerald)]" />
                <span className="text-[12px] text-[var(--color-stone)]">
                  Impact: <span className="font-semibold text-[var(--color-emerald)]">
                    {impactPercent > 0 ? '+' : ''}{impactPercent}%
                  </span>
                </span>
              </div>
            )}
            {confidence !== undefined && (
              <div className="text-[12px] text-[var(--color-stone)]">
                <span className="font-semibold text-[var(--color-soil)]">{confidence}%</span> Certainty
              </div>
            )}
          </div>
        )}
        
        {/* Action button */}
        {action && (
          <button
            onClick={action.onClick}
            className="group flex items-center gap-1.5 text-[13px] font-medium transition-colors"
            style={{ color: config.accentColor }}
          >
            {action.label}
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

// Compact insight for lists
interface InsightItemProps {
  priority: InsightPriority;
  title: string;
  daysUntil?: number;
  onClick?: () => void;
}

export function InsightItem({ priority, title, daysUntil, onClick }: InsightItemProps) {
  const config = priorityConfig[priority];
  const Icon = config.icon;
  
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 
               transition-all duration-200 hover:bg-white/70 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-left"
    >
      <div 
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${config.accentColor}12`, color: config.accentColor }}
      >
        <Icon className="w-4 h-4" />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-[var(--color-soil)] truncate">{title}</p>
        {daysUntil !== undefined && (
          <p className="text-[11px] text-[var(--color-stone)]">
            {daysUntil === 0 ? 'Today' : `In ${daysUntil} day${daysUntil > 1 ? 's' : ''}`}
          </p>
        )}
      </div>
      
      <ArrowRight className="w-4 h-4 text-[var(--color-stone)] flex-shrink-0" />
    </button>
  );
}

// Insight list wrapper
interface InsightListProps {
  insights: Array<{
    id: string;
    priority: InsightPriority;
    title: string;
    description: string;
    daysUntil?: number;
    impactPercent?: number;
    confidence?: number;
  }>;
  onSelect?: (id: string) => void;
  maxItems?: number;
}

export function InsightList({ insights, onSelect, maxItems = 3 }: InsightListProps) {
  const displayedInsights = insights.slice(0, maxItems);
  
  if (insights.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[var(--color-sage)]/20 flex items-center justify-center mb-3">
          <CheckCircle className="w-6 h-6 text-[var(--color-emerald)]" />
        </div>
        <p className="text-[14px] font-medium text-[var(--color-soil)]">All Clear</p>
        <p className="text-[12px] text-[var(--color-stone)]">No immediate actions needed</p>
      </div>
    );
  }

  // Show the most critical insight as a card, rest as items
  const [primary, ...rest] = displayedInsights;
  
  return (
    <div className="space-y-3">
      <InsightCard
        priority={primary.priority}
        title={primary.title}
        description={primary.description}
        daysUntil={primary.daysUntil}
        impactPercent={primary.impactPercent}
        confidence={primary.confidence}
        action={onSelect ? { label: 'View Details', onClick: () => onSelect(primary.id) } : undefined}
      />
      
      {rest.length > 0 && (
        <div className="space-y-2">
          {rest.map((insight) => (
            <InsightItem
              key={insight.id}
              priority={insight.priority}
              title={insight.title}
              daysUntil={insight.daysUntil}
              onClick={() => onSelect?.(insight.id)}
            />
          ))}
        </div>
      )}
      
      {insights.length > maxItems && (
        <p className="text-[12px] text-center text-[var(--color-stone)]">
          +{insights.length - maxItems} more insights
        </p>
      )}
    </div>
  );
}
