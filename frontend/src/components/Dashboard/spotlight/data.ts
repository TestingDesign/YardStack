export interface FilterTab {
  key: string;
  label: string;
  color?: string;
  count?: number;
}

const TAB_COLOR = '#6B7280'; 

export const FILTER_TABS: FilterTab[] = [
  { key: 'all', label: 'All', color: TAB_COLOR },
  { key: 'real-estate', label: 'Real Estate', color: TAB_COLOR },
  { key: 'construction', label: 'Construction', color: TAB_COLOR },
  { key: 'business', label: 'Business', color: TAB_COLOR },
  { key: 'marketing', label: 'Marketing', color: TAB_COLOR },
  { key: 'finance', label: 'Finance', color: TAB_COLOR },
  { key: 'technology', label: 'Technology', color: TAB_COLOR },
  { key: 'design', label: 'Design', color: TAB_COLOR },
];

import { SpotlightLinkData SPOTLIGHT_LINKS } from './SpotlightLinkData';

export interface SpotlightVideo {
  id: string
  title: string
  views: string
  duration: string
  author: string
  authorInitial: string
  verified: boolean
  gradient: string
  tag?: string
  tagBg?: string
  tagColor?: string
  timeAgo?: string
  logoText?: string
  logoBg?: string
  logoColor?: string
  link?: SpotlightLinkData
}

export const SPOTLIGHT_VIDEOS: SpotlightVideo[] = [
  {
    id: 'sv-1',
    title: 'Modern Living Redefined 🔥',
    views: '12.4K',
    duration: '0:28',
    author: 'ABC Realty',
    authorInitial: 'A',
    verified: true,
    gradient: 'from-[#0f172a] to-[#1e3a8a]',
    tag: 'SALES',
    tagBg: '#4c0519',
    tagColor: '#f43f5e',
    timeAgo: '2h ago',
    logoText: 'ABC\nREALTY',
    logoBg: '#000000',
    logoColor: '#ffffff',
    link: SPOTLIGHT_LINKS.seniorAgent
  },
  {
    id: 'sv-2',
    title: 'Interior Goals You\'ll Love 😍',
    views: '9.8K',
    duration: '0:31',
    author: 'Prime Infra',
    authorInitial: 'P',
    verified: true,
    gradient: 'from-[#451a03] to-[#78350f]',
    tag: 'MARKETING',
    tagBg: '#1e1b4b',
    tagColor: '#818cf8',
    timeAgo: '5h ago',
    logoText: 'PRIME\nINFRA',
    logoBg: '#ffffff',
    logoColor: '#000000',
    link: SPOTLIGHT_LINKS.luxuryVilla
  },
  {
    id: 'sv-3',
    title: 'Top Projects in Bangalore 📍',
    views: '18.6K',
    duration: '0:26',
    author: 'City Spaces',
    authorInitial: 'C',
    verified: true,
    gradient: 'from-[#2e1065] to-[#4c1d95]',
    tag: 'REAL ESTATE',
    tagBg: '#e9d5ff',
    tagColor: '#6b21a8',
    timeAgo: '1d ago',
    logoText: 'CITY\nSPACES',
    logoBg: '#3b0764',
    logoColor: '#ffffff',
    link: SPOTLIGHT_LINKS.commercialOffice
  },
  {
    id: 'sv-4',
    title: 'The Future of Real Estate 🚀',
    views: '7.2K',
    duration: '0:30',
    author: 'Future Homes',
    authorInitial: 'F',
    verified: true,
    gradient: 'from-[#0c4a6e] to-[#0369a1]',
    tag: 'INSIGHTS',
    tagBg: '#60a5fa',
    tagColor: '#ffffff',
    timeAgo: '2d ago',
    logoText: 'FUTURE\nHOMES',
    logoBg: '#1e3a8a',
    logoColor: '#ffffff',
  },
  {
    id: 'sv-5',
    title: 'Marketing That Actually Works 🎯',
    views: '15.3K',
    duration: '1:02',
    author: 'RED Experts',
    authorInitial: 'R',
    verified: true,
    gradient: 'from-[#4c0519] to-[#831843]',
    tag: 'MARKETING',
    tagBg: '#1e1b4b',
    tagColor: '#818cf8',
    timeAgo: '3d ago',
    logoText: 'RED\nEXPERTS',
    logoBg: '#ffffff',
    logoColor: '#e11d48',
  },
  {
    id: 'sv-6',
    title: 'Construction Timelapse 🏗️',
    views: '6.7K',
    duration: '0:29',
    author: 'BuildSmart',
    authorInitial: 'B',
    verified: true,
    gradient: 'from-[#78350f] to-[#b45309]',
    tag: 'CONSTRUCTION',
    tagBg: '#fef3c7',
    tagColor: '#d97706',
    timeAgo: '4d ago',
    logoText: 'BUILD\nSMART',
    logoBg: '#ffffff',
    logoColor: '#000000',
  },
  {
    id: 'sv-7',
    title: 'Space Planning Done Right ✅',
    views: '5.1K',
    duration: '0:31',
    author: 'Architects Hub',
    authorInitial: 'A',
    verified: true,
    gradient: 'from-[#022c22] to-[#065f46]',
    tag: 'DESIGN',
    tagBg: '#d1fae5',
    tagColor: '#059669',
    timeAgo: '5d ago',
    logoText: 'STUDIO\nV',
    logoBg: '#fcd34d',
    logoColor: '#000000',
    link: SPOTLIGHT_LINKS.minimalistInteriors
  },
  {
    id: 'sv-8',
    title: 'Bangalore Real Estate Update 📈',
    views: '11.2K',
    duration: '0:47',
    author: 'Market Pulse',
    authorInitial: 'M',
    verified: true,
    gradient: 'from-[#111827] to-[#374151]',
    tag: 'FINANCE',
    tagBg: '#f3f4f6',
    tagColor: '#374151',
    timeAgo: '1w ago',
    logoText: 'MARKET\nPULSE',
    logoBg: '#ffffff',
    logoColor: '#000000',
  },
  {
    id: 'sv-9',
    title: 'Sales Tips That Close Deals 🤝',
    views: '8.9K',
    duration: '0:44',
    author: 'Sales Leaders',
    authorInitial: 'S',
    verified: true,
    gradient: 'from-[#172554] to-[#1e40af]',
    tag: 'SALES',
    tagBg: '#4c0519',
    tagColor: '#f43f5e',
    timeAgo: '1w ago',
    logoText: 'SALES\nLEADERS',
    logoBg: '#ffffff',
    logoColor: '#000000',
  },
]
