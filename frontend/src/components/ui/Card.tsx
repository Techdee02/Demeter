import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-2xl transition-all duration-300 ease-out',
  {
    variants: {
      variant: {
        default: 'bg-white/70 backdrop-blur-md border border-white/20 shadow-[0_1px_3px_rgba(0,0,0,0.03),0_4px_20px_rgba(0,0,0,0.04)]',
        elevated: 'bg-white/85 backdrop-blur-lg border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.06)]',
        glass: 'bg-white/60 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04)]',
        solid: 'bg-white border border-[rgba(28,25,23,0.06)] shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,0,0,0.03)]',
        bento: 'bg-white/75 backdrop-blur-md border border-white/25 shadow-[var(--shadow-bento)]',
        accent: 'bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md border border-[rgba(226,114,91,0.1)] shadow-[0_8px_30px_rgba(226,114,91,0.06)]',
        ghost: 'bg-transparent border-none shadow-none',
      },
      padding: {
        none: 'p-0',
        xs: 'p-3',
        sm: 'p-4',
        md: 'p-5',
        lg: 'p-6',
        xl: 'p-8',
      },
      hover: {
        none: '',
        lift: 'hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 cursor-pointer',
        glow: 'hover:shadow-[0_0_40px_rgba(226,114,91,0.12)] hover:border-[rgba(226,114,91,0.2)] cursor-pointer',
        scale: 'hover:scale-[1.015] cursor-pointer',
        subtle: 'hover:bg-white/80 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] cursor-pointer',
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

// Card subcomponents with premium typography
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-[15px] font-semibold tracking-tight text-[var(--color-soil)]', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-[13px] text-[var(--color-stone)] leading-relaxed', className)}
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
