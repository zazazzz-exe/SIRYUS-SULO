import React from 'react';
import { Pressable, StyleSheet, ViewStyle, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from './AppText';
import { palette, radius, spacing, TOUCH } from '@/theme/tokens';
import { useSettings } from '@/context/AppSettings';

type Variant = 'primary' | 'secondary' | 'ghost';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: keyof typeof Ionicons.glyphMap;
  iconRight?: keyof typeof Ionicons.glyphMap;
  full?: boolean;
  small?: boolean;
  accessibilityHint?: string;
  style?: ViewStyle;
};

const AView = Animated.createAnimatedComponent(View);

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  iconRight,
  full,
  small,
  accessibilityHint,
  style,
}: Props) {
  const { reduceMotion } = useSettings();
  const scale = useSharedValue(1);

  const aStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const onIn = () => {
    if (!reduceMotion) scale.value = withSpring(0.96, { damping: 16, stiffness: 320 });
  };
  const onOut = () => {
    scale.value = withSpring(1, { damping: 16, stiffness: 320 });
  };

  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const fg = isPrimary ? '#FFF8EE' : palette.ink;
  const iconColor = isPrimary ? '#FFF8EE' : palette.flameDeep;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onIn}
      onPressOut={onOut}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      style={[full && styles.full]}
    >
      <AView
        style={[
          styles.base,
          small ? styles.small : styles.normal,
          isPrimary && styles.primary,
          isSecondary && styles.secondary,
          variant === 'ghost' && styles.ghost,
          full && styles.full,
          aStyle,
          style,
        ]}
      >
        {icon && <Ionicons name={icon} size={small ? 16 : 19} color={iconColor} style={styles.iconL} />}
        <AppText variant={small ? 'small' : 'bodyStrong'} color={fg}>
          {label}
        </AppText>
        {iconRight && <Ionicons name={iconRight} size={small ? 16 : 19} color={iconColor} style={styles.iconR} />}
      </AView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    minHeight: TOUCH,
  },
  normal: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  small: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, minHeight: 40 },
  full: { width: '100%' },
  primary: {
    backgroundColor: palette.flame,
    shadowColor: palette.flameDeep,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  secondary: {
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.hairline,
  },
  ghost: { backgroundColor: 'transparent' },
  iconL: { marginRight: spacing.sm },
  iconR: { marginLeft: spacing.sm },
});
