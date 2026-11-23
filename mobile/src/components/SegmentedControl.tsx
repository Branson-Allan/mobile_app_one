import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../theme/colors';
import { BorderRadius, Shadows, Spacing } from '../theme/spacing';

export interface SegmentOption<T extends string> {
  id: T;
  label: string;
  badge?: number | string;
}

export interface SegmentedControlProps<T extends string> {
  options: (T | SegmentOption<T>)[];
  selectedOption?: T;
  selectedId?: T;
  onSelect: (id: T) => void;
  scrollable?: boolean;
}

export function SegmentedControl<T extends string>({
  options,
  selectedOption,
  selectedId,
  onSelect,
  scrollable = false,
}: SegmentedControlProps<T>) {
  const currentSelection = selectedOption || selectedId;

  // Normalize options to SegmentOption<T>
  const normalizedOptions: SegmentOption<T>[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { id: opt as T, label: opt };
    }
    return opt;
  });

  const content = (
    <View style={[styles.container, scrollable && styles.scrollableContainer]}>
      {normalizedOptions.map((option) => {
        const isSelected = option.id === currentSelection;
        return (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.segment,
              isSelected && [styles.selectedSegment, Shadows.card],
              scrollable && styles.scrollableSegment,
            ]}
            onPress={() => onSelect(option.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.segmentText,
                isSelected ? styles.selectedText : styles.unselectedText,
              ]}
              numberOfLines={1}
            >
              {option.label}
            </Text>
            {option.badge !== undefined ? (
              <View
                style={[
                  styles.badge,
                  isSelected ? styles.selectedBadge : styles.unselectedBadge,
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    isSelected ? styles.selectedBadgeText : styles.unselectedBadgeText,
                  ]}
                >
                  {option.badge}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollWrapper}
      >
        {content}
      </ScrollView>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceInput,
    borderRadius: BorderRadius.lg,
    padding: 3,
    alignItems: 'center',
  },
  scrollWrapper: {
    paddingHorizontal: Spacing.sm,
  },
  scrollableContainer: {
    backgroundColor: 'transparent',
    padding: 0,
    gap: Spacing.xs,
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.md,
    gap: 6,
  },
  scrollableSegment: {
    flex: 0,
    backgroundColor: Colors.surfaceInput,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 16,
  },
  selectedSegment: {
    backgroundColor: Colors.surfaceCard,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  segmentText: {
    fontSize: 13,
  },
  selectedText: {
    fontWeight: '700',
    color: Colors.brandPrimary,
  },
  unselectedText: {
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: BorderRadius.full,
  },
  selectedBadge: {
    backgroundColor: Colors.brandSubtle,
  },
  unselectedBadge: {
    backgroundColor: Colors.surfaceBorder,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  selectedBadgeText: {
    color: Colors.brandPrimary,
  },
  unselectedBadgeText: {
    color: Colors.textSecondary,
  },
});
