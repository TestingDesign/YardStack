export interface PreviewItem {
  title: string
  gradient?: string
  logoBg?: string
  logoColor?: string
  logoText?: string
  icon?: string
}

export interface PreviewSection {
  key: string
  title: string
  viewAllLabel: string
  items: PreviewItem[]
}

export const PREVIEW_SECTIONS: PreviewSection[] = [
  {
    key: 'spotlight',
    title: 'Spotlight Preview',
    viewAllLabel: 'View All',
    items: [
      {
        title: 'Hyderabad Market Trends 2024',
        gradient: 'from-[#0f172a] to-[#1e3a8a]',
        logoBg: '#1e3a8a',
        logoColor: '#ffffff',
        icon: 'play',
      },
      {
        title: 'Lead Generation Strategies',
        gradient: 'from-[#4c0519] to-[#831843]',
        logoBg: '#831843',
        logoColor: '#ffffff',
        icon: 'play',
      },
      {
        title: 'Sales Productivity Tips',
        gradient: 'from-[#2e1065] to-[#4c1d95]',
        logoBg: '#4c1d95',
        logoColor: '#ffffff',
        icon: 'play',
      },
    ],
  },
  {
    key: 'red-expert',
    title: 'RED Expert Preview',
    viewAllLabel: 'View All',
    items: [
      {
        title: 'Builders',
        gradient: 'from-[#0c4a6e] to-[#0369a1]',
        logoBg: '#0369a1',
        logoColor: '#ffffff',
        logoText: 'B',
      },
      {
        title: 'Marketing Leaders',
        gradient: 'from-[#78350f] to-[#b45309]',
        logoBg: '#b45309',
        logoColor: '#ffffff',
        logoText: 'ML',
      },
      {
        title: 'Technology Experts',
        gradient: 'from-[#022c22] to-[#065f46]',
        logoBg: '#065f46',
        logoColor: '#ffffff',
        logoText: 'TE',
      },
      {
        title: 'Channel Partners',
        gradient: 'from-[#172554] to-[#1e40af]',
        logoBg: '#1e40af',
        logoColor: '#ffffff',
        logoText: 'CP',
      },
    ],
  },
  {
    key: 'opportunities',
    title: 'Opportunities Preview',
    viewAllLabel: 'View All',
    items: [
      { title: 'Looking for CRM Vendor', logoBg: '#FFF7ED', logoColor: '#EA580C', icon: 'briefcase' },
      { title: 'Hiring Sales Manager', logoBg: '#FFF7ED', logoColor: '#EA580C', icon: 'users' },
      { title: 'Seeking Channel Partners', logoBg: '#FFF7ED', logoColor: '#EA580C', icon: 'handshake' },
      { title: 'Marketing Agency Requirement', logoBg: '#FFF7ED', logoColor: '#EA580C', icon: 'megaphone' },
    ],
  },
  {
    key: 'directory',
    title: 'Directory Preview',
    viewAllLabel: 'View All',
    items: [
      { title: 'Builders', logoBg: '#F3F4F6', logoColor: '#6B21A8', icon: 'building' },
      { title: 'Channel Partners', logoBg: '#F3F4F6', logoColor: '#6B21A8', icon: 'users' },
      { title: 'Bankers', logoBg: '#F3F4F6', logoColor: '#6B21A8', icon: 'landmark' },
      { title: 'Marketing Agencies', logoBg: '#F3F4F6', logoColor: '#6B21A8', icon: 'megaphone' },
      { title: 'CRM Providers', logoBg: '#F3F4F6', logoColor: '#6B21A8', icon: 'monitor' },
      { title: 'Interior Designers', logoBg: '#F3F4F6', logoColor: '#6B21A8', icon: 'palette' },
    ],
  },
]
