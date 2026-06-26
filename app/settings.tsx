import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppText } from '@/components/ui/AppText';
import { Card } from '@/components/ui/Card';
import { MaxWidth } from '@/components/ui/Layout';
import { palette, spacing, radius, TOUCH } from '@/theme/tokens';
import { useSettings, READING_LEVELS, LANGS, ReadingLevel, Lang } from '@/context/AppSettings';

function Row({ icon, title, hint, children }: { icon: keyof typeof Ionicons.glyphMap; title: string; hint?: string; children: React.ReactNode }) {
  const { colors } = useSettings();
  return (
    <View style={[styles.row, { borderColor: colors.hairline }]}>
      <View style={styles.rowHead}>
        <View style={styles.rowIcon}>
          <Ionicons name={icon} size={18} color={palette.flameDeep} />
        </View>
        <View style={{ flex: 1 }}>
          <AppText variant="bodyStrong">{title}</AppText>
          {hint && (
            <AppText variant="small" color={colors.muted} style={{ marginTop: 2 }}>
              {hint}
            </AppText>
          )}
        </View>
      </View>
      <View style={{ marginTop: spacing.md }}>{children}</View>
    </View>
  );
}

function Segmented<T extends string>({ options, value, onChange }: { options: { key: T; label: string }[]; value: T; onChange: (k: T) => void }) {
  const { colors } = useSettings();
  return (
    <View style={styles.seg}>
      {options.map((o) => {
        const on = o.key === value;
        return (
          <Pressable
            key={o.key}
            onPress={() => onChange(o.key)}
            style={[styles.segItem, { borderColor: on ? palette.flame : colors.hairline, backgroundColor: on ? 'rgba(224,123,0,0.10)' : colors.card }]}
            accessibilityRole="radio"
            accessibilityState={{ selected: on }}
            accessibilityLabel={o.label}
          >
            <AppText variant="small" color={on ? palette.flameDeep : colors.ink}>
              {o.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  const { colors } = useSettings();
  return (
    <Pressable
      onPress={() => onChange(!value)}
      style={[styles.toggle, { backgroundColor: value ? palette.flame : '#D8D1C2' }]}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={label}
    >
      <View style={[styles.knob, { alignSelf: value ? 'flex-end' : 'flex-start' }]} />
    </Pressable>
  );
}

function Stepper({ value, set, min, max, step, format }: { value: number; set: (n: number) => void; min: number; max: number; step: number; format: (n: number) => string }) {
  const { colors } = useSettings();
  const clamp = (n: number) => Math.min(max, Math.max(min, Math.round(n * 100) / 100));
  return (
    <View style={styles.stepper}>
      <Pressable onPress={() => set(clamp(value - step))} style={[styles.stepBtn, { borderColor: colors.hairline }]} accessibilityRole="button" accessibilityLabel="Decrease">
        <Ionicons name="remove" size={20} color={colors.ink} />
      </Pressable>
      <AppText variant="bodyStrong" style={{ minWidth: 80, textAlign: 'center' }}>
        {format(value)}
      </AppText>
      <Pressable onPress={() => set(clamp(value + step))} style={[styles.stepBtn, { borderColor: colors.hairline }]} accessibilityRole="button" accessibilityLabel="Increase">
        <Ionicons name="add" size={20} color={colors.ink} />
      </Pressable>
    </View>
  );
}

export default function Settings() {
  const router = useRouter();
  const s = useSettings();
  const { colors } = s;

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.paper }}>
      <View style={[styles.header, { borderBottomColor: colors.hairline }]}>
        <AppText variant="title">Settings & Accessibility</AppText>
        <Pressable onPress={() => router.back()} hitSlop={10} style={styles.closeBtn} accessibilityRole="button" accessibilityLabel="Close settings">
          <Ionicons name="close" size={26} color={colors.ink} />
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: spacing.xl }}>
        <MaxWidth max={640}>
          <Card pad>
            <Row icon="language-outline" title="Language" hint="For explanations and read-aloud">
              <Segmented<Lang> options={LANGS.map((l) => ({ key: l.key, label: l.key }))} value={s.lang} onChange={s.setLang} />
              <AppText variant="small" color={colors.muted} style={{ marginTop: spacing.sm }}>
                {LANGS.find((l) => l.key === s.lang)?.label}
              </AppText>
            </Row>

            <Row icon="school-outline" title="Default reading level" hint="How simply SULO explains">
              <Segmented<ReadingLevel> options={READING_LEVELS.map((r) => ({ key: r.key, label: r.label }))} value={s.readingLevel} onChange={s.setReadingLevel} />
            </Row>

            <Row icon="volume-high-outline" title="Voice (read aloud)" hint="Hear answers spoken">
              <View style={styles.inline}>
                <AppText variant="small" color={colors.muted}>
                  {s.voiceOn ? 'On' : 'Off'}
                </AppText>
                <Toggle value={s.voiceOn} onChange={s.setVoiceOn} label="Voice read aloud" />
              </View>
              {s.voiceOn && (
                <View style={{ marginTop: spacing.lg }}>
                  <AppText variant="small" color={colors.muted} style={{ marginBottom: spacing.sm }}>
                    Speaking speed
                  </AppText>
                  <Stepper value={s.voiceSpeed} set={s.setVoiceSpeed} min={0.75} max={1.5} step={0.25} format={(n) => `${n.toFixed(2)}×`} />
                </View>
              )}
            </Row>

            <Row icon="contrast-outline" title="High-contrast mode" hint="Stronger colors and borders">
              <View style={styles.inline}>
                <AppText variant="small" color={colors.muted}>
                  {s.highContrastOn ? 'On' : 'Off'}
                </AppText>
                <Toggle value={s.highContrastOn} onChange={s.setHighContrastOn} label="High contrast mode" />
              </View>
            </Row>

            <Row icon="text-outline" title="Text size" hint="Scales all text">
              <Stepper value={s.textScale} set={s.setTextScale} min={0.9} max={1.4} step={0.1} format={(n) => `${Math.round(n * 100)}%`} />
            </Row>

            <Row icon="pulse-outline" title="Reduce motion" hint="Calmer, minimal animation">
              <View style={styles.inline}>
                <AppText variant="small" color={colors.muted}>
                  {s.reduceMotion ? 'On' : 'Off'}
                </AppText>
                <Toggle value={s.reduceMotionOverride} onChange={s.setReduceMotionOverride} label="Reduce motion" />
              </View>
            </Row>
          </Card>

          <View style={styles.note}>
            <Ionicons name="shield-checkmark-outline" size={16} color={colors.muted} />
            <AppText variant="small" color={colors.muted} style={{ marginLeft: 8, flex: 1 }}>
              SULO gives understanding, not legal advice. For your exact situation, it routes you to
              PAO (free legal aid) and the DOLE hotline.
            </AppText>
          </View>
        </MaxWidth>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.xl, paddingVertical: spacing.lg, borderBottomWidth: 1 },
  closeBtn: { width: TOUCH, height: TOUCH, alignItems: 'center', justifyContent: 'center' },
  row: { paddingVertical: spacing.lg, borderBottomWidth: 1 },
  rowHead: { flexDirection: 'row', alignItems: 'center' },
  rowIcon: { width: 36, height: 36, borderRadius: radius.sm, backgroundColor: 'rgba(224,123,0,0.10)', alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  seg: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  segItem: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: radius.pill, borderWidth: 1.5, minHeight: 40, justifyContent: 'center' },
  inline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  toggle: { width: 52, height: 30, borderRadius: 15, padding: 3, justifyContent: 'center' },
  knob: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FFFFFF' },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  stepBtn: { width: TOUCH, height: TOUCH, borderRadius: radius.md, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  note: { flexDirection: 'row', alignItems: 'flex-start', marginTop: spacing.xl, paddingHorizontal: spacing.sm },
});
