/**
 * Stubbed AI sample data — realistic, no backend. Hero scenario: a fresh grad
 * reviewing a first BPO employment contract.
 */

export type RiskLevel = 'HIGH' | 'MED';

export type Clause = {
  id: string;
  title: string;
  risk: RiskLevel;
  original: string; // original legalese
  plain: string; // plain rewrite
  why: string; // plain explanation of the risk
  basis: string; // cited basis
};

export const CLAUSES: Clause[] = [
  {
    id: 'probation',
    title: 'Probationary period — 6 months',
    risk: 'HIGH',
    original:
      'The Employee shall undergo a probationary period of six (6) months, extendible at the sole discretion of the Company, during which employment may be terminated at any time without cause.',
    plain:
      'You’re on probation for 6 months. The company says it can extend this and can let you go anytime during it — even without a clear reason.',
    why:
      'Probation is normally up to 6 months. “Extendible” and “without cause” language can be used unfairly. Regular employees gain stronger protection against dismissal.',
    basis: 'Labor Code Art. 296 (probationary employment) · DOLE rules',
  },
  {
    id: 'overtime',
    title: 'Mandatory overtime — unclear pay',
    risk: 'HIGH',
    original:
      'The Employee agrees to render overtime work as required by operational needs. Overtime compensation, if any, shall be determined by the Company.',
    plain:
      'You may be required to work overtime, and the contract leaves it up to the company whether you’re paid extra — and how much.',
    why:
      'Overtime work generally must be paid an extra premium on top of your hourly rate. “If any… determined by the Company” is a red flag — pay shouldn’t be optional.',
    basis: 'Labor Code Art. 87 (overtime pay) — +25% on ordinary days',
  },
  {
    id: 'noncompete',
    title: 'Non-compete — 2 years',
    risk: 'MED',
    original:
      'For a period of two (2) years following separation, the Employee shall not engage, directly or indirectly, in any business similar to that of the Company within the Philippines.',
    plain:
      'For 2 years after you leave, this says you can’t work for a similar company anywhere in the Philippines.',
    why:
      'Non-competes can be valid only if reasonable in time, place, and scope. Two years covering the whole country may be too broad to fully enforce.',
    basis: 'Civil Code Art. 1306 · jurisprudence on reasonable restraint',
  },
];

export const DOC_ANALYSIS = {
  title: 'This is a 12-page employment contract from Northwind BPO.',
  pages: 12,
  facts: [
    { label: 'Start date', value: 'Aug 1, 2026' },
    { label: 'Probation', value: '6 months' },
    { label: 'Notice period', value: '30 days' },
    { label: 'Monthly salary', value: '₱22,000' },
  ],
  flaggedCount: 3,
};

export type ChipSuggestion = string;

export type Message =
  | { id: string; role: 'user'; kind: 'text'; text: string }
  | { id: string; role: 'assistant'; kind: 'answer'; text: string; basis: string; followups?: ChipSuggestion[] }
  | { id: string; role: 'assistant'; kind: 'doc' }
  | { id: string; role: 'assistant'; kind: 'risks'; intro: string }
  | { id: string; role: 'assistant'; kind: 'whatif'; question: string; clauseId: string; consequence: string }
  | { id: string; role: 'assistant'; kind: 'escalation' };

// The seeded Taglish sample conversation (voice + grounding + the advice boundary).
export const SAMPLE_CONVERSATION: Message[] = [
  { id: 'u1', role: 'user', kind: 'text', text: 'Pwede ba nila akong pilitin mag-overtime?' },
  {
    id: 'a1',
    role: 'assistant',
    kind: 'answer',
    text:
      'Sa karamihan ng trabaho, hindi ka basta-basta pwedeng piliting mag-overtime nang walang dagdag-bayad. Generally, ang overtime ay may extra pay — at least +25% sa ordinaryong araw — maliban kung ikaw ay nasa ilang exempt na posisyon (halimbawa, ilang managerial roles).\n\nIbig sabihin: kung papayag kang mag-OT, dapat may dagdag sa sahod. Kung sinasabi ng kontrata na “determined by the Company,” iyon ay dapat mong linawin.',
    basis: 'Labor Code Art. 87–90 (overtime & premium pay)',
    followups: ['Paano kung tumanggi ako?', 'Magkano dapat ang OT pay ko?', 'Ano’ng itatanong ko sa HR?'],
  },
];

export type Starter = { label: string; icon: string };
export const STARTERS: Starter[] = [
  { label: 'What are my rights at work?', icon: 'briefcase-outline' },
  { label: 'Explain a contract clause', icon: 'document-text-outline' },
  { label: 'Is this overtime legal?', icon: 'time-outline' },
];

export const QUICK_REPLIES: string[] = [
  'What are the risks?',
  'Explain like I’m 15',
  'What if I resign?',
  'What should I ask HR?',
];

export const HR_QUESTIONS = [
  'Is overtime paid, and at what rate?',
  'Can the 6-month probation be extended? On what grounds?',
  'What exactly counts as “similar business” in the non-compete?',
];

export type GlossaryTerm = { term: string; tagalog?: string; def: string; example: string };
export const GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Probation',
    tagalog: 'Probisyonaryo',
    def: 'A trial period (usually up to 6 months) where the employer checks if you fit the job before you become a regular employee with stronger protection.',
    example: 'During probation, you can be let go for failing fair, known standards.',
  },
  {
    term: 'Waiver',
    tagalog: 'Pagtalikod sa karapatan',
    def: 'Giving up a right you legally have. Some waivers are not valid if they take away protections the law guarantees.',
    example: 'A waiver of your right to overtime pay is generally not enforceable.',
  },
  {
    term: 'Overtime',
    tagalog: 'Obertaym',
    def: 'Work beyond 8 hours a day. It generally must be paid at your hourly rate plus a premium (at least +25%).',
    example: 'Working 10 hours means 2 hours paid with overtime premium.',
  },
  {
    term: 'Penalty',
    tagalog: 'Multa / Parusa',
    def: 'A charge or consequence for breaking a term. Penalties must be fair and clearly stated; some can be challenged.',
    example: 'A “training bond” penalty for resigning early may be reduced if excessive.',
  },
];
