import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[var(--color-dust)] text-[var(--color-soil)]',
        primary: 'bg-[var(--color-primary)] text-white',
        secondary: 'bg-[var(--color-gold)] text-[var(--color-soil)]',
        outline: 'border-2 border-[var(--color-border)] text-[var(--color-soil)]',
        critical: 'bg-[var(--color-critical)] text-white',
        severe: 'bg-[var(--color-severe)] text-white',
        moderate: 'bg-[var(--color-moderate)] text-[var(--color-soil)]',
        low: 'bg-[var(--color-low)] text-white',
        healthy: 'bg-[var(--color-healthy)] text-white',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(badgeVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
