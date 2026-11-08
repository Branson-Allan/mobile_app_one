import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, helperText, errorMessage, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const generatedId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const hasError = Boolean(errorMessage);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={generatedId} className="text-sm font-semibold text-neutral-700 flex items-center">
            {label}
            {required && <span className="text-feedback-error ml-1 font-bold">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-neutral-400 pointer-events-none inline-flex items-center">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={generatedId}
            className={twMerge(
              clsx(
                'w-full min-h-[48px] px-3.5 py-2.5 rounded-md border text-sm text-neutral-900 bg-white placeholder:text-neutral-400 transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-offset-1',
                leftIcon && 'pl-10',
                rightIcon && 'pr-10',
                hasError
                  ? 'border-feedback-error bg-feedback-error-bg/30 text-neutral-900 focus:ring-feedback-error/40'
                  : 'border-neutral-300 hover:border-neutral-400 focus:border-primary-600 focus:ring-primary-500/20',
                props.disabled && 'bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed',
                className
              )
            )}
            {...props}
          />
          {rightIcon && !hasError && (
            <span className="absolute right-3 text-neutral-400 inline-flex items-center">
              {rightIcon}
            </span>
          )}
          {hasError && (
            <span className="absolute right-3 text-feedback-error inline-flex items-center pointer-events-none">
              <AlertCircle size={18} />
            </span>
          )}
        </div>
        {hasError ? (
          <p className="text-xs font-medium text-feedback-error flex items-center gap-1 mt-0.5">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p className="text-xs text-neutral-500 mt-0.5">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
