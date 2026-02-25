import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-2xl transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-white/90 backdrop-blur-sm border border-[rgba(45,31,26,0.06)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(45,31,26,0.05)]',
        elevated: 'bg-white shadow-[0_8px_30px_rgba(45,31,26,0.1),0_4px_16px_rgba(45,31,26,0.06)] border border-white',
        outline: 'border-2 border-[rgba(45,31,26,0.1)] bg-white/70 backdrop-blur-sm',
        ghost: 'bg-transparent',
        glass: 'bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(45,31,26,0.08)]',
        gradient: 'bg-gradient-to-br from-white via-white to-[#FFF8F5] border border-[rgba(232,107,69,0.1)] shadow-[0_8px_30px_rgba(232,107,69,0.08)]',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      hover: {
        none: '',
        lift: 'hover:shadow-[0_12px_40px_rgba(45,31,26,0.12)] hover:-translate-y-1 cursor-pointer',
        glow: 'hover:shadow-[0_0_40px_rgba(232,107,69,0.2)] hover:border-[rgba(232,107,69,0.25)] cursor-pointer',
        scale: 'hover:scale-[1.02] cursor-pointer',
        bright: 'hover:bg-white hover:shadow-[0_12px_40px_rgba(45,31,26,0.12)] cursor-pointer',
      }
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      hover: 'none',
    },
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hover, ...props }, ref) => {
    return (
      <div
        className={cn(cardVariants({ variant, padding, hover, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// Card subcomponents
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-display text-xl font-semibold text-[var(--color-soil)]', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-[var(--color-bark)]', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
