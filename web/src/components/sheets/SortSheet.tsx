import React from 'react';
import { Check } from 'lucide-react';
import { useSales, SortOption } from '../../context/SalesContext';
import { BottomSheet } from '../ui/BottomSheet';
import { clsx } from 'clsx';

export const SortSheet: React.FC = () => {
  const { isSortSheetOpen, setIsSortSheetOpen, sortBy, setSortBy } = useSales();

  const options: { id: SortOption; label: string }[] = [
    { id: 'date-desc', label: 'Date Created: Newest First (Default)' },
    { id: 'date-asc', label: 'Date Created: Oldest First' },
    { id: 'value-desc', label: 'Estimated Value: High to Low' },
    { id: 'value-asc', label: 'Estimated Value: Low to High' },
    { id: 'priority-desc', label: 'Priority: High to Low' },
    { id: 'name-asc', label: 'Customer Name: A to Z' },
  ];

  return (
    <BottomSheet
      isOpen={isSortSheetOpen}
      onClose={() => setIsSortSheetOpen(false)}
      title="Sort Leads"
      subtitle="Select sorting order for lead records"
    >
      <div className="space-y-1.5 py-1">
        {options.map((opt) => {
          const isSelected = sortBy === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => {
                setSortBy(opt.id);
                setIsSortSheetOpen(false);
              }}
              className={clsx(
                'w-full flex items-center justify-between p-3.5 rounded-lg border text-sm font-semibold transition-all min-h-[48px] text-left',
                isSelected
                  ? 'bg-primary-50 border-primary-300 text-primary-900 font-bold'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              )}
            >
              <span>{opt.label}</span>
              {isSelected && <Check size={18} className="text-primary-600 shrink-0" />}
            </button>
          );
        })}
      </div>
    </BottomSheet>
  );
};
