export const PILLARS_HEADING = {
  section: 'EXPLORE N4RE — THREE PILLARS, EIGHT MODULES',
  tagline: 'One Ecosystem. Three Pillars. Eight Modules.',
}

export interface Module {
  name: string
  description: string
  outcome: string
  comingSoon?: boolean
}

export interface Pillar {
  key: string
  title: string
  subtitle: string
  color: string
  bgGradient: string
  borderColor: string
  modules: Module[]
}

export const PILLARS: Pillar[] = [
  {
    key: 'content',
    title: 'CONTENT',
    subtitle: 'Learn. Discover. Build Authority.',
    color: '#6B21A8',
    bgGradient: 'from-[#6B21A8]/5 to-[#7C3AED]/5',
    borderColor: '#6B21A8',
    modules: [
      {
        name: 'Spotlight',
        description: 'Short-form industry insights, success stories, updates and business visibility.',
        outcome: 'Visibility • Awareness • Personal Branding',
      },
      {
        name: 'RED Expert',
        description: 'Expert conversations, interviews, case studies and industry discussions.',
        outcome: 'Knowledge • Industry Insights • Professional Growth',
      },
      {
        name: 'Learn',
        description: 'Structured learning, workshops, certifications and skill development.',
        outcome: 'Upskilling • Career Growth • Professional Development',
        comingSoon: true,
      },
    ],
  },
  {
    key: 'connections',
    title: 'CONNECTIONS',
    subtitle: 'Find. Evaluate. Connect.',
    color: '#7C3AED',
    bgGradient: 'from-[#7C3AED]/5 to-[#8B5CF6]/5',
    borderColor: '#7C3AED',
    modules: [
      {
        name: 'Directory',
        description: 'Discover professionals, businesses, vendors, consultants and experts.',
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
    color: '#D946EF',
    bgGradient: 'from-[#D946EF]/5 to-[#EC4899]/5',
    borderColor: '#D946EF',
    modules: [
      {
        name: 'Opportunities',
        description: 'Requirements, hiring, collaborations, referrals and partnerships.',
        outcome: 'Business Growth • Hiring • Partnerships • Opportunity Discovery',
      },
      {
        name: 'Showcase',
        description: 'Interactive demos, webinars, business presentations and solution showcases.',
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
]
