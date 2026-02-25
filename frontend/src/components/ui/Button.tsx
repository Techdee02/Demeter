import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-[var(--color-primary)] to-[#D4725C] text-white hover:from-[#B85240] hover:to-[#C4614D] shadow-[0_2px_8px_rgba(198,93,59,0.25)] hover:shadow-[0_4px_16px_rgba(198,93,59,0.35)] active:scale-[0.98]',
        secondary: 'bg-gradient-to-r from-[var(--color-gold)] to-[#F5C84C] text-[var(--color-soil)] hover:opacity-90 shadow-[0_2px_8px_rgba(235,183,52,0.25)]',
        outline: 'border-[1.5px] border-[rgba(45,27,14,0.12)] bg-white hover:border-[var(--color-primary)] hover:bg-[rgba(198,93,59,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]',
        ghost: 'hover:bg-[rgba(45,27,14,0.04)] hover:text-[var(--color-soil)]',
        danger: 'bg-gradient-to-r from-[var(--color-critical)] to-[#E64A4A] text-white hover:opacity-90 shadow-[0_2px_8px_rgba(220,38,38,0.25)]',
        success: 'bg-gradient-to-r from-[var(--color-healthy)] to-[#5CAB7D] text-white hover:opacity-90 shadow-[0_2px_8px_rgba(76,175,80,0.25)]',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-lg',
        md: 'h-10 px-5 py-2 text-[15px] rounded-xl',
        lg: 'h-12 px-7 text-base rounded-xl',
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
