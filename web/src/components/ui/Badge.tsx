import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LeadStatus, LeadPriority } from '../../types';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: LeadStatus;
  priority?: LeadPriority;
  variant?: 'status' | 'priority' | 'neutral' | 'brand';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  status,
  priority,
  variant,
  size = 'md',
  className,
  ...props
}) => {
  const getStatusStyles = (st: LeadStatus) => {
    switch (st) {
      case 'New':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Cold':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'Warm':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Hot':
        return 'bg-red-100 text-red-800 border-red-200 font-bold';
      case 'Nurturing':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Converted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Lost':
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPriorityStyles = (p: LeadPriority) => {
    switch (p) {
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const badgeClass = status
    ? getStatusStyles(status)
    : priority
    ? getPriorityStyles(priority)
    : variant === 'brand'
    ? 'bg-secondary-50 text-secondary-600 border-secondary-100'
    : 'bg-neutral-100 text-neutral-700 border-neutral-200';

  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center font-semibold rounded-sm border uppercase tracking-wider select-none whitespace-nowrap',
          badgeClass,
          sizeClass,
          className
        )
      )}
      {...props}
    >
      {status ? (
        <>
          <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-80" />
          {status}
        </>
      ) : priority ? (
        <>
          <span className="mr-1 text-[11px] leading-none">●</span>
          {priority}
        </>
      ) : (
        children
      )}
    </span>
  );
};
