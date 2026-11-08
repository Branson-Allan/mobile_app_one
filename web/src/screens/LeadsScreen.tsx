import React, { useMemo } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Phone, 
  Building, 
  Briefcase, 
  MoreVertical, 
  Plus, 
  Download,
  X,
  UserCheck
} from 'lucide-react';
import { useSales } from '../context/SalesContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { LeadStatus } from '../types';
import { clsx } from 'clsx';

export const LeadsScreen: React.FC = () => {
  const { 
    leads, 
    searchQuery, 
    setSearchQuery, 
    activeStatusFilter, 
    setActiveStatusFilter,
    filterCriteria,
    sortBy,
    activeFilterCount,
    setIsFilterSheetOpen,
    setIsSortSheetOpen,
    openActionSheet,
    navigateTo,
    selectedLeadId,
    setSelectedLeadId,
    showToast
  } = useSales();

  const statusChips: { id: LeadStatus | 'All'; label: string }[] = [
    { id: 'All', label: `All (${leads.length})` },
    { id: 'Hot', label: `Hot (${leads.filter((l) => l.status === 'Hot').length})` },
    { id: 'Warm', label: `Warm (${leads.filter((l) => l.status === 'Warm').length})` },
    { id: 'Cold', label: `Cold (${leads.filter((l) => l.status === 'Cold').length})` },
    { id: 'Nurturing', label: `Nurturing (${leads.filter((l) => l.status === 'Nurturing').length})` },
    { id: 'Converted', label: `Converted (${leads.filter((l) => l.status === 'Converted').length})` },
    { id: 'Lost', label: `Lost (${leads.filter((l) => l.status === 'Lost').length})` },
  ];

  // Filtering and Sorting logic
  const filteredLeads = useMemo(() => {
    let result = [...leads];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.customerName.toLowerCase().includes(q) ||
          l.id.toLowerCase().includes(q) ||
          l.phone.toLowerCase().includes(q) ||
          l.branch.toLowerCase().includes(q)
      );
    }

    // Status filter chip
    if (activeStatusFilter !== 'All') {
      result = result.filter((l) => l.status === activeStatusFilter);
    }

    // Advanced filter sheet criteria
    if (filterCriteria.statuses.length > 0) {
      result = result.filter((l) => filterCriteria.statuses.includes(l.status));
    }
    if (filterCriteria.segments.length > 0) {
      result = result.filter((l) => filterCriteria.segments.includes(l.segment));
    }
    if (filterCriteria.priorities.length > 0) {
      result = result.filter((l) => filterCriteria.priorities.includes(l.priority));
    }
    if (filterCriteria.branch) {
      result = result.filter((l) => l.branchCode === filterCriteria.branch);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'value-desc':
          return b.estimatedValue - a.estimatedValue;
        case 'value-asc':
          return a.estimatedValue - b.estimatedValue;
        case 'name-asc':
          return a.customerName.localeCompare(b.customerName);
        case 'priority-desc':
          const pOrder = { High: 3, Medium: 2, Low: 1 };
          return pOrder[b.priority] - pOrder[a.priority];
        case 'date-asc':
          return a.id.localeCompare(b.id);
        case 'date-desc':
        default:
          return b.id.localeCompare(a.id);
      }
    });

    return result;
  }, [leads, searchQuery, activeStatusFilter, filterCriteria, sortBy]);

  const selectedLead = leads.find((l) => l.id === selectedLeadId) || filteredLeads[0];

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full max-w-7xl mx-auto pb-20 md:pb-6">
      {/* LEFT PANE: Search, Filters & Leads List Cards (Spans 100% on mobile, 45% on desktop split-pane) */}
      <div className="flex-1 md:max-w-md lg:max-w-lg flex flex-col border-r border-neutral-200 bg-neutral-50/50">
        {/* Sticky Header Toolbar */}
        <div className="sticky top-0 z-20 bg-white border-b border-neutral-200 p-3 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-neutral-900">All Leads</h1>
              <span className="text-xs bg-neutral-100 text-neutral-700 font-semibold px-2 py-0.5 rounded-full">
                {filteredLeads.length} of {leads.length}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => showToast('Exporting leads summary as CSV...')}
                className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Export Leads"
                aria-label="Export"
              >
                <Download size={18} />
              </button>

              <button
                onClick={() => setIsFilterSheetOpen(true)}
                className={clsx(
                  'relative p-2 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors',
                  activeFilterCount > 0
                    ? 'bg-primary-50 text-primary-700 border border-primary-200'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                )}
                title="Filter Leads"
                aria-label="Filter"
              >
                <Filter size={18} />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Field */}
          <div className="relative flex items-center">
            <Search size={18} className="absolute left-3 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer, ID, phone, branch..."
              className="w-full min-h-[44px] pl-10 pr-9 py-2 rounded-md border border-neutral-300 text-xs md:text-sm text-neutral-900 bg-white placeholder:text-neutral-400 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 p-1 text-neutral-400 hover:text-neutral-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Horizontal Status Chips Strip */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-3 px-3">
            {statusChips.map((chip) => {
              const isSelected = activeStatusFilter === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setActiveStatusFilter(chip.id)}
                  className={clsx(
                    'px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors min-h-[32px] border',
                    isSelected
                      ? 'bg-primary-600 text-white border-primary-600 shadow-xs'
                      : 'bg-neutral-100 text-neutral-600 border-neutral-200/80 hover:bg-neutral-200/70'
                  )}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* Sort bar */}
          <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
            <button
              onClick={() => setIsSortSheetOpen(true)}
              className="flex items-center gap-1 font-semibold text-neutral-700 hover:text-primary-600 py-1"
            >
              <SlidersHorizontal size={14} />
              <span>Sort: {sortBy.replace('-', ' ').toUpperCase()}</span>
            </button>
            <span>Showing {filteredLeads.length} leads</span>
          </div>
        </div>

        {/* Lead Cards List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-3">
                <Search size={22} />
              </div>
              <h3 className="text-sm font-bold text-neutral-800">No matching leads</h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                No lead records found matching your active search or filters.
              </p>
            </div>
          ) : (
            filteredLeads.map((lead) => {
              const isSelectedOnSplitPane = selectedLeadId === lead.id;
              return (
                <Card
                  key={lead.id}
                  interactive
                  onClick={() => {
                    setSelectedLeadId(lead.id);
                    if (window.innerWidth < 768) {
                      navigateTo('lead-details', { leadId: lead.id });
                    }
                  }}
                  className={clsx(
                    'p-3.5 space-y-2.5 transition-all',
                    isSelectedOnSplitPane && 'md:border-primary-500 md:ring-2 md:ring-primary-500/20 md:bg-primary-50/20'
                  )}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 tracking-tight leading-snug">
                        {lead.customerName}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-neutral-500">
                        <span>{lead.id}</span>
                        <span>•</span>
                        <Badge priority={lead.priority} size="sm" />
                      </div>
                    </div>
                    <Badge status={lead.status} />
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs py-1 border-y border-neutral-100">
                    <div className="flex items-center gap-1.5 text-neutral-600 truncate">
                      <Phone size={13} className="text-neutral-400 shrink-0" />
                      <a
                        href={`tel:${lead.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="hover:underline text-primary-700 font-medium truncate"
                      >
                        {lead.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-600 truncate">
                      <Building size={13} className="text-neutral-400 shrink-0" />
                      <span className="truncate">{lead.branch}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-600">
                      <Briefcase size={13} className="text-neutral-400 shrink-0" />
                      <span>{lead.segment}</span>
                    </div>
                    <div className="flex items-center justify-end font-bold text-neutral-900">
                      <span>{lead.currency} {lead.estimatedValue.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between text-xs pt-0.5">
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <span className="bg-neutral-100 text-neutral-800 font-medium text-[11px] px-2 py-0.5 rounded truncate max-w-[130px]">
                        {lead.productInterests[0] || 'General Lead'}
                      </span>
                      <span className="text-neutral-400 text-[11px]">
                        👤 {lead.assignedTo[0]?.name.split(' ')[0] || 'Unassigned'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openActionSheet(lead.id);
                      }}
                      className="p-2 -mr-1 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label="Lead Actions"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Extended FAB on Mobile */}
        <div className="sm:hidden fixed bottom-20 right-4 z-30">
          <Button
            variant="fab"
            icon={<Plus size={22} />}
            onClick={() => navigateTo('lead-capture')}
          >
            New Lead
          </Button>
        </div>
      </div>

      {/* RIGHT PANE: Tablet & Desktop Split-Pane Master-Detail Preview (Hidden on mobile <768px) */}
      <div className="hidden md:flex flex-1 flex-col bg-white overflow-y-auto p-6">
        {selectedLead ? (
          <div className="space-y-6 max-w-2xl">
            {/* Header Card */}
            <div className="border-b border-neutral-200 pb-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    {selectedLead.id} • {selectedLead.branch} ({selectedLead.branchCode})
                  </span>
                  <h2 className="text-2xl font-bold text-neutral-900 mt-1">
                    {selectedLead.customerName}
                  </h2>
                </div>
                <Badge status={selectedLead.status} />
              </div>

              {/* Omnichannel Action Dock */}
              <div className="flex gap-2.5 mt-4">
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md text-xs font-semibold border border-emerald-200"
                >
                  <Phone size={14} />
                  <span>Call {selectedLead.phone}</span>
                </a>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigateTo('customer-360', { cif: selectedLead.cif })}
                  icon={<UserCheck size={14} />}
                >
                  View Customer 360
                </Button>
              </div>
            </div>

            {/* Structured Specifications */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 space-y-2">
                <h4 className="text-xs font-bold text-neutral-500 uppercase">Commercial Value</h4>
                <p className="text-xl font-bold text-neutral-900">
                  {selectedLead.currency} {selectedLead.estimatedValue.toLocaleString()}
                </p>
                <div className="text-xs text-neutral-600">
                  <p>Segment: <span className="font-semibold text-neutral-900">{selectedLead.segment}</span></p>
                  <p>Priority: <span className="font-semibold text-neutral-900">{selectedLead.priority}</span></p>
                </div>
              </Card>

              <Card className="p-4 space-y-2">
                <h4 className="text-xs font-bold text-neutral-500 uppercase">Source & Initiation</h4>
                <p className="text-sm font-bold text-neutral-900">{selectedLead.leadSource}</p>
                <div className="text-xs text-neutral-600">
                  <p>Initiator: <span className="font-semibold text-neutral-900">{selectedLead.initiator}</span></p>
                  {selectedLead.referee && (
                    <p>Referee: <span className="font-semibold text-neutral-900">{selectedLead.referee}</span></p>
                  )}
                </div>
              </Card>
            </div>

            {/* Assigned Team */}
            <Card className="p-4">
              <h4 className="text-xs font-bold text-neutral-500 uppercase mb-2">Assigned Officers</h4>
              <div className="flex flex-wrap gap-2">
                {selectedLead.assignedTo.map((officer) => (
                  <span
                    key={officer.id}
                    className="inline-flex items-center gap-1.5 bg-neutral-100 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-800 border border-neutral-200"
                  >
                    <span>👤 {officer.name}</span>
                    <span className="text-[10px] text-neutral-500 font-normal">[{officer.role}]</span>
                  </span>
                ))}
              </div>
            </Card>

            {/* Quick Actions Bar */}
            <div className="flex gap-3 pt-4 border-t border-neutral-200">
              <Button
                variant="secondary"
                onClick={() => openActionSheet(selectedLead.id)}
                className="flex-1"
              >
                Lead Actions ▾
              </Button>
              <Button
                variant="primary"
                onClick={() => navigateTo('lead-details', { leadId: selectedLead.id })}
                className="flex-1"
              >
                Open Full Details
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
