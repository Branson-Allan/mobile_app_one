import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MetricCard } from '../components/MetricCard';
import { Colors } from '../theme/colors';
import { BorderRadius, Shadows, Spacing } from '../theme/spacing';
import { Lead } from '../types';

interface DashboardScreenProps {
  leads: Lead[];
  onNavigateToLeads: (statusFilter?: string) => void;
  onOpenFilter: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  leads,
  onNavigateToLeads,
  onOpenFilter,
}) => {
  const [activeStage, setActiveStage] = useState<string>('All');
  const screenWidth = Dimensions.get('window').width;

  // Compute metrics from leads
  const totalLeads = leads.length;
  const convertedLeads = leads.filter((l) => l.status === 'Converted').length;
  const hotLeads = leads.filter((l) => l.status === 'Hot').length;
  const warmLeads = leads.filter((l) => l.status === 'Warm').length;
  const coldLeads = leads.filter((l) => l.status === 'Cold').length;
  const nurturingLeads = leads.filter((l) => l.status === 'Nurturing').length;
  const newLeads = leads.filter((l) => l.status === 'New').length;

  const stages = [
    { name: 'New', count: newLeads, color: Colors.status.new.text },
    { name: 'Cold', count: coldLeads, color: Colors.status.cold.text },
    { name: 'Warm', count: warmLeads, color: Colors.status.warm.text },
    { name: 'Hot', count: hotLeads, color: Colors.status.hot.text },
    { name: 'Nurturing', count: nurturingLeads, color: Colors.status.nurturing.text },
    { name: 'Converted', count: convertedLeads, color: Colors.status.converted.text },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Sub-Header: Date and Filter */}
      <View style={styles.subHeader}>
        <View style={styles.dateChip}>
          <Text style={styles.dateText}>📅 1 Jun – 19 Sep, 2026</Text>
        </View>
        <TouchableOpacity style={styles.filterChip} onPress={onOpenFilter}>
          <Text style={styles.filterText}>⚙️ Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Section 1: Performance Overview Carousel */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Overview</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
        >
          <MetricCard
            title="Total Leads"
            value={totalLeads}
            accentColor={Colors.brandPrimary}
          />
          <MetricCard
            title="Converted"
            value={convertedLeads}
            accentColor={Colors.status.converted.text}
            subtitle="Closed deals"
          />
          <MetricCard
            title="Hot Leads"
            value={hotLeads}
            accentColor={Colors.status.hot.text}
            subtitle="Immediate"
          />
          <MetricCard
            title="Warm Leads"
            value={warmLeads}
            accentColor={Colors.status.warm.text}
          />
          <MetricCard
            title="Cold Leads"
            value={coldLeads}
            accentColor={Colors.status.cold.text}
          />
          <MetricCard
            title="Follow-Ups Today"
            value={0}
            accentColor={Colors.brandDark}
          />
          <MetricCard
            title="Meetings Today"
            value={0}
            accentColor={Colors.brandDark}
          />
          <MetricCard
            title="Open Engagements"
            value={5}
            accentColor={Colors.brandAccent}
          />
        </ScrollView>
      </View>

      {/* Section 2: Lead Pipeline Stages */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Lead Pipeline</Text>
          <TouchableOpacity onPress={() => onNavigateToLeads()}>
            <Text style={styles.viewAllText}>View All ({totalLeads}) ›</Text>
          </TouchableOpacity>
        </View>

        {/* Stage Selection Bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.stagePillsRow}
        >
          {stages.map((st) => (
            <TouchableOpacity
              key={st.name}
              style={[
                styles.stagePill,
                activeStage === st.name && styles.activeStagePill,
              ]}
              onPress={() => {
                setActiveStage(st.name);
                onNavigateToLeads(st.name);
              }}
            >
              <Text
                style={[
                  styles.stageName,
                  activeStage === st.name && styles.activeStageText,
                ]}
              >
                {st.name}
              </Text>
              <View style={[styles.stageBadge, { backgroundColor: st.color }]}>
                <Text style={styles.stageBadgeText}>{st.count}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Urgent Lead Card Preview */}
        <TouchableOpacity
          style={[styles.urgentCard, Shadows.card]}
          onPress={() => onNavigateToLeads('Cold')}
        >
          <View style={styles.urgentHeader}>
            <Text style={styles.urgentTag}>⚠️ High Value Pipeline Alert</Text>
            <Text style={styles.urgentStatus}>Cold</Text>
          </View>
          <Text style={styles.urgentCustomer}>COLLINS w SAKWA</Text>
          <Text style={styles.urgentDetail}>
            Salary Account • Courtyard Branch • Value: KES 1,000,000
          </Text>
          <Text style={styles.urgentAction}>Tap to view in Leads table ›</Text>
        </TouchableOpacity>
      </View>

      {/* Section 3: Lead Conversion Trend */}
      <View style={[styles.chartCard, Shadows.card]}>
        <Text style={styles.chartTitle}>Lead Conversion Trend</Text>
        <Text style={styles.chartSubtitle}>
          Weekly trend from 1 June to 19 September 2026
        </Text>

        {/* CSS/Flex Bar Chart Visualization */}
        <View style={styles.chartContainer}>
          <View style={styles.chartYAxis}>
            <Text style={styles.axisLabel}>6 -</Text>
            <Text style={styles.axisLabel}>4 -</Text>
            <Text style={styles.axisLabel}>2 -</Text>
            <Text style={styles.axisLabel}>0 -</Text>
          </View>
          <View style={styles.chartBars}>
            {[
              { label: 'Jun 1', height: 10, val: 0 },
              { label: 'Jun 15', height: 10, val: 0 },
              { label: 'Jun 22', height: 40, val: 3 },
              { label: 'Jun 29', height: 90, val: 6 },
              { label: 'Jul 13', height: 10, val: 0 },
              { label: 'Jul 27', height: 25, val: 1 },
              { label: 'Aug 24', height: 25, val: 1 },
              { label: 'Sep 14', height: 25, val: 1 },
            ].map((col, idx) => (
              <View key={idx} style={styles.barCol}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${col.height}%`,
                      backgroundColor:
                        col.val > 3 ? Colors.brandPrimary : Colors.brandAccent,
                    },
                  ]}
                />
                <Text style={styles.barLabel}>{col.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Section 4: Product Interest Distribution */}
      <View style={[styles.chartCard, Shadows.card, { marginBottom: Spacing.xxl }]}>
        <Text style={styles.chartTitle}>Product Interest Distribution</Text>
        <Text style={styles.chartSubtitle}>
          Breakdown of customer product demand across leads
        </Text>

        {/* Responsive Donut Visual */}
        <View style={styles.donutRow}>
          <View style={styles.donutGraphic}>
            <View style={styles.donutHole}>
              <Text style={styles.donutCenterValue}>{totalLeads}</Text>
              <Text style={styles.donutCenterLabel}>Total Leads</Text>
            </View>
          </View>
          <View style={styles.legendCol}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
              <Text style={styles.legendText}>Savings (35%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#F97316' }]} />
              <Text style={styles.legendText}>Salary Acc (25%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#EAB308' }]} />
              <Text style={styles.legendText}>Personal Loan (10%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#84CC16' }]} />
              <Text style={styles.legendText}>Overdraft (15%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#06B6D4' }]} />
              <Text style={styles.legendText}>Debit Card (10%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#334155' }]} />
              <Text style={styles.legendText}>World Credit (5%)</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceBg,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surfaceCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
  },
  dateChip: {
    backgroundColor: Colors.surfaceInput,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterChip: {
    backgroundColor: Colors.brandSubtle,
    borderColor: Colors.brandAccent,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.brandPrimary,
  },
  section: {
    marginTop: Spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xs,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xs,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.brandPrimary,
  },
  carouselContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
  },
  stagePillsRow: {
    paddingHorizontal: Spacing.md,
    gap: 8,
    marginVertical: Spacing.xs,
  },
  stagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceCard,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.full,
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 6,
  },
  activeStagePill: {
    borderColor: Colors.brandPrimary,
    backgroundColor: Colors.brandSubtle,
  },
  stageName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  activeStageText: {
    color: Colors.brandDark,
    fontWeight: '700',
  },
  stageBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: BorderRadius.full,
  },
  stageBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textInverse,
  },
  urgentCard: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: BorderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.status.hot.border,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.sm,
  },
  urgentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  urgentTag: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.status.hot.text,
  },
  urgentStatus: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.status.cold.text,
  },
  urgentCustomer: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 4,
  },
  urgentDetail: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  urgentAction: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.brandPrimary,
    marginTop: 6,
  },
  chartCard: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  chartTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  chartSubtitle: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: Spacing.md,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 140,
    alignItems: 'flex-end',
  },
  chartYAxis: {
    justifyContent: 'space-between',
    height: '80%',
    paddingRight: 6,
  },
  axisLabel: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  chartBars: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
  },
  barCol: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    width: 28,
  },
  bar: {
    width: 14,
    borderRadius: 3,
  },
  barLabel: {
    fontSize: 9,
    color: Colors.textMuted,
    marginTop: 4,
  },
  donutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: Spacing.sm,
  },
  donutGraphic: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 14,
    borderColor: Colors.brandPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutHole: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutCenterValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  donutCenterLabel: {
    fontSize: 9,
    color: Colors.textMuted,
    textTransform: 'uppercase',
  },
  legendCol: {
    gap: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
