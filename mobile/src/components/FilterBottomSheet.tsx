import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Colors } from '../theme/colors';
import { BorderRadius, Shadows, Spacing } from '../theme/spacing';
import { CustomerSegment, LeadPriority, LeadStatus } from '../types';

export interface FilterState {
  keyword: string;
  status: LeadStatus | 'All';
  segment: CustomerSegment | 'All';
  priority: LeadPriority | 'All';
  branch: string;
}

interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
  onReset: () => void;
  matchingCount: number;
}

export const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
  visible,
  onClose,
  filters,
  onApply,
  onReset,
  matchingCount,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const statuses: (LeadStatus | 'All')[] = [
    'All',
    'New',
    'Cold',
    'Warm',
    'Hot',
    'Nurturing',
    'Converted',
    'Lost',
  ];

  const segments: (CustomerSegment | 'All')[] = ['All', 'Retail', 'Corporate', 'Business'];
  const priorities: (LeadPriority | 'All')[] = ['All', 'High', 'Medium', 'Low'];
  const branches = ['All', 'Courtyard Branch', 'Ravenclaw', 'Griffindor', 'Nyali Branch'];

  const handleReset = () => {
    const defaultState: FilterState = {
      keyword: '',
      status: 'All',
      segment: 'All',
      priority: 'All',
      branch: 'All',
    };
    setLocalFilters(defaultState);
    onReset();
  };

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
              <View style={styles.dragHandle} />

              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Filter Leads</Text>
                <View style={styles.headerActions}>
                  <TouchableOpacity onPress={handleReset}>
                    <Text style={styles.resetText}>Reset All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeIcon}>✕</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView
                style={styles.scrollBody}
                showsVerticalScrollIndicator={false}
              >
                {/* Keyword Search */}
                <Text style={styles.sectionLabel}>Search Keyword / Lead ID</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Collins, L-2026-000180"
                  value={localFilters.keyword}
                  onChangeText={(val) =>
                    setLocalFilters({ ...localFilters, keyword: val })
                  }
                  placeholderTextColor={Colors.textMuted}
                />

                {/* Lead Status Chips */}
                <Text style={styles.sectionLabel}>Lead Pipeline Status</Text>
                <View style={styles.chipsWrap}>
                  {statuses.map((st) => {
                    const isSelected = localFilters.status === st;
                    return (
                      <TouchableOpacity
                        key={st}
                        style={[
                          styles.chip,
                          isSelected && styles.selectedChip,
                        ]}
                        onPress={() =>
                          setLocalFilters({ ...localFilters, status: st })
                        }
                      >
                        <Text
                          style={[
                            styles.chipText,
                            isSelected && styles.selectedChipText,
                          ]}
                        >
                          {st}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Customer Segment */}
                <Text style={styles.sectionLabel}>Customer Segment</Text>
                <View style={styles.chipsWrap}>
                  {segments.map((seg) => {
                    const isSelected = localFilters.segment === seg;
                    return (
                      <TouchableOpacity
                        key={seg}
                        style={[
                          styles.chip,
                          isSelected && styles.selectedChip,
                        ]}
                        onPress={() =>
                          setLocalFilters({ ...localFilters, segment: seg })
                        }
                      >
                        <Text
                          style={[
                            styles.chipText,
                            isSelected && styles.selectedChipText,
                          ]}
                        >
                          {seg}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Lead Priority */}
                <Text style={styles.sectionLabel}>Lead Priority</Text>
                <View style={styles.chipsWrap}>
                  {priorities.map((pri) => {
                    const isSelected = localFilters.priority === pri;
                    return (
                      <TouchableOpacity
                        key={pri}
                        style={[
                          styles.chip,
                          isSelected && styles.selectedChip,
                        ]}
                        onPress={() =>
                          setLocalFilters({ ...localFilters, priority: pri })
                        }
                      >
                        <Text
                          style={[
                            styles.chipText,
                            isSelected && styles.selectedChipText,
                          ]}
                        >
                          {pri}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Branch Selection */}
                <Text style={styles.sectionLabel}>Servicing Branch</Text>
                <View style={styles.chipsWrap}>
                  {branches.map((br) => {
                    const isSelected = localFilters.branch === br;
                    return (
                      <TouchableOpacity
                        key={br}
                        style={[
                          styles.chip,
                          isSelected && styles.selectedChip,
                        ]}
                        onPress={() =>
                          setLocalFilters({ ...localFilters, branch: br })
                        }
                      >
                        <Text
                          style={[
                            styles.chipText,
                            isSelected && styles.selectedChipText,
                          ]}
                        >
                          {br}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>

              {/* Sticky Apply Button */}
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={() => {
                    onApply(localFilters);
                    onClose();
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.applyButtonText}>
                    Apply Filters ({matchingCount} Results)
                  </Text>
                </TouchableOpacity>
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
    maxHeight: '85%',
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
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  resetText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.brandPrimary,
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
  scrollBody: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: Colors.surfaceInput,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  chip: {
    backgroundColor: Colors.surfaceInput,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  selectedChip: {
    backgroundColor: Colors.brandPrimary,
    borderColor: Colors.brandDark,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  selectedChipText: {
    color: Colors.textInverse,
  },
  footer: {
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
    backgroundColor: Colors.surfaceCard,
  },
  applyButton: {
    backgroundColor: Colors.brandPrimary,
    borderRadius: BorderRadius.md,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: Colors.textInverse,
    fontSize: 15,
    fontWeight: '700',
  },
});
