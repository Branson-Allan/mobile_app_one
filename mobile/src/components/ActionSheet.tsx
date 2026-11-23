import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Colors } from '../theme/colors';
import { BorderRadius, Shadows, Spacing } from '../theme/spacing';
import { Lead } from '../types';

interface ActionSheetProps {
  visible: boolean;
  lead: Lead | null;
  onClose: () => void;
  onScheduleMeeting: () => void;
  onUpdateStatus: () => void;
  onReassignLead: () => void;
  onViewDetails: () => void;
  onViewCustomer360?: () => void;
  onExportPdf: () => void;
  onExportEmail: () => void;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  visible,
  lead,
  onClose,
  onScheduleMeeting,
  onUpdateStatus,
  onReassignLead,
  onViewDetails,
  onViewCustomer360,
  onExportPdf,
  onExportEmail,
}) => {
  if (!lead) return null;

  const actions = [
    {
      id: 'schedule',
      title: 'Schedule Meeting',
      subtitle: 'Set up calendar event & sync Nylas',
      icon: '📅',
      onPress: () => {
        onClose();
        onScheduleMeeting();
      },
    },
    {
      id: 'status',
      title: 'Update Status',
      subtitle: 'Advance lead along the sales pipeline',
      icon: '✏️',
      onPress: () => {
        onClose();
        onUpdateStatus();
      },
    },
    {
      id: 'reassign',
      title: 'Reassign Lead',
      subtitle: 'Transfer or add collaborative RM',
      icon: '🎯',
      onPress: () => {
        onClose();
        onReassignLead();
      },
    },
    {
      id: 'details',
      title: 'View Lead Details',
      subtitle: 'Inspect full profile & audit trail',
      icon: '👁️',
      onPress: () => {
        onClose();
        onViewDetails();
      },
    },
    ...(onViewCustomer360
      ? [
          {
            id: '360',
            title: 'View Customer 360',
            subtitle: 'Audit core accounts, mobile banking, policies & cards',
            icon: '👤',
            onPress: () => {
              onClose();
              onViewCustomer360();
            },
          },
        ]
      : []),
    {
      id: 'pdf',
      title: 'Export as PDF',
      subtitle: 'Download formatted lead summary document',
      icon: '📥',
      onPress: () => {
        onClose();
        onExportPdf();
      },
    },
    {
      id: 'email',
      title: 'Export as PDF via Email',
      subtitle: 'Send lead document directly via email',
      icon: '✉️',
      onPress: () => {
        onClose();
        onExportEmail();
      },
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.sheetContainer, Shadows.modal]}>
              {/* Drag Handle */}
              <View style={styles.dragHandle} />

              {/* Sheet Header */}
              <View style={styles.header}>
                <View>
                  <Text style={styles.leadId}>{lead.id}</Text>
                  <Text style={styles.customerTitle} numberOfLines={1}>
                    {lead.customer}
                  </Text>
                </View>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.divider} />

              {/* Action Rows */}
              <View style={styles.actionsList}>
                {actions.map((act) => (
                  <TouchableOpacity
                    key={act.id}
                    style={styles.actionRow}
                    onPress={act.onPress}
                    activeOpacity={0.7}
                  >
                    <View style={styles.actionIconBox}>
                      <Text style={styles.actionIcon}>{act.icon}</Text>
                    </View>
                    <View style={styles.actionTextBox}>
                      <Text style={styles.actionTitle}>{act.title}</Text>
                      <Text style={styles.actionSubtitle}>{act.subtitle}</Text>
                    </View>
                    <Text style={styles.chevronIcon}>›</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: Colors.surfaceCard,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
    maxHeight: '80%',
  },
  dragHandle: {
    width: 36,
    height: 4,
    backgroundColor: Colors.surfaceBorder,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  leadId: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: 'monospace',
  },
  customerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    maxWidth: 280,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceInput,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.surfaceBorder,
    marginVertical: Spacing.sm,
  },
  actionsList: {
    gap: 2,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: BorderRadius.md,
    minHeight: 52,
  },
  actionIconBox: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.brandSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  actionIcon: {
    fontSize: 18,
  },
  actionTextBox: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  actionSubtitle: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 1,
  },
  chevronIcon: {
    fontSize: 20,
    color: Colors.textMuted,
    marginLeft: Spacing.sm,
  },
});
