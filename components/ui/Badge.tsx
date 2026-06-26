import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from './AppText';
import { palette, radius, spacing } from '@/theme/tokens';

type Tone = 'risk' | 'risk-med' | 'safe' | 'neutral' | 'flame' | 'blueprint';

const TONES: Record<Tone, { bg: string; fg: string }> = {
  risk: { bg: palette.riskBg, fg: palette.riskInk },
  'risk-med': { bg: '#FBF1E3', fg: palette.flameDeep },
  safe: { bg: palette.safeBg, fg: palette.safeInk },
  neutral: { bg: '#F2EEE4', fg: palette.muted },
  flame: { bg: 'rgba(224,123,0,0.12)', fg: palette.flameDeep },
  blueprint: { bg: '#E6EDF0', fg: palette.blueprint },
};

export function Badge({
  label,
  tone = 'neutral',
  icon,
}: {
  label: string;
  tone?: Tone;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  const t = TONES[tone];
  return (
    <View style={[styles.badge, { backgroundColor: t.bg }]}>
      {icon && <Ionicons name={icon} size={11} color={t.fg} style={{ marginRight: 5 }} />}
      <AppText variant="mono" color={t.fg} uppercase>
        {label}
      </AppText>
    </View>
  );
}

/** A "CITED BASIS" mono footnote chip used on assistant answers. */
export function CitedBasis({ text }: { text: string }) {
  return (
    <View style={styles.cite}>
      <Ionicons name="library-outline" size={12} color={palette.blueprint} style={{ marginRight: 6 }} />
      <AppText variant="mono" color={palette.blueprint} uppercase style={{ flexShrink: 1 }}>
        Cited basis · {text}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 5,
    borderRadius: radius.sm,
  },
  cite: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#EAF0F2',
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: radius.sm,
    marginTop: spacing.md,
  },
});
