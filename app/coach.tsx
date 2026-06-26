import React, { useRef, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NavShell } from '@/components/NavShell';
import { AppText } from '@/components/ui/AppText';
import { EmptyState } from '@/components/coach/EmptyState';
import { Composer } from '@/components/coach/Composer';
import { TypingIndicator } from '@/components/coach/TypingIndicator';
import {
  UserBubble,
  AnswerCard,
  DocCard,
  RiskCards,
  WhatIfCard,
  EscalationCard,
} from '@/components/coach/Messages';
import { ClauseSidePanel, ClauseBottomSheet } from '@/components/coach/ClausePanel';
import { palette, spacing, radius } from '@/theme/tokens';
import { useDevice } from '@/hooks/useDevice';
import { useSettings } from '@/context/AppSettings';
import { Clause, CLAUSES, SAMPLE_CONVERSATION, HR_QUESTIONS } from '@/data/sample';

type ChatItem =
  | { id: string; type: 'user'; text: string }
  | { id: string; type: 'answer'; text: string; basis: string; followups?: string[] }
  | { id: string; type: 'doc' }
  | { id: string; type: 'risks' }
  | { id: string; type: 'whatif'; question: string; consequence: string; clauseId: string }
  | { id: string; type: 'escalation' };

const clauseById = (id: string) => CLAUSES.find((c) => c.id === id)!;

export default function Coach() {
  const { isDesktop, isMobile } = useDevice();
  const { colors } = useSettings();
  const [items, setItems] = useState<ChatItem[]>([]);
  const [typing, setTyping] = useState(false);
  const [activeClause, setActiveClause] = useState<Clause | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const idRef = useRef(0);
  const nextId = () => `m${idRef.current++}`;

  const scrollEnd = useCallback(() => {
    requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));
  }, []);

  const push = useCallback(
    (newItems: ChatItem[]) => {
      setItems((prev) => [...prev, ...newItems]);
      scrollEnd();
    },
    [scrollEnd]
  );

  // Stubbed AI: map the user's text to a realistic response.
  const respondTo = (raw: string): ChatItem[] => {
    const t = raw.toLowerCase();
    if (/(overtime|ot\b|pilitin|mag-overtime|obertaym)/.test(t)) {
      const a = SAMPLE_CONVERSATION[1];
      if (a.kind === 'answer') return [{ id: nextId(), type: 'answer', text: a.text, basis: a.basis, followups: a.followups }];
    }
    if (/(risk|delikado|peligro)/.test(t)) {
      return [
        { id: nextId(), type: 'answer', text: 'I looked through the document and flagged the clauses most likely to affect you. Tap any card to see the original text, a plain rewrite, and the legal basis.', basis: 'Labor Code · DOLE rules' },
        { id: nextId(), type: 'risks' },
      ];
    }
    if (/(resign|umalis|mag-resign|quit)/.test(t)) {
      return [
        {
          id: nextId(),
          type: 'whatif',
          question: 'What if I resign after 3 months?',
          consequence:
            'You’d still be on probation, so you can leave by giving the 30-day notice in your contract. But watch the 2-year non-compete — it tries to limit where you can work next. Non-competes must be reasonable to be enforceable.',
          clauseId: 'noncompete',
        },
      ];
    }
    if (/(hr|tanong|ask)/.test(t)) {
      return [
        {
          id: nextId(),
          type: 'answer',
          text: 'Here’s what to ask HR before you sign — short, direct questions that clear up the riskiest parts:',
          basis: 'Based on the flagged clauses in your contract',
          followups: HR_QUESTIONS,
        },
      ];
    }
    if (/(eli15|explain like|simple|bata|child)/.test(t)) {
      return [
        {
          id: nextId(),
          type: 'answer',
          text: 'Okay, super simple: A contract is a list of promises between you and the company. Some promises are fair, some can hurt you. My job is to point at the ones that can hurt — like “you might work extra hours and we decide if you get paid” — so you can ask about them before you say yes.',
          basis: 'Plain-language mode · Student (ELI15)',
          followups: ['What are the risks?', 'What should I ask HR?'],
        },
      ];
    }
    if (/(rights|karapatan|trabaho|work)/.test(t)) {
      return [
        {
          id: nextId(),
          type: 'answer',
          text: 'At work in the Philippines you generally have rights to: fair pay (including overtime premium), rest days, security of tenure once you’re regular, and safe conditions. A contract can add terms, but it can’t take away rights the law guarantees.',
          basis: 'Labor Code of the Philippines (general provisions)',
          followups: ['Is this overtime legal?', 'What if I resign?'],
        },
      ];
    }
    if (/(sign|lawyer|sue|abogado|kaso|court)/.test(t)) {
      return [{ id: nextId(), type: 'escalation' }];
    }
    return [
      {
        id: nextId(),
        type: 'answer',
        text: 'I can explain what a document says and flag the risky parts. Try attaching your contract, or ask something like “What are my rights at work?” or “Is this overtime legal?”',
        basis: 'SULO · understanding, not advice',
        followups: ['What are my rights at work?', 'Is this overtime legal?'],
      },
    ];
  };

  const send = (text: string) => {
    push([{ id: nextId(), type: 'user', text }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      push(respondTo(text));
    }, 1100);
  };

  const attach = () => {
    push([{ id: nextId(), type: 'user', text: '📄 Northwind-BPO-Employment-Contract.pdf' }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      push([{ id: nextId(), type: 'doc' }]);
      setTimeout(() => push([{ id: nextId(), type: 'risks' }]), 700);
    }, 1300);
  };

  const openClause = (c: Clause) => setActiveClause(c);

  const renderItem = (it: ChatItem, idx: number) => {
    switch (it.type) {
      case 'user':
        return <UserBubble key={it.id} text={it.text} />;
      case 'answer':
        return <AnswerCard key={it.id} text={it.text} basis={it.basis} followups={it.followups} onChip={send} />;
      case 'doc':
        return <DocCard key={it.id} i={idx} />;
      case 'risks':
        return <RiskCards key={it.id} onOpenClause={openClause} i={idx} />;
      case 'whatif': {
        const c = clauseById(it.clauseId);
        return (
          <WhatIfCard
            key={it.id}
            question={it.question}
            consequence={it.consequence}
            clauseTitle={c.title}
            onOpen={() => openClause(c)}
            i={idx}
          />
        );
      }
      case 'escalation':
        return <EscalationCard key={it.id} i={idx} />;
    }
  };

  const empty = items.length === 0;

  const Thread = (
    <ScrollView
      ref={scrollRef}
      style={{ flex: 1 }}
      contentContainerStyle={styles.threadContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.threadInner}>
        {empty ? (
          <EmptyState onStarter={send} onAttach={attach} />
        ) : (
          items.map((it, idx) => renderItem(it, idx))
        )}
        {typing && (
          <View style={{ marginLeft: 42, marginBottom: spacing.xl }}>
            <TypingIndicator />
          </View>
        )}
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.paper }}>
      <NavShell />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.row}>
          {/* Desktop: conversation-history sidebar */}
          {isDesktop && (
            <View style={[styles.sidebar, { borderRightColor: colors.hairline, backgroundColor: '#F6F1E7' }]}>
              <AppText variant="mono" uppercase color={colors.muted} style={{ marginBottom: spacing.md }}>
                Conversations
              </AppText>
              <View style={[styles.histItem, { borderColor: palette.flame, backgroundColor: 'rgba(224,123,0,0.08)' }]}>
                <Ionicons name="document-text-outline" size={16} color={palette.flameDeep} />
                <AppText variant="small" color={palette.flameDeep} style={{ marginLeft: 8 }} numberOfLines={1}>
                  Northwind BPO contract
                </AppText>
              </View>
              <Pressable
                onPress={() => {
                  setItems([]);
                  setActiveClause(null);
                }}
                style={styles.newChat}
                accessibilityRole="button"
                accessibilityLabel="Start a new conversation"
              >
                <Ionicons name="add" size={18} color={colors.ink} />
                <AppText variant="small" style={{ marginLeft: 6 }}>
                  New conversation
                </AppText>
              </Pressable>
            </View>
          )}

          {/* Centered thread */}
          <View style={styles.threadCol}>{Thread}</View>

          {/* Desktop: right document/risk panel */}
          {isDesktop && activeClause && <ClauseSidePanel clause={activeClause} onClose={() => setActiveClause(null)} />}
        </View>

        {/* Composer pinned to bottom */}
        <Composer onSend={send} onAttach={attach} showQuickReplies={!empty} onChip={send} />
      </KeyboardAvoidingView>

      {/* Mobile/tablet: bottom sheet */}
      {!isDesktop && <ClauseBottomSheet clause={activeClause} onClose={() => setActiveClause(null)} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: { flex: 1, flexDirection: 'row' },
  sidebar: { width: 240, borderRightWidth: 1, padding: spacing.lg },
  histItem: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderRadius: radius.md, borderWidth: 1 },
  newChat: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, marginTop: spacing.md },
  threadCol: { flex: 1 },
  threadContent: { paddingVertical: spacing.xl, flexGrow: 1 },
  threadInner: { width: '100%', maxWidth: 760, alignSelf: 'center', paddingHorizontal: spacing.lg, flex: 1 },
});
