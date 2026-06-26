import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { AppText } from './AppText';
import { palette } from '@/theme/tokens';
import { useSettings } from '@/context/AppSettings';

/**
 * SULO wordmark with the amber flame dot — a small breathing glow on the dot.
 */
export function Wordmark({ size = 26, color }: { size?: number; color?: string }) {
  const { reduceMotion, colors } = useSettings();
  const flicker = useSharedValue(reduceMotion ? 0.5 : 0);

  useEffect(() => {
    if (reduceMotion) {
      flicker.value = 0.5;
      return;
    }
    flicker.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [reduceMotion, flicker]);

  const dotStyle = useAnimatedStyle(() => ({
    opacity: 0.7 + flicker.value * 0.3,
    transform: [{ scale: 0.85 + flicker.value * 0.3 }],
  }));

  const dot = Math.max(6, size * 0.28);

  return (
    <View style={styles.row} accessibilityRole="header" accessibilityLabel="SULO">
      <AppText variant="display" style={{ fontSize: size, lineHeight: size * 1.1 }} color={color ?? colors.ink}>
        SUL
      </AppText>
      <View style={{ width: size * 0.62, height: size, justifyContent: 'center' }}>
        {/* the 'O' rendered as a ring with a glowing flame dot inside */}
        <AppText
          variant="display"
          style={{ fontSize: size, lineHeight: size * 1.1 }}
          color={color ?? colors.ink}
        >
          O
        </AppText>
        <Animated.View
          style={[
            styles.dot,
            dotStyle,
            {
              width: dot,
              height: dot,
              borderRadius: dot / 2,
              top: size * 0.34,
              left: size * 0.21,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  dot: {
    position: 'absolute',
    backgroundColor: palette.flame,
    shadowColor: palette.flame,
    shadowOpacity: 0.9,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
});
