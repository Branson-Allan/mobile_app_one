import React from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../theme/colors';
import { BorderRadius, Shadows, Spacing } from '../theme/spacing';
import { Lead } from '../types';
import { StatusPill } from './StatusPill';

interface LeadCardProps {
  lead: Lead;
  onPress: () => void;
  onOpenActions: () => void;
  onOpenCustomer360?: () => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({
  lead,
  onPress,
  onOpenActions,
  onOpenCustomer360,
}) => {
  const handleCall = (e: any) => {
    e.stopPropagation();
    if (lead.phone) {
      Linking.openURL(`tel:${lead.phone}`);
    }
  };

  const formattedValue = lead.potentialValue
    ? `${lead.potentialCurrency || 'KES'} ${lead.potentialValue.toLocaleString()}`
    : 'Value N/A';

  const formattedConverted = lead.convertedValue
    ? ` • Converted: ${lead.convertedCurrency || 'KES'} ${lead.convertedValue.toLocaleString()}`
    : '';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.card, Shadows.card]}
      onPress={onPress}
    >
      {/* Header Row: ID, Status, Action Trigger */}
      <View style={styles.headerRow}>
        <Text style={styles.leadId}>{lead.id}</Text>
        <View style={styles.headerRight}>
          <StatusPill status={lead.status} size="sm" />
          <TouchableOpacity
            style={styles.ellipsisTouch}
            onPress={(e) => {
              e.stopPropagation();
              onOpenActions();
            }}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={styles.ellipsisIcon}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Customer Name */}
      <View style={styles.customerRow}>
        <Text style={styles.customerName} numberOfLines={1}>
          {lead.customer}
        </Text>
        {lead.cif && onOpenCustomer360 ? (
          <TouchableOpacity
            style={styles.badge360}
            onPress={(e) => {
              e.stopPropagation();
              onOpenCustomer360();
            }}
          >
            <Text style={styles.badge360Text}>360</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Contact & Meta Row */}
      <View style={styles.metaRow}>
        <TouchableOpacity style={styles.phoneLink} onPress={handleCall}>
          <Text style={styles.phoneIcon}>📞</Text>
          <Text style={styles.phoneText}>{lead.phone}</Text>
        </TouchableOpacity>
        {lead.location ? (
          <Text style={styles.metaItem} numberOfLines={1}>
            • 📍 {lead.location}
          </Text>
        ) : null}
        <View style={styles.segmentTag}>
          <Text style={styles.segmentText}>{lead.segment}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Commercial Details */}
      <View style={styles.commercialRow}>
        <View style={styles.productBadge}>
          <Text style={styles.productText} numberOfLines={1}>
            💼 {lead.productInterest || 'General Inquiry'}
          </Text>
        </View>
        <Text style={styles.valueText} numberOfLines={1}>
          💰 {formattedValue}
          <Text style={styles.convertedText}>{formattedConverted}</Text>
        </Text>
      </View>

      {/* Footer Row: Staff and Date */}
      <View style={styles.footerRow}>
        <Text style={styles.staffText} numberOfLines={1}>
          👤 {lead.assignedTo?.join(', ') || 'Unassigned'}
        </Text>
        <Text style={styles.dateText}>📅 {lead.createdDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  leadId: {
    fontSize: 12,
    fontFamily: 'monospace',
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  ellipsisTouch: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceInput,
  },
  ellipsisIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: Spacing.xs,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
  },
  badge360: {
    backgroundColor: Colors.brandSubtle,
    borderColor: Colors.brandAccent,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  badge360Text: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.brandPrimary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 6,
    gap: 6,
  },
  phoneLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneIcon: {
    fontSize: 12,
    marginRight: 3,
  },
  phoneText: {
    fontSize: 12,
    color: Colors.brandPrimary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  metaItem: {
    fontSize: 12,
    color: Colors.textSecondary,
    maxWidth: 140,
  },
  segmentTag: {
    backgroundColor: Colors.surfaceInput,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: BorderRadius.sm,
  },
  segmentText: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.surfaceBorder,
    marginVertical: Spacing.sm,
  },
  commercialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  productBadge: {
    backgroundColor: Colors.surfaceInput,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
    maxWidth: '55%',
  },
  productText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  valueText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.brandDark,
  },
  convertedText: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.status.converted.text,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  staffText: {
    fontSize: 11,
    color: Colors.textMuted,
    flex: 1,
  },
  dateText: {
    fontSize: 11,
    color: Colors.textMuted,
  },
});
