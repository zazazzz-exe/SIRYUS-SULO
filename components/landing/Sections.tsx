import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppText } from '@/components/ui/AppText';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Wordmark } from '@/components/ui/Wordmark';
import { Reveal } from '@/components/ui/Reveal';
import { MaxWidth } from '@/components/ui/Layout';
import { palette, spacing, radius } from '@/theme/tokens';
import { useDevice } from '@/hooks/useDevice';
import { useSettings } from '@/context/AppSettings';

const AView = Animated.createAnimatedComponent(View);

function Eyebrow({ children }: { children: string }) {
  return (
    <AppText variant="mono" color={palette.flameDeep} uppercase style={{ marginBottom: spacing.md }}>
      {children}
    </AppText>
  );
}

/** A card that lifts slightly on hover/press. */
function LiftCard({ children, onPress, style }: { children: React.ReactNode; onPress?: () => void; style?: any }) {
  const { reduceMotion } = useSettings();
  const lift = useSharedValue(0);
  const aStyle = useAnimatedStyle(() => ({ transform: [{ translateY: -lift.value * 6 }, { scale: 1 + lift.value * 0.015 }] }));
  const set = (v: number) => !reduceMotion && (lift.value = withSpring(v, { damping: 18, stiffness: 240 }));
  return (
    <Pressable
      onHoverIn={() => set(1)}
      onHoverOut={() => set(0)}
      onPressIn={() => set(1)}
      onPressOut={() => set(0)}
      onPress={onPress}
      style={style}
    >
      <AView style={aStyle}>{children}</AView>
    </Pressable>
  );
}

// 2. TRUST LINE
export function TrustLine() {
  const { colors } = useSettings();
  return (
    <View style={[styles.band, { backgroundColor: '#F3EDE1' }]}>
      <MaxWidth max={820}>
        <Reveal>
          <AppText variant="title" center color={colors.ink} style={{ fontSize: 24, lineHeight: 34 }}>
            Built for everyday Filipinos — a fresh grad reading their first BPO contract,
            a worker handed a notice, anyone facing words that decide their rights.
          </AppText>
        </Reveal>
      </MaxWidth>
    </View>
  );
}

// 3. WHAT IT DOES — three input modes
const MODES = [
  { icon: 'camera-outline' as const, emoji: '📸', title: 'Snap a photo', body: 'Point your camera at a printed contract or notice. SULO reads it.' },
  { icon: 'document-attach-outline' as const, emoji: '📄', title: 'Upload a PDF', body: 'Drop in a 12-page employment contract. We map it page by page.' },
  { icon: 'mic-outline' as const, emoji: '🗣️', title: 'Just ask', body: 'Speak or type in English, Filipino/Taglish, or Cebuano.' },
];

export function WhatItDoes() {
  const { isMobile } = useDevice();
  return (
    <View style={styles.section}>
      <MaxWidth>
        <Reveal>
          <Eyebrow>What it does</Eyebrow>
          <AppText variant="displaySm">Three easy ways to start</AppText>
          <AppText variant="body" color={palette.muted} style={{ marginTop: spacing.sm, maxWidth: 560 }}>
            Every action works by tap and by voice — never one or the other.
          </AppText>
        </Reveal>
        <View style={[styles.grid, { flexDirection: isMobile ? 'column' : 'row', marginTop: spacing.xxl }]}>
          {MODES.map((m, i) => (
            <Reveal key={m.title} delay={i} style={isMobile ? styles.full : styles.col3}>
              <LiftCard>
                <Card style={styles.modeCard}>
                  <View style={styles.modeIcon}>
                    <AppText style={{ fontSize: 26 }}>{m.emoji}</AppText>
                  </View>
                  <AppText variant="heading" style={{ marginTop: spacing.lg }}>
                    {m.title}
                  </AppText>
                  <AppText variant="body" color={palette.muted} style={{ marginTop: spacing.sm }}>
                    {m.body}
                  </AppText>
                </Card>
              </LiftCard>
            </Reveal>
          ))}
        </View>
      </MaxWidth>
    </View>
  );
}

// 4. HOW IT WORKS — 4 steps with a connecting line
const STEPS = [
  { n: '01', title: 'Capture', body: 'Photo, PDF, or your voice — in your language.', icon: 'scan-outline' as const },
  { n: '02', title: 'Understand', body: 'A plain-language rewrite, sized to your reading level.', icon: 'sparkles-outline' as const },
  { n: '03', title: 'Spot the risks', body: 'Risky clauses flagged HIGH or MED, with the reason.', icon: 'flag-outline' as const },
  { n: '04', title: 'Get real help', body: 'Routed to PAO & DOLE when you need a real person.', icon: 'people-outline' as const },
];

export function HowItWorks() {
  const { isMobile } = useDevice();
  return (
    <View style={[styles.band, { backgroundColor: palette.blueprint }]}>
      <MaxWidth>
        <Reveal>
          <AppText variant="mono" color="#9FC7D6" uppercase style={{ marginBottom: spacing.md }}>
            How it works
          </AppText>
          <AppText variant="displaySm" color="#FAF7F1">
            From confusing page to clear next step
          </AppText>
        </Reveal>
        <View style={[styles.steps, { flexDirection: isMobile ? 'column' : 'row', marginTop: spacing.xxl }]}>
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i} style={isMobile ? styles.full : styles.col4}>
              <View style={styles.step}>
                {/* connector line */}
                {i < STEPS.length - 1 && (
                  <View style={[styles.connector, isMobile ? styles.connectorV : styles.connectorH]} />
                )}
                <View style={styles.stepDot}>
                  <Ionicons name={s.icon} size={22} color={palette.flame} />
                </View>
                <AppText variant="mono" color="#9FC7D6" style={{ marginTop: spacing.lg }}>
                  STEP {s.n}
                </AppText>
                <AppText variant="heading" color="#FFFFFF" style={{ marginTop: 4 }}>
                  {s.title}
                </AppText>
                <AppText variant="small" color="#CFE0E7" style={{ marginTop: spacing.sm }}>
                  {s.body}
                </AppText>
              </View>
            </Reveal>
          ))}
        </View>
      </MaxWidth>
    </View>
  );
}

// 5. FEATURES grid
const FEATURES = [
  { icon: 'language-outline' as const, title: 'Plain-language rewrite', body: 'Legalese turned into words you actually use.' },
  { icon: 'warning-outline' as const, title: 'Risk flags', body: 'Clauses that could hurt you, marked clearly.' },
  { icon: 'library-outline' as const, title: 'Grounded & cited answers', body: 'Every answer shows its basis — Labor Code, DOLE.' },
  { icon: 'volume-high-outline' as const, title: 'Voice in & out', body: 'Ask by voice; have answers read aloud.' },
  { icon: 'cloud-offline-outline' as const, title: 'Works offline', body: 'Core explanations available with no signal.' },
  { icon: 'accessibility-outline' as const, title: 'Made accessible', body: 'Large text, high contrast, screen-reader ready.' },
];

export function Features() {
  const { isMobile, isDesktop } = useDevice();
  const colW = isMobile ? styles.full : isDesktop ? styles.col3 : styles.col2;
  return (
    <View style={styles.section}>
      <MaxWidth>
        <Reveal>
          <Eyebrow>Features</Eyebrow>
          <AppText variant="displaySm">Everything a first reader needs</AppText>
        </Reveal>
        <View style={[styles.grid, { marginTop: spacing.xxl }]}>
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i % 3} style={colW}>
              <LiftCard>
                <Card style={styles.featCard}>
                  <View style={styles.featIcon}>
                    <Ionicons name={f.icon} size={20} color={palette.flameDeep} />
                  </View>
                  <AppText variant="bodyStrong" style={{ marginTop: spacing.md }}>
                    {f.title}
                  </AppText>
                  <AppText variant="small" color={palette.muted} style={{ marginTop: 6 }}>
                    {f.body}
                  </AppText>
                </Card>
              </LiftCard>
            </Reveal>
          ))}
        </View>
      </MaxWidth>
    </View>
  );
}

// 6. FOR EVERYONE
export function ForEveryone() {
  const { isMobile } = useDevice();
  const items = [
    { icon: 'globe-outline' as const, t: 'Three languages', b: 'English · Filipino/Taglish · Cebuano' },
    { icon: 'ear-outline' as const, t: 'Voice in & out', b: 'Listen and speak, hands-free' },
    { icon: 'text-outline' as const, t: 'Large text', b: 'Scale text without breaking layouts' },
    { icon: 'images-outline' as const, t: 'Multimodal', b: 'Photo, PDF, or plain conversation' },
  ];
  return (
    <View style={[styles.band, { backgroundColor: '#EAF0E3' }]}>
      <MaxWidth>
        <Reveal>
          <AppText variant="mono" color={palette.safeInk} uppercase style={{ marginBottom: spacing.md }}>
            For everyone
          </AppText>
          <AppText variant="displaySm" color={palette.ink}>
            SULO is for the general public — not just lawyers
          </AppText>
        </Reveal>
        <View style={[styles.grid, { flexDirection: isMobile ? 'column' : 'row', marginTop: spacing.xxl }]}>
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i} style={isMobile ? styles.full : styles.col4}>
              <View style={styles.everyItem}>
                <Ionicons name={it.icon} size={24} color={palette.safeInk} />
                <AppText variant="bodyStrong" style={{ marginTop: spacing.md }}>
                  {it.t}
                </AppText>
                <AppText variant="small" color={palette.muted} style={{ marginTop: 4 }}>
                  {it.b}
                </AppText>
              </View>
            </Reveal>
          ))}
        </View>
      </MaxWidth>
    </View>
  );
}

// 7. THE PROMISE
export function Promise() {
  const { colors } = useSettings();
  return (
    <View style={styles.section}>
      <MaxWidth max={860}>
        <Reveal>
          <Card style={{ borderColor: palette.flame, borderWidth: 1.5 }}>
            <Badge label="The promise" tone="flame" icon="shield-checkmark-outline" />
            <AppText variant="title" style={{ marginTop: spacing.lg, fontSize: 26, lineHeight: 36 }}>
              SULO gives you understanding — never legal advice.
            </AppText>
            <AppText variant="body" color={colors.muted} style={{ marginTop: spacing.md }}>
              We help you read what a document actually says and where the risks are. When a
              situation needs a real lawyer, SULO says so plainly and routes you to PAO (free
              legal aid) and the DOLE hotline — so a real person can help.
            </AppText>
            <View style={styles.promiseRow}>
              <View style={styles.helpPill}>
                <Ionicons name="call-outline" size={15} color={palette.blueprint} />
                <AppText variant="small" color={palette.blueprint} style={{ marginLeft: 6 }}>
                  PAO · Free legal aid
                </AppText>
              </View>
              <View style={styles.helpPill}>
                <Ionicons name="megaphone-outline" size={15} color={palette.blueprint} />
                <AppText variant="small" color={palette.blueprint} style={{ marginLeft: 6 }}>
                  DOLE Hotline · 1349
                </AppText>
              </View>
            </View>
          </Card>
        </Reveal>
      </MaxWidth>
    </View>
  );
}

// 8. CTA BAND
export function CtaBand() {
  const router = useRouter();
  const { isMobile } = useDevice();
  return (
    <View style={[styles.band, { backgroundColor: palette.ink }]}>
      <MaxWidth max={760}>
        <Reveal style={{ alignItems: 'center' }}>
          <Wordmark size={28} color="#FAF7F1" />
          <AppText variant="display" center color="#FAF7F1" style={{ marginTop: spacing.lg, fontSize: isMobile ? 30 : 40 }}>
            Ready? Open the Coach.
          </AppText>
          <AppText variant="body" center color="#C9C2B2" style={{ marginTop: spacing.md, maxWidth: 480 }}>
            Read it with a torch before you sign it.
          </AppText>
          <View style={{ marginTop: spacing.xl }}>
            <Button label="Open the Coach" icon="flame" onPress={() => router.push('/coach')} />
          </View>
        </Reveal>
      </MaxWidth>
    </View>
  );
}

// 9. FOOTER
export function Footer() {
  const router = useRouter();
  const { isMobile } = useDevice();
  return (
    <View style={[styles.section, { backgroundColor: '#F3EDE1', paddingVertical: spacing.xxl }]}>
      <MaxWidth>
        <View style={[styles.footRow, { flexDirection: isMobile ? 'column' : 'row' }]}>
          <View style={{ maxWidth: 320 }}>
            <Wordmark size={22} />
            <AppText variant="small" color={palette.muted} style={{ marginTop: spacing.md }}>
              SULO — a torch for legal understanding. Team Siryus, ACM TechSprint
              (Asteria: Illuminate the Future).
            </AppText>
          </View>
          <View style={[styles.footLinks, { marginTop: isMobile ? spacing.xl : 0 }]}>
            {([
              ['Home', '/'],
              ['Coach', '/coach'],
              ['Glossary', '/glossary'],
              ['Settings', '/settings'],
            ] as const).map(([label, path]) => (
              <Pressable key={path} onPress={() => router.push(path)} accessibilityRole="link" accessibilityLabel={label}>
                <AppText variant="small" color={palette.ink} style={{ paddingVertical: spacing.sm }}>
                  {label}
                </AppText>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.footBottom}>
          <AppText variant="mono" color={palette.muted} uppercase>
            Understanding, not advice · © 2026 Team Siryus
          </AppText>
        </View>
      </MaxWidth>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { width: '100%', paddingVertical: spacing.xxxl },
  band: { width: '100%', paddingVertical: spacing.xxxl, alignItems: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.lg, width: '100%' },
  steps: { gap: spacing.lg, width: '100%' },
  full: { width: '100%' },
  col2: { flexGrow: 1, flexBasis: '46%', minWidth: 240 },
  col3: { flexGrow: 1, flexBasis: '30%', minWidth: 220 },
  col4: { flexGrow: 1, flexBasis: '22%', minWidth: 180 },
  modeCard: { minHeight: 180 },
  modeIcon: {
    width: 56, height: 56, borderRadius: radius.md,
    backgroundColor: 'rgba(224,123,0,0.10)', alignItems: 'center', justifyContent: 'center',
  },
  featCard: { minHeight: 150 },
  featIcon: {
    width: 44, height: 44, borderRadius: radius.sm,
    backgroundColor: 'rgba(224,123,0,0.10)', alignItems: 'center', justifyContent: 'center',
  },
  step: { paddingVertical: spacing.md, position: 'relative' },
  stepDot: {
    width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center',
  },
  connector: { position: 'absolute', backgroundColor: 'rgba(255,255,255,0.2)' },
  connectorH: { height: 2, top: 26, left: 52, right: -spacing.lg },
  connectorV: { width: 2, left: 25, top: 52, height: spacing.lg + 8 },
  everyItem: { paddingVertical: spacing.md },
  promiseRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginTop: spacing.xl },
  helpPill: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#EAF0F2',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderRadius: radius.pill,
  },
  footRow: { justifyContent: 'space-between', width: '100%' },
  footLinks: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xl },
  footBottom: { marginTop: spacing.xxl, paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: '#E2DACA' },
});
