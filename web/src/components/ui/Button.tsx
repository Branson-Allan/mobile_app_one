import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'secondary-soft' | 'destructive' | 'ghost' | 'fab';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  loading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-150 active:scale-[0.98] select-none disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-sm focus-visible:ring-primary-500 rounded-md',
    secondary: 'bg-white hover:bg-neutral-50 active:bg-neutral-100 text-primary-600 border border-primary-600 focus-visible:ring-primary-500 rounded-md',
    'secondary-soft': 'bg-primary-50 hover:bg-primary-100 active:bg-primary-200 text-primary-700 border border-primary-200 focus-visible:ring-primary-500 rounded-md',
    destructive: 'bg-feedback-error-bg hover:bg-red-100 text-feedback-error border border-red-200 focus-visible:ring-red-500 rounded-md',
    ghost: 'bg-transparent hover:bg-neutral-100 active:bg-neutral-200 text-neutral-700 focus-visible:ring-neutral-400 rounded-md',
    fab: 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white rounded-full shadow-xl focus-visible:ring-primary-500',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 min-h-[40px]',
    md: 'text-sm px-4 py-2.5 min-h-[48px]',
    lg: 'text-base px-6 py-3 min-h-[52px]',
  };

  return (
    <button
      className={twMerge(
        clsx(
          baseStyles,
          variants[variant],
          variant !== 'fab' && sizes[size],
          variant === 'fab' && 'h-14 px-5 text-sm font-bold shadow-lg',
          fullWidth && 'w-full',
          className
        )
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : icon && iconPosition === 'left' ? (
        <span className="mr-2 inline-flex items-center">{icon}</span>
      ) : null}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2 inline-flex items-center">{icon}</span>
      )}
    </button>
  );
};
