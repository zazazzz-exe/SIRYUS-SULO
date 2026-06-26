/**
 * SULO design tokens — the single source of truth for color, spacing, radius,
 * typography. "A torch in the dark": warm paper, warm ink, an amber flame.
 */

export const palette = {
  // Base
  paper: '#FAF7F1', // warm paper background
  ink: '#17150F', // warm primary text (never pure black)
  card: '#FFFFFF', // card surface
  hairline: '#E2DACA', // hairline borders
  muted: '#6E6656', // muted/secondary text

  // The torch
  flame: '#E07B00', // flame accent
  flameDeep: '#B25E00', // deeper flame
  flameGlow: 'rgba(224, 123, 0, 0.18)',

  // Structural
  blueprint: '#2B5566', // blueprint blue

  // Risk (ONLY for risk flags)
  riskInk: '#B23A2E',
  riskBg: '#F7E9E5',

  // Safe / grounded (sparingly)
  safeInk: '#4E7A3A',
  safeBg: '#EAF0E3',
} as const;

export type Palette = Record<keyof typeof palette, string>;

// High-contrast overrides (Settings > high-contrast mode)
export const highContrast = {
  paper: '#FFFFFF',
  ink: '#000000',
  card: '#FFFFFF',
  hairline: '#9A937F',
  muted: '#3D382C',
} as const;

export const fonts = {
  display: 'SpaceGrotesk_700Bold',
  displayMedium: 'SpaceGrotesk_500Medium',
  body: 'Inter_400Regular',
  bodySemi: 'Inter_600SemiBold',
  mono: 'IBMPlexMono_400Regular',
  monoMedium: 'IBMPlexMono_500Medium',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 40,
  xxxl: 64,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const breakpoints = {
  mobile: 0,
  tablet: 720,
  desktop: 1080,
} as const;

export type DeviceClass = 'mobile' | 'tablet' | 'desktop';

export function deviceClass(width: number): DeviceClass {
  if (width >= breakpoints.desktop) return 'desktop';
  if (width >= breakpoints.tablet) return 'tablet';
  return 'mobile';
}

// Minimum touch target (accessibility)
export const TOUCH = 48;

export const shadow = {
  card: {
    shadowColor: '#17150F',
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  lift: {
    shadowColor: '#17150F',
    shadowOpacity: 0.12,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 14 },
    elevation: 6,
  },
} as const;
