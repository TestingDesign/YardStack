export const PILLARS_HEADING = {
  section: 'Features built to accelerate your Business Growth — 3 Core Pillars, 8 Modules',
  tagline: 'One Ecosystem. Three Pillars. Eight Modules.',
}

export interface Module {
  name: string;
  description: string;
  outcome: string;
  comingSoon?: boolean;
}

export interface Pillar {
  key: string;
  title: string;
  subtitle: string;
  color: string;
  borderColor: string;
  columnBg: string;
  cardBg: string;
  modules: Module[];
}

export const PILLARS: Pillar[] = [
  {
    key: 'content',
    title: 'CONTENT',
    subtitle: 'Learn. Discover. Build Authority.',
    color: '#4C1D95',
    borderColor: '#E9D5FF',
    columnBg: '#FAF5FF',
    cardBg: '#FFFFFF',
    modules: [
      {
        name: 'Spotlight',
        description: 'Short-form insights, updates and success stories.',
        outcome: 'Visibility • Awareness • Personal Branding',
      },
      {
        name: 'RED Expert',
        description: 'Expert conversations, interviews and industry discussions.',
        outcome: 'Knowledge • Industry Insights • Professional Growth',
      },
      {
        name: 'Learn',
        description: 'Structured learning, workshops and certifications.',
        outcome: 'Upskilling • Career Growth • Professional Development',
        comingSoon: true,
      },
    ],
  },
  {
    key: 'connections',
    title: 'CONNECTIONS',
    subtitle: 'Find. Evaluate. Connect.',
    color: '#166534',
    borderColor: '#BBF7D0',
    columnBg: '#F0FDF4',
    cardBg: '#FFFFFF',
    modules: [
      {
        name: 'Directory',
        description: 'Discover professionals, businesses, vendors and experts.',
        outcome: 'Networking • Business Discovery • Lead Generation',
      },
      {
        name: 'City Inventory',
        description: 'Explore projects, inventory and opportunities city-wise.',
        outcome: 'Opportunity Discovery • Market Access • Inventory Visibility',
        comingSoon: true,
      },
    ],
  },
  {
    key: 'conversations',
    title: 'CONVERSATIONS',
    subtitle: 'Engage. Collaborate. Grow.',
    color: '#C2410C',
    borderColor: '#FED7AA',
    columnBg: '#FFF7ED',
    cardBg: '#FFFFFF',
    modules: [
      {
        name: 'Opportunities',
        description: 'Requirements, hiring, collaborations and partnerships.',
        outcome: 'Business Growth • Hiring • Partnerships • Opportunity Discovery',
      },
      {
        name: 'Showcase',
        description: 'Interactive demos, webinars and business presentations.',
        outcome: 'Solution Evaluation • Trust Building • Business Engagement',
        comingSoon: true,
      },
      {
        name: 'Polls & Surveys',
        description: 'Industry polls, surveys and market intelligence.',
        outcome: 'Market Understanding • Product Validation • Better Decision Making',
        comingSoon: true,
      },
    ],
  },
];