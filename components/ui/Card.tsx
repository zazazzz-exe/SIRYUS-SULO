import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { radius, spacing, shadow } from '@/theme/tokens';
import { useSettings } from '@/context/AppSettings';

export function Card({
  children,
  style,
  pad = true,
  elevated,
}: {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  pad?: boolean;
  elevated?: boolean;
}) {
  const { colors } = useSettings();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.hairline },
        pad && styles.pad,
        elevated ? shadow.lift : shadow.card,
        style as ViewStyle,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  pad: { padding: spacing.xl },
});
