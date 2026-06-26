import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/ui/AppText';
import { palette, spacing, radius } from '@/theme/tokens';
import { useSettings } from '@/context/AppSettings';

/** A flickering amber flame while SULO "responds." */
export function TypingIndicator() {
  const { reduceMotion, colors } = useSettings();
  const flick = useSharedValue(0.5);

  useEffect(() => {
    if (reduceMotion) return;
    flick.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 280, easing: Easing.out(Easing.ease) }),
        withTiming(0.45, { duration: 360, easing: Easing.in(Easing.ease) }),
        withTiming(0.8, { duration: 220 })
      ),
      -1,
      false
    );
  }, [reduceMotion, flick]);

  const flameStyle = useAnimatedStyle(() => ({
    opacity: 0.6 + flick.value * 0.4,
    transform: [{ scale: 0.85 + flick.value * 0.35 }, { translateY: (1 - flick.value) * 2 }],
  }));

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={[styles.row, { backgroundColor: colors.card, borderColor: colors.hairline }]}
      accessibilityLabel="SULO is thinking"
      accessibilityRole="text"
    >
      <Animated.View style={flameStyle}>
        <Ionicons name="flame" size={18} color={palette.flame} />
      </Animated.View>
      <AppText variant="small" color={colors.muted} style={{ marginLeft: spacing.sm }}>
        SULO is reading…
      </AppText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
});
