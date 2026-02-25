import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-[#E86B45] to-[#F28B68] text-white hover:from-[#D45A35] hover:to-[#E86B45] shadow-[0_4px_14px_rgba(232,107,69,0.35)] hover:shadow-[0_6px_20px_rgba(232,107,69,0.45)] active:scale-[0.98] hover:-translate-y-0.5',
        secondary: 'bg-gradient-to-r from-[#FFBE42] to-[#FFD06E] text-[var(--color-soil)] hover:from-[#F5B030] hover:to-[#FFBE42] shadow-[0_4px_14px_rgba(255,190,66,0.35)] hover:-translate-y-0.5',
        outline: 'border-2 border-[rgba(45,31,26,0.12)] bg-white/80 backdrop-blur-sm hover:border-[var(--color-primary)] hover:bg-[rgba(232,107,69,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]',
        ghost: 'hover:bg-[rgba(45,31,26,0.06)] hover:text-[var(--color-soil)]',
        danger: 'bg-gradient-to-r from-[#EF4444] to-[#F87171] text-white hover:opacity-90 shadow-[0_4px_14px_rgba(239,68,68,0.35)]',
        success: 'bg-gradient-to-r from-[#34D399] to-[#6EE7A0] text-white hover:opacity-90 shadow-[0_4px_14px_rgba(52,211,153,0.35)]',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-xl',
        md: 'h-11 px-6 py-2 text-[15px] rounded-xl',
        lg: 'h-12 px-8 text-base rounded-2xl',
        icon: 'h-10 w-10 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
