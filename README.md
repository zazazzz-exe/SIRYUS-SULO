# SULO 🔦

**SULO** (Filipino for *torch*) — a calm, friendly AI **Legal Coach** that helps everyday
Filipinos understand confusing legal documents in plain language and in their own language
(English · Filipino/Taglish · Cebuano). It gives **understanding, not legal advice**, and
routes you to **PAO** (free legal aid) and the **DOLE hotline** when you need a real person.

Built by **Team Siryus** for **ACM TechSprint — Asteria: Illuminate the Future**.

One codebase → runs as a **web app** (primary) and on **iOS/Android** via Expo.

---

## Tech

- **Expo SDK 54** + Expo Router (file-based routing, web + native)
- **React Native primitives only** (View, Text, Pressable, ScrollView, TextInput, Image) — no DOM/HTML
- **React Native Reanimated 4** (+ react-native-worklets) for all animation — entering/exiting
  presets, `useSharedValue`/`useAnimatedStyle` (the breathing torch glow & flame typing
  indicator), and `useAnimatedScrollHandler` scroll reveals. Reduced motion is respected via
  `useReducedMotion()`.
- **@expo-google-fonts**: Space Grotesk (display), Inter (body), IBM Plex Mono (labels)
- **expo-linear-gradient** (torch beam), **expo-speech** (read-aloud / voice-out)

> Note: the brief suggested *Moti*, but this scaffold ships Reanimated 4, whose peer support
> in Moti is unreliable. Reanimated 4 covers every required animation directly, so the app is
> built on it for a stable cross-platform MVP. Moti can be layered on later if desired.

## Run it

```bash
npm install          # already done in this folder
npm run web          # open http://localhost:8081  (primary target)
npm run ios          # needs a Mac + Xcode, or Expo Go
npm run android      # needs Android SDK/emulator, or Expo Go
npm start            # dev menu / QR for Expo Go on a real phone
```

## App map

| Route        | Screen                                                              |
|--------------|--------------------------------------------------------------------|
| `/`          | Animated **landing page** (hero torch glow → 9 scroll-revealed sections) |
| `/coach`     | The **Legal Coach** chat — empty state, composer, rich answer cards |
| `/glossary`  | **FSL glossary** (sign-language video placeholders + plain definitions) |
| `/settings`  | **Settings & accessibility** (modal)                               |

### Project structure
```
app/            routes: _layout, index (landing), coach, glossary, settings
components/
  ui/           AppText, Button, Chip, Badge, Card, Wordmark, FlameGlow, Reveal, Layout
  landing/      Hero, Sections (trust → features → promise → CTA → footer)
  coach/        EmptyState, Composer, Messages (cards), TypingIndicator, ClausePanel, speech
  NavShell      top bar (web) + slide-in drawer (mobile)
context/        AppSettings (language, reading level, voice, contrast, text size, motion)
theme/          tokens (the exact design-system colors, spacing, radii, fonts)
data/           sample.ts — all stubbed AI content (no backend needed)
```

---

## What's real vs. stubbed (and how to wire the APIs later)

Everything renders and is interactive **today** with realistic sample data. To make the AI
real, replace the stubs below — the UI won't need to change, only the data source.

1. **Chat answers** — `app/coach.tsx → respondTo()` maps the user's text to canned cards.
   *Wire:* call an LLM (e.g. Claude) and map its structured JSON into the same
   `ChatItem` shapes. Keep the "literacy not advice" system framing + the low-confidence →
   escalation rule.

2. **Document understanding (attach)** — `attach()` returns the canned Northwind contract.
   *Wire:*
   - PDF text: `expo-document-picker` + a PDF text extractor (server-side recommended).
   - Photo OCR: `expo-image-picker` / `expo-camera` → OCR (Google Vision, AWS Textract, or
     on-device ML Kit). Feed extracted text to the LLM to produce the doc summary + clauses.

3. **Voice input (mic)** — `components/coach/Composer.tsx → toggleMic()` currently simulates a
   spoken question. *Wire:* `expo-audio` to record, then a speech-to-text API
   (Whisper, Google STT) with Filipino/Cebuano support.

4. **Voice out (read aloud)** — **already real** via `expo-speech`. Cebuano TTS voices are
   rarely available, so CEB falls back to the Filipino voice (`components/coach/speech.ts`).

5. **FSL glossary videos** — `app/glossary.tsx` shows placeholders. *Wire:* drop real
   sign-language clips and swap `VideoPlaceholder` for `expo-video`.

6. **Citations** — sample bases reference the Labor Code / DOLE. For production, ground answers
   in a retrieval step over a vetted legal corpus and surface the retrieved source.

> ⚖️ **Boundary:** SULO must always present understanding, never advice, and escalate to PAO /
> DOLE when confidence is low. That guardrail lives in the UI copy and the escalation card —
> keep it when you connect a real model.
