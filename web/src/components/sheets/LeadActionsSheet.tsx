import React from 'react';
import { 
  Calendar, 
  RefreshCw, 
  UserCheck, 
  Eye, 
  FileDown, 
  Mail, 
  ChevronRight 
} from 'lucide-react';
import { useSales } from '../../context/SalesContext';
import { BottomSheet } from '../ui/BottomSheet';

export const LeadActionsSheet: React.FC = () => {
  const { 
    activeActionSheetLeadId, 
    closeActionSheet, 
    leads, 
    openStatusSheet, 
    openReassignSheet, 
    openMeetingSheet, 
    navigateTo,
    showToast 
  } = useSales();

  const currentLead = leads.find((l) => l.id === activeActionSheetLeadId);
  const isOpen = Boolean(activeActionSheetLeadId);

  if (!currentLead) return null;

  const actions = [
    {
      id: 'meeting',
      label: 'Schedule Meeting',
      subtitle: 'Add calendar event with Nylas sync',
      icon: <Calendar className="text-primary-600" size={20} />,
      onClick: () => openMeetingSheet(currentLead.id),
    },
    {
      id: 'status',
      label: 'Update Status',
      subtitle: `Currently: ${currentLead.status}`,
      icon: <RefreshCw className="text-sky-600" size={20} />,
      onClick: () => openStatusSheet(currentLead.id),
    },
    {
      id: 'reassign',
      label: 'Reassign Lead',
      subtitle: `${currentLead.assignedTo.length} officer(s) assigned`,
      icon: <UserCheck className="text-purple-600" size={20} />,
      onClick: () => openReassignSheet(currentLead.id),
    },
    {
      id: 'details',
      label: 'View Details & Activity Log',
      subtitle: 'Complete profile and audit trail',
      icon: <Eye className="text-neutral-700" size={20} />,
      onClick: () => {
        closeActionSheet();
        navigateTo('lead-details', { leadId: currentLead.id });
      },
    },
    {
      id: 'export-pdf',
      label: 'Export as PDF',
      subtitle: 'Download formatted lead summary',
      icon: <FileDown className="text-emerald-600" size={20} />,
      onClick: () => {
        closeActionSheet();
        showToast(`PDF for ${currentLead.id} downloaded successfully`);
      },
    },
    {
      id: 'export-email',
      label: 'Export as PDF via Email',
      subtitle: 'Dispatch to logged-in user inbox',
      icon: <Mail className="text-amber-600" size={20} />,
      onClick: () => {
        closeActionSheet();
        showToast(`PDF dispatched to branson.allann@dtbafrica.com`);
      },
    },
  ];

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={closeActionSheet}
      title={`Lead Actions: ${currentLead.id}`}
      subtitle={`${currentLead.customerName} • Status: ${currentLead.status}`}
    >
      <div className="space-y-1.5 py-1">
        {actions.map((act) => (
          <button
            key={act.id}
            onClick={act.onClick}
            className="w-full flex items-center justify-between p-3 rounded-lg border border-neutral-200 hover:border-primary-200 hover:bg-primary-50/40 active:bg-neutral-100 transition-all text-left min-h-[52px]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
                {act.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">{act.label}</p>
                <p className="text-xs text-neutral-500">{act.subtitle}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-neutral-400 shrink-0" />
          </button>
        ))}
      </div>
    </BottomSheet>
  );
};
