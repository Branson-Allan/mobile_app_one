import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
  Lead, 
  LeadStatus, 
  Customer360Profile, 
  ActivityEvent, 
  ScheduledMeeting, 
  Assignee 
} from '../types';
import { 
  INITIAL_LEADS, 
  MOCK_CUSTOMER_360, 
  INITIAL_ACTIVITY_LOGS 
} from '../data/mockData';

export type ScreenType = 
  | 'dashboard' 
  | 'leads' 
  | 'lead-capture' 
  | 'customer-360' 
  | 'lead-details' 
  | 'settings' 
  | 'login';

export type BottomNavTab = 'dashboard' | 'leads' | 'engagements' | 'more';

export type SortOption = 
  | 'date-desc' 
  | 'date-asc' 
  | 'value-desc' 
  | 'value-asc' 
  | 'priority-desc' 
  | 'name-asc';

export interface FilterCriteria {
  statuses: LeadStatus[];
  segments: string[];
  priorities: string[];
  branch: string;
  assignee: string;
}

interface SalesContextType {
  // Navigation & View State
  activeTab: BottomNavTab;
  setActiveTab: (tab: BottomNavTab) => void;
  activeScreen: ScreenType;
  navigateTo: (screen: ScreenType, params?: { leadId?: string; cif?: string }) => void;
  goBack: () => void;
  isAppDrawerOpen: boolean;
  setIsAppDrawerOpen: (open: boolean) => void;

  // Selected Entity
  selectedLeadId: string | null;
  selectedLead: Lead | undefined;
  setSelectedLeadId: (id: string | null) => void;
  customer360: Customer360Profile;

  // Data & Mutators
  leads: Lead[];
  activityLogs: ActivityEvent[];
  meetings: ScheduledMeeting[];
  updateLeadStatus: (leadId: string, newStatus: LeadStatus, comment?: string) => void;
  reassignLead: (leadId: string, newAssignees: Assignee[], comment?: string) => void;
  createLead: (leadData: Omit<Lead, 'id' | 'createdDate'>) => string;
  scheduleMeeting: (meeting: Omit<ScheduledMeeting, 'id'>) => void;
  toggleAccountProduct: (accountNumber: string, productId: string) => void;

  // Search, Filter & Sort
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeStatusFilter: LeadStatus | 'All';
  setActiveStatusFilter: (status: LeadStatus | 'All') => void;
  filterCriteria: FilterCriteria;
  setFilterCriteria: React.Dispatch<React.SetStateAction<FilterCriteria>>;
  resetFilters: () => void;
  activeFilterCount: number;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;

  // Overlays / Sheets
  activeActionSheetLeadId: string | null;
  openActionSheet: (leadId: string) => void;
  closeActionSheet: () => void;

  activeStatusSheetLeadId: string | null;
  openStatusSheet: (leadId: string) => void;
  closeStatusSheet: () => void;

  activeReassignSheetLeadId: string | null;
  openReassignSheet: (leadId: string) => void;
  closeReassignSheet: () => void;

  activeMeetingSheetLeadId: string | null;
  openMeetingSheet: (leadId: string) => void;
  closeMeetingSheet: () => void;

  isFilterSheetOpen: boolean;
  setIsFilterSheetOpen: (open: boolean) => void;

  isSortSheetOpen: boolean;
  setIsSortSheetOpen: (open: boolean) => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const SalesContext = createContext<SalesContextType | undefined>(undefined);

export const SalesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<BottomNavTab>('dashboard');
  const [activeScreen, setActiveScreen] = useState<ScreenType>('dashboard');
  const [screenStack, setScreenStack] = useState<ScreenType[]>(['dashboard']);
  const [isAppDrawerOpen, setIsAppDrawerOpen] = useState(false);

  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [customer360, setCustomer360] = useState<Customer360Profile>(MOCK_CUSTOMER_360);
  const [activityLogs, setActivityLogs] = useState<ActivityEvent[]>(INITIAL_ACTIVITY_LOGS);
  const [meetings, setMeetings] = useState<ScheduledMeeting[]>([]);

  const [selectedLeadId, setSelectedLeadId] = useState<string | null>('L-2026-000184');

  // Search, Filter & Sort
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatusFilter, setActiveStatusFilter] = useState<LeadStatus | 'All'>('All');
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    statuses: [],
    segments: [],
    priorities: [],
    branch: '',
    assignee: '',
  });
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');

  // Overlays
  const [activeActionSheetLeadId, setActiveActionSheetLeadId] = useState<string | null>(null);
  const [activeStatusSheetLeadId, setActiveStatusSheetLeadId] = useState<string | null>(null);
  const [activeReassignSheetLeadId, setActiveReassignSheetLeadId] = useState<string | null>(null);
  const [activeMeetingSheetLeadId, setActiveMeetingSheetLeadId] = useState<string | null>(null);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const selectedLead = useMemo(() => {
    return leads.find((l) => l.id === selectedLeadId);
  }, [leads, selectedLeadId]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeStatusFilter !== 'All') count++;
    if (filterCriteria.statuses.length > 0) count += filterCriteria.statuses.length;
    if (filterCriteria.segments.length > 0) count += filterCriteria.segments.length;
    if (filterCriteria.priorities.length > 0) count += filterCriteria.priorities.length;
    if (filterCriteria.branch) count++;
    if (filterCriteria.assignee) count++;
    return count;
  }, [activeStatusFilter, filterCriteria]);

  const resetFilters = () => {
    setActiveStatusFilter('All');
    setFilterCriteria({
      statuses: [],
      segments: [],
      priorities: [],
      branch: '',
      assignee: '',
    });
    setSearchQuery('');
    showToast('Filters reset to default');
  };

  const navigateTo = (screen: ScreenType, params?: { leadId?: string; cif?: string }) => {
    if (params?.leadId) setSelectedLeadId(params.leadId);
    setScreenStack((prev) => [...prev, screen]);
    setActiveScreen(screen);
    setIsAppDrawerOpen(false);
  };

  const goBack = () => {
    if (screenStack.length > 1) {
      const newStack = [...screenStack];
      newStack.pop();
      const prevScreen = newStack[newStack.length - 1];
      setScreenStack(newStack);
      setActiveScreen(prevScreen);
    } else {
      setActiveScreen('dashboard');
      setActiveTab('dashboard');
    }
  };

  const updateLeadStatus = (leadId: string, newStatus: LeadStatus, comment?: string) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === leadId) {
          const oldStatus = l.status;
          const newEvent: ActivityEvent = {
            id: `act-${Date.now()}`,
            leadId,
            timestamp: new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }),
            relativeTime: 'Just now',
            actor: 'Branson Allann',
            actorRole: 'Relationship Manager',
            type: 'STATUS_CHANGED',
            summary: `Status updated from ${oldStatus} to ${newStatus}`,
            comment: comment || 'Status updated via mobile quick action.'
          };
          setActivityLogs((logs) => [newEvent, ...logs]);
          return { ...l, status: newStatus };
        }
        return l;
      })
    );
    setActiveStatusSheetLeadId(null);
    showToast(`Lead status updated to ${newStatus}`);
  };

  const reassignLead = (leadId: string, newAssignees: Assignee[], comment?: string) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === leadId) {
          const names = newAssignees.map((a) => a.name).join(', ');
          const newEvent: ActivityEvent = {
            id: `act-${Date.now()}`,
            leadId,
            timestamp: new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }),
            relativeTime: 'Just now',
            actor: 'Branson Allann',
            actorRole: 'Relationship Manager',
            type: 'REASSIGNED',
            summary: `Reassigned to: ${names}`,
            comment: comment || 'Collaborative team updated.'
          };
          setActivityLogs((logs) => [newEvent, ...logs]);
          return { ...l, assignedTo: newAssignees };
        }
        return l;
      })
    );
    setActiveReassignSheetLeadId(null);
    showToast('Lead assignees updated');
  };

  const createLead = (leadData: Omit<Lead, 'id' | 'createdDate'>): string => {
    const newId = `L-2026-${String(leads.length + 185).padStart(6, '0')}`;
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const newLead: Lead = {
      ...leadData,
      id: newId,
      createdDate: today,
    };
    setLeads((prev) => [newLead, ...prev]);

    const newEvent: ActivityEvent = {
      id: `act-${Date.now()}`,
      leadId: newId,
      timestamp: new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }),
      relativeTime: 'Just now',
      actor: leadData.initiator || 'Branson Allann',
      actorRole: 'Relationship Manager',
      type: 'CREATED',
      summary: `Lead created from ${leadData.leadSource} source`,
      comment: leadData.notes || 'New lead registered in system.'
    };
    setActivityLogs((logs) => [newEvent, ...logs]);

    showToast(`Lead ${newId} created successfully`);
    return newId;
  };

  const scheduleMeeting = (meetingData: Omit<ScheduledMeeting, 'id'>) => {
    const newMeeting: ScheduledMeeting = {
      ...meetingData,
      id: `meet-${Date.now()}`,
    };
    setMeetings((prev) => [newMeeting, ...prev]);

    const newEvent: ActivityEvent = {
      id: `act-${Date.now()}`,
      leadId: meetingData.leadId,
      timestamp: new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }),
      relativeTime: 'Just now',
      actor: meetingData.staffAssigned || 'Branson Allann',
      actorRole: 'Relationship Manager',
      type: 'MEETING_SCHEDULED',
      summary: `Meeting scheduled: ${meetingData.purpose}`,
      comment: `Location: ${meetingData.location}. Synced with ${meetingData.calendarName}.`
    };
    setActivityLogs((logs) => [newEvent, ...logs]);

    setActiveMeetingSheetLeadId(null);
    showToast('Meeting scheduled & synced with Nylas Calendar');
  };

  const toggleAccountProduct = (accountNumber: string, productId: string) => {
    setCustomer360((prev) => ({
      ...prev,
      accounts: prev.accounts.map((acc) => {
        if (acc.accountNumber === accountNumber) {
          return {
            ...acc,
            activeProducts: acc.activeProducts.map((p) =>
              p.id === productId ? { ...p, enrolled: !p.enrolled } : p
            )
          };
        }
        return acc;
      })
    }));
  };

  return (
    <SalesContext.Provider
      value={{
        activeTab,
        setActiveTab: (tab) => {
          setActiveTab(tab);
          if (tab === 'dashboard') setActiveScreen('dashboard');
          if (tab === 'leads') setActiveScreen('leads');
          if (tab === 'more') setActiveScreen('settings');
        },
        activeScreen,
        navigateTo,
        goBack,
        isAppDrawerOpen,
        setIsAppDrawerOpen,

        selectedLeadId,
        selectedLead,
        setSelectedLeadId,
        customer360,

        leads,
        activityLogs,
        meetings,
        updateLeadStatus,
        reassignLead,
        createLead,
        scheduleMeeting,
        toggleAccountProduct,

        searchQuery,
        setSearchQuery,
        activeStatusFilter,
        setActiveStatusFilter,
        filterCriteria,
        setFilterCriteria,
        resetFilters,
        activeFilterCount,
        sortBy,
        setSortBy,

        activeActionSheetLeadId,
        openActionSheet: (id) => setActiveActionSheetLeadId(id),
        closeActionSheet: () => setActiveActionSheetLeadId(null),

        activeStatusSheetLeadId,
        openStatusSheet: (id) => {
          setActiveActionSheetLeadId(null);
          setActiveStatusSheetLeadId(id);
        },
        closeStatusSheet: () => setActiveStatusSheetLeadId(null),

        activeReassignSheetLeadId,
        openReassignSheet: (id) => {
          setActiveActionSheetLeadId(null);
          setActiveReassignSheetLeadId(id);
        },
        closeReassignSheet: () => setActiveReassignSheetLeadId(null),

        activeMeetingSheetLeadId,
        openMeetingSheet: (id) => {
          setActiveActionSheetLeadId(null);
          setActiveMeetingSheetLeadId(id);
        },
        closeMeetingSheet: () => setActiveMeetingSheetLeadId(null),

        isFilterSheetOpen,
        setIsFilterSheetOpen,

        isSortSheetOpen,
        setIsSortSheetOpen,

        toastMessage,
        showToast,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export const useSales = () => {
  const context = useContext(SalesContext);
  if (!context) throw new Error('useSales must be used within a SalesProvider');
  return context;
};
