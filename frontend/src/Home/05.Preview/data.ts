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
        gradient: 'linear-gradient(135deg, #4c1d95, #1e3a8a)',
        logoBg: '#1e3a8a',
        logoColor: '#ffffff',
        icon: 'play',
      },
      {
        title: 'Lead Generation Strategies',
        gradient: 'linear-gradient(135deg, #e11d48, #831843)',
        logoBg: '#831843',
        logoColor: '#ffffff',
        icon: 'play',
      },
      {
        title: 'Sales Productivity Tips',
        gradient: 'linear-gradient(135deg, #d946ef, #4c1d95)',
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
        title: 'Builder Conversations',
        gradient: 'linear-gradient(135deg, #0369a1, #0c4a6e)',
        logoBg: '#0369a1',
        logoColor: '#ffffff',
        logoText: 'B',
      },
      {
        title: 'Marketing Leaders',
        gradient: 'linear-gradient(135deg, #b45309, #78350f)',
        logoBg: '#b45309',
        logoColor: '#ffffff',
        logoText: 'ML',
      },
      {
        title: 'Technology Experts',
        gradient: 'linear-gradient(135deg, #065f46, #022c22)',
        logoBg: '#065f46',
        logoColor: '#ffffff',
        logoText: 'TE',
      },
      {
        title: 'Channel Partners',
        gradient: 'linear-gradient(135deg, #1e40af, #172554)',
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
      { title: 'Hiring Sales Manager', logoBg: '#FFF7ED', logoColor: '#EA580C', icon: 'briefcase' },
      { title: 'Seeking Channel Partners', logoBg: '#FFF7ED', logoColor: '#EA580C', icon: 'briefcase' },
      { title: 'Marketing Agency Requirement', logoBg: '#FFF7ED', logoColor: '#EA580C', icon: 'briefcase' },
    ],
  },
  {
    key: 'directory',
    title: 'Directory Preview',
    viewAllLabel: 'View All',
    items: [
      { title: 'Builders', logoBg: '#FFFFFF', logoColor: '#6B21A8', icon: 'building' },
      { title: 'Channel Partners', logoBg: '#FFFFFF', logoColor: '#6B21A8', icon: 'users' },
      { title: 'Bankers', logoBg: '#FFFFFF', logoColor: '#6B21A8', icon: 'landmark' },
      { title: 'Marketing Agencies', logoBg: '#FFFFFF', logoColor: '#6B21A8', icon: 'megaphone' },
      { title: 'CRM Providers', logoBg: '#FFFFFF', logoColor: '#6B21A8', icon: 'monitor' },
      { title: 'Interior Designers', logoBg: '#FFFFFF', logoColor: '#6B21A8', icon: 'palette' },
    ],
  },
]
