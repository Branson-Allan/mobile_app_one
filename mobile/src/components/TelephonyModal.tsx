import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Colors } from '../theme/colors';
import { BorderRadius, Shadows, Spacing } from '../theme/spacing';

interface TelephonyModalProps {
  visible: boolean;
  onClose: () => void;
  presence: 'online' | 'busy' | 'offline';
  onChangePresence: (p: 'online' | 'busy' | 'offline') => void;
}

export const TelephonyModal: React.FC<TelephonyModalProps> = ({
  visible,
  onClose,
  presence,
  onChangePresence,
}) => {
  const [pbxEnabled, setPbxEnabled] = useState(true);
  const [selectedQueue, setSelectedQueue] = useState('8022 - Corporate Inbound');

  const queues = [
    '8022 - Corporate Inbound',
    '8023 - Retail Platinum',
    '8025 - General Sales Desk',
  ];

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
            <View style={[styles.dialog, Shadows.modal]}>
              <View style={styles.header}>
                <Text style={styles.title}>Telephony & Presence</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Status Selector */}
              <Text style={styles.label}>Agent Workforce Status</Text>
              <View style={styles.presenceButtons}>
                {(['online', 'busy', 'offline'] as const).map((p) => {
                  const isSelected = presence === p;
                  const color =
                    p === 'online'
                      ? Colors.presence.online
                      : p === 'busy'
                      ? Colors.presence.busy
                      : Colors.presence.offline;

                  return (
                    <TouchableOpacity
                      key={p}
                      style={[
                        styles.presenceChoice,
                        isSelected && { borderColor: color, backgroundColor: Colors.brandSubtle },
                      ]}
                      onPress={() => onChangePresence(p)}
                    >
                      <View style={[styles.dot, { backgroundColor: color }]} />
                      <Text
                        style={[
                          styles.choiceText,
                          isSelected && { color: Colors.brandDark, fontWeight: '700' },
                        ]}
                      >
                        {p.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Queue Selector */}
              <Text style={styles.label}>Current Call Queue</Text>
              <View style={styles.queueBox}>
                {queues.map((q) => {
                  const isSel = selectedQueue === q;
                  return (
                    <TouchableOpacity
                      key={q}
                      style={[styles.queueOption, isSel && styles.queueOptionSelected]}
                      onPress={() => setSelectedQueue(q)}
                    >
                      <Text
                        style={[
                          styles.queueText,
                          isSel && { fontWeight: '700', color: Colors.brandPrimary },
                        ]}
                      >
                        {isSel ? '✓ ' : '  '}
                        {q}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* PBX Login Switch */}
              <View style={styles.switchRow}>
                <View>
                  <Text style={styles.switchLabel}>PBX Softphone Login</Text>
                  <Text style={styles.switchSub}>Direct telephony bridge active</Text>
                </View>
                <Switch
                  value={pbxEnabled}
                  onValueChange={setPbxEnabled}
                  trackColor={{ false: Colors.surfaceBorder, true: Colors.brandPrimary }}
                />
              </View>

              {/* Dismiss Button */}
              <TouchableOpacity style={styles.saveBtn} onPress={onClose}>
                <Text style={styles.saveText}>Save & Return</Text>
              </TouchableOpacity>
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
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  dialog: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    width: '100%',
    maxWidth: 380,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
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
  closeText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginTop: Spacing.sm,
    marginBottom: 6,
  },
  presenceButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  presenceChoice: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    backgroundColor: Colors.surfaceInput,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  choiceText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  queueBox: {
    backgroundColor: Colors.surfaceInput,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    overflow: 'hidden',
  },
  queueOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
  },
  queueOptionSelected: {
    backgroundColor: Colors.brandSubtle,
  },
  queueText: {
    fontSize: 13,
    color: Colors.textPrimary,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingVertical: 6,
  },
  switchLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  switchSub: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  saveBtn: {
    backgroundColor: Colors.brandPrimary,
    borderRadius: BorderRadius.md,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.lg,
  },
  saveText: {
    color: Colors.textInverse,
    fontWeight: '700',
    fontSize: 14,
  },
});
