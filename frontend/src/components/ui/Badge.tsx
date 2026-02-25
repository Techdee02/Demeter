import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-[rgba(45,27,14,0.06)] text-[var(--color-soil)]',
        primary: 'bg-gradient-to-r from-[var(--color-primary)] to-[#D4725C] text-white shadow-[0_1px_4px_rgba(198,93,59,0.2)]',
        secondary: 'bg-gradient-to-r from-[var(--color-gold)] to-[#F5C84C] text-[var(--color-soil)]',
        outline: 'border-[1.5px] border-[rgba(45,27,14,0.12)] text-[var(--color-soil)] bg-white/50',
        critical: 'bg-[rgba(220,38,38,0.12)] text-[#C62828] font-semibold',
        severe: 'bg-[rgba(255,87,34,0.12)] text-[#D84315] font-semibold',
        moderate: 'bg-[rgba(255,152,0,0.12)] text-[#E65100] font-semibold',
        low: 'bg-[rgba(33,150,243,0.12)] text-[#1565C0] font-semibold',
        healthy: 'bg-[rgba(76,175,80,0.12)] text-[#2E7D32] font-semibold',
      },
      size: {
        sm: 'px-2.5 py-0.5 text-xs',
        md: 'px-3.5 py-1 text-sm',
        lg: 'px-4 py-1.5 text-[15px]',
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
