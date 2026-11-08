import React from 'react';
import { useSales } from '../../context/SalesContext';
import { BottomSheet } from '../ui/BottomSheet';
import { Button } from '../ui/Button';
import { LeadStatus } from '../../types';
import { AVAILABLE_BRANCHES } from '../../data/mockData';
import { clsx } from 'clsx';

export const FilterSheet: React.FC = () => {
  const { 
    isFilterSheetOpen, 
    setIsFilterSheetOpen, 
    filterCriteria, 
    setFilterCriteria, 
    resetFilters,
    leads 
  } = useSales();

  const statuses: LeadStatus[] = ['New', 'Cold', 'Warm', 'Hot', 'Nurturing', 'Converted', 'Lost'];
  const segments = ['Retail', 'Corporate', 'Business'];
  const priorities = ['High', 'Medium', 'Low'];

  const toggleStatus = (st: LeadStatus) => {
    setFilterCriteria((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(st)
        ? prev.statuses.filter((s) => s !== st)
        : [...prev.statuses, st],
    }));
  };

  const toggleSegment = (seg: string) => {
    setFilterCriteria((prev) => ({
      ...prev,
      segments: prev.segments.includes(seg)
        ? prev.segments.filter((s) => s !== seg)
        : [...prev.segments, seg],
    }));
  };

  const togglePriority = (pr: string) => {
    setFilterCriteria((prev) => ({
      ...prev,
      priorities: prev.priorities.includes(pr)
        ? prev.priorities.filter((p) => p !== pr)
        : [...prev.priorities, pr],
    }));
  };

  // Calculate live matching count
  const matchingCount = leads.filter((l) => {
    if (filterCriteria.statuses.length > 0 && !filterCriteria.statuses.includes(l.status)) return false;
    if (filterCriteria.segments.length > 0 && !filterCriteria.segments.includes(l.segment)) return false;
    if (filterCriteria.priorities.length > 0 && !filterCriteria.priorities.includes(l.priority)) return false;
    if (filterCriteria.branch && l.branchCode !== filterCriteria.branch) return false;
    return true;
  }).length;

  return (
    <BottomSheet
      isOpen={isFilterSheetOpen}
      onClose={() => setIsFilterSheetOpen(false)}
      title="Filter Leads"
      subtitle="Refine pipeline records by multiple criteria"
      height="85"
    >
      <div className="space-y-5 pb-6">
        {/* Status Multi-select Chips */}
        <div>
          <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
            Lead Status
          </label>
          <div className="flex flex-wrap gap-2">
            {statuses.map((st) => {
              const isSelected = filterCriteria.statuses.includes(st);
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => toggleStatus(st)}
                  className={clsx(
                    'px-3 py-1.5 rounded-full text-xs font-semibold border transition-all min-h-[36px]',
                    isSelected
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200'
                  )}
                >
                  {st}
                </button>
              );
            })}
          </div>
        </div>

        {/* Customer Segment */}
        <div>
          <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
            Customer Segment
          </label>
          <div className="flex gap-2">
            {segments.map((seg) => {
              const isSelected = filterCriteria.segments.includes(seg);
              return (
                <button
                  key={seg}
                  type="button"
                  onClick={() => toggleSegment(seg)}
                  className={clsx(
                    'flex-1 py-2 px-3 rounded-md text-xs font-semibold border text-center transition-all min-h-[40px]',
                    isSelected
                      ? 'bg-primary-100 text-primary-900 border-primary-300 font-bold'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                  )}
                >
                  {seg}
                </button>
              );
            })}
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
            Priority Level
          </label>
          <div className="flex gap-2">
            {priorities.map((pr) => {
              const isSelected = filterCriteria.priorities.includes(pr);
              return (
                <button
                  key={pr}
                  type="button"
                  onClick={() => togglePriority(pr)}
                  className={clsx(
                    'flex-1 py-2 px-3 rounded-md text-xs font-semibold border text-center transition-all min-h-[40px]',
                    isSelected
                      ? 'bg-primary-100 text-primary-900 border-primary-300 font-bold'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                  )}
                >
                  {pr}
                </button>
              );
            })}
          </div>
        </div>

        {/* Branch Selector */}
        <div>
          <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
            Branch Location
          </label>
          <select
            value={filterCriteria.branch}
            onChange={(e) => setFilterCriteria((prev) => ({ ...prev, branch: e.target.value }))}
            className="w-full min-h-[48px] px-3 py-2 rounded-md border border-neutral-300 text-sm text-neutral-900 bg-white focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="">All Branches</option>
            {AVAILABLE_BRANCHES.map((b) => (
              <option key={b.code} value={b.code}>
                {b.name} ({b.code})
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex gap-3 border-t border-neutral-200">
          <Button
            type="button"
            variant="secondary"
            onClick={resetFilters}
            className="w-1/3"
          >
            Reset
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => setIsFilterSheetOpen(false)}
            className="flex-1"
          >
            Apply ({matchingCount} Leads)
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
};
