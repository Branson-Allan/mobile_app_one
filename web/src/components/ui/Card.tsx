import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, interactive = false, className, ...props }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-white rounded-lg border border-neutral-200 p-4 shadow-sm transition-all duration-150',
          interactive && 'hover:border-primary-300 hover:shadow-md cursor-pointer active:scale-[0.99]',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
