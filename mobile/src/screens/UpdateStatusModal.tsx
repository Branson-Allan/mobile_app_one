import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { StatusPill } from '../components/StatusPill';
import { Colors } from '../theme/colors';
import { BorderRadius, Shadows, Spacing } from '../theme/spacing';
import { Lead, LeadStatus } from '../types';

interface UpdateStatusModalProps {
  visible: boolean;
  lead: Lead | null;
  onClose: () => void;
  onUpdate: (leadId: string, newStatus: LeadStatus, comments: string) => void;
}

const ALL_STATUSES: LeadStatus[] = [
  'New',
  'Cold',
  'Warm',
  'Hot',
  'Nurturing',
  'Converted',
  'Lost',
];

export const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
  visible,
  lead,
  onClose,
  onUpdate,
}) => {
  if (!lead) return null;

  const [selectedStatus, setSelectedStatus] = useState<LeadStatus>(lead.status);
  const [comments, setComments] = useState('');

  const handleSave = () => {
    onUpdate(lead.id, selectedStatus, comments);
    onClose();
  };

  return (
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
                  <Text style={styles.headerIcon}>✏️</Text>
                  <Text style={styles.headerTitle}>Update Lead Status</Text>
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
                <View style={styles.leadContextRow}>
                  <Text style={styles.leadId}>{lead.id}</Text>
                  <StatusPill status={lead.status} size="sm" />
                </View>
                <Text style={styles.customerName}>{lead.customer}</Text>
              </View>

              {/* Status Chips Selector */}
              <Text style={styles.label}>Select New Status *</Text>
              <View style={styles.chipsContainer}>
                {ALL_STATUSES.map((st) => {
                  const isSelected = selectedStatus === st;
                  return (
                    <TouchableOpacity
                      key={st}
                      style={[
                        styles.statusChip,
                        isSelected && styles.statusChipSelected,
                      ]}
                      onPress={() => setSelectedStatus(st)}
                    >
                      <Text
                        style={[
                          styles.statusChipText,
                          isSelected && styles.statusChipTextSelected,
                        ]}
                      >
                        {st}
                      </Text>
                      {isSelected && (
                        <Text style={styles.checkMark}> ✓</Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Comments Text Area */}
              <Text style={styles.label}>Status Transition Remarks / Reason</Text>
              <TextInput
                style={styles.textArea}
                placeholder="e.g. Client agreed to terms, moving to Nurturing..."
                placeholderTextColor={Colors.textMuted}
                multiline
                numberOfLines={3}
                value={comments}
                onChangeText={setComments}
              />

              {/* Action Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                  <Text style={styles.saveBtnText}>Update Status</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
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
    maxHeight: '85%',
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
  leadContextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: Spacing.md,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceInput,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  statusChipSelected: {
    backgroundColor: Colors.brandDark,
    borderColor: Colors.brandDark,
  },
  statusChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  statusChipTextSelected: {
    color: Colors.textInverse,
  },
  checkMark: {
    color: Colors.brandAccent,
    fontWeight: '800',
    fontSize: 12,
  },
  textArea: {
    backgroundColor: Colors.surfaceInput,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    padding: Spacing.sm,
    height: 70,
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
  saveBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textInverse,
  },
});
