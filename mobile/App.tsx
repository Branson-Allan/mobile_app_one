import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { ActionSheet } from './src/components/ActionSheet';
import { BottomNavBar } from './src/components/BottomNavBar';
import { FilterBottomSheet, FilterState } from './src/components/FilterBottomSheet';
import { TelephonyModal } from './src/components/TelephonyModal';
import { TopAppBar } from './src/components/TopAppBar';
import { INITIAL_LEADS } from './src/data/mockData';
import { CreateLeadScreen } from './src/screens/CreateLeadScreen';
import { Customer360Screen } from './src/screens/Customer360Screen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { LeadDetailsScreen } from './src/screens/LeadDetailsScreen';
import { LeadsScreen } from './src/screens/LeadsScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { MoreScreen } from './src/screens/MoreScreen';
import { ReassignLeadModal } from './src/screens/ReassignLeadModal';
import { ScheduleMeetingModal } from './src/screens/ScheduleMeetingModal';
import { UpdateStatusModal } from './src/screens/UpdateStatusModal';
import { Colors } from './src/theme/colors';
import { Lead, LeadStatus, MainTab } from './src/types';

export default function App() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Navigation State
  const [activeTab, setActiveTab] = useState<MainTab>('dashboard');
  const [currentScreen, setCurrentScreen] = useState<'main' | 'createLead' | 'leadDetails'>('main');
  const [createLeadInitialType, setCreateLeadInitialType] = useState<'new' | 'existing'>('new');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [activeCustomerCif, setActiveCustomerCif] = useState<string>('837649');

  // Leads Data State
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);

  // Filter State
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    status: 'All',
    segment: 'All',
    priority: 'All',
    branch: 'All',
    assignedEmployee: 'All',
  });

  // Action & Management Modals State
  const [actionSheetLead, setActionSheetLead] = useState<Lead | null>(null);
  const [scheduleModalLead, setScheduleModalLead] = useState<Lead | null>(null);
  const [updateStatusModalLead, setUpdateStatusModalLead] = useState<Lead | null>(null);
  const [reassignModalLead, setReassignModalLead] = useState<Lead | null>(null);
  const [telephonyModalVisible, setTelephonyModalVisible] = useState(false);
  const [presenceState, setPresenceState] = useState<'online' | 'busy' | 'offline'>('online');
  const [unreadNotifications, setUnreadNotifications] = useState(8);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.keyword) count++;
    if (filters.status !== 'All') count++;
    if (filters.segment !== 'All') count++;
    if (filters.priority !== 'All') count++;
    if (filters.branch !== 'All') count++;
    if (filters.assignedEmployee && filters.assignedEmployee !== 'All') count++;
    return count;
  }, [filters]);

  // Leads filtered by FilterBottomSheet criteria
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (filters.keyword) {
        const q = filters.keyword.toLowerCase();
        const matches =
          l.customer.toLowerCase().includes(q) ||
          l.id.toLowerCase().includes(q) ||
          l.phone.includes(q);
        if (!matches) return false;
      }
      if (filters.status !== 'All' && l.status !== filters.status) return false;
      if (filters.segment !== 'All' && l.segment !== filters.segment) return false;
      if (filters.priority !== 'All' && l.priority !== filters.priority) return false;
      if (filters.branch !== 'All' && l.branch !== filters.branch) return false;
      if (
        filters.assignedEmployee &&
        filters.assignedEmployee !== 'All' &&
        !l.assignedTo?.includes(filters.assignedEmployee)
      ) {
        return false;
      }
      return true;
    });
  }, [leads, filters]);

  // Lead Action Handlers
  const handleCreateLead = (leadData: Partial<Lead>) => {
    const nextNum = leads.length + 185;
    const newLead: Lead = {
      id: `L-2026-000${nextNum}`,
      customer: leadData.customer || 'New Customer',
      phone: leadData.phone || '254700000000',
      location: leadData.location || 'Nairobi',
      segment: leadData.segment || 'Retail',
      productInterest: leadData.productInterest || 'Savings account',
      priority: leadData.priority || 'Medium',
      potentialValue: leadData.potentialValue || 50000,
      potentialCurrency: leadData.potentialCurrency || 'KES',
      assignedTo: leadData.assignedTo || ['Branson Allann'],
      status: leadData.status || 'New',
      leadSource: leadData.leadSource || 'Referral',
      referee: leadData.referee,
      createdDate: '19-Sep-2026',
      notes: leadData.notes || '',
      branch: leadData.branch || 'Courtyard Branch',
      initiator: leadData.initiator || 'Branson Allann',
      cif: leadData.cif,
    };

    setLeads([newLead, ...leads]);
    setCurrentScreen('main');
    setActiveTab('leads');
    Alert.alert('Lead Created', `Lead ${newLead.id} for ${newLead.customer} successfully registered.`);
  };

  const handleUpdateStatus = (leadId: string, newStatus: LeadStatus, comments: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
    Alert.alert('Status Updated', `Lead ${leadId} status updated to ${newStatus}.`);
  };

  const handleReassignLead = (leadId: string, assignees: string[], notes: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, assignedTo: assignees } : l))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, assignedTo: assignees });
    }
    Alert.alert('Reassigned', `Lead ${leadId} assigned to: ${assignees.join(', ')}.`);
  };

  const handleNavigateToLeadsWithStatus = (statusFilter?: string) => {
    if (statusFilter && statusFilter !== 'All') {
      setFilters((f) => ({ ...f, status: statusFilter as LeadStatus }));
    }
    setActiveTab('leads');
    setCurrentScreen('main');
  };

  const handleOpenCustomer360FromAnywhere = (cif: string) => {
    setActiveCustomerCif(cif);
    setActiveTab('customers');
    setCurrentScreen('main');
  };

  // If user is logged out, show LoginScreen (M-5.0)
  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Persistent 56px Top App Bar */}
      <TopAppBar
        presenceState={presenceState}
        unreadCount={unreadNotifications}
        onPressPresence={() => setTelephonyModalVisible(true)}
        onPressNotifications={() => {
          Alert.alert(
            'Notifications (8 unread)',
            '• Collins Sakwa: Salary Account SLA breached (2h ago)\n• New Referral from Courtyard Branch\n• Nylas calendar event synced: 06:45 PM'
          );
          setUnreadNotifications(0);
        }}
        onPressProfile={() => {
          setActiveTab('more');
          setCurrentScreen('main');
        }}
      />

      {/* Main View Router */}
      <View style={styles.mainContainer}>
        {currentScreen === 'createLead' ? (
          <CreateLeadScreen
            initialType={createLeadInitialType}
            onBack={() => setCurrentScreen('main')}
            onSubmit={handleCreateLead}
            onOpenCustomer360={handleOpenCustomer360FromAnywhere}
          />
        ) : currentScreen === 'leadDetails' && selectedLead ? (
          <LeadDetailsScreen
            lead={selectedLead}
            onBack={() => setCurrentScreen('main')}
            onOpenActions={() => setActionSheetLead(selectedLead)}
            onOpenCustomer360={
              selectedLead.cif
                ? () => handleOpenCustomer360FromAnywhere(selectedLead.cif!)
                : undefined
            }
            onUpdateStatus={() => setUpdateStatusModalLead(selectedLead)}
            onScheduleMeeting={() => setScheduleModalLead(selectedLead)}
            onReassign={() => setReassignModalLead(selectedLead)}
          />
        ) : (
          // Tab Content
          <>
            {activeTab === 'dashboard' && (
              <DashboardScreen
                leads={leads}
                onNavigateToLeads={handleNavigateToLeadsWithStatus}
                onOpenFilter={() => setFilterModalVisible(true)}
              />
            )}

            {activeTab === 'leads' && (
              <LeadsScreen
                leads={filteredLeads}
                initialStatusFilter={filters.status}
                activeFilterCount={activeFilterCount}
                onSelectLead={(l) => {
                  setSelectedLead(l);
                  setCurrentScreen('leadDetails');
                }}
                onOpenActions={(l) => setActionSheetLead(l)}
                onOpenCustomer360={handleOpenCustomer360FromAnywhere}
                onCreateLead={() => {
                  setCreateLeadInitialType('new');
                  setCurrentScreen('createLead');
                }}
                onOpenFilter={() => setFilterModalVisible(true)}
              />
            )}

            {activeTab === 'customers' && (
              <Customer360Screen
                cif={activeCustomerCif}
                onSelectCustomer={(cif) => setActiveCustomerCif(cif)}
              />
            )}

            {activeTab === 'more' && (
              <MoreScreen
                onLogout={() => setIsLoggedIn(false)}
                onOpenCustomer360={() => handleOpenCustomer360FromAnywhere('837649')}
              />
            )}
          </>
        )}
      </View>

      {/* Bottom Navigation Bar (Visible in main tab views) */}
      {currentScreen === 'main' && (
        <BottomNavBar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setCurrentScreen('main');
          }}
        />
      )}

      {/* =========================================================================
          Universal Bottom Sheets & Dialogs
         ========================================================================= */}

      {/* Lead Actions Bottom Sheet (Screen M-4.0) */}
      <ActionSheet
        visible={!!actionSheetLead}
        lead={actionSheetLead}
        onClose={() => setActionSheetLead(null)}
        onScheduleMeeting={() => {
          if (actionSheetLead) setScheduleModalLead(actionSheetLead);
        }}
        onUpdateStatus={() => {
          if (actionSheetLead) setUpdateStatusModalLead(actionSheetLead);
        }}
        onReassignLead={() => {
          if (actionSheetLead) setReassignModalLead(actionSheetLead);
        }}
        onViewDetails={() => {
          if (actionSheetLead) {
            setSelectedLead(actionSheetLead);
            setCurrentScreen('leadDetails');
          }
        }}
        onViewCustomer360={
          actionSheetLead?.cif
            ? () => handleOpenCustomer360FromAnywhere(actionSheetLead.cif!)
            : undefined
        }
        onExportPdf={() => {
          Alert.alert('PDF Export', `Lead ${actionSheetLead?.id} exported as PDF.`);
        }}
        onExportEmail={() => {
          Alert.alert('Email Export', `Lead ${actionSheetLead?.id} sent to ${actionSheetLead?.customer}.`);
        }}
      />

      {/* Filter Bottom Sheet (Screen M-2.0-F) */}
      <FilterBottomSheet
        visible={filterModalVisible}
        filters={filters}
        onClose={() => setFilterModalVisible(false)}
        onApply={(newFilters) => setFilters(newFilters)}
        onReset={() =>
          setFilters({
            keyword: '',
            status: 'All',
            segment: 'All',
            priority: 'All',
            branch: 'All',
            assignedEmployee: 'All',
          })
        }
        matchingCount={filteredLeads.length}
      />

      {/* Schedule Meeting Modal (Screen M-4.1) */}
      <ScheduleMeetingModal
        visible={!!scheduleModalLead}
        lead={scheduleModalLead}
        onClose={() => setScheduleModalLead(null)}
        onSuccess={(event) => {
          console.log('Event Scheduled:', event);
        }}
      />

      {/* Quick Status Update Modal (Screen M-4.2) */}
      <UpdateStatusModal
        visible={!!updateStatusModalLead}
        lead={updateStatusModalLead}
        onClose={() => setUpdateStatusModalLead(null)}
        onUpdate={handleUpdateStatus}
      />

      {/* Reassign Lead Modal (Screen M-4.3) */}
      <ReassignLeadModal
        visible={!!reassignModalLead}
        lead={reassignModalLead}
        onClose={() => setReassignModalLead(null)}
        onReassign={handleReassignLead}
      />

      {/* Telephony & Softphone Modal */}
      <TelephonyModal
        visible={telephonyModalVisible}
        presence={presenceState}
        onChangePresence={setPresenceState}
        onClose={() => setTelephonyModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.shellNavy,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.surfaceBg,
  },
});
