import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from '@/theme/tokens';
import { useSettings } from '@/context/AppSettings';

/**
 * The signature torch glow — a soft amber light that slowly breathes.
 * Continuous motion via useSharedValue/useAnimatedStyle; gated by reduced motion.
 */
export function FlameGlow({ size = 520, beam = true }: { size?: number; beam?: boolean }) {
  const { reduceMotion } = useSettings();
  const pulse = useSharedValue(reduceMotion ? 0.5 : 0);

  useEffect(() => {
    if (reduceMotion) {
      pulse.value = 0.5;
      return;
    }
    pulse.value = withRepeat(
      withTiming(1, { duration: 3800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [reduceMotion, pulse]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: 0.55 + pulse.value * 0.35,
    transform: [{ scale: 0.92 + pulse.value * 0.16 }],
  }));

  const beamStyle = useAnimatedStyle(() => ({
    opacity: 0.18 + pulse.value * 0.22,
    transform: [{ scaleY: 0.96 + pulse.value * 0.1 }],
  }));

  return (
    <View pointerEvents="none" style={styles.wrap} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {beam && (
        <Animated.View style={[styles.beamWrap, beamStyle, { width: size * 0.9, height: size * 1.3 }]}>
          <LinearGradient
            colors={['rgba(224,123,0,0.0)', 'rgba(224,123,0,0.22)', 'rgba(224,123,0,0.0)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      )}
      <Animated.View style={[glowStyle, { width: size, height: size }]}>
        <View style={[styles.glow, { width: size, height: size, borderRadius: size / 2 }]} />
        <View
          style={[
            styles.core,
            {
              width: size * 0.5,
              height: size * 0.5,
              borderRadius: size * 0.25,
              top: size * 0.25,
              left: size * 0.25,
            },
          ]}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  beamWrap: { position: 'absolute', borderRadius: 400, overflow: 'hidden' },
  glow: {
    backgroundColor: palette.flameGlow,
    shadowColor: palette.flame,
    shadowOpacity: 0.55,
    shadowRadius: 120,
    shadowOffset: { width: 0, height: 0 },
  },
  core: {
    position: 'absolute',
    backgroundColor: 'rgba(224,123,0,0.28)',
  },
});
