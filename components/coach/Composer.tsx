import React, { useState } from 'react';
import { View, StyleSheet, Pressable, TextInput, Modal } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/ui/AppText';
import { palette, spacing, radius, TOUCH } from '@/theme/tokens';
import { useSettings, READING_LEVELS, LANGS, ReadingLevel, Lang } from '@/context/AppSettings';
import { QUICK_REPLIES } from '@/data/sample';

function IconButton({
  icon,
  label,
  onPress,
  active,
  bg,
  fg,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  active?: boolean;
  bg?: string;
  fg?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[styles.iconBtn, { backgroundColor: bg ?? 'transparent' }, active && styles.iconActive]}
      hitSlop={6}
    >
      <Ionicons name={icon} size={22} color={fg ?? palette.muted} />
    </Pressable>
  );
}

function OptionSheet<T extends string>({
  visible,
  title,
  options,
  selected,
  onSelect,
  onClose,
}: {
  visible: boolean;
  title: string;
  options: { key: T; label: string; hint?: string }[];
  selected: T;
  onSelect: (k: T) => void;
  onClose: () => void;
}) {
  const { colors } = useSettings();
  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.scrim}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close" />
        <Animated.View entering={SlideInDown.springify().damping(20)} exiting={SlideOutDown} style={[styles.sheet, { backgroundColor: colors.paper }]}>
          <View style={styles.sheetHandle} />
          <AppText variant="heading" style={{ marginBottom: spacing.lg }}>
            {title}
          </AppText>
          {options.map((o) => {
            const on = o.key === selected;
            return (
              <Pressable
                key={o.key}
                onPress={() => {
                  onSelect(o.key);
                  onClose();
                }}
                style={[styles.option, { borderColor: on ? palette.flame : colors.hairline, backgroundColor: on ? 'rgba(224,123,0,0.08)' : colors.card }]}
                accessibilityRole="radio"
                accessibilityState={{ selected: on }}
                accessibilityLabel={o.label}
              >
                <View style={{ flex: 1 }}>
                  <AppText variant="bodyStrong" color={on ? palette.flameDeep : colors.ink}>
                    {o.label}
                  </AppText>
                  {o.hint && (
                    <AppText variant="small" color={colors.muted} style={{ marginTop: 2 }}>
                      {o.hint}
                    </AppText>
                  )}
                </View>
                {on && <Ionicons name="checkmark-circle" size={22} color={palette.flame} />}
              </Pressable>
            );
          })}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

export function Composer({
  onSend,
  onAttach,
  showQuickReplies,
  onChip,
}: {
  onSend: (text: string) => void;
  onAttach: () => void;
  showQuickReplies: boolean;
  onChip: (s: string) => void;
}) {
  const { colors, lang, setLang, readingLevel, setReadingLevel, reduceMotion } = useSettings();
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(false);
  const [levelSheet, setLevelSheet] = useState(false);
  const [langSheet, setLangSheet] = useState(false);

  const micPulse = useSharedValue(0);
  const micStyle = useAnimatedStyle(() => ({ transform: [{ scale: 1 + micPulse.value * 0.25 }], opacity: 1 - micPulse.value * 0.3 }));

  const send = () => {
    const t = text.trim();
    if (!t) return;
    setText('');
    onSend(t);
  };

  // Simulated voice input — a real STT API would replace this (see README).
  const toggleMic = () => {
    if (recording) {
      setRecording(false);
      micPulse.value = 0;
      return;
    }
    setRecording(true);
    if (!reduceMotion) micPulse.value = withRepeat(withTiming(1, { duration: 700 }), -1, true);
    setTimeout(() => {
      setRecording(false);
      micPulse.value = 0;
      onSend('Pwede ba nila akong pilitin mag-overtime?');
    }, 1600);
  };

  const levelLabel = READING_LEVELS.find((r) => r.key === readingLevel)?.label ?? 'Student';

  return (
    <View style={[styles.wrap, { backgroundColor: colors.paper, borderTopColor: colors.hairline }]}>
      {/* context-aware quick replies */}
      {showQuickReplies && (
        <Animated.View entering={reduceMotion ? undefined : FadeIn} style={styles.quickRow}>
          {QUICK_REPLIES.map((q) => (
            <Pressable key={q} onPress={() => onChip(q)} style={[styles.quick, { borderColor: colors.hairline, backgroundColor: colors.card }]} accessibilityRole="button" accessibilityLabel={q}>
              <AppText variant="small" color={colors.ink}>
                {q}
              </AppText>
            </Pressable>
          ))}
        </Animated.View>
      )}

      {/* reading-level + language pills */}
      <View style={styles.pillRow}>
        <Pressable onPress={() => setLevelSheet(true)} style={[styles.pill, { borderColor: colors.hairline }]} accessibilityRole="button" accessibilityLabel={`Reading level: ${levelLabel}. Change.`}>
          <Ionicons name="school-outline" size={14} color={palette.flameDeep} />
          <AppText variant="mono" uppercase color={palette.flameDeep} style={{ marginLeft: 6 }}>
            {levelLabel} · ELI15
          </AppText>
        </Pressable>
        <Pressable onPress={() => setLangSheet(true)} style={[styles.pill, { borderColor: colors.hairline }]} accessibilityRole="button" accessibilityLabel={`Language: ${lang}. Change.`}>
          <Ionicons name="language-outline" size={14} color={palette.blueprint} />
          <AppText variant="mono" uppercase color={palette.blueprint} style={{ marginLeft: 6 }}>
            {lang}
          </AppText>
        </Pressable>
      </View>

      {/* input row */}
      <View style={[styles.inputRow, { backgroundColor: colors.card, borderColor: recording ? palette.flame : colors.hairline }]}>
        <IconButton icon="add-circle-outline" label="Attach a photo or PDF" onPress={onAttach} />
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder={recording ? 'Listening…' : 'Ask, or describe your document…'}
          placeholderTextColor={colors.muted}
          style={[styles.input, { color: colors.ink }]}
          multiline
          onSubmitEditing={send}
          accessibilityLabel="Message SULO"
          returnKeyType="send"
        />
        <Animated.View style={recording ? micStyle : undefined}>
          <IconButton
            icon={recording ? 'radio-button-on' : 'mic-outline'}
            label={recording ? 'Stop recording' : 'Speak your question'}
            onPress={toggleMic}
            active={recording}
            fg={recording ? palette.riskInk : palette.muted}
          />
        </Animated.View>
        <IconButton icon="arrow-up" label="Send" onPress={send} bg={palette.flame} fg="#FFF8EE" />
      </View>

      <View style={styles.adviceRow}>
        <Ionicons name="shield-checkmark-outline" size={12} color={colors.muted} />
        <AppText variant="mono" uppercase color={colors.muted} style={{ marginLeft: 5 }}>
          SULO gives understanding, not legal advice
        </AppText>
      </View>

      <OptionSheet<ReadingLevel>
        visible={levelSheet}
        title="Reading level"
        options={READING_LEVELS.map((r) => ({ key: r.key, label: r.label, hint: r.hint }))}
        selected={readingLevel}
        onSelect={setReadingLevel}
        onClose={() => setLevelSheet(false)}
      />
      <OptionSheet<Lang>
        visible={langSheet}
        title="Language"
        options={LANGS.map((l) => ({ key: l.key, label: l.label }))}
        selected={lang}
        onSelect={setLang}
        onClose={() => setLangSheet(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { borderTopWidth: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.lg, gap: spacing.md },
  quickRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  quick: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.pill, borderWidth: 1, minHeight: 36, justifyContent: 'center' },
  pillRow: { flexDirection: 'row', gap: spacing.sm },
  pill: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 7, minHeight: 36 },
  inputRow: { flexDirection: 'row', alignItems: 'flex-end', borderWidth: 1.5, borderRadius: radius.xl, paddingHorizontal: spacing.sm, paddingVertical: 6, gap: 4 },
  input: { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 16, maxHeight: 120, minHeight: TOUCH, paddingTop: 12, paddingHorizontal: spacing.sm },
  iconBtn: { width: TOUCH, height: TOUCH, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  iconActive: { backgroundColor: 'rgba(178,58,46,0.10)' },
  adviceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  scrim: { flex: 1, backgroundColor: 'rgba(23,21,15,0.4)', justifyContent: 'flex-end' },
  sheet: { borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, padding: spacing.xl, paddingBottom: spacing.xxl, gap: spacing.sm },
  sheetHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: palette.hairline, alignSelf: 'center', marginBottom: spacing.lg },
  option: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.sm, minHeight: TOUCH },
});
