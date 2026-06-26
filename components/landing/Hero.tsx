import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { AppText } from '@/components/ui/AppText';
import { Wordmark } from '@/components/ui/Wordmark';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FlameGlow } from '@/components/ui/FlameGlow';
import { MaxWidth } from '@/components/ui/Layout';
import { palette, spacing } from '@/theme/tokens';
import { useDevice } from '@/hooks/useDevice';
import { useSettings } from '@/context/AppSettings';

export function Hero({ onSeeHow }: { onSeeHow: () => void }) {
  const router = useRouter();
  const { isMobile, isDesktop } = useDevice();
  const { reduceMotion, colors } = useSettings();

  // Stagger helper that respects reduced motion
  const ent = (i: number) => (reduceMotion ? undefined : FadeInUp.delay(120 * i).springify().damping(18));

  return (
    <View style={[styles.wrap, { minHeight: isMobile ? 560 : 660 }]}>
      <View style={styles.glowLayer} pointerEvents="none">
        <FlameGlow size={isMobile ? 420 : 620} />
      </View>

      <MaxWidth max={920}>
        <View style={styles.inner}>
          <Animated.View entering={reduceMotion ? undefined : FadeIn.duration(500)}>
            <Wordmark size={isDesktop ? 40 : 32} />
          </Animated.View>

          <Animated.View entering={ent(1)} style={{ marginTop: spacing.lg }}>
            <Badge label="Literacy, not advice" tone="flame" icon="flame" />
          </Animated.View>

          <Animated.View entering={ent(2)} style={{ marginTop: spacing.xl }}>
            <AppText variant="display" center style={{ fontSize: isMobile ? 34 : 52, lineHeight: isMobile ? 40 : 58 }}>
              Understand any legal document — in plain language, in your language.
            </AppText>
          </Animated.View>

          <Animated.View entering={ent(3)} style={{ marginTop: spacing.lg }}>
            <AppText variant="body" center color={colors.muted} style={{ fontSize: isMobile ? 16 : 18, maxWidth: 620 }}>
              SULO is a torch for confusing contracts, notices, and loans. It explains —
              it doesn’t give legal advice — and points you to real help when you need it.
            </AppText>
          </Animated.View>

          <Animated.View entering={ent(4)} style={[styles.btnRow, { flexDirection: isMobile ? 'column' : 'row' }]}>
            <Button
              label="Open the Coach"
              icon="flame"
              onPress={() => router.push('/coach')}
              full={isMobile}
              accessibilityHint="Opens the AI legal coach chat"
            />
            <Button
              label="See how it works"
              variant="secondary"
              iconRight="arrow-down"
              onPress={onSeeHow}
              full={isMobile}
            />
          </Animated.View>

          <Animated.View entering={ent(5)} style={styles.langRow}>
            {['English', 'Filipino / Taglish', 'Cebuano'].map((l) => (
              <View key={l} style={styles.langPill}>
                <AppText variant="mono" color={palette.blueprint} uppercase>
                  {l}
                </AppText>
              </View>
            ))}
          </Animated.View>
        </View>
      </MaxWidth>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xxxl, overflow: 'hidden' },
  glowLayer: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  inner: { alignItems: 'center' },
  btnRow: { gap: spacing.md, marginTop: spacing.xxl, alignItems: 'center' },
  langRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.xxl, justifyContent: 'center' },
  langPill: {
    borderWidth: 1,
    borderColor: '#D7E0E4',
    backgroundColor: '#EEF3F5',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 999,
  },
});
