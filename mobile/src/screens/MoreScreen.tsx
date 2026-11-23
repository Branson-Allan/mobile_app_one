import React, { useState } from 'react';
import {
  Alert,
  Clipboard,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COMPANY_PROFILE } from '../data/mockData';
import { Colors } from '../theme/colors';
import { BorderRadius, Shadows, Spacing } from '../theme/spacing';

interface MoreScreenProps {
  onLogout: () => void;
  onOpenCustomer360?: () => void;
}

const ENTERPRISE_MODULES = [
  { name: 'Customer 360°', icon: '👤', desc: 'Omnichannel banking profiles & accounts' },
  { name: 'Lead Management', icon: '💼', desc: 'All leads, pipelines & opportunities' },
  { name: 'Activities & Events', icon: '📅', desc: 'Meetings, follow-ups & Nylas calendar' },
  { name: 'Helpdesk & Tickets', icon: '🎧', desc: 'Customer service & incident tickets' },
  { name: 'Reports & Analytics', icon: '📊', desc: 'Performance dashboards & exports' },
  { name: 'Telephony & PBX', icon: '📞', desc: 'Queue 8022 softphone integration' },
];

export const MoreScreen: React.FC<MoreScreenProps> = ({
  onLogout,
  onOpenCustomer360,
}) => {
  const [profile, setProfile] = useState(COMPANY_PROFILE);
  const [copiedKey, setCopiedKey] = useState(false);
  const [twoFactor, setTwoFactor] = useState(profile.twoFactorEnabled);
  const [currency, setCurrency] = useState(profile.currency);

  const handleCopyApiKey = () => {
    Clipboard.setString(profile.apiKey);
    setCopiedKey(true);
    Alert.alert('API Key Copied', 'Enterprise API Key copied to device clipboard.');
    setTimeout(() => setCopiedKey(false), 3000);
  };

  const handleToggle2FA = (val: boolean) => {
    setTwoFactor(val);
    Alert.alert(
      'Two-Factor Authentication',
      val
        ? 'Two-Factor Authentication (SMS & Authenticator) has been enabled.'
        : 'Two-Factor Authentication has been disabled.'
    );
  };

  const handleChangePassword = () => {
    Alert.alert(
      'Password Reset Dispatched',
      `A secure reset link has been dispatched to ${profile.user.email}`
    );
  };

  const handlePhotoUpload = () => {
    Alert.alert('Upload Photo', 'Accessing device camera & photo library...');
  };

  const handleAddTax = () => {
    Alert.alert('Add Tax Configuration', 'Open tax definition dialogue for KRA VAT / Withholding');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. Employee Profile Card */}
      <View style={[styles.card, Shadows.card]}>
        <View style={styles.profileHeader}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={handlePhotoUpload}
          >
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitial}>
                {profile.user.firstName.charAt(0)}
                {profile.user.lastName.charAt(0)}
              </Text>
            </View>
            <View style={styles.uploadIconBadge}>
              <Text style={styles.uploadIconText}>☁️</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            <Text style={styles.userName}>
              {profile.user.firstName} {profile.user.lastName}
            </Text>
            <Text style={styles.userRole}>{profile.user.role}</Text>
            <Text style={styles.userBranch}>🏢 {profile.user.branch}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.contactDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailVal}>{profile.user.email}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Mobile Phone:</Text>
            <Text style={styles.detailVal}>+{profile.user.phone}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>WhatsApp ID:</Text>
            <Text style={styles.detailVal}>{profile.user.whatsappId}</Text>
          </View>
        </View>
      </View>

      {/* 2. Company Details Card */}
      <View style={[styles.card, Shadows.card]}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeading}>Company & Enterprise Details</Text>
          <View style={styles.companyBadge}>
            <Text style={styles.companyBadgeText}>DTB Enterprise</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Company Name:</Text>
          <Text style={styles.boldVal}>{profile.companyName}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailVal}>{profile.phone}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Address:</Text>
          <Text style={[styles.detailVal, { flex: 1, textAlign: 'right' }]}>
            {profile.address}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Operating Currency Selector */}
        <View style={styles.currencyRow}>
          <Text style={styles.detailLabel}>Operating Currency:</Text>
          <View style={styles.currencyToggleRow}>
            {['KES', 'USD'].map((c) => (
              <TouchableOpacity
                key={c}
                style={[
                  styles.currencyChip,
                  currency === c && styles.currencyChipActive,
                ]}
                onPress={() => setCurrency(c)}
              >
                <Text
                  style={[
                    styles.currencyChipText,
                    currency === c && styles.currencyChipTextActive,
                  ]}
                >
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Enterprise API Key with Copy Target */}
        <View style={styles.apiKeySection}>
          <Text style={styles.detailLabel}>Enterprise API Key:</Text>
          <View style={styles.apiKeyRow}>
            <Text style={styles.apiKeyText} numberOfLines={1}>
              {profile.apiKey}
            </Text>
            <TouchableOpacity
              style={styles.copyBtn}
              onPress={handleCopyApiKey}
            >
              <Text style={styles.copyBtnText}>
                {copiedKey ? '✓ Copied' : 'Copy'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 3. Security & Governance Card */}
      <View style={[styles.card, Shadows.card]}>
        <Text style={styles.sectionHeading}>Security & Governance</Text>

        {/* 2FA Toggle */}
        <View style={styles.securityRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.securityTitle}>Two-Factor Authentication</Text>
            <Text style={styles.securitySubtitle}>
              Require biometric or OTP token on every sign-in
            </Text>
          </View>
          <Switch
            value={twoFactor}
            onValueChange={handleToggle2FA}
            trackColor={{ false: Colors.surfaceBorder, true: Colors.brandPrimary }}
            thumbColor={Colors.textInverse}
          />
        </View>

        <View style={styles.divider} />

        {/* Password Reset */}
        <View style={styles.securityRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.securityTitle}>Change Password</Text>
            <Text style={styles.securitySubtitle}>
              Last updated 32 days ago
            </Text>
          </View>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={handleChangePassword}
          >
            <Text style={styles.secondaryBtnText}>Update</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* Tax Configuration */}
        <View style={styles.securityRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.securityTitle}>Tax Configuration</Text>
            <Text style={styles.securitySubtitle}>
              KRA VAT (16%), WHT (5%)
            </Text>
          </View>
          <TouchableOpacity style={styles.secondaryBtn} onPress={handleAddTax}>
            <Text style={styles.secondaryBtnText}>+ Add Tax</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. Enterprise Module Hub */}
      <View style={[styles.card, Shadows.card]}>
        <Text style={styles.sectionHeading}>Enterprise Modules</Text>
        <View style={styles.moduleGrid}>
          {ENTERPRISE_MODULES.map((mod) => (
            <TouchableOpacity
              key={mod.name}
              style={styles.moduleItem}
              onPress={() => {
                if (mod.name === 'Customer 360°' && onOpenCustomer360) {
                  onOpenCustomer360();
                } else {
                  Alert.alert(mod.name, `Navigating to ${mod.name} module...`);
                }
              }}
            >
              <Text style={styles.moduleIcon}>{mod.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.moduleName}>{mod.name}</Text>
                <Text style={styles.moduleDesc}>{mod.desc}</Text>
              </View>
              <Text style={styles.moduleArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 5. Sign Out Button */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          Alert.alert(
            'Sign Out of Kati CRM',
            'Are you sure you want to end your session?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Sign Out', style: 'destructive', onPress: onLogout },
            ]
          );
        }}
      >
        <Text style={styles.logoutIcon}>🚪</Text>
        <Text style={styles.logoutText}>Sign Out of Kati CRM</Text>
      </TouchableOpacity>

      <Text style={styles.versionFootnote}>
        Kati CRM Enterprise Mobile v2.0 • DTB Africa Edition
      </Text>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceBg,
    padding: Spacing.md,
  },
  card: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: Spacing.md,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.brandDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textInverse,
  },
  uploadIconBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: Colors.brandPrimary,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.surfaceCard,
  },
  uploadIconText: {
    fontSize: 10,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  userRole: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.brandPrimary,
    marginTop: 2,
  },
  userBranch: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.surfaceBorder,
    marginVertical: Spacing.md,
  },
  contactDetails: {
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  detailVal: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  boldVal: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.brandDark,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  companyBadge: {
    backgroundColor: Colors.brandSubtle,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  companyBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.brandPrimary,
  },
  currencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  currencyToggleRow: {
    flexDirection: 'row',
    gap: 6,
  },
  currencyChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.surfaceInput,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  currencyChipActive: {
    backgroundColor: Colors.brandPrimary,
    borderColor: Colors.brandPrimary,
  },
  currencyChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  currencyChipTextActive: {
    color: Colors.textInverse,
  },
  apiKeySection: {
    marginTop: Spacing.sm,
  },
  apiKeyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceInput,
    borderRadius: BorderRadius.md,
    paddingLeft: Spacing.sm,
    paddingRight: 4,
    height: 40,
    marginTop: 4,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  apiKeyText: {
    flex: 1,
    fontSize: 11,
    fontFamily: 'monospace',
    color: Colors.textSecondary,
  },
  copyBtn: {
    backgroundColor: Colors.brandDark,
    paddingHorizontal: 12,
    height: 32,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textInverse,
  },
  securityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  securityTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  securitySubtitle: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  secondaryBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    backgroundColor: Colors.surfaceInput,
  },
  secondaryBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  moduleGrid: {
    marginTop: Spacing.sm,
    gap: 6,
  },
  moduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceInput,
    gap: Spacing.sm,
  },
  moduleIcon: {
    fontSize: 18,
  },
  moduleName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  moduleDesc: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  moduleArrow: {
    fontSize: 16,
    color: Colors.textMuted,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.status.hot.border,
    backgroundColor: '#FEF2F2',
    marginTop: Spacing.sm,
    gap: 8,
  },
  logoutIcon: {
    fontSize: 16,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.status.hot.text,
  },
  versionFootnote: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
