import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  height?: 'auto' | 'half' | '85' | 'full';
  showHandle?: boolean;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  height = 'auto',
  showHandle = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const heightClasses = {
    auto: 'max-h-[90vh]',
    half: 'h-[50vh] max-h-[500px]',
    '85': 'h-[85vh]',
    full: 'h-[95vh]',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Sheet Surface */}
      <div
        className={twMerge(
          clsx(
            'relative w-full max-w-lg bg-white rounded-t-2xl shadow-xl z-10 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-250 ease-out safe-bottom',
            heightClasses[height]
          )
        )}
      >
        {/* Drag Handle */}
        {showHandle && (
          <div className="w-full flex justify-center pt-2.5 pb-1">
            <div className="w-10 h-1 rounded-full bg-neutral-300" />
          </div>
        )}

        {/* Header */}
        {(title || subtitle) && (
          <div className="flex items-start justify-between px-4 py-3 border-b border-neutral-200">
            <div>
              {title && <h3 className="text-base font-bold text-neutral-900">{title}</h3>}
              {subtitle && <p className="text-xs text-neutral-500 mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-1 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
};
