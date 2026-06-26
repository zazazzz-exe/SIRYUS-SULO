import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/ui/AppText';
import { Card } from '@/components/ui/Card';
import { FlameGlow } from '@/components/ui/FlameGlow';
import { palette, spacing, radius, TOUCH } from '@/theme/tokens';
import { useSettings } from '@/context/AppSettings';
import { STARTERS } from '@/data/sample';

export function EmptyState({ onStarter, onAttach }: { onStarter: (s: string) => void; onAttach: () => void }) {
  const { colors, reduceMotion } = useSettings();
  const ent = (i: number) => (reduceMotion ? undefined : FadeInUp.delay(i * 110).springify().damping(18));

  return (
    <View style={styles.wrap}>
      <View style={styles.glow} pointerEvents="none">
        <FlameGlow size={360} beam={false} />
      </View>

      <Animated.View entering={ent(0)} style={styles.mark}>
        <Ionicons name="flame" size={30} color="#FFF8EE" />
      </Animated.View>

      <Animated.View entering={ent(1)}>
        <AppText variant="displaySm" center style={{ marginTop: spacing.lg }}>
          I’m SULO.
        </AppText>
      </Animated.View>

      <Animated.View entering={ent(2)}>
        <AppText variant="body" center color={colors.muted} style={{ marginTop: spacing.md, maxWidth: 520, fontSize: 17 }}>
          Show me a document that’s confusing you — a contract, a notice, a loan — and I’ll
          explain it in plain language. Snap a photo, upload a PDF, or just ask.
        </AppText>
      </Animated.View>

      <Animated.View entering={ent(3)} style={styles.starterRow}>
        {STARTERS.map((s) => (
          <Pressable
            key={s.label}
            onPress={() => onStarter(s.label)}
            accessibilityRole="button"
            accessibilityLabel={s.label}
          >
            <Card style={styles.starter} pad={false}>
              <Ionicons name={s.icon as any} size={20} color={palette.flameDeep} />
              <AppText variant="small" style={{ marginTop: spacing.sm, textAlign: 'center' }}>
                {s.label}
              </AppText>
            </Card>
          </Pressable>
        ))}
      </Animated.View>

      <Animated.View entering={ent(4)} style={styles.affordRow}>
        {[
          { icon: 'camera-outline' as const, label: 'Snap a photo' },
          { icon: 'document-attach-outline' as const, label: 'Upload a PDF' },
          { icon: 'mic-outline' as const, label: 'Speak' },
        ].map((a) => (
          <Pressable key={a.label} onPress={onAttach} style={styles.afford} accessibilityRole="button" accessibilityLabel={a.label}>
            <Ionicons name={a.icon} size={18} color={palette.blueprint} />
            <AppText variant="small" color={palette.blueprint} style={{ marginLeft: 6 }}>
              {a.label}
            </AppText>
          </Pressable>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: spacing.xxl, paddingHorizontal: spacing.lg },
  glow: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'flex-start' },
  mark: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: palette.flame,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: palette.flame, shadowOpacity: 0.55, shadowRadius: 18, shadowOffset: { width: 0, height: 0 },
  },
  starterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginTop: spacing.xl, justifyContent: 'center' },
  starter: { width: 150, minHeight: 96, padding: spacing.lg, alignItems: 'center', justifyContent: 'center' },
  affordRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginTop: spacing.xl, justifyContent: 'center' },
  afford: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#EAF0F2',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderRadius: radius.pill, minHeight: TOUCH,
  },
});
