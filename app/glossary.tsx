import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown, FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { NavShell } from '@/components/NavShell';
import { AppText } from '@/components/ui/AppText';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MaxWidth } from '@/components/ui/Layout';
import { palette, spacing, radius, TOUCH } from '@/theme/tokens';
import { useDevice } from '@/hooks/useDevice';
import { useSettings } from '@/context/AppSettings';
import { GLOSSARY, GlossaryTerm } from '@/data/sample';
import { speak } from '@/components/coach/speech';

function VideoPlaceholder() {
  return (
    <View style={styles.video} accessibilityLabel="Filipino Sign Language video placeholder">
      <View style={styles.playBtn}>
        <Ionicons name="play" size={26} color="#FFF8EE" />
      </View>
      <AppText variant="mono" uppercase color="#9FC7D6" style={{ marginTop: spacing.md }}>
        FSL video · coming soon
      </AppText>
    </View>
  );
}

export default function Glossary() {
  const { isMobile } = useDevice();
  const { colors, lang, voiceOn, voiceSpeed, reduceMotion } = useSettings();
  const [active, setActive] = useState<GlossaryTerm | null>(null);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.paper }}>
      <NavShell />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: spacing.xxl }}>
        <MaxWidth max={900}>
          <AppText variant="mono" uppercase color={palette.flameDeep} style={{ marginBottom: spacing.md }}>
            FSL Glossary
          </AppText>
          <AppText variant="displaySm">Legal terms in plain language & sign</AppText>
          <AppText variant="body" color={colors.muted} style={{ marginTop: spacing.sm, maxWidth: 560 }}>
            Tap a term for a Filipino Sign Language explainer and a plain-language definition.
          </AppText>

          <View style={[styles.grid, { marginTop: spacing.xxl }]}>
            {GLOSSARY.map((g, i) => (
              <Animated.View
                key={g.term}
                entering={reduceMotion ? undefined : FadeInUp.delay(i * 80).springify().damping(18)}
                style={isMobile ? styles.full : styles.col2}
              >
                <Pressable onPress={() => setActive(g)} accessibilityRole="button" accessibilityLabel={`${g.term}. Open definition and sign video.`}>
                  <Card style={styles.termCard}>
                    <View style={styles.termHead}>
                      <View style={styles.signIcon}>
                        <Ionicons name="hand-left-outline" size={20} color={palette.blueprint} />
                      </View>
                      <Ionicons name="chevron-forward" size={18} color={colors.muted} />
                    </View>
                    <AppText variant="title" style={{ marginTop: spacing.md }}>
                      {g.term}
                    </AppText>
                    {g.tagalog && (
                      <AppText variant="mono" uppercase color={colors.muted} style={{ marginTop: 4 }}>
                        {g.tagalog}
                      </AppText>
                    )}
                    <AppText variant="small" color={colors.muted} style={{ marginTop: spacing.md }} numberOfLines={2}>
                      {g.def}
                    </AppText>
                  </Card>
                </Pressable>
              </Animated.View>
            ))}
          </View>
        </MaxWidth>
      </ScrollView>

      <Modal visible={!!active} transparent animationType="none" onRequestClose={() => setActive(null)}>
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.scrim}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setActive(null)} accessibilityLabel="Close" />
          <Animated.View entering={SlideInDown.springify().damping(22)} exiting={SlideOutDown} style={[styles.sheet, { backgroundColor: colors.paper }]}>
            <View style={styles.sheetHandle} />
            {active && (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xl }}>
                <View style={styles.modalHead}>
                  <AppText variant="title">{active.term}</AppText>
                  <Pressable onPress={() => setActive(null)} hitSlop={10} style={styles.closeBtn} accessibilityRole="button" accessibilityLabel="Close">
                    <Ionicons name="close" size={24} color={colors.muted} />
                  </Pressable>
                </View>
                <VideoPlaceholder />
                <Badge label="Plain language" tone="flame" icon="sparkles-outline" />
                <AppText variant="body" style={{ marginTop: spacing.md }}>
                  {active.def}
                </AppText>
                <View style={[styles.example, { borderColor: colors.hairline }]}>
                  <AppText variant="mono" uppercase color={colors.muted} style={{ marginBottom: 6 }}>
                    Example
                  </AppText>
                  <AppText variant="body" color={colors.ink}>
                    {active.example}
                  </AppText>
                </View>
                {voiceOn && (
                  <Pressable onPress={() => speak(`${active.term}. ${active.def}`, lang, voiceSpeed)} style={styles.readBtn} accessibilityRole="button" accessibilityLabel="Read definition aloud">
                    <Ionicons name="volume-high-outline" size={16} color={palette.blueprint} />
                    <AppText variant="mono" uppercase color={palette.blueprint} style={{ marginLeft: 6 }}>
                      Read aloud
                    </AppText>
                  </Pressable>
                )}
              </ScrollView>
            )}
          </Animated.View>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.lg },
  full: { width: '100%' },
  col2: { flexGrow: 1, flexBasis: '46%', minWidth: 240 },
  termCard: { minHeight: 150 },
  termHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  signIcon: { width: 44, height: 44, borderRadius: radius.sm, backgroundColor: '#E6EDF0', alignItems: 'center', justifyContent: 'center' },
  scrim: { flex: 1, backgroundColor: 'rgba(23,21,15,0.4)', justifyContent: 'flex-end' },
  sheet: { borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, padding: spacing.xl, maxHeight: '90%' },
  sheetHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: palette.hairline, alignSelf: 'center', marginBottom: spacing.lg },
  modalHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg },
  closeBtn: { width: TOUCH, height: TOUCH, alignItems: 'center', justifyContent: 'center' },
  video: { backgroundColor: palette.blueprint, borderRadius: radius.lg, paddingVertical: spacing.xxl, alignItems: 'center', marginBottom: spacing.xl },
  playBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(224,123,0,0.9)', alignItems: 'center', justifyContent: 'center' },
  example: { borderWidth: 1, borderRadius: radius.md, padding: spacing.lg, marginTop: spacing.lg, backgroundColor: '#FBFAF6' },
  readBtn: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg, minHeight: TOUCH },
});
