import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Phone, 
  MessageCircle, 
  Calendar, 
  UserCheck, 
  RefreshCw 
} from 'lucide-react';
import { useSales } from '../context/SalesContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SegmentedControl } from '../components/ui/SegmentedControl';

export const LeadDetailsScreen: React.FC = () => {
  const { 
    selectedLead, 
    goBack, 
    activityLogs, 
    openStatusSheet, 
    openReassignSheet, 
    openMeetingSheet,
    navigateTo 
  } = useSales();

  const [activeTab, setActiveTab] = useState<'profile' | 'activity'>('profile');

  if (!selectedLead) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
        <p className="text-neutral-500 mb-4">No lead selected</p>
        <Button onClick={goBack}>Back to Leads</Button>
      </div>
    );
  }

  const leadLogs = activityLogs.filter((act) => act.leadId === selectedLead.id);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-neutral-200 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goBack}
            className="p-2 -ml-2 text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-bold text-base text-neutral-900 leading-tight">Lead Inspection</h1>
            <p className="text-[11px] text-neutral-500">{selectedLead.id}</p>
          </div>
        </div>

        <Button
          variant="secondary-soft"
          size="sm"
          onClick={() => openMeetingSheet(selectedLead.id)}
          icon={<Calendar size={14} />}
        >
          Schedule
        </Button>
      </header>

      {/* Main Body */}
      <div className="p-4 space-y-4 max-w-2xl mx-auto w-full">
        {/* Hero Card */}
        <Card className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                {selectedLead.branch} ({selectedLead.branchCode})
              </span>
              <h2 className="text-lg md:text-xl font-bold text-neutral-900 mt-0.5">
                {selectedLead.customerName}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-extrabold text-neutral-900 font-mono">
                  {selectedLead.currency} {selectedLead.estimatedValue.toLocaleString()}
                </span>
                <span className="text-xs text-neutral-400">•</span>
                <Badge priority={selectedLead.priority} size="sm" />
              </div>
            </div>
            <Badge status={selectedLead.status} />
          </div>

          {/* Direct Communication Quick Dock */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-100">
            <a
              href={`tel:${selectedLead.phone}`}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold border border-emerald-200 min-h-[44px]"
            >
              <Phone size={14} />
              <span>Call</span>
            </a>
            <a
              href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold border border-emerald-200 min-h-[44px]"
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => navigateTo('customer-360', { cif: selectedLead.cif })}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-primary-50 text-primary-700 hover:bg-primary-100 text-xs font-semibold border border-primary-200 min-h-[44px]"
            >
              <UserCheck size={14} />
              <span>Cust 360</span>
            </button>
          </div>
        </Card>

        {/* Segmented View Switcher: Profile vs Activity Log */}
        <div className="bg-white p-1 rounded-lg border border-neutral-200">
          <SegmentedControl
            options={[
              { value: 'profile', label: 'Profile Overview' },
              { value: 'activity', label: 'Activity & Audit Log', badge: leadLogs.length },
            ]}
            value={activeTab}
            onChange={(val) => setActiveTab(val)}
          />
        </div>

        {/* TAB 1: Profile View (Screen 4.4.1) */}
        {activeTab === 'profile' && (
          <div className="space-y-3.5 animate-in fade-in duration-150">
            {/* Customer Information */}
            <Card className="p-4 space-y-2">
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Customer & Contact Information
              </h3>
              <div className="text-xs space-y-1.5 text-neutral-700">
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Full Customer Name:</span>
                  <span className="font-semibold text-neutral-900">{selectedLead.customerName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Phone Number:</span>
                  <a href={`tel:${selectedLead.phone}`} className="font-semibold text-primary-600 hover:underline">
                    {selectedLead.phone}
                  </a>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Physical Address:</span>
                  <span className="font-semibold text-neutral-900 text-right">{selectedLead.location}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-500">Customer Segment:</span>
                  <span className="font-semibold text-neutral-900">{selectedLead.segment}</span>
                </div>
              </div>
            </Card>

            {/* Lead Specifications */}
            <Card className="p-4 space-y-2">
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Lead Specifications
              </h3>
              <div className="text-xs space-y-1.5 text-neutral-700">
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Lead Type:</span>
                  <span className="font-semibold text-neutral-900">New Lead</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Lead Source:</span>
                  <span className="font-semibold text-neutral-900">{selectedLead.leadSource}</span>
                </div>
                {selectedLead.referee && (
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Referee:</span>
                    <span className="font-semibold text-primary-700">{selectedLead.referee}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Branch Routing:</span>
                  <span className="font-semibold text-neutral-900">{selectedLead.branch} ({selectedLead.branchCode})</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-500">Created Date:</span>
                  <span className="font-semibold text-neutral-900">{selectedLead.createdDate}</span>
                </div>
              </div>
            </Card>

            {/* Target Products */}
            <Card className="p-4 space-y-2">
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Target Products ({selectedLead.productInterests.length})
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedLead.productInterests.map((p) => (
                  <span
                    key={p}
                    className="bg-primary-50 text-primary-800 border border-primary-200 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </Card>

            {/* Assignment & Notes */}
            <Card className="p-4 space-y-2">
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Ownership & Notes
              </h3>
              <div className="text-xs space-y-1.5 text-neutral-700">
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Initiator:</span>
                  <span className="font-semibold text-neutral-900">{selectedLead.initiator}</span>
                </div>
                <div className="py-1 border-b border-neutral-100">
                  <span className="text-neutral-500 block mb-1.5">Assigned Officers:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLead.assignedTo.map((officer) => (
                      <span
                        key={officer.id}
                        className="bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded text-xs font-semibold"
                      >
                        👤 {officer.name} <span className="text-[10px] text-neutral-500 font-normal">[{officer.role}]</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="py-1">
                  <span className="text-neutral-500 block mb-1">Internal Notes:</span>
                  <p className="p-2.5 bg-neutral-50 rounded border border-neutral-200 text-neutral-800 text-xs">
                    {selectedLead.notes || 'No remarks recorded.'}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* TAB 2: Activity Log Timeline View (Screen 4.4.2) */}
        {activeTab === 'activity' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
              <span className="font-bold uppercase tracking-wider">Chronological Audit Trail</span>
              <span>{leadLogs.length} Events Logged</span>
            </div>

            <div className="relative pl-6 space-y-4 border-l-2 border-primary-200 ml-3 py-1">
              {leadLogs.map((log) => (
                <div key={log.id} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary-600 ring-4 ring-white border border-primary-300" />

                  {/* Event Card */}
                  <Card className="p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900">
                        {log.summary}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-medium">
                        {log.relativeTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <span>👤 {log.actor}</span>
                      <span>•</span>
                      <span>{log.actorRole}</span>
                      <span>•</span>
                      <span>{log.timestamp}</span>
                    </div>

                    {log.comment && (
                      <p className="text-xs text-neutral-700 bg-neutral-50 p-2 rounded border border-neutral-100 mt-1">
                        "{log.comment}"
                      </p>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Action Dock */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-neutral-200 p-3 flex gap-2.5 max-w-2xl mx-auto safe-bottom">
        <Button
          variant="secondary-soft"
          onClick={() => openStatusSheet(selectedLead.id)}
          className="flex-1"
          icon={<RefreshCw size={16} />}
        >
          Status
        </Button>
        <Button
          variant="secondary"
          onClick={() => openReassignSheet(selectedLead.id)}
          className="flex-1"
          icon={<UserCheck size={16} />}
        >
          Reassign
        </Button>
        <Button
          variant="primary"
          onClick={() => openMeetingSheet(selectedLead.id)}
          className="flex-1"
          icon={<Calendar size={16} />}
        >
          Meeting
        </Button>
      </div>
    </div>
  );
};
