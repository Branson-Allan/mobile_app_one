import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SearchableStaffPickerModal } from '../components/SearchableStaffPickerModal';
import { ENTERPRISE_STAFF_DIRECTORY } from '../data/mockData';
import { Colors } from '../theme/colors';
import { BorderRadius, Shadows, Spacing } from '../theme/spacing';
import { Lead } from '../types';

interface ReassignLeadModalProps {
  visible: boolean;
  lead: Lead | null;
  onClose: () => void;
  onReassign: (leadId: string, newAssignees: string[], handoverNotes: string) => void;
}

export const ReassignLeadModal: React.FC<ReassignLeadModalProps> = ({
  visible,
  lead,
  onClose,
  onReassign,
}) => {
  if (!lead) return null;

  const [assigned, setAssigned] = useState<string[]>(lead.assignedTo || []);
  const [notes, setNotes] = useState('');
  const [staffPickerVisible, setStaffPickerVisible] = useState(false);

  const handleAdd = (name: string) => {
    if (!assigned.includes(name)) {
      setAssigned([...assigned, name]);
    }
  };

  const handleRemove = (name: string) => {
    setAssigned(assigned.filter((n) => n !== name));
  };

  const handleSave = () => {
    onReassign(lead.id, assigned, notes);
    onClose();
  };

  return (
    <>
      <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={[styles.sheetContent, Shadows.floating]}
            >
              {/* Drag Handle */}
              <View style={styles.dragHandle} />

              {/* Sheet Header */}
              <View style={styles.header}>
                <View style={styles.titleRow}>
                  <Text style={styles.headerIcon}>🎯</Text>
                  <Text style={styles.headerTitle}>Reassign Lead</Text>
                </View>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={onClose}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Lead Context Summary */}
              <View style={styles.leadContext}>
                <Text style={styles.leadId}>{lead.id}</Text>
                <Text style={styles.customerName}>{lead.customer}</Text>
                <Text style={styles.branchText}>Branch: {lead.branch}</Text>
              </View>

              {/* Header row with count */}
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.label}>
                  Current Assignees ({assigned.length})
                </Text>
              </View>

              {/* Select & Search Button from Directory */}
              <TouchableOpacity
                style={styles.searchStaffBtn}
                onPress={() => setStaffPickerVisible(true)}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Select and search assigned officers from enterprise directory"
              >
                <View style={styles.searchStaffBtnLeft}>
                  <Text style={styles.searchStaffIcon}>🔍</Text>
                  <Text style={styles.searchStaffBtnText}>
                    Select & Search Staff Directory...
                  </Text>
                </View>
                <Text style={styles.searchStaffArrow}>▾</Text>
              </TouchableOpacity>

              {/* Current Assignees with Isolated Delete Targets */}
              <View style={styles.assigneesList}>
                {assigned.length === 0 ? (
                  <Text style={styles.noAssigneesText}>
                    No staff currently assigned. Please tap above to select at least one officer.
                  </Text>
                ) : (
                  assigned.map((name) => {
                    const officer = ENTERPRISE_STAFF_DIRECTORY.find((o) => o.name === name);
                    const role = officer?.role || 'Sales Officer';
                    const dept = officer?.department;
                    return (
                      <View key={name} style={styles.assigneeChip}>
                        <View style={styles.assigneeInfo}>
                          <Text style={styles.assigneeName}>{name}</Text>
                          <View style={styles.roleBadge}>
                            <Text style={styles.roleText}>{role}</Text>
                          </View>
                          {dept ? (
                            <Text style={styles.deptSubtext}>• {dept}</Text>
                          ) : null}
                        </View>
                        {/* 32px Touch Target for Delete */}
                        <TouchableOpacity
                          style={styles.deleteTarget}
                          onPress={() => handleRemove(name)}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                          accessibilityLabel={`Remove ${name}`}
                        >
                          <Text style={styles.deleteIcon}>✕</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })
                )}
              </View>

              {/* Quick Add Suggestions */}
              <Text style={[styles.label, { marginTop: Spacing.sm }]}>
                Quick Suggestions
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.officerPoolScroll}
              >
                {ENTERPRISE_STAFF_DIRECTORY.filter((o) => !assigned.includes(o.name))
                  .slice(0, 6)
                  .map((officer) => (
                    <TouchableOpacity
                      key={officer.name}
                      style={styles.officerChip}
                      onPress={() => handleAdd(officer.name)}
                    >
                      <Text style={styles.officerChipText}>
                        ＋ {officer.name} ({officer.role})
                      </Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>

              {/* Handover Notes */}
              <Text style={[styles.label, { marginTop: Spacing.sm }]}>
                Handover Notes / Instructions
              </Text>
              <TextInput
                style={styles.textArea}
                placeholder="Provide handover context for the incoming relationship manager..."
                placeholderTextColor={Colors.textMuted}
                multiline
                numberOfLines={2}
                value={notes}
                onChangeText={setNotes}
              />

              {/* Action Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.saveBtn,
                    assigned.length === 0 && styles.saveBtnDisabled,
                  ]}
                  onPress={handleSave}
                  disabled={assigned.length === 0}
                >
                  <Text style={styles.saveBtnText}>Update Assignment</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

    {/* Searchable Staff Directory Modal */}
    <SearchableStaffPickerModal
      visible={staffPickerVisible}
      title="Reassign Lead: Staff Directory"
      selectedStaffNames={assigned}
      onSelectStaff={(selected) => setAssigned(selected)}
      onClose={() => setStaffPickerVisible(false)}
      multiSelect={true}
    />
  </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.surfaceOverlay,
    justifyContent: 'flex-end',
  },
  sheetContent: {
    backgroundColor: Colors.surfaceCard,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.md,
    maxHeight: '90%',
  },
  dragHandle: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.surfaceBorder,
    alignSelf: 'center',
    marginBottom: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerIcon: {
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  closeBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 16,
    color: Colors.textMuted,
  },
  leadContext: {
    backgroundColor: Colors.surfaceInput,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  leadId: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: Colors.textMuted,
    fontWeight: '600',
  },
  customerName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  branchText: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
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
    marginBottom: 10,
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
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  assigneesList: {
    gap: 6,
    marginBottom: Spacing.xs,
  },
  noAssigneesText: {
    fontSize: 12,
    color: Colors.status.hot.text,
    fontStyle: 'italic',
  },
  assigneeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceInput,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  assigneeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  assigneeName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  roleBadge: {
    backgroundColor: Colors.brandSubtle,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  roleText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.brandPrimary,
  },
  deptSubtext: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  deleteTarget: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: Colors.surfaceBorder,
  },
  deleteIcon: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.textSecondary,
  },
  officerPoolScroll: {
    marginVertical: 4,
  },
  officerChip: {
    backgroundColor: Colors.surfaceInput,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginRight: 6,
  },
  officerChipText: {
    fontSize: 11,
    color: Colors.brandDark,
    fontWeight: '600',
  },
  textArea: {
    backgroundColor: Colors.surfaceInput,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    padding: Spacing.sm,
    height: 60,
    fontSize: 13,
    color: Colors.textPrimary,
    textAlignVertical: 'top',
    marginBottom: Spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingBottom: Spacing.sm,
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
  saveBtn: {
    flex: 2,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.brandPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnDisabled: {
    backgroundColor: Colors.surfaceBorder,
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textInverse,
  },
});
