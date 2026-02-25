import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-md hover:shadow-lg',
        secondary: 'bg-[var(--color-gold)] text-[var(--color-soil)] hover:opacity-90 shadow-md',
        outline: 'border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5',
        ghost: 'hover:bg-[var(--color-dust)] hover:text-[var(--color-soil)]',
        danger: 'bg-[var(--color-critical)] text-white hover:opacity-90 shadow-md',
        success: 'bg-[var(--color-healthy)] text-white hover:opacity-90 shadow-md',
      },
      size: {
        sm: 'h-9 px-3 text-sm rounded-md',
        md: 'h-10 px-4 py-2 text-base rounded-lg',
        lg: 'h-12 px-6 text-lg rounded-lg',
        icon: 'h-10 w-10 rounded-lg',
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
