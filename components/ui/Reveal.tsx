import React, { createContext, useContext, useRef, useState } from 'react';
import { View, LayoutChangeEvent, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
import { useSettings } from '@/context/AppSettings';

type RevealCtx = { scrollY: SharedValue<number>; viewportH: SharedValue<number> };
const Ctx = createContext<RevealCtx | null>(null);

/**
 * A ScrollView that drives scroll reveals. Children wrapped in <Reveal> fade + rise
 * as they enter the viewport. Uses useAnimatedScrollHandler (cross-platform).
 */
export const RevealScrollView = React.forwardRef<Animated.ScrollView, React.ComponentProps<typeof Animated.ScrollView>>(
  function RevealScrollView({ onLayout, children, ...rest }, ref) {
    const scrollY = useSharedValue(0);
    const viewportH = useSharedValue(0);

    const handler = useAnimatedScrollHandler({
      onScroll: (e) => {
        scrollY.value = e.contentOffset.y;
      },
    });

    const onLayoutInner = (e: LayoutChangeEvent) => {
      viewportH.value = e.nativeEvent.layout.height;
      (onLayout as ((ev: LayoutChangeEvent) => void) | undefined)?.(e);
    };

    return (
      <Ctx.Provider value={{ scrollY, viewportH }}>
        <Animated.ScrollView
          ref={ref}
          onScroll={handler}
          scrollEventThrottle={16}
          onLayout={onLayoutInner}
          {...rest}
        >
          {children}
        </Animated.ScrollView>
      </Ctx.Provider>
    );
  }
);

export function Reveal({
  children,
  delay = 0,
  distance = 26,
  style,
}: {
  children: React.ReactNode;
  delay?: number; // 0..1 fraction of stagger (used as extra offset)
  distance?: number;
  style?: ViewStyle;
}) {
  const ctx = useContext(Ctx);
  const { reduceMotion } = useSettings();
  const [y, setY] = useState(0);
  const measured = useRef(false);

  const onLayout = (e: LayoutChangeEvent) => {
    if (!measured.current) {
      setY(e.nativeEvent.layout.y);
      measured.current = true;
    }
  };

  const aStyle = useAnimatedStyle(() => {
    if (!ctx || reduceMotion) return { opacity: 1, transform: [{ translateY: 0 }] };
    const vh = ctx.viewportH.value || 800;
    // progress: 0 when section's top is one viewport below fold, 1 when scrolled up into view
    const start = y - vh * 0.92 + delay * 80;
    const end = y - vh * 0.55 + delay * 80;
    const p = interpolate(ctx.scrollY.value, [start, end], [0, 1], Extrapolation.CLAMP);
    return {
      opacity: p,
      transform: [{ translateY: (1 - p) * distance }],
    };
  });

  return (
    <Animated.View onLayout={onLayout} style={[aStyle, style]}>
      {children}
    </Animated.View>
  );
}

/** Wrap a header/sub-section to measure within a parent Reveal. Pass-through View. */
export function MeasuredGroup({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={style}>{children}</View>;
}
