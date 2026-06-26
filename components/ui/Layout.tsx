import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { spacing } from '@/theme/tokens';
import { useDevice } from '@/hooks/useDevice';

/** Centers content with a max width and responsive horizontal padding. */
export function MaxWidth({ children, max = 1080, style }: { children: React.ReactNode; max?: number; style?: ViewStyle }) {
  const { isMobile } = useDevice();
  return (
    <View style={[styles.outer, { paddingHorizontal: isMobile ? spacing.xl : spacing.xxl }, style]}>
      <View style={{ width: '100%', maxWidth: max }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { width: '100%', alignItems: 'center' },
});
