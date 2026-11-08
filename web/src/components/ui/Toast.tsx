import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 flex justify-center pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="bg-neutral-900 text-white text-sm font-medium px-4 py-3 rounded-md shadow-xl flex items-center gap-2 max-w-md w-full border border-neutral-700 pointer-events-auto">
        <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
        <span className="flex-1">{message}</span>
      </div>
    </div>
  );
};
