import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Modal } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { AppText } from './ui/AppText';
import { Wordmark } from './ui/Wordmark';
import { Button } from './ui/Button';
import { palette, spacing, TOUCH, radius } from '@/theme/tokens';
import { useDevice } from '@/hooks/useDevice';
import { useSettings } from '@/context/AppSettings';

const LINKS: { label: string; path: '/' | '/coach' | '/glossary' }[] = [
  { label: 'Home', path: '/' },
  { label: 'Coach', path: '/coach' },
  { label: 'Glossary', path: '/glossary' },
];

function NavLink({ label, path, active, onPress }: { label: string; path: string; active: boolean; onPress: () => void }) {
  const { colors } = useSettings();
  return (
    <Pressable onPress={onPress} accessibilityRole="link" accessibilityLabel={label} style={styles.navLink}>
      <AppText variant="bodyStrong" color={active ? palette.flameDeep : colors.muted}>
        {label}
      </AppText>
      {active && <View style={styles.activeDot} />}
    </Pressable>
  );
}

export function NavShell() {
  const { isMobile } = useDevice();
  const { colors } = useSettings();
  const router = useRouter();
  const pathname = usePathname();
  const [drawer, setDrawer] = useState(false);

  const go = (p: '/' | '/coach' | '/glossary' | '/settings') => {
    setDrawer(false);
    router.push(p);
  };

  return (
    <View style={[styles.bar, { backgroundColor: colors.paper, borderBottomColor: colors.hairline }]}>
      <Pressable onPress={() => go('/')} accessibilityRole="link" accessibilityLabel="SULO home">
        <Wordmark size={22} />
      </Pressable>

      {isMobile ? (
        <View style={styles.rowEnd}>
          <Button label="Open the Coach" small onPress={() => go('/coach')} icon="flame" />
          <Pressable
            onPress={() => setDrawer(true)}
            accessibilityRole="button"
            accessibilityLabel="Open menu"
            style={styles.iconBtn}
            hitSlop={8}
          >
            <Ionicons name="menu" size={26} color={colors.ink} />
          </Pressable>
        </View>
      ) : (
        <View style={styles.rowEnd}>
          {LINKS.map((l) => (
            <NavLink key={l.path} label={l.label} path={l.path} active={pathname === l.path} onPress={() => go(l.path)} />
          ))}
          <Pressable
            onPress={() => go('/settings')}
            accessibilityRole="button"
            accessibilityLabel="Settings"
            style={styles.iconBtn}
            hitSlop={8}
          >
            <Ionicons name="settings-outline" size={20} color={colors.muted} />
          </Pressable>
          <Button label="Open the Coach" small onPress={() => go('/coach')} icon="flame" />
        </View>
      )}

      <Modal visible={drawer} transparent animationType="none" onRequestClose={() => setDrawer(false)}>
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.scrim}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setDrawer(false)} accessibilityLabel="Close menu" />
          <Animated.View
            entering={SlideInRight.springify().damping(18)}
            exiting={SlideOutRight}
            style={[styles.drawer, { backgroundColor: colors.paper }]}
          >
            <View style={styles.drawerHead}>
              <Wordmark size={22} />
              <Pressable onPress={() => setDrawer(false)} accessibilityRole="button" accessibilityLabel="Close menu" hitSlop={10}>
                <Ionicons name="close" size={26} color={colors.ink} />
              </Pressable>
            </View>
            {LINKS.map((l) => (
              <Pressable
                key={l.path}
                onPress={() => go(l.path)}
                style={styles.drawerItem}
                accessibilityRole="link"
                accessibilityLabel={l.label}
              >
                <AppText variant="title" color={pathname === l.path ? palette.flameDeep : colors.ink}>
                  {l.label}
                </AppText>
              </Pressable>
            ))}
            <Pressable onPress={() => go('/settings')} style={styles.drawerItem} accessibilityRole="link" accessibilityLabel="Settings">
              <AppText variant="title" color={colors.ink}>
                Settings
              </AppText>
            </Pressable>
            <View style={{ height: spacing.lg }} />
            <Button label="Open the Coach" full icon="flame" onPress={() => go('/coach')} />
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    borderBottomWidth: 1,
    zIndex: 50,
  },
  rowEnd: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  navLink: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm, minHeight: TOUCH, justifyContent: 'center' },
  activeDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: palette.flame, marginLeft: 6 },
  iconBtn: { width: TOUCH, height: TOUCH, alignItems: 'center', justifyContent: 'center' },
  scrim: { flex: 1, backgroundColor: 'rgba(23,21,15,0.32)', flexDirection: 'row', justifyContent: 'flex-end' },
  drawer: {
    width: 300,
    maxWidth: '85%',
    height: '100%',
    padding: spacing.xl,
    borderTopLeftRadius: radius.xl,
    borderBottomLeftRadius: radius.xl,
  },
  drawerHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xl },
  drawerItem: { paddingVertical: spacing.md, minHeight: TOUCH, justifyContent: 'center' },
});
