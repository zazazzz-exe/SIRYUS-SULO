import * as Speech from 'expo-speech';
import type { Lang } from '@/context/AppSettings';

const LANG_CODE: Record<Lang, string> = {
  EN: 'en-US',
  FIL: 'fil-PH',
  CEB: 'fil-PH', // Cebuano TTS rarely available; fall back to Filipino voice
};

export function speak(text: string, lang: Lang, rate = 1) {
  try {
    Speech.stop();
    Speech.speak(text, { language: LANG_CODE[lang], rate, pitch: 1.0 });
  } catch {
    // TTS not supported on this platform/build — silently no-op
  }
}

export function stopSpeaking() {
  try {
    Speech.stop();
  } catch {
    /* no-op */
  }
}
