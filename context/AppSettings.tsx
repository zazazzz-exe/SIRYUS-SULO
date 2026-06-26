import React, { createContext, useContext, useMemo, useState } from 'react';
import { useReducedMotion } from 'react-native-reanimated';
import { palette, highContrast, Palette } from '@/theme/tokens';

export type Lang = 'EN' | 'FIL' | 'CEB';
export type ReadingLevel = 'Child' | 'Student' | 'Adult' | 'Senior';

export const READING_LEVELS: { key: ReadingLevel; label: string; hint: string }[] = [
  { key: 'Child', label: 'Child', hint: 'Explain like I’m 10' },
  { key: 'Student', label: 'Student', hint: 'Explain like I’m 15' },
  { key: 'Adult', label: 'Adult', hint: 'Plain, complete' },
  { key: 'Senior', label: 'Senior', hint: 'Large text, gentle' },
];

export const LANGS: { key: Lang; label: string }[] = [
  { key: 'EN', label: 'English' },
  { key: 'FIL', label: 'Filipino / Taglish' },
  { key: 'CEB', label: 'Cebuano' },
];

type Colors = Palette;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  readingLevel: ReadingLevel;
  setReadingLevel: (r: ReadingLevel) => void;
  voiceOn: boolean;
  setVoiceOn: (v: boolean) => void;
  voiceSpeed: number; // 0.75 - 1.5
  setVoiceSpeed: (n: number) => void;
  highContrastOn: boolean;
  setHighContrastOn: (v: boolean) => void;
  textScale: number; // 0.9 - 1.4
  setTextScale: (n: number) => void;
  reduceMotion: boolean; // effective (system OR user)
  reduceMotionOverride: boolean;
  setReduceMotionOverride: (v: boolean) => void;
  colors: Colors;
};

const AppSettingsContext = createContext<Ctx | null>(null);

export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
  const systemReduceMotion = useReducedMotion();

  const [lang, setLang] = useState<Lang>('FIL');
  const [readingLevel, setReadingLevel] = useState<ReadingLevel>('Student');
  const [voiceOn, setVoiceOn] = useState(true);
  const [voiceSpeed, setVoiceSpeed] = useState(1);
  const [highContrastOn, setHighContrastOn] = useState(false);
  const [textScale, setTextScale] = useState(1);
  const [reduceMotionOverride, setReduceMotionOverride] = useState(false);

  const reduceMotion = !!systemReduceMotion || reduceMotionOverride;

  const colors = useMemo<Colors>(
    () => (highContrastOn ? ({ ...palette, ...highContrast } as Colors) : (palette as Colors)),
    [highContrastOn]
  );

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      readingLevel,
      setReadingLevel,
      voiceOn,
      setVoiceOn,
      voiceSpeed,
      setVoiceSpeed,
      highContrastOn,
      setHighContrastOn,
      textScale,
      setTextScale,
      reduceMotion,
      reduceMotionOverride,
      setReduceMotionOverride,
      colors,
    }),
    [lang, readingLevel, voiceOn, voiceSpeed, highContrastOn, textScale, reduceMotion, reduceMotionOverride, colors]
  );

  return <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>;
}

export function useSettings(): Ctx {
  const ctx = useContext(AppSettingsContext);
  if (!ctx) throw new Error('useSettings must be used within AppSettingsProvider');
  return ctx;
}
