import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
  badge?: number | string;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  fullWidth?: boolean;
  className?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  fullWidth = true,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      className={twMerge(
        clsx(
          'inline-flex bg-neutral-100 p-1 rounded-md border border-neutral-200/80 min-h-[44px]',
          fullWidth && 'w-full',
          className
        )
      )}
    >
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={twMerge(
              clsx(
                'flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs md:text-sm font-semibold rounded-[6px] transition-all min-h-[36px]',
                isSelected
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
              )
            )}
          >
            {opt.icon && <span className="inline-flex items-center">{opt.icon}</span>}
            <span>{opt.label}</span>
            {opt.badge !== undefined && (
              <span
                className={clsx(
                  'px-1.5 py-0.2 rounded-full text-[10px] font-bold leading-tight',
                  isSelected ? 'bg-primary-100 text-primary-800' : 'bg-neutral-200 text-neutral-700'
                )}
              >
                {opt.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
