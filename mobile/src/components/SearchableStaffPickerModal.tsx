import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ENTERPRISE_STAFF_DIRECTORY } from '../data/mockData';
import { Colors } from '../theme/colors';
import { BorderRadius, Shadows, Spacing } from '../theme/spacing';
import { StaffMember } from '../types';

interface SearchableStaffPickerModalProps {
  visible: boolean;
  title?: string;
  selectedStaffNames: string[];
  onSelectStaff: (selectedNames: string[]) => void;
  onClose: () => void;
  multiSelect?: boolean;
}

const DEPARTMENTS = [
  'All',
  'Corporate Banking',
  'Retail Sales',
  'Commercial SME',
  'Credit & Recoveries',
  'Risk & Legal Compliance',
  'IT & Security',
  'Insurance Solutions',
];

export const SearchableStaffPickerModal: React.FC<
  SearchableStaffPickerModalProps
> = ({
  visible,
  title = 'Select & Search Assigned Officers',
  selectedStaffNames = [],
  onSelectStaff,
  onClose,
  multiSelect = true,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [tempSelected, setTempSelected] = useState<string[]>(selectedStaffNames);

  // Sync internal state when modal opens or selectedStaffNames changes
  React.useEffect(() => {
    setTempSelected(selectedStaffNames);
  }, [selectedStaffNames, visible]);

  // Filter staff based on search query & department
  const filteredStaff = useMemo(() => {
    return ENTERPRISE_STAFF_DIRECTORY.filter((staff) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesDept =
        selectedDept === 'All' || staff.department.includes(selectedDept);

      const matchesQuery =
        !q ||
        staff.name.toLowerCase().includes(q) ||
        staff.role.toLowerCase().includes(q) ||
        staff.department.toLowerCase().includes(q) ||
        staff.branch.toLowerCase().includes(q) ||
        staff.email.toLowerCase().includes(q);

      return matchesDept && matchesQuery;
    });
  }, [searchQuery, selectedDept]);

  const handleToggleStaff = (staffName: string) => {
    if (multiSelect) {
      if (tempSelected.includes(staffName)) {
        setTempSelected(tempSelected.filter((n) => n !== staffName));
      } else {
        setTempSelected([...tempSelected, staffName]);
      }
    } else {
      setTempSelected([staffName]);
    }
  };

  const handleConfirm = () => {
    onSelectStaff(tempSelected);
    onClose();
  };

  const handleClearAll = () => {
    setTempSelected([]);
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
              {/* Drag Handle */}
              <View style={styles.dragHandle} />

              {/* Header */}
              <View style={styles.header}>
                <View>
                  <Text style={styles.headerTitle}>{title}</Text>
                  <Text style={styles.headerSubtitle}>
                    Directory: {ENTERPRISE_STAFF_DIRECTORY.length} active banking officers
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={onClose}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Search Bar */}
              <View style={styles.searchBar}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by Officer Name, Role, Branch..."
                  placeholderTextColor={Colors.textMuted}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  returnKeyType="search"
                  clearButtonMode="while-editing"
                />
                {searchQuery ? (
                  <TouchableOpacity
                    onPress={() => setSearchQuery('')}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Text style={styles.clearIcon}>✕</Text>
                  </TouchableOpacity>
                ) : null}
              </View>

              {/* Department Filter Pills */}
              <View style={styles.deptStripContainer}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={DEPARTMENTS}
                  keyExtractor={(item) => item}
                  contentContainerStyle={styles.deptStripContent}
                  renderItem={({ item }) => {
                    const isSelected = selectedDept === item;
                    return (
                      <TouchableOpacity
                        style={[
                          styles.deptChip,
                          isSelected && styles.deptChipActive,
                        ]}
                        onPress={() => setSelectedDept(item)}
                      >
                        <Text
                          style={[
                            styles.deptChipText,
                            isSelected && styles.deptChipTextActive,
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              {/* Scannable Staff List */}
              <FlatList
                data={filteredStaff}
                keyExtractor={(item) => item.id}
                style={styles.list}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => {
                  const isChecked = tempSelected.includes(item.name);
                  return (
                    <TouchableOpacity
                      style={[
                        styles.staffCard,
                        isChecked && styles.staffCardChecked,
                      ]}
                      onPress={() => handleToggleStaff(item.name)}
                      activeOpacity={0.7}
                    >
                      {/* Avatar */}
                      <View
                        style={[
                          styles.avatar,
                          {
                            backgroundColor:
                              item.avatarColor || Colors.brandPrimary,
                          },
                        ]}
                      >
                        <Text style={styles.avatarText}>
                          {item.name
                            .split(' ')
                            .map((p) => p.charAt(0))
                            .slice(0, 2)
                            .join('')}
                        </Text>
                      </View>

                      {/* Info */}
                      <View style={styles.staffInfo}>
                        <View style={styles.nameRow}>
                          <Text style={styles.staffName}>{item.name}</Text>
                          <View style={styles.roleBadge}>
                            <Text style={styles.roleText}>{item.role}</Text>
                          </View>
                        </View>
                        <Text style={styles.staffMeta}>
                          🏢 {item.branch} • {item.department}
                        </Text>
                        <Text style={styles.staffEmail}>✉️ {item.email}</Text>
                      </View>

                      {/* Checkbox */}
                      <View
                        style={[
                          styles.checkbox,
                          isChecked && styles.checkboxChecked,
                        ]}
                      >
                        {isChecked && (
                          <Text style={styles.checkmarkIcon}>✓</Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>👤</Text>
                    <Text style={styles.emptyTitle}>No Officers Found</Text>
                    <Text style={styles.emptyText}>
                      No bank employee matches "{searchQuery}".
                    </Text>
                  </View>
                }
              />

              {/* Sticky Footer Action Bar */}
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.clearBtn}
                  onPress={handleClearAll}
                >
                  <Text style={styles.clearBtnText}>Clear All</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={handleConfirm}
                >
                  <Text style={styles.confirmBtnText}>
                    Confirm ({tempSelected.length} Selected)
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
    backgroundColor: Colors.surfaceOverlay,
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: Colors.surfaceCard,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingTop: Spacing.sm,
    maxHeight: '90%',
    minHeight: 520,
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
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xs,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceInput,
    borderRadius: BorderRadius.md,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  clearIcon: {
    fontSize: 12,
    color: Colors.textMuted,
    paddingHorizontal: 4,
  },
  deptStripContainer: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
  },
  deptStripContent: {
    paddingHorizontal: Spacing.md,
    gap: 6,
  },
  deptChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceInput,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  deptChipActive: {
    backgroundColor: Colors.brandSubtle,
    borderColor: Colors.brandPrimary,
  },
  deptChipText: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  deptChipTextActive: {
    color: Colors.brandPrimary,
    fontWeight: '700',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.md,
    gap: 8,
  },
  staffCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceCard,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    minHeight: 58,
  },
  staffCardChecked: {
    borderColor: Colors.brandPrimary,
    backgroundColor: '#FFFBF5',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textInverse,
  },
  staffInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  staffName: {
    fontSize: 13,
    fontWeight: '700',
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
  staffMeta: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  staffEmail: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.sm,
    borderWidth: 1.5,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
  checkboxChecked: {
    backgroundColor: Colors.brandPrimary,
    borderColor: Colors.brandPrimary,
  },
  checkmarkIcon: {
    color: Colors.textInverse,
    fontSize: 13,
    fontWeight: '900',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  emptyText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
    backgroundColor: Colors.surfaceCard,
    gap: Spacing.md,
  },
  clearBtn: {
    flex: 1,
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  confirmBtn: {
    flex: 2,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.brandPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textInverse,
  },
});
