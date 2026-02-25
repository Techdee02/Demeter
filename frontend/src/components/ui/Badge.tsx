import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-semibold transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-[rgba(45,31,26,0.08)] text-[var(--color-soil)]',
        primary: 'bg-gradient-to-r from-[#E86B45] to-[#F28B68] text-white shadow-[0_2px_8px_rgba(232,107,69,0.3)]',
        secondary: 'bg-gradient-to-r from-[#FFBE42] to-[#FFD06E] text-[var(--color-soil)] shadow-[0_2px_8px_rgba(255,190,66,0.3)]',
        outline: 'border-2 border-[rgba(45,31,26,0.12)] text-[var(--color-soil)] bg-white/70',
        critical: 'bg-gradient-to-r from-[#FEE2E2] to-[#FECACA] text-[#B91C1C] border border-[#FECACA]',
        severe: 'bg-gradient-to-r from-[#FFEDD5] to-[#FED7AA] text-[#C2410C] border border-[#FED7AA]',
        moderate: 'bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] text-[#B45309] border border-[#FDE68A]',
        low: 'bg-gradient-to-r from-[#DBEAFE] to-[#BFDBFE] text-[#1D4ED8] border border-[#BFDBFE]',
        healthy: 'bg-gradient-to-r from-[#D1FAE5] to-[#A7F3D0] text-[#047857] border border-[#A7F3D0]',
      },
      size: {
        sm: 'px-2.5 py-0.5 text-xs',
        md: 'px-3.5 py-1.5 text-sm',
        lg: 'px-5 py-2 text-[15px]',
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
