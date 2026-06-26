import React from 'react';
import { View, StyleSheet, Pressable, ScrollView, Modal } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/ui/AppText';
import { Badge, CitedBasis } from '@/components/ui/Badge';
import { palette, spacing, radius, TOUCH } from '@/theme/tokens';
import { useSettings } from '@/context/AppSettings';
import { Clause } from '@/data/sample';
import { speak } from './speech';

function Section({ icon, label, tone, children }: { icon: keyof typeof Ionicons.glyphMap; label: string; tone: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: spacing.xl }}>
      <View style={styles.secLabel}>
        <Ionicons name={icon} size={14} color={tone} />
        <AppText variant="mono" uppercase color={tone} style={{ marginLeft: 6 }}>
          {label}
        </AppText>
      </View>
      {children}
    </View>
  );
}

function ClauseContent({ clause, onClose }: { clause: Clause; onClose: () => void }) {
  const { colors, lang, voiceSpeed, voiceOn } = useSettings();
  const high = clause.risk === 'HIGH';
  return (
    <>
      <View style={styles.head}>
        <Badge label={high ? 'High risk' : 'Medium risk'} tone={high ? 'risk' : 'risk-med'} icon="warning" />
        <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Close clause" hitSlop={10} style={styles.closeBtn}>
          <Ionicons name="close" size={24} color={colors.muted} />
        </Pressable>
      </View>
      <AppText variant="title" style={{ marginTop: spacing.md }}>
        {clause.title}
      </AppText>

      <Section icon="document-text-outline" label="Original clause" tone={colors.muted}>
        <View style={[styles.original, { borderColor: colors.hairline }]}>
          <AppText variant="body" color={colors.muted} style={{ fontFamily: 'IBMPlexMono_400Regular', fontSize: 14, lineHeight: 22 }}>
            “{clause.original}”
          </AppText>
        </View>
      </Section>

      <Section icon="sparkles-outline" label="In plain language" tone={palette.flameDeep}>
        <AppText variant="body">{clause.plain}</AppText>
        {voiceOn && (
          <Pressable onPress={() => speak(clause.plain, lang, voiceSpeed)} style={styles.readBtn} accessibilityRole="button" accessibilityLabel="Read plain language aloud">
            <Ionicons name="volume-high-outline" size={16} color={palette.blueprint} />
            <AppText variant="mono" uppercase color={palette.blueprint} style={{ marginLeft: 6 }}>
              Read aloud
            </AppText>
          </Pressable>
        )}
      </Section>

      <Section icon="warning-outline" label="Why it’s a risk" tone={palette.riskInk}>
        <View style={[styles.riskBox, { backgroundColor: high ? palette.riskBg : '#FBF1E3' }]}>
          <AppText variant="body" color={high ? palette.riskInk : palette.flameDeep}>
            {clause.why}
          </AppText>
        </View>
      </Section>

      <Section icon="library-outline" label="Cited basis" tone={palette.blueprint}>
        <CitedBasis text={clause.basis} />
      </Section>

      <View style={[styles.note, { borderColor: colors.hairline }]}>
        <Ionicons name="information-circle-outline" size={16} color={colors.muted} />
        <AppText variant="small" color={colors.muted} style={{ marginLeft: 8, flex: 1 }}>
          This explains the clause — it isn’t legal advice. For your exact situation, talk to PAO or DOLE.
        </AppText>
      </View>
    </>
  );
}

/** Desktop/web: an inline right panel. Render inside a flex row. */
export function ClauseSidePanel({ clause, onClose }: { clause: Clause; onClose: () => void }) {
  const { colors } = useSettings();
  return (
    <Animated.View
      entering={SlideInDown.springify().damping(22)}
      exiting={FadeOut}
      style={[styles.sidePanel, { backgroundColor: colors.card, borderLeftColor: colors.hairline }]}
    >
      <ScrollView contentContainerStyle={styles.panelScroll} showsVerticalScrollIndicator={false}>
        <ClauseContent clause={clause} onClose={onClose} />
      </ScrollView>
    </Animated.View>
  );
}

/** Mobile: a bottom sheet modal. */
export function ClauseBottomSheet({ clause, onClose }: { clause: Clause | null; onClose: () => void }) {
  const { colors } = useSettings();
  return (
    <Modal visible={!!clause} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.scrim}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close" />
        <Animated.View entering={SlideInDown.springify().damping(22)} exiting={SlideOutDown} style={[styles.sheet, { backgroundColor: colors.paper }]}>
          <View style={styles.sheetHandle} />
          <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxl }} showsVerticalScrollIndicator={false}>
            {clause && <ClauseContent clause={clause} onClose={onClose} />}
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  closeBtn: { width: TOUCH, height: TOUCH, alignItems: 'center', justifyContent: 'center' },
  secLabel: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  original: { borderWidth: 1, borderRadius: radius.md, padding: spacing.lg, backgroundColor: '#FBFAF6' },
  riskBox: { borderRadius: radius.md, padding: spacing.lg },
  readBtn: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.md, minHeight: 32 },
  note: { flexDirection: 'row', alignItems: 'flex-start', marginTop: spacing.xl, paddingTop: spacing.lg, borderTopWidth: 1 },
  sidePanel: { width: 380, borderLeftWidth: 1, height: '100%' },
  panelScroll: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  scrim: { flex: 1, backgroundColor: 'rgba(23,21,15,0.4)', justifyContent: 'flex-end' },
  sheet: { borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, padding: spacing.xl, maxHeight: '88%' },
  sheetHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: palette.hairline, alignSelf: 'center', marginBottom: spacing.lg },
});
