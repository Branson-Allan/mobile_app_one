import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SearchableStaffPickerModal } from '../components/SearchableStaffPickerModal';
import { ENTERPRISE_STAFF_DIRECTORY } from '../data/mockData';
import { Colors } from '../theme/colors';
import { BorderRadius, Shadows, Spacing } from '../theme/spacing';
import { Lead } from '../types';

interface ScheduleMeetingModalProps {
  visible: boolean;
  lead: Lead | null;
  onClose: () => void;
  onSuccess: (eventData: any) => void;
}

const DEFAULT_STATUSES = ['In-Discussion', 'Confirmed', 'Pending', 'Follow-up'];
const LOCATIONS = ['Courtyard Plaza', 'Head Office - Nairobi', 'Client Premises', 'Virtual Google Meet'];
const DEPARTMENTS = ['Corporate Banking', 'Retail & SME', 'Bancassurance', 'Treasury'];
const RESOURCES = ['Conference Room A', 'Boardroom 2', 'Meeting Pod 1', 'Zoom / Teams Bridge'];

export const ScheduleMeetingModal: React.FC<ScheduleMeetingModalProps> = ({
  visible,
  lead,
  onClose,
  onSuccess,
}) => {
  if (!lead) return null;

  const [status, setStatus] = useState<string>('In-Discussion');
  const [customStatuses, setCustomStatuses] = useState<string[]>([]);
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [newCustomStatus, setNewCustomStatus] = useState('');

  const [location, setLocation] = useState(LOCATIONS[0]);
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [startDate, setStartDate] = useState('19/09/2026, 06:45 PM');
  const [endDate, setEndDate] = useState('19/09/2026, 07:30 PM');
  const [resource, setResource] = useState(RESOURCES[0]);
  const [purpose, setPurpose] = useState('Account Onboarding & Terms Discussion');
  const [description, setDescription] = useState('Review credit limits and KYC documentation verification.');
  const [nylasCalendar, setNylasCalendar] = useState('Calendar - DTB Corporate');
  const [selectedStaff, setSelectedStaff] = useState<string[]>([
    lead.assignedTo[0] || 'Branson Allann',
  ]);
  const [staffPickerVisible, setStaffPickerVisible] = useState(false);

  const handleRemoveStaff = (name: string) => {
    setSelectedStaff(selectedStaff.filter((s) => s !== name));
  };

  const handleAddCustomStatus = () => {
    if (newCustomStatus.trim()) {
      setCustomStatuses([...customStatuses, newCustomStatus.trim()]);
      setStatus(newCustomStatus.trim());
      setNewCustomStatus('');
      setShowAddCustom(false);
    }
  };

  const handleSubmit = () => {
    if (!purpose.trim()) {
      Alert.alert('Required Field', 'Please provide a purpose for the meeting.');
      return;
    }

    const event = {
      leadId: lead.id,
      customer: lead.customer,
      status,
      location,
      department,
      startDate,
      endDate,
      resource,
      purpose,
      description,
      nylasCalendar,
      staff: selectedStaff,
    };

    Alert.alert('Event Scheduled', `Meeting synchronized with Nylas Calendar (${nylasCalendar})`);
    onSuccess(event);
    onClose();
  };

  return (
    <>
      <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        {/* Fixed Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Schedule Meeting (Add Event)</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Lead Context Banner */}
        <View style={styles.contextBanner}>
          <View style={styles.contextRow}>
            <Text style={styles.contextLeadId}>{lead.id}</Text>
            <Text style={styles.contextPhone}>📞 {lead.phone}</Text>
          </View>
          <Text style={styles.contextCustomer}>{lead.customer}</Text>
          <Text style={styles.contextProduct}>
            💼 {lead.productInterest || 'General Inquiry'} • {lead.branch}
          </Text>
        </View>

        <ScrollView style={styles.formScroll} showsVerticalScrollIndicator={false}>
          {/* Meeting Status & Custom Status */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.label}>Meeting Status *</Text>
              <TouchableOpacity
                style={styles.addCustomBtn}
                onPress={() => setShowAddCustom(!showAddCustom)}
              >
                <Text style={styles.addCustomText}>＋ Add Custom Status</Text>
              </TouchableOpacity>
            </View>

            {showAddCustom && (
              <View style={styles.customStatusInputRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="e.g. Awaiting Risk Approval"
                  placeholderTextColor={Colors.textMuted}
                  value={newCustomStatus}
                  onChangeText={setNewCustomStatus}
                />
                <TouchableOpacity
                  style={styles.saveCustomBtn}
                  onPress={handleAddCustomStatus}
                >
                  <Text style={styles.saveCustomText}>Add</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.chipRow}>
              {[...DEFAULT_STATUSES, ...customStatuses].map((st) => (
                <TouchableOpacity
                  key={st}
                  style={[
                    styles.statusChip,
                    status === st && styles.statusChipActive,
                  ]}
                  onPress={() => setStatus(st)}
                >
                  <Text
                    style={[
                      styles.statusChipText,
                      status === st && styles.statusChipTextActive,
                    ]}
                  >
                    {st}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Location & Department */}
          <View style={styles.section}>
            <Text style={styles.label}>Location *</Text>
            <View style={styles.chipRow}>
              {LOCATIONS.map((loc) => (
                <TouchableOpacity
                  key={loc}
                  style={[
                    styles.pickerChip,
                    location === loc && styles.pickerChipActive,
                  ]}
                  onPress={() => setLocation(loc)}
                >
                  <Text
                    style={[
                      styles.pickerChipText,
                      location === loc && styles.pickerChipTextActive,
                    ]}
                  >
                    {loc}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.label, { marginTop: Spacing.sm }]}>
              Department *
            </Text>
            <View style={styles.chipRow}>
              {DEPARTMENTS.map((dept) => (
                <TouchableOpacity
                  key={dept}
                  style={[
                    styles.pickerChip,
                    department === dept && styles.pickerChipActive,
                  ]}
                  onPress={() => setDepartment(dept)}
                >
                  <Text
                    style={[
                      styles.pickerChipText,
                      department === dept && styles.pickerChipTextActive,
                    ]}
                  >
                    {dept}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Date & Time Start / End */}
          <View style={styles.section}>
            <View style={styles.dateTimeRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Start Date & Time *</Text>
                <TextInput
                  style={styles.input}
                  value={startDate}
                  onChangeText={setStartDate}
                  placeholder="DD/MM/YYYY, HH:MM AM/PM"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>End Date & Time *</Text>
                <TextInput
                  style={styles.input}
                  value={endDate}
                  onChangeText={setEndDate}
                  placeholder="DD/MM/YYYY, HH:MM AM/PM"
                />
              </View>
            </View>
          </View>

          {/* Resources */}
          <View style={styles.section}>
            <Text style={styles.label}>Assigned Resource</Text>
            <View style={styles.chipRow}>
              {RESOURCES.map((res) => (
                <TouchableOpacity
                  key={res}
                  style={[
                    styles.pickerChip,
                    resource === res && styles.pickerChipActive,
                  ]}
                  onPress={() => setResource(res)}
                >
                  <Text
                    style={[
                      styles.pickerChipText,
                      resource === res && styles.pickerChipTextActive,
                    ]}
                  >
                    {res}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Purpose & Description */}
          <View style={styles.section}>
            <Text style={styles.label}>Purpose of Meeting *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Terms negotiation or KYC document collection"
              placeholderTextColor={Colors.textMuted}
              value={purpose}
              onChangeText={setPurpose}
            />

            <Text style={[styles.label, { marginTop: Spacing.sm }]}>
              Meeting Agenda / Notes
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe agenda, background context, and expected outcomes..."
              placeholderTextColor={Colors.textMuted}
              multiline
              numberOfLines={3}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Nylas Calendar Sync */}
          <View style={[styles.section, styles.nylasSyncBox]}>
            <View style={styles.nylasHeader}>
              <Text style={styles.nylasTitle}>⚡ Nylas Calendar Sync</Text>
              <View style={styles.nylasBadge}>
                <Text style={styles.nylasBadgeText}>Active Sync</Text>
              </View>
            </View>
            <Text style={styles.nylasDesc}>
              Event will automatically push to your Exchange / Outlook calendar.
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: Colors.surfaceCard }]}
              value={nylasCalendar}
              onChangeText={setNylasCalendar}
            />
          </View>

          {/* Participants: Staff Hosts and Customer */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.label}>Meeting Participants</Text>
              <Text style={styles.badgeCount}>
                {selectedStaff.length + 1} Attendees
              </Text>
            </View>

            {/* Customer Attendee (Fixed) */}
            <View style={styles.participantChip}>
              <Text style={styles.participantIcon}>👤</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.participantName}>{lead.customer}</Text>
                <Text style={styles.participantRole}>Lead Customer / Guest</Text>
              </View>
            </View>

            {/* Staff Host Picker Trigger */}
            <Text style={[styles.label, { marginTop: Spacing.sm }]}>
              Host Staff / Assigned Officers ({selectedStaff.length})
            </Text>
            <TouchableOpacity
              style={styles.searchStaffBtn}
              onPress={() => setStaffPickerVisible(true)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Select and search host officers from staff directory"
            >
              <View style={styles.searchStaffBtnLeft}>
                <Text style={styles.searchStaffIcon}>🔍</Text>
                <Text style={styles.searchStaffBtnText}>
                  Select & Search Staff Directory...
                </Text>
              </View>
              <Text style={styles.searchStaffArrow}>▾</Text>
            </TouchableOpacity>

            {/* Selected Staff Host Chips */}
            <View style={styles.participantsContainer}>
              {selectedStaff.map((name) => {
                const staff = ENTERPRISE_STAFF_DIRECTORY.find((s) => s.name === name);
                const role = staff?.role || 'Host Officer';
                return (
                  <View key={name} style={styles.staffHostChip}>
                    <Text style={styles.participantIcon}>👔</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.participantName}>{name}</Text>
                      <Text style={styles.participantRole}>{role}</Text>
                    </View>
                    {selectedStaff.length > 1 && (
                      <TouchableOpacity
                        style={styles.deleteStaffTarget}
                        onPress={() => handleRemoveStaff(name)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        accessibilityLabel={`Remove ${name}`}
                      >
                        <Text style={styles.deleteStaffIcon}>✕</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Sticky Action Footer */}
        <View style={[styles.footer, Shadows.floating]}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Create Meeting Event</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>

    {/* Searchable Staff Directory Modal */}
    <SearchableStaffPickerModal
      visible={staffPickerVisible}
      title="Select Meeting Host Officers"
      selectedStaffNames={selectedStaff}
      onSelectStaff={(selected) => setSelectedStaff(selected)}
      onClose={() => setStaffPickerVisible(false)}
      multiSelect={true}
    />
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceBg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    height: 52,
    backgroundColor: Colors.surfaceCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
  },
  closeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: Colors.textMuted,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  contextBanner: {
    backgroundColor: Colors.brandSubtle,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(235, 106, 0, 0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  contextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contextLeadId: {
    fontSize: 12,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: Colors.brandDark,
  },
  contextPhone: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.brandPrimary,
  },
  contextCustomer: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  contextProduct: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  formScroll: {
    flex: 1,
    padding: Spacing.md,
  },
  section: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: Spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  addCustomBtn: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  addCustomText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.brandPrimary,
  },
  customStatusInputRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.surfaceInput,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    paddingHorizontal: Spacing.sm,
    height: 42,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  textArea: {
    height: 70,
    paddingVertical: 8,
    textAlignVertical: 'top',
  },
  saveCustomBtn: {
    backgroundColor: Colors.brandPrimary,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveCustomText: {
    color: Colors.textInverse,
    fontWeight: '700',
    fontSize: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  statusChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceInput,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  statusChipActive: {
    backgroundColor: Colors.brandDark,
    borderColor: Colors.brandDark,
  },
  statusChipText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  statusChipTextActive: {
    color: Colors.textInverse,
    fontWeight: '700',
  },
  pickerChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceInput,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  pickerChipActive: {
    backgroundColor: Colors.brandSubtle,
    borderColor: Colors.brandPrimary,
  },
  pickerChipText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  pickerChipTextActive: {
    color: Colors.brandPrimary,
    fontWeight: '700',
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  nylasSyncBox: {
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
  },
  nylasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nylasTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  nylasBadge: {
    backgroundColor: Colors.status.converted.bg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  nylasBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.status.converted.text,
  },
  nylasDesc: {
    fontSize: 11,
    color: Colors.textMuted,
    marginVertical: 4,
  },
  badgeCount: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.brandPrimary,
    backgroundColor: Colors.brandSubtle,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  searchStaffBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceCard,
    borderWidth: 1.5,
    borderColor: Colors.brandPrimary,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 4,
    marginBottom: 8,
  },
  searchStaffBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  searchStaffIcon: {
    fontSize: 14,
  },
  searchStaffBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.brandPrimary,
  },
  searchStaffArrow: {
    fontSize: 14,
    color: Colors.brandPrimary,
    fontWeight: '700',
  },
  participantsContainer: {
    gap: 6,
    marginTop: 4,
  },
  participantChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceInput,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: 8,
  },
  participantIcon: {
    fontSize: 14,
  },
  participantName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  participantRole: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 1,
  },
  staffHostChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceInput,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    gap: 8,
  },
  deleteStaffTarget: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: Colors.surfaceBorder,
  },
  deleteStaffIcon: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    padding: Spacing.md,
    backgroundColor: Colors.surfaceCard,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
    gap: Spacing.md,
  },
  cancelBtn: {
    flex: 1,
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  submitBtn: {
    flex: 2,
    height: 48,
    backgroundColor: Colors.brandPrimary,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textInverse,
  },
});
