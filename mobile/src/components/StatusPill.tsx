import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../theme/colors';
import { LeadStatus } from '../types';

interface StatusPillProps {
  status: LeadStatus | string;
  size?: 'sm' | 'md';
}

export const StatusPill: React.FC<StatusPillProps> = ({ status, size = 'md' }) => {
  const getStyle = () => {
    switch (status) {
      case 'New':
        return Colors.status.new;
      case 'Cold':
        return Colors.status.cold;
      case 'Warm':
        return Colors.status.warm;
      case 'Hot':
        return Colors.status.hot;
      case 'Nurturing':
        return Colors.status.nurturing;
      case 'Converted':
        return Colors.status.converted;
      case 'Lost':
      default:
        return Colors.status.lost;
    }
  };

  const colors = getStyle();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          paddingVertical: size === 'sm' ? 2 : 4,
          paddingHorizontal: size === 'sm' ? 6 : 10,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: colors.text,
            fontSize: size === 'sm' ? 10 : 11,
          },
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 9999,
    borderWidth: 1,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
});
