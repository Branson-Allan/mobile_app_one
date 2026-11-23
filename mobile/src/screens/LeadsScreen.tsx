import React, { useMemo, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LeadCard } from '../components/LeadCard';
import { Colors } from '../theme/colors';
import { BorderRadius, Shadows, Spacing } from '../theme/spacing';
import { Lead, LeadStatus } from '../types';

interface LeadsScreenProps {
  leads: Lead[];
  initialStatusFilter?: string;
  onSelectLead: (lead: Lead) => void;
  onOpenActions: (lead: Lead) => void;
  onOpenCustomer360: (cif: string) => void;
  onCreateLead: () => void;
  onOpenFilter: () => void;
  activeFilterCount?: number;
}

const STATUS_TABS: { label: string; value: string; color?: string }[] = [
  { label: 'All', value: 'All' },
  { label: 'New', value: 'New', color: Colors.status.new.text },
  { label: 'Hot', value: 'Hot', color: Colors.status.hot.text },
  { label: 'Warm', value: 'Warm', color: Colors.status.warm.text },
  { label: 'Cold', value: 'Cold', color: Colors.status.cold.text },
  { label: 'Nurturing', value: 'Nurturing', color: Colors.status.nurturing.text },
  { label: 'Converted', value: 'Converted', color: Colors.status.converted.text },
  { label: 'Lost', value: 'Lost', color: Colors.status.lost.text },
];

export const LeadsScreen: React.FC<LeadsScreenProps> = ({
  leads,
  initialStatusFilter = 'All',
  onSelectLead,
  onOpenActions,
  onOpenCustomer360,
  onCreateLead,
  onOpenFilter,
  activeFilterCount = 0,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>(initialStatusFilter);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }, []);

  // Compute counts per status
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { All: leads.length };
    leads.forEach((l) => {
      counts[l.status] = (counts[l.status] || 0) + 1;
    });
    return counts;
  }, [leads]);

  // Filter leads based on search query and status pill
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesStatus =
        selectedStatus === 'All' || lead.status === selectedStatus;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        lead.customer.toLowerCase().includes(q) ||
        lead.id.toLowerCase().includes(q) ||
        lead.phone.toLowerCase().includes(q) ||
        (lead.location && lead.location.toLowerCase().includes(q)) ||
        (lead.productInterest && lead.productInterest.toLowerCase().includes(q));

      return matchesStatus && matchesQuery;
    });
  }, [leads, selectedStatus, searchQuery]);

  return (
    <View style={styles.container}>
      {/* Search & Filter Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchInputWrapper}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search customer, phone, or Lead ID..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilterCount > 0 && styles.filterButtonActive,
          ]}
          onPress={onOpenFilter}
        >
          <Text style={styles.filterButtonIcon}>⚙️</Text>
          <Text
            style={[
              styles.filterButtonText,
              activeFilterCount > 0 && styles.filterButtonTextActive,
            ]}
          >
            Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Status Pill Strip */}
      <View style={styles.pillStripContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={STATUS_TABS}
          keyExtractor={(item) => item.value}
          contentContainerStyle={styles.pillStripContent}
          renderItem={({ item }) => {
            const count = statusCounts[item.value] || 0;
            const isSelected = selectedStatus === item.value;
            return (
              <TouchableOpacity
                style={[
                  styles.statusPill,
                  isSelected && styles.statusPillSelected,
                ]}
                onPress={() => setSelectedStatus(item.value)}
              >
                <Text
                  style={[
                    styles.statusPillText,
                    isSelected && styles.statusPillTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
                <View
                  style={[
                    styles.countBadge,
                    isSelected && styles.countBadgeSelected,
                    item.color && !isSelected ? { backgroundColor: item.color + '20' } : null,
                  ]}
                >
                  <Text
                    style={[
                      styles.countBadgeText,
                      isSelected && styles.countBadgeTextSelected,
                      item.color && !isSelected ? { color: item.color } : null,
                    ]}
                  >
                    {count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Leads Feed */}
      <FlatList
        data={filteredLeads}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.brandPrimary]}
            tintColor={Colors.brandPrimary}
          />
        }
        renderItem={({ item }) => (
          <LeadCard
            lead={item}
            onPress={() => onSelectLead(item)}
            onOpenActions={() => onOpenActions(item)}
            onOpenCustomer360={
              item.cif ? () => onOpenCustomer360(item.cif!) : undefined
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>No Leads Found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery || selectedStatus !== 'All'
                ? 'Try adjusting your search query or status filter.'
                : 'There are no active leads in the system.'}
            </Text>
          </View>
        }
      />

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity
        style={[styles.fab, Shadows.floating]}
        onPress={onCreateLead}
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcon}>＋</Text>
        <Text style={styles.fabText}>New Lead</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceBg,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surfaceCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
    gap: Spacing.sm,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceInput,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.sm,
    height: 42,
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
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceInput,
    paddingHorizontal: 10,
    height: 42,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    gap: 4,
  },
  filterButtonActive: {
    backgroundColor: Colors.brandSubtle,
    borderColor: Colors.brandAccent,
  },
  filterButtonIcon: {
    fontSize: 12,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterButtonTextActive: {
    color: Colors.brandPrimary,
    fontWeight: '700',
  },
  pillStripContainer: {
    backgroundColor: Colors.surfaceCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
    paddingVertical: 6,
  },
  pillStripContent: {
    paddingHorizontal: Spacing.md,
    gap: 8,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceInput,
    gap: 6,
  },
  statusPillSelected: {
    backgroundColor: Colors.brandDark,
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  statusPillTextSelected: {
    color: Colors.textInverse,
    fontWeight: '700',
  },
  countBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceCard,
  },
  countBadgeSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  countBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  countBadgeTextSelected: {
    color: Colors.textInverse,
  },
  listContent: {
    padding: Spacing.md,
    paddingBottom: 90, // Leave clearance for FAB and bottom nav
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 260,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.brandPrimary,
    height: 52,
    paddingHorizontal: 20,
    borderRadius: BorderRadius.full,
    gap: 6,
  },
  fabIcon: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textInverse,
  },
  fabText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textInverse,
  },
});
