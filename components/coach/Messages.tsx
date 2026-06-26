import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Linking } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/ui/AppText';
import { Card } from '@/components/ui/Card';
import { Badge, CitedBasis } from '@/components/ui/Badge';
import { Chip } from '@/components/ui/Chip';
import { palette, spacing, radius, TOUCH } from '@/theme/tokens';
import { useSettings } from '@/context/AppSettings';
import { speak, stopSpeaking } from './speech';
import { CLAUSES, DOC_ANALYSIS, Clause } from '@/data/sample';

function entering(reduceMotion: boolean, i = 0) {
  return reduceMotion ? undefined : FadeInUp.delay(i * 60).springify().damping(20);
}

function SuloMark() {
  return (
    <View style={styles.avatar} accessibilityElementsHidden>
      <Ionicons name="flame" size={16} color="#FFF8EE" />
    </View>
  );
}

function AssistantShell({ children, i }: { children: React.ReactNode; i?: number }) {
  const { reduceMotion } = useSettings();
  return (
    <Animated.View entering={entering(reduceMotion, i)} style={styles.assistantRow}>
      <SuloMark />
      <View style={styles.assistantBody}>{children}</View>
    </Animated.View>
  );
}

export function UserBubble({ text }: { text: string }) {
  const { reduceMotion } = useSettings();
  return (
    <Animated.View entering={entering(reduceMotion)} style={styles.userRow}>
      <View style={styles.userBubble}>
        <AppText variant="body" color="#FFF8EE">
          {text}
        </AppText>
      </View>
    </Animated.View>
  );
}

function ReadAloud({ text }: { text: string }) {
  const { lang, voiceSpeed, voiceOn, colors } = useSettings();
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    if (playing) {
      stopSpeaking();
      setPlaying(false);
    } else {
      speak(text, lang, voiceSpeed);
      setPlaying(true);
    }
  };
  if (!voiceOn) return null;
  return (
    <Pressable
      onPress={toggle}
      style={styles.readAloud}
      accessibilityRole="button"
      accessibilityLabel={playing ? 'Stop reading aloud' : 'Read aloud'}
      hitSlop={6}
    >
      <Ionicons name={playing ? 'stop-circle' : 'volume-high-outline'} size={16} color={palette.blueprint} />
      <AppText variant="mono" color={palette.blueprint} uppercase style={{ marginLeft: 6 }}>
        {playing ? 'Stop' : 'Read aloud'}
      </AppText>
    </Pressable>
  );
}

// 1. Plain-language answer
export function AnswerCard({
  text,
  basis,
  followups,
  onChip,
}: {
  text: string;
  basis: string;
  followups?: string[];
  onChip?: (s: string) => void;
}) {
  return (
    <AssistantShell>
      <Card>
        <AppText variant="body">{text}</AppText>
        <CitedBasis text={basis} />
        <View style={styles.answerFoot}>
          <ReadAloud text={text} />
          <View style={styles.adviceLine}>
            <Ionicons name="information-circle-outline" size={14} color={palette.muted} />
            <AppText variant="mono" color={palette.muted} uppercase style={{ marginLeft: 5 }}>
              Not legal advice
            </AppText>
          </View>
        </View>
      </Card>
      {!!followups?.length && (
        <View style={styles.chipsWrap}>
          {followups.map((f) => (
            <Chip key={f} label={f} onPress={() => onChip?.(f)} tone="flame" />
          ))}
        </View>
      )}
    </AssistantShell>
  );
}

// 2. Document-analysis card
export function DocCard({ i }: { i?: number }) {
  const { colors } = useSettings();
  return (
    <AssistantShell i={i}>
      <Card>
        <View style={styles.docHead}>
          <View style={styles.docIcon}>
            <Ionicons name="document-text" size={20} color={palette.blueprint} />
          </View>
          <View style={{ flex: 1 }}>
            <AppText variant="bodyStrong">{DOC_ANALYSIS.title}</AppText>
            <AppText variant="small" color={colors.muted} style={{ marginTop: 2 }}>
              {DOC_ANALYSIS.pages} pages · scanned & mapped
            </AppText>
          </View>
        </View>
        <View style={[styles.factsStrip, { borderColor: colors.hairline }]}>
          {DOC_ANALYSIS.facts.map((f) => (
            <View key={f.label} style={styles.fact}>
              <AppText variant="mono" color={colors.muted} uppercase>
                {f.label}
              </AppText>
              <AppText variant="bodyStrong" style={{ marginTop: 3 }}>
                {f.value}
              </AppText>
            </View>
          ))}
        </View>
        <View style={styles.foundRow}>
          <Ionicons name="flag" size={15} color={palette.riskInk} />
          <AppText variant="bodyStrong" color={palette.riskInk} style={{ marginLeft: 6 }}>
            I found {DOC_ANALYSIS.flaggedCount} things worth a closer look.
          </AppText>
        </View>
      </Card>
    </AssistantShell>
  );
}

// 3. Risk-flag cards
export function RiskCards({ onOpenClause, i }: { onOpenClause: (c: Clause) => void; i?: number }) {
  const { colors } = useSettings();
  return (
    <AssistantShell i={i}>
      <AppText variant="mono" color={palette.muted} uppercase style={{ marginBottom: spacing.md }}>
        3 things worth a closer look
      </AppText>
      <View style={{ gap: spacing.md }}>
        {CLAUSES.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => onOpenClause(c)}
            accessibilityRole="button"
            accessibilityLabel={`${c.title}. Risk ${c.risk}. Tap to open full clause.`}
          >
            <Card style={styles.riskCard}>
              <View style={styles.riskTop}>
                <Badge
                  label={c.risk === 'HIGH' ? 'High risk' : 'Medium risk'}
                  tone={c.risk === 'HIGH' ? 'risk' : 'risk-med'}
                  icon="warning"
                />
                <Ionicons name="chevron-forward" size={18} color={colors.muted} />
              </View>
              <AppText variant="bodyStrong" style={{ marginTop: spacing.md }}>
                {c.title}
              </AppText>
              <AppText variant="small" color={colors.muted} style={{ marginTop: 4 }} numberOfLines={2}>
                {c.why}
              </AppText>
              <CitedBasis text={c.basis} />
            </Card>
          </Pressable>
        ))}
      </View>
    </AssistantShell>
  );
}

// 4. What-if card
export function WhatIfCard({
  question,
  consequence,
  clauseTitle,
  onOpen,
  i,
}: {
  question: string;
  consequence: string;
  clauseTitle: string;
  onOpen: () => void;
  i?: number;
}) {
  const { colors } = useSettings();
  return (
    <AssistantShell i={i}>
      <Card style={{ borderColor: palette.flame, borderWidth: 1.5 }}>
        <Badge label="What if…" tone="flame" icon="help-circle-outline" />
        <AppText variant="bodyStrong" style={{ marginTop: spacing.md }}>
          {question}
        </AppText>
        <AppText variant="body" color={colors.ink} style={{ marginTop: spacing.sm }}>
          {consequence}
        </AppText>
        <Pressable onPress={onOpen} style={styles.linkRow} accessibilityRole="button" accessibilityLabel={`Open clause: ${clauseTitle}`}>
          <Ionicons name="link-outline" size={15} color={palette.blueprint} />
          <AppText variant="small" color={palette.blueprint} style={{ marginLeft: 6 }}>
            See the exact clause: {clauseTitle}
          </AppText>
        </Pressable>
      </Card>
    </AssistantShell>
  );
}

// 5. Low-confidence / escalation card
export function EscalationCard({ i }: { i?: number }) {
  const { colors } = useSettings();
  const call = (num: string) => Linking.openURL(`tel:${num}`).catch(() => {});
  return (
    <AssistantShell i={i}>
      <Card style={{ backgroundColor: '#FCF6EC', borderColor: '#E9D9BD' }}>
        <View style={styles.escHead}>
          <Ionicons name="hand-right-outline" size={20} color={palette.flameDeep} />
          <AppText variant="bodyStrong" style={{ marginLeft: spacing.sm, flex: 1 }}>
            I’m not certain about this — please talk to a real lawyer.
          </AppText>
        </View>
        <AppText variant="small" color={colors.muted} style={{ marginTop: spacing.sm }}>
          This is the boundary of what I should explain. A real person can look at your exact
          situation and act on it.
        </AppText>
        <View style={styles.escBtns}>
          <Pressable onPress={() => call('029301700')} style={[styles.escBtn, { backgroundColor: palette.blueprint }]} accessibilityRole="button" accessibilityLabel="Call PAO, free legal aid">
            <Ionicons name="call" size={16} color="#FFF" />
            <AppText variant="bodyStrong" color="#FFF" style={{ marginLeft: 8 }}>
              PAO · Free legal aid
            </AppText>
          </Pressable>
          <Pressable onPress={() => call('1349')} style={[styles.escBtn, { backgroundColor: palette.ink }]} accessibilityRole="button" accessibilityLabel="Call DOLE hotline 1349">
            <Ionicons name="megaphone" size={16} color="#FFF" />
            <AppText variant="bodyStrong" color="#FFF" style={{ marginLeft: 8 }}>
              DOLE Hotline · 1349
            </AppText>
          </Pressable>
        </View>
      </Card>
    </AssistantShell>
  );
}

const styles = StyleSheet.create({
  assistantRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.xl, gap: spacing.md },
  assistantBody: { flex: 1 },
  avatar: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: palette.flame,
    alignItems: 'center', justifyContent: 'center', marginTop: 2,
    shadowColor: palette.flame, shadowOpacity: 0.5, shadowRadius: 8, shadowOffset: { width: 0, height: 0 },
  },
  userRow: { alignItems: 'flex-end', marginBottom: spacing.xl },
  userBubble: {
    backgroundColor: palette.blueprint, maxWidth: '86%',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
    borderRadius: radius.lg, borderBottomRightRadius: radius.sm,
  },
  answerFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.lg, flexWrap: 'wrap', gap: spacing.sm },
  readAloud: { flexDirection: 'row', alignItems: 'center', minHeight: 32, paddingRight: spacing.sm },
  adviceLine: { flexDirection: 'row', alignItems: 'center' },
  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  docHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  docIcon: { width: 44, height: 44, borderRadius: radius.sm, backgroundColor: '#E6EDF0', alignItems: 'center', justifyContent: 'center' },
  factsStrip: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.lg, marginTop: spacing.lg, paddingTop: spacing.lg, borderTopWidth: 1 },
  fact: { minWidth: 110 },
  foundRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg },
  riskCard: { padding: spacing.lg },
  riskTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  linkRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg, minHeight: 32 },
  escHead: { flexDirection: 'row', alignItems: 'flex-start' },
  escBtns: { gap: spacing.md, marginTop: spacing.lg },
  escBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.md, borderRadius: radius.pill, minHeight: TOUCH },
});
