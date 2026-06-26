import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from './AppText';
import { palette, radius, spacing, TOUCH } from '@/theme/tokens';
import { useSettings } from '@/context/AppSettings';

const AView = Animated.createAnimatedComponent(View);

export function Chip({
  label,
  onPress,
  icon,
  active,
  tone = 'neutral',
}: {
  label: string;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  active?: boolean;
  tone?: 'neutral' | 'flame';
}) {
  const { reduceMotion, colors } = useSettings();
  const scale = useSharedValue(1);
  const aStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const flame = tone === 'flame' || active;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => !reduceMotion && (scale.value = withSpring(0.94, { damping: 18, stiffness: 360 }))}
      onPressOut={() => (scale.value = withSpring(1, { damping: 18, stiffness: 360 }))}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <AView
        style={[
          styles.chip,
          aStyle,
          { backgroundColor: flame ? 'rgba(224,123,0,0.12)' : colors.card, borderColor: flame ? palette.flame : colors.hairline },
        ]}
      >
        {icon && <Ionicons name={icon} size={14} color={flame ? palette.flameDeep : colors.muted} style={{ marginRight: 6 }} />}
        <AppText variant="small" color={flame ? palette.flameDeep : colors.ink} numberOfLines={1}>
          {label}
        </AppText>
      </AView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    minHeight: 40,
  },
});
