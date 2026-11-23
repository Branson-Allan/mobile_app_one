import React, { useState } from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SegmentedControl } from '../components/SegmentedControl';
import { StatusPill } from '../components/StatusPill';
import { MOCK_CUSTOMERS } from '../data/mockData';
import { Colors } from '../theme/colors';
import { BorderRadius, Shadows, Spacing } from '../theme/spacing';
import { ActivityEvent, Lead, LeadDetailsTab } from '../types';

interface LeadDetailsScreenProps {
  lead: Lead;
  onBack: () => void;
  onOpenActions: () => void;
  onOpenCustomer360?: (cif: string) => void;
  onUpdateStatus: () => void;
  onScheduleMeeting: () => void;
  onReassign: () => void;
}

export const LeadDetailsScreen: React.FC<LeadDetailsScreenProps> = ({
  lead,
  onBack,
  onOpenActions,
  onOpenCustomer360,
  onUpdateStatus,
  onScheduleMeeting,
  onReassign,
}) => {
  const [activeTab, setActiveTab] = useState<string>('Profile');

  const customerRecord = lead.cif ? MOCK_CUSTOMERS[lead.cif] : null;

  // Lead Activity Log (matching Screen 4.4.2 in PDF)
  const defaultEvents: ActivityEvent[] = customerRecord?.activityHistory || [
    {
      id: 'EV-1',
      date: '19-Sep-2026',
      time: '04:30 PM',
      type: 'Status Updated',
      title: 'Status Updated',
      detail: `Status updated to ${lead.status}.`,
      comments: 'Comments: zzz',
      author: lead.assignedTo[0] || 'Branson Allann',
    },
    {
      id: 'EV-2',
      date: '19-Sep-2026',
      time: '02:15 PM',
      type: 'Status Updated',
      title: 'Status Updated',
      detail: 'Status updated from Warm to Warm.',
      comments: 'Comments: xxx',
      author: 'Demo Account',
    },
    {
      id: 'EV-3',
      date: lead.createdDate,
      time: '10:00 AM',
      type: 'Lead Created',
      title: 'Lead Created',
      detail: `Lead created from ${lead.leadSource} source.`,
      author: lead.initiator,
    },
  ];

  const handleCall = () => {
    if (lead.phone) {
      Linking.openURL(`tel:${lead.phone}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={onBack}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Lead Details</Text>
          <Text style={styles.headerSubtitle}>{lead.id}</Text>
        </View>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={onOpenActions}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.actionIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Segmented Control: [ Profile ] vs [ Activity Log ] */}
      <View style={styles.tabContainer}>
        <SegmentedControl
          options={['Profile', 'Activity Log']}
          selectedOption={activeTab}
          onSelect={setActiveTab}
        />
      </View>

      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        {/* =========================================================================
            Tab 1: PROFILE VIEW (Screen M-4.4.1)
           ========================================================================= */}
        {activeTab === 'Profile' && (
          <View style={styles.contentCol}>
            {/* Customer Identification Card */}
            <View style={[styles.card, Shadows.card]}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeading}>Customer Information</Text>
                <StatusPill status={lead.status} size="sm" />
              </View>

              <Text style={styles.customerName}>{lead.customer}</Text>

              <View style={styles.metaRow}>
                <TouchableOpacity style={styles.phoneChip} onPress={handleCall}>
                  <Text style={styles.phoneIcon}>📞</Text>
                  <Text style={styles.phoneText}>{lead.phone}</Text>
                </TouchableOpacity>
                <View style={styles.segmentBadge}>
                  <Text style={styles.segmentText}>{lead.segment}</Text>
                </View>
              </View>

              {lead.location ? (
                <Text style={styles.locationText}>📍 {lead.location}</Text>
              ) : null}

              {lead.cif && onOpenCustomer360 ? (
                <TouchableOpacity
                  style={styles.customer360Link}
                  onPress={() => onOpenCustomer360(lead.cif!)}
                >
                  <Text style={styles.customer360LinkText}>
                    🔍 View Customer 360° Banking Profile ›
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>

            {/* Commercial Details Card */}
            <View style={[styles.card, Shadows.card]}>
              <Text style={styles.cardHeading}>Commercial & Product Details</Text>

              <View style={styles.gridRow}>
                <View style={styles.gridItem}>
                  <Text style={styles.fieldLabel}>Lead Source</Text>
                  <Text style={styles.fieldValue}>{lead.leadSource}</Text>
                </View>
                {lead.referee ? (
                  <View style={styles.gridItem}>
                    <Text style={styles.fieldLabel}>Referee</Text>
                    <Text style={[styles.fieldValue, { color: Colors.brandPrimary }]}>
                      {lead.referee}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.gridItem}>
                    <Text style={styles.fieldLabel}>Lead Priority</Text>
                    <Text style={styles.fieldValue}>{lead.priority}</Text>
                  </View>
                )}
              </View>

              <View style={styles.divider} />

              <View style={styles.gridRow}>
                <View style={styles.gridItem}>
                  <Text style={styles.fieldLabel}>Product Interest</Text>
                  <Text style={styles.fieldValueHighlight}>
                    💼 {lead.productInterest || 'General Inquiry'}
                  </Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.fieldLabel}>Potential Value</Text>
                  <Text style={styles.fieldValueHighlight}>
                    💰 {lead.potentialCurrency || 'KES'}{' '}
                    {lead.potentialValue ? lead.potentialValue.toLocaleString() : 'N/A'}
                  </Text>
                </View>
              </View>

              {lead.convertedValue ? (
                <>
                  <View style={styles.divider} />
                  <View style={styles.gridRow}>
                    <View style={styles.gridItem}>
                      <Text style={styles.fieldLabel}>Converted Value</Text>
                      <Text style={styles.convertedValueText}>
                        🎉 {lead.convertedCurrency || 'KES'}{' '}
                        {lead.convertedValue.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                </>
              ) : null}
            </View>

            {/* Operational Metadata Card */}
            <View style={[styles.card, Shadows.card]}>
              <Text style={styles.cardHeading}>Operational Metadata</Text>

              <View style={styles.gridRow}>
                <View style={styles.gridItem}>
                  <Text style={styles.fieldLabel}>Branch Affiliation</Text>
                  <Text style={styles.fieldValue}>🏢 {lead.branch}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.fieldLabel}>Initiated By</Text>
                  <Text style={styles.fieldValue}>👤 {lead.initiator}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.gridRow}>
                <View style={styles.gridItem}>
                  <Text style={styles.fieldLabel}>Created Date</Text>
                  <Text style={styles.fieldValue}>📅 {lead.createdDate}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.fieldLabel}>Lead ID</Text>
                  <Text style={styles.fieldMono}>{lead.id}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={{ marginTop: 2 }}>
                <Text style={styles.fieldLabel}>Assigned Team Members</Text>
                <View style={styles.assigneesRow}>
                  {lead.assignedTo?.map((staff) => (
                    <View key={staff} style={styles.assigneeChip}>
                      <Text style={styles.assigneeChipText}>👤 {staff}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {lead.notes ? (
                <>
                  <View style={styles.divider} />
                  <Text style={styles.fieldLabel}>Comments / Internal Notes</Text>
                  <Text style={styles.notesText}>{lead.notes}</Text>
                </>
              ) : null}
            </View>

            {/* Bottom Quick Action Dock */}
            <View style={styles.actionDock}>
              <TouchableOpacity
                style={styles.actionDockBtn}
                onPress={onUpdateStatus}
              >
                <Text style={styles.actionDockIcon}>✏️</Text>
                <Text style={styles.actionDockText}>Update Status</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionDockBtn}
                onPress={onScheduleMeeting}
              >
                <Text style={styles.actionDockIcon}>📅</Text>
                <Text style={styles.actionDockText}>Schedule</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionDockBtn}
                onPress={onReassign}
              >
                <Text style={styles.actionDockIcon}>🎯</Text>
                <Text style={styles.actionDockText}>Reassign</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* =========================================================================
            Tab 2: ACTIVITY LOG (Screen M-4.4.2)
           ========================================================================= */}
        {activeTab === 'Activity Log' && (
          <View style={[styles.card, Shadows.card]}>
            <View style={styles.logHeader}>
              <Text style={styles.cardHeading}>Chronological Activity Timeline</Text>
              <Text style={styles.logCountBadge}>
                {defaultEvents.length} Events
              </Text>
            </View>

            <View style={styles.timelineList}>
              {defaultEvents.map((ev, idx) => (
                <View key={ev.id || idx} style={styles.timelineItem}>
                  {/* Left Column: Line & Node */}
                  <View style={styles.timelineNodeContainer}>
                    <View
                      style={[
                        styles.timelineDot,
                        ev.type === 'Status Updated'
                          ? styles.statusDot
                          : styles.createDot,
                      ]}
                    />
                    {idx < defaultEvents.length - 1 && (
                      <View style={styles.timelineLine} />
                    )}
                  </View>

                  {/* Right Column: Event Content */}
                  <View style={styles.timelineContent}>
                    <View style={styles.timelineHeaderRow}>
                      <Text style={styles.eventTitle}>{ev.title}</Text>
                      <Text style={styles.eventTime}>
                        {ev.date} • {ev.time || '10:00 AM'}
                      </Text>
                    </View>
                    <Text style={styles.eventDetail}>{ev.detail}</Text>
                    {ev.comments ? (
                      <View style={styles.commentsBox}>
                        <Text style={styles.commentsText}>{ev.comments}</Text>
                      </View>
                    ) : null}
                    <Text style={styles.eventAuthor}>
                      By: <Text style={styles.boldAuthor}>{ev.author}</Text>
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
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
    height: 54,
    backgroundColor: Colors.surfaceCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 20,
    color: Colors.textPrimary,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: Colors.textMuted,
  },
  actionBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  tabContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surfaceCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
  },
  scrollArea: {
    flex: 1,
    padding: Spacing.md,
  },
  contentCol: {
    gap: Spacing.md,
  },
  card: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  customerName: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.brandDark,
    marginTop: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: 6,
  },
  phoneChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.brandSubtle,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  phoneIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  phoneText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.brandPrimary,
  },
  segmentBadge: {
    backgroundColor: Colors.surfaceInput,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  segmentText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  locationText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  customer360Link: {
    backgroundColor: Colors.brandSubtle,
    borderWidth: 1,
    borderColor: Colors.brandAccent,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  customer360LinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.brandPrimary,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  gridItem: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  fieldValueHighlight: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.brandDark,
  },
  fieldMono: {
    fontSize: 12,
    fontFamily: 'monospace',
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  convertedValueText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.status.converted.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.surfaceBorder,
    marginVertical: Spacing.sm,
  },
  assigneesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  assigneeChip: {
    backgroundColor: Colors.surfaceInput,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.xs,
  },
  assigneeChipText: {
    fontSize: 11,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  notesText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 2,
  },
  actionDock: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  actionDockBtn: {
    flex: 1,
    backgroundColor: Colors.surfaceCard,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.md,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionDockIcon: {
    fontSize: 16,
  },
  actionDockText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.brandDark,
    marginTop: 2,
  },
  // Activity Log
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  logCountBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.brandPrimary,
  },
  timelineList: {
    marginTop: Spacing.xs,
  },
  timelineItem: {
    flexDirection: 'row',
  },
  timelineNodeContainer: {
    width: 22,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 3,
  },
  statusDot: {
    backgroundColor: Colors.brandPrimary,
  },
  createDot: {
    backgroundColor: Colors.status.converted.text,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.surfaceBorder,
    marginVertical: 2,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: Spacing.sm,
    paddingBottom: Spacing.lg,
  },
  timelineHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  eventTime: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  eventDetail: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  commentsBox: {
    backgroundColor: Colors.surfaceInput,
    padding: 6,
    borderRadius: BorderRadius.xs,
    marginTop: 4,
  },
  commentsText: {
    fontSize: 11,
    color: Colors.brandDark,
    fontStyle: 'italic',
  },
  eventAuthor: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 4,
  },
  boldAuthor: {
    fontWeight: '600',
    color: Colors.textSecondary,
  },
});
