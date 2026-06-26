import React from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';
import { fonts } from '@/theme/tokens';
import { useSettings } from '@/context/AppSettings';

type Variant =
  | 'display' // big headings
  | 'displaySm'
  | 'title'
  | 'heading'
  | 'body'
  | 'bodyStrong'
  | 'small'
  | 'mono'; // labels / badges / citations

const VARIANT: Record<Variant, TextStyle> = {
  display: { fontFamily: fonts.display, fontSize: 40, lineHeight: 46, letterSpacing: -0.8 },
  displaySm: { fontFamily: fonts.display, fontSize: 28, lineHeight: 34, letterSpacing: -0.5 },
  title: { fontFamily: fonts.displayMedium, fontSize: 22, lineHeight: 28, letterSpacing: -0.3 },
  heading: { fontFamily: fonts.displayMedium, fontSize: 18, lineHeight: 24, letterSpacing: -0.2 },
  body: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24 },
  bodyStrong: { fontFamily: fonts.bodySemi, fontSize: 16, lineHeight: 24 },
  small: { fontFamily: fonts.body, fontSize: 13, lineHeight: 19 },
  mono: { fontFamily: fonts.mono, fontSize: 11, lineHeight: 14, letterSpacing: 1.2 },
};

type Props = TextProps & {
  variant?: Variant;
  color?: string;
  center?: boolean;
  uppercase?: boolean;
};

export function AppText({ variant = 'body', color, center, uppercase, style, children, ...rest }: Props) {
  const { colors, textScale } = useSettings();
  const base = VARIANT[variant];
  const scaled: TextStyle = {
    ...base,
    fontSize: (base.fontSize ?? 16) * textScale,
    lineHeight: (base.lineHeight ?? 24) * textScale,
    color: color ?? colors.ink,
  };
  return (
    <Text
      // allow native font scaling too, but keep our scale as the primary control
      allowFontScaling
      style={[scaled, center && styles.center, uppercase && styles.upper, style]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  center: { textAlign: 'center' },
  upper: { textTransform: 'uppercase' },
});
