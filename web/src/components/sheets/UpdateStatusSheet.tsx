import React, { useState, useEffect } from 'react';
import { useSales } from '../../context/SalesContext';
import { BottomSheet } from '../ui/BottomSheet';
import { Button } from '../ui/Button';
import { LeadStatus } from '../../types';
import { clsx } from 'clsx';

export const UpdateStatusSheet: React.FC = () => {
  const { activeStatusSheetLeadId, closeStatusSheet, leads, updateLeadStatus } = useSales();
  const currentLead = leads.find((l) => l.id === activeStatusSheetLeadId);

  const [selectedStatus, setSelectedStatus] = useState<LeadStatus>('Warm');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (currentLead) {
      setSelectedStatus(currentLead.status);
      setComment('');
    }
  }, [currentLead]);

  if (!currentLead) return null;

  const statuses: { id: LeadStatus; label: string; activeColor: string }[] = [
    { id: 'New', label: 'New', activeColor: 'bg-amber-100 text-amber-900 border-amber-400' },
    { id: 'Cold', label: 'Cold', activeColor: 'bg-sky-100 text-sky-900 border-sky-400' },
    { id: 'Warm', label: 'Warm', activeColor: 'bg-orange-100 text-orange-900 border-orange-400' },
    { id: 'Hot', label: 'Hot', activeColor: 'bg-red-100 text-red-900 border-red-400 font-bold' },
    { id: 'Nurturing', label: 'Nurturing', activeColor: 'bg-purple-100 text-purple-900 border-purple-400' },
    { id: 'Converted', label: 'Converted', activeColor: 'bg-emerald-100 text-emerald-900 border-emerald-400' },
    { id: 'Lost', label: 'Lost', activeColor: 'bg-slate-200 text-slate-800 border-slate-400' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateLeadStatus(currentLead.id, selectedStatus, comment);
  };

  return (
    <BottomSheet
      isOpen={Boolean(activeStatusSheetLeadId)}
      onClose={closeStatusSheet}
      title="Update Pipeline Status"
      subtitle={`${currentLead.id} • ${currentLead.customerName}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 pb-4">
        <div>
          <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
            Select New Status *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {statuses.map((st) => {
              const isSelected = selectedStatus === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setSelectedStatus(st.id)}
                  className={clsx(
                    'flex items-center justify-between px-3 py-2.5 rounded-md border text-sm font-semibold transition-all min-h-[44px]',
                    isSelected
                      ? st.activeColor + ' ring-2 ring-primary-500/20'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                  )}
                >
                  <span>{st.label}</span>
                  {isSelected && <span className="text-xs font-bold">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-1">
            Transition Comments (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Document rationale, client feedback, or next milestone..."
            rows={3}
            className="w-full p-3 rounded-md border border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20 resize-none"
          />
        </div>

        <div className="pt-2">
          <Button type="submit" fullWidth variant="primary" size="lg">
            Update Status
          </Button>
        </div>
      </form>
    </BottomSheet>
  );
};
