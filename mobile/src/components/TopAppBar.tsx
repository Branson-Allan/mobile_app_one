import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../theme/colors';
import { BorderRadius, Spacing } from '../theme/spacing';

interface TopAppBarProps {
  presenceState: 'online' | 'busy' | 'offline';
  onPressPresence: () => void;
  onPressNotifications: () => void;
  onPressProfile: () => void;
  unreadCount?: number;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  presenceState = 'online',
  onPressPresence,
  onPressNotifications,
  onPressProfile,
  unreadCount = 8,
}) => {
  const getPresenceColor = () => {
    switch (presenceState) {
      case 'online':
        return Colors.presence.online;
      case 'busy':
        return Colors.presence.busy;
      case 'offline':
      default:
        return Colors.presence.offline;
    }
  };

  return (
    <View style={styles.container}>
      {/* Brand Group */}
      <View style={styles.brandGroup}>
        <Text style={styles.logoText}>
          ka<Text style={styles.logoAccent}>ti</Text>
        </Text>
        <View style={styles.tenantBadge}>
          <Text style={styles.tenantText}>DTB Africa</Text>
        </View>
      </View>

      {/* Right Utilities */}
      <View style={styles.rightGroup}>
        {/* Presence Pill */}
        <TouchableOpacity
          style={styles.presencePill}
          onPress={onPressPresence}
          activeOpacity={0.8}
        >
          <View
            style={[styles.presenceDot, { backgroundColor: getPresenceColor() }]}
          />
          <Text style={styles.presenceText}>
            {presenceState === 'online'
              ? 'Online'
              : presenceState === 'busy'
              ? 'Busy'
              : 'Offline'}
          </Text>
          <Text style={styles.presenceChevron}>▾</Text>
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onPressNotifications}
        >
          <Text style={styles.utilityIcon}>🔔</Text>
          {unreadCount > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {unreadCount > 99 ? '99+' : unreadCount}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>

        {/* Profile Avatar */}
        <TouchableOpacity style={styles.profileAvatar} onPress={onPressProfile}>
          <Text style={styles.profileInitials}>BA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: Colors.shellNavy,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.textInverse,
    letterSpacing: -0.5,
  },
  logoAccent: {
    color: Colors.brandAccent,
  },
  tenantBadge: {
    backgroundColor: Colors.shellNavySurface,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    marginLeft: 6,
  },
  tenantText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.brandAccent,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  presencePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.shellNavySurface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  presenceDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  presenceText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textInverse,
  },
  presenceChevron: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  utilityIcon: {
    fontSize: 18,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: Colors.brandPrimary,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 4,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.textInverse,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.brandPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
  },
  profileInitials: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textInverse,
  },
});
