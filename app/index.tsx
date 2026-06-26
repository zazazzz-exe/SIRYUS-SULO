import React, { useRef, useState } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavShell } from '@/components/NavShell';
import { RevealScrollView } from '@/components/ui/Reveal';
import { Hero } from '@/components/landing/Hero';
import {
  TrustLine,
  WhatItDoes,
  HowItWorks,
  Features,
  ForEveryone,
  Promise,
  CtaBand,
  Footer,
} from '@/components/landing/Sections';
import { palette } from '@/theme/tokens';

export default function Landing() {
  const scrollRef = useRef<Animated.ScrollView>(null);
  const [howY, setHowY] = useState(0);

  const onHowLayout = (e: LayoutChangeEvent) => setHowY(e.nativeEvent.layout.y);
  const seeHow = () => scrollRef.current?.scrollTo({ y: howY - 8, animated: true });

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: palette.paper }}>
      <NavShell />
      <RevealScrollView
        ref={scrollRef}
        style={{ flex: 1, backgroundColor: palette.paper }}
        contentContainerStyle={{ paddingBottom: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <Hero onSeeHow={seeHow} />
        <TrustLine />
        <WhatItDoes />
        <View onLayout={onHowLayout}>
          <HowItWorks />
        </View>
        <Features />
        <ForEveryone />
        <Promise />
        <CtaBand />
        <Footer />
      </RevealScrollView>
    </SafeAreaView>
  );
}
