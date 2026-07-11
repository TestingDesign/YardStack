import realEstateLiving from './assets/real_estate_living.png';
import interiorDesign from './assets/interior_design.png';
import constructionSite from './assets/construction_site.png';
import businessSales from './assets/business_sales.png';

import cityProjects from './assets/city_projects.png';
import smartHome from './assets/smart_home.png';
import luxuryVilla from './assets/luxury_villa.png';
import financeChart from './assets/finance_chart.png';

export interface FilterTab {
  key: string;
  label: string;
  color?: string;
  count?: number;
}

const TAB_COLOR = '#6B7280'; 

export const FILTER_TABS: FilterTab[] = [
  { key: 'all', label: 'All', color: TAB_COLOR },
  { key: 'property-tours', label: 'Property Tours', color: TAB_COLOR },
  { key: 'construction', label: 'Construction Updates', color: TAB_COLOR },
  { key: 'launches', label: 'Project Launches', color: TAB_COLOR },
  { key: 'market-insights', label: 'Market Insights', color: TAB_COLOR },
  { key: 'broker-tips', label: 'Broker Tips', color: TAB_COLOR },
  { key: 'interiors', label: 'Home Interiors', color: TAB_COLOR },
];

import { type SpotlightLinkData, SPOTLIGHT_LINKS } from './SpotlightLink';

export interface SpotlightVideo {
  id: string
  title: string
  views: string
  duration: string
  author: string
  authorInitial: string
  verified: boolean
  gradient: string
  image?: string
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
    image: businessSales,
    gradient: 'from-[#0f172a] to-[#1e3a8a]',
    tag: 'SALES',
    tagBg: '#4c0519',
    tagColor: '#f43f5e',
    timeAgo: '2h ago',
    logoText: 'ABC\nREALTY',
    logoBg: '#000000',
    logoColor: '#ffffff',
    link: SPOTLIGHT_LINKS?.seniorAgent
  },
  {
    id: 'sv-2',
    title: 'Interior Goals You\'ll Love 😍',
    views: '9.8K',
    duration: '0:31',
    author: 'Prime Infra',
    authorInitial: 'P',
    verified: true,
    image: interiorDesign,
    gradient: 'from-[#451a03] to-[#78350f]',
    tag: 'MARKETING',
    tagBg: '#1e1b4b',
    tagColor: '#818cf8',
    timeAgo: '5h ago',
    logoText: 'PRIME\nINFRA',
    logoBg: '#ffffff',
    logoColor: '#000000',
    link: SPOTLIGHT_LINKS?.luxuryVilla
  },
  {
    id: 'sv-3',
    title: 'Top Projects in Bangalore 📍',
    views: '18.6K',
    duration: '0:26',
    author: 'City Spaces',
    authorInitial: 'C',
    verified: true,
    image: cityProjects,
    gradient: 'from-[#2e1065] to-[#4c1d95]',
    tag: 'REAL ESTATE',
    tagBg: '#e9d5ff',
    tagColor: '#6b21a8',
    timeAgo: '1d ago',
    logoText: 'CITY\nSPACES',
    logoBg: '#3b0764',
    logoColor: '#ffffff',
    link: SPOTLIGHT_LINKS?.commercialOffice
  },
  {
    id: 'sv-4',
    title: 'The Future of Real Estate 🚀',
    views: '7.2K',
    duration: '0:30',
    author: 'Future Homes',
    authorInitial: 'F',
    verified: true,
    image: cityProjects,
    gradient: 'from-[#0c4a6e] to-[#0369a1]',
    tag: 'INSIGHTS',
    tagBg: '#60a5fa',
    tagColor: '#ffffff',
    timeAgo: '2d ago',
    logoText: 'FUTURE\nHOMES',
    logoBg: '#1e3a8a',
    logoColor: '#ffffff',
    link: SPOTLIGHT_LINKS?.enquiry
  },
  {
    id: 'sv-5',
    title: 'Marketing That Actually Works 🎯',
    views: '15.3K',
    duration: '1:02',
    author: 'RED Experts',
    authorInitial: 'R',
    verified: true,
    image: interiorDesign,
    gradient: 'from-[#4c0519] to-[#831843]',
    tag: 'MARKETING',
    tagBg: '#1e1b4b',
    tagColor: '#818cf8',
    timeAgo: '3d ago',
    logoText: 'RED\nEXPERTS',
    logoBg: '#ffffff',
    logoColor: '#e11d48',
    link: SPOTLIGHT_LINKS?.agentNetwork
  },
  {
    id: 'sv-6',
    title: 'Construction Timelapse 🏗️',
    views: '6.7K',
    duration: '0:29',
    author: 'BuildSmart',
    authorInitial: 'B',
    verified: true,
    image: constructionSite,
    gradient: 'from-[#78350f] to-[#b45309]',
    tag: 'CONSTRUCTION',
    tagBg: '#fef3c7',
    tagColor: '#d97706',
    timeAgo: '4d ago',
    logoText: 'BUILD\nSMART',
    logoBg: '#ffffff',
    logoColor: '#000000',
    link: SPOTLIGHT_LINKS?.propertyTour
  },
  {
    id: 'sv-7',
    title: 'Space Planning Done Right ✅',
    views: '5.1K',
    duration: '0:31',
    author: 'Architects Hub',
    authorInitial: 'A',
    verified: true,
    image: interiorDesign,
    gradient: 'from-[#022c22] to-[#065f46]',
    tag: 'DESIGN',
    tagBg: '#d1fae5',
    tagColor: '#059669',
    timeAgo: '5d ago',
    logoText: 'STUDIO\nV',
    logoBg: '#fcd34d',
    logoColor: '#000000',
    link: SPOTLIGHT_LINKS?.seniorAgent
  },
  {
    id: 'sv-8',
    title: 'Bangalore Real Estate Update 📈',
    views: '11.2K',
    duration: '0:47',
    author: 'Market Pulse',
    authorInitial: 'M',
    verified: true,
    image: financeChart,
    gradient: 'from-[#111827] to-[#374151]',
    tag: 'FINANCE',
    tagBg: '#f3f4f6',
    tagColor: '#374151',
    timeAgo: '1w ago',
    logoText: 'MARKET\nPULSE',
    logoBg: '#ffffff',
    logoColor: '#000000',
    link: SPOTLIGHT_LINKS?.capitalFund
  },
  {
    id: 'sv-9',
    title: 'Sales Tips That Close Deals 🤝',
    views: '8.9K',
    duration: '0:44',
    author: 'Sales Leaders',
    authorInitial: 'S',
    verified: true,
    image: businessSales,
    gradient: 'from-[#172554] to-[#1e40af]',
    tag: 'SALES',
    tagBg: '#4c0519',
    tagColor: '#f43f5e',
    timeAgo: '1w ago',
    logoText: 'SALES\nLEADERS',
    logoBg: '#ffffff',
    logoColor: '#000000',
    link: SPOTLIGHT_LINKS?.agentNetwork
  },
  {
    id: 'sv-10',
    title: 'PropTech Innovations 2026 💻',
    views: '22.1K',
    duration: '0:55',
    author: 'TechEstate',
    authorInitial: 'T',
    verified: true,
    image: smartHome,
    gradient: 'from-[#0f766e] to-[#042f2e]',
    tag: 'TECHNOLOGY',
    tagBg: '#ccfbf1',
    tagColor: '#0f766e',
    timeAgo: '1w ago',
    logoText: 'TECH\nESTATE',
    logoBg: '#0f766e',
    logoColor: '#ffffff',
    link: SPOTLIGHT_LINKS?.registration
  },
  {
    id: 'sv-11',
    title: 'Navigating Mortgage Rates 🏦',
    views: '14.5K',
    duration: '1:15',
    author: 'FinAdvisors',
    authorInitial: 'F',
    verified: false,
    image: financeChart,
    gradient: 'from-[#3f6212] to-[#14532d]',
    tag: 'FINANCE',
    tagBg: '#dcfce7',
    tagColor: '#166534',
    timeAgo: '2w ago',
    logoText: 'FIN\nADV',
    logoBg: '#ffffff',
    logoColor: '#14532d',
    link: SPOTLIGHT_LINKS?.capitalFund
  },
  {
    id: 'sv-12',
    title: 'Minimalist Architecture Tour 🏛️',
    views: '35.4K',
    duration: '0:58',
    author: 'ArchDaily India',
    authorInitial: 'A',
    verified: true,
    image: interiorDesign,
    gradient: 'from-[#52525b] to-[#18181b]',
    tag: 'DESIGN',
    tagBg: '#e4e4e7',
    tagColor: '#27272a',
    timeAgo: '2w ago',
    logoText: 'ARCH\nDAILY',
    logoBg: '#000000',
    logoColor: '#ffffff',
    link: SPOTLIGHT_LINKS?.propertyTour
  },
  {
    id: 'sv-13',
    title: 'Commercial Leasing Trends 🏢',
    views: '6.2K',
    duration: '0:42',
    author: 'Corporate Spaces',
    authorInitial: 'C',
    verified: false,
    image: businessSales,
    gradient: 'from-[#1e40af] to-[#172554]',
    tag: 'BUSINESS',
    tagBg: '#dbeafe',
    tagColor: '#1e40af',
    timeAgo: '3w ago',
    logoText: 'CORP\nSPACE',
    logoBg: '#1e40af',
    logoColor: '#ffffff',
    link: SPOTLIGHT_LINKS?.commercialOffice
  },
  {
    id: 'sv-14',
    title: 'Smart Home Automation Setup 🔌',
    views: '41.2K',
    duration: '1:30',
    author: 'SmartLiving',
    authorInitial: 'S',
    verified: true,
    image: smartHome,
    gradient: 'from-[#6b21a8] to-[#3b0764]',
    tag: 'TECHNOLOGY',
    tagBg: '#f3e8ff',
    tagColor: '#7e22ce',
    timeAgo: '1m ago',
    logoText: 'SMART\nLIVING',
    logoBg: '#ffffff',
    logoColor: '#6b21a8',
    link: SPOTLIGHT_LINKS?.luxuryVilla
  },
  {
    id: 'sv-15',
    title: 'Mastering Client Follow-Ups 📞',
    views: '19.8K',
    duration: '0:49',
    author: 'Realtor Coach',
    authorInitial: 'R',
    verified: true,
    image: businessSales,
    gradient: 'from-[#b91c1c] to-[#7f1d1d]',
    tag: 'BUSINESS',
    tagBg: '#fee2e2',
    tagColor: '#b91c1c',
    timeAgo: '1m ago',
    logoText: 'REALTOR\nCOACH',
    logoBg: '#b91c1c',
    logoColor: '#ffffff',
    link: SPOTLIGHT_LINKS?.agentNetwork
  },
  {
    id: 'sv-16',
    title: 'Sustainable Building Materials 🌿',
    views: '11.5K',
    duration: '1:05',
    author: 'EcoConstruct',
    authorInitial: 'E',
    verified: false,
    image: constructionSite,
    gradient: 'from-[#166534] to-[#064e3b]',
    tag: 'CONSTRUCTION',
    tagBg: '#d1fae5',
    tagColor: '#059669',
    timeAgo: '1m ago',
    logoText: 'ECO\nCONSTRUCT',
    logoBg: '#ffffff',
    logoColor: '#064e3b',
    link: SPOTLIGHT_LINKS?.enquiry
  },
  {
    id: 'sv-17',
    title: 'Luxury Villa Walkthrough 💎',
    views: '88.3K',
    duration: '2:15',
    author: 'Elite Estates',
    authorInitial: 'E',
    verified: true,
    image: luxuryVilla,
    gradient: 'from-[#86198f] to-[#4a044e]',
    tag: 'REAL ESTATE',
    tagBg: '#fae8ff',
    tagColor: '#a21caf',
    timeAgo: '2m ago',
    logoText: 'ELITE\nESTATES',
    logoBg: '#000000',
    logoColor: '#e879f9',
    link: SPOTLIGHT_LINKS?.luxuryVilla
  },
  {
    id: 'sv-18',
    title: 'Social Media Hooks for Brokers 📱',
    views: '27.6K',
    duration: '0:55',
    author: 'Marketing Pro',
    authorInitial: 'M',
    verified: true,
    image: interiorDesign,
    gradient: 'from-[#0369a1] to-[#082f49]',
    tag: 'MARKETING',
    tagBg: '#e0f2fe',
    tagColor: '#0369a1',
    timeAgo: '2m ago',
    logoText: 'MKTG\nPRO',
    logoBg: '#ffffff',
    logoColor: '#0369a1',
    link: SPOTLIGHT_LINKS?.registration
  },
  {
    id: 'sv-19',
    title: 'Investing in REITs Explained 📊',
    views: '32.1K',
    duration: '1:45',
    author: 'Wealth Builders',
    authorInitial: 'W',
    verified: false,
    image: realEstateLiving,
    gradient: 'from-[#854d0e] to-[#422006]',
    tag: 'FINANCE',
    tagBg: '#fef08a',
    tagColor: '#a16207',
    timeAgo: '3m ago',
    logoText: 'WEALTH\nBUILDERS',
    logoBg: '#854d0e',
    logoColor: '#ffffff',
    link: SPOTLIGHT_LINKS?.capitalFund
  },
  {
    id: 'sv-20',
    title: 'Pre-launch Offers: Worth It? 🤔',
    views: '15.9K',
    duration: '0:38',
    author: 'Property Guru',
    authorInitial: 'P',
    verified: true,
    image: realEstateLiving,
    gradient: 'from-[#be123c] to-[#881337]',
    tag: 'INSIGHTS',
    tagBg: '#ffe4e6',
    tagColor: '#e11d48',
    timeAgo: '3m ago',
    logoText: 'PROP\nGURU',
    logoBg: '#ffffff',
    logoColor: '#be123c',
    link: SPOTLIGHT_LINKS?.enquiry
  },
  {
    id: 'sv-21',
    title: 'First-Time Buyer Guide 🏠',
    views: '54.2K',
    duration: '1:10',
    author: 'Home Finder',
    authorInitial: 'H',
    verified: true,
    image: realEstateLiving,
    gradient: 'from-[#052e16] to-[#14532d]',
    tag: 'REAL ESTATE',
    tagBg: '#bbf7d0',
    tagColor: '#16a34a',
    timeAgo: '4m ago',
    logoText: 'HOME\nFIND',
    logoBg: '#14532d',
    logoColor: '#ffffff',
    link: SPOTLIGHT_LINKS?.propertyTour
  },
  {
    id: 'sv-22',
    title: '2026 Color Palette Trends 🎨',
    views: '43.7K',
    duration: '0:50',
    author: 'Creative Nest',
    authorInitial: 'C',
    verified: true,
    image: interiorDesign,
    gradient: 'from-[#4a044e] to-[#701a75]',
    tag: 'DESIGN',
    tagBg: '#fbcfe8',
    tagColor: '#c026d3',
    timeAgo: '4m ago',
    logoText: 'CREATIVE\nNEST',
    logoBg: '#ffffff',
    logoColor: '#701a75',
    link: SPOTLIGHT_LINKS?.registration
  },
  {
    id: 'sv-23',
    title: 'Virtual Reality Property Tours 🥽',
    views: '89.1K',
    duration: '2:05',
    author: 'NextGen Realty',
    authorInitial: 'N',
    verified: true,
    image: smartHome,
    gradient: 'from-[#172554] to-[#1e3a8a]',
    tag: 'TECHNOLOGY',
    tagBg: '#bfdbfe',
    tagColor: '#2563eb',
    timeAgo: '5m ago',
    logoText: 'NEXT\nGEN',
    logoBg: '#2563eb',
    logoColor: '#ffffff',
    link: SPOTLIGHT_LINKS?.propertyTour
  },
  {
    id: 'sv-24',
    title: 'Hidden Tax Benefits for Owners 💰',
    views: '112K',
    duration: '1:25',
    author: 'Tax Advisors',
    authorInitial: 'T',
    verified: false,
    image: financeChart,
    gradient: 'from-[#1e1b4b] to-[#312e81]',
    tag: 'FINANCE',
    tagBg: '#e0e7ff',
    tagColor: '#4f46e5',
    timeAgo: '5m ago',
    logoText: 'TAX\nPRO',
    logoBg: '#ffffff',
    logoColor: '#312e81',
    link: SPOTLIGHT_LINKS?.capitalFund
  },
  {
    id: 'sv-25',
    title: 'Foundation Pouring Day 1 🧱',
    views: '18.4K',
    duration: '0:59',
    author: 'Steel & Stone',
    authorInitial: 'S',
    verified: true,
    image: constructionSite,
    gradient: 'from-[#451a03] to-[#78350f]',
    tag: 'CONSTRUCTION',
    tagBg: '#fef3c7',
    tagColor: '#b45309',
    timeAgo: '6m ago',
    logoText: 'STEEL\nSTONE',
    logoBg: '#78350f',
    logoColor: '#ffffff',
    link: SPOTLIGHT_LINKS?.enquiry
  },
  {
    id: 'sv-26',
    title: 'Drone Photography Secrets 🚁',
    views: '65.3K',
    duration: '1:40',
    author: 'Aero Views',
    authorInitial: 'A',
    verified: true,
    image: cityProjects,
    gradient: 'from-[#082f49] to-[#0c4a6e]',
    tag: 'MARKETING',
    tagBg: '#bae6fd',
    tagColor: '#0284c7',
    timeAgo: '6m ago',
    logoText: 'AERO\nVIEWS',
    logoBg: '#ffffff',
    logoColor: '#0c4a6e',
    link: SPOTLIGHT_LINKS?.agentNetwork
  },
  {
    id: 'sv-27',
    title: 'Advanced Negotiation Tactics 🗣️',
    views: '31.9K',
    duration: '1:12',
    author: 'Closer Academy',
    authorInitial: 'C',
    verified: true,
    image: businessSales,
    gradient: 'from-[#3b0764] to-[#581c87]',
    tag: 'BUSINESS',
    tagBg: '#e9d5ff',
    tagColor: '#9333ea',
    timeAgo: '7m ago',
    logoText: 'CLOSER\nACADEMY',
    logoBg: '#581c87',
    logoColor: '#ffffff',
    link: SPOTLIGHT_LINKS?.seniorAgent
  },
  {
    id: 'sv-28',
    title: 'Staging to Sell 3x Faster ✨',
    views: '47.5K',
    duration: '0:45',
    author: 'Stage Right',
    authorInitial: 'S',
    verified: false,
    image: luxuryVilla,
    gradient: 'from-[#7f1d1d] to-[#991b1b]',
    tag: 'REAL ESTATE',
    tagBg: '#fecaca',
    tagColor: '#dc2626',
    timeAgo: '7m ago',
    logoText: 'STAGE\nRIGHT',
    logoBg: '#ffffff',
    logoColor: '#991b1b',
    link: SPOTLIGHT_LINKS?.luxuryVilla
  },
  {
    id: 'sv-29',
    title: 'AI Valuations vs Manual Appraisals 🤖',
    views: '29.8K',
    duration: '1:18',
    author: 'Data Driven Prop',
    authorInitial: 'D',
    verified: true,
    image: smartHome,
    gradient: 'from-[#064e3b] to-[#065f46]',
    tag: 'TECHNOLOGY',
    tagBg: '#a7f3d0',
    tagColor: '#059669',
    timeAgo: '8m ago',
    logoText: 'DATA\nPROP',
    logoBg: '#065f46',
    logoColor: '#ffffff',
    link: SPOTLIGHT_LINKS?.commercialOffice
  },
  {
    id: 'sv-30',
    title: 'House Flipping 101 🛠️',
    views: '76.1K',
    duration: '2:30',
    author: 'Flip Masters',
    authorInitial: 'F',
    verified: true,
    image: realEstateLiving,
    gradient: 'from-[#1c1917] to-[#292524]',
    tag: 'FINANCE',
    tagBg: '#d6d3d1',
    tagColor: '#44403c',
    timeAgo: '8m ago',
    logoText: 'FLIP\nMASTERS',
    logoBg: '#ffffff',
    logoColor: '#292524',
    link: SPOTLIGHT_LINKS?.capitalFund
  }
]

export interface ExpertData {
  name: string
  views: string
  image: string
  rank: number
}

export const TOP_CREATORS: ExpertData[] = [
  { name: 'Ritika Sharma', views: '2.4M views', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80', rank: 1 },
  { name: 'Amit Verma', views: '1.8M views', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80', rank: 2 },
  { name: 'Rahul Prasad', views: '1.2M views', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80', rank: 3 },
  { name: 'Neha Iyer', views: '950K views', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80', rank: 4 },
  { name: 'Karan Desai', views: '820K views', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80', rank: 5 },
  { name: 'Priya Menon', views: '760K views', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', rank: 6 },
  { name: 'Vikram Singh', views: '610K views', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', rank: 7 },
  { name: 'Sneha Rao', views: '540K views', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', rank: 8 },
]

export interface SpotlightImpactStat {
  id: string
  value: string
  labelDesktop: string
  labelMobile: string
  colorDesktop: string
  colorMobile: string
  bgDesktop: string
  borderDesktop: string
  borderMobile: string
  delay: number
}

export const SPOTLIGHT_IMPACT_STATS: SpotlightImpactStat[] = [
  { id: 'views', value: '12M+', labelDesktop: 'Total Views', labelMobile: 'Shorts Views', colorDesktop: 'text-purple-600', colorMobile: 'text-purple-600', bgDesktop: 'bg-purple-50', borderDesktop: 'border-purple-100/50', borderMobile: 'border-purple-100', delay: 0 },
  { id: 'trending', value: '#1', labelDesktop: 'Trending', labelMobile: 'Trending', colorDesktop: 'text-orange-600', colorMobile: 'text-orange-500', bgDesktop: 'bg-orange-50', borderDesktop: 'border-orange-100/50', borderMobile: 'border-orange-100', delay: 40 },
  { id: 'creators', value: '850+', labelDesktop: 'Creators', labelMobile: 'Creators', colorDesktop: 'text-blue-600', colorMobile: 'text-blue-500', bgDesktop: 'bg-blue-50', borderDesktop: 'border-blue-100/50', borderMobile: 'border-blue-100', delay: 80 },
  { id: 'shares', value: '45K', labelDesktop: 'Shares', labelMobile: 'Shares Today', colorDesktop: 'text-emerald-600', colorMobile: 'text-green-600', bgDesktop: 'bg-emerald-50', borderDesktop: 'border-emerald-100/50', borderMobile: 'border-green-100', delay: 120 },
]