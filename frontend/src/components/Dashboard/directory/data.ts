import BusinessIcon from '@mui/icons-material/Business'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PeopleIcon from '@mui/icons-material/People'
import { Shield } from 'lucide-react'

export interface DirectoryTab {
  key: string
  label: string
}

export const DIRECTORY_TABS: DirectoryTab[] = [
  { key: 'all', label: 'All' },
  { key: 'builders', label: 'Builders' },
  { key: 'brokers', label: 'Brokers' },
  { key: 'architects', label: 'Architects' },
  { key: 'contractors', label: 'Contractors' },
  { key: 'legal', label: 'Legal' },
  { key: 'lenders', label: 'Lenders' }
]

export const DIRECTORY_STATS = [
  { label: 'Builders Listed', shortLabel: 'Builders', value: '450+', icon: BusinessIcon, color: '#6366F1', isLucide: false },
  { label: 'Cities Covered', shortLabel: 'Cities', value: '28', icon: LocationOnOutlinedIcon, color: '#EC4899', isLucide: false },
  { label: 'Verified Partners', shortLabel: 'Verified', value: '320+', icon: Shield, color: '#10B981', isLucide: true },
  { label: 'Active Connections', shortLabel: 'Connections', value: '12K+', icon: PeopleIcon, color: '#F59E0B', isLucide: false },
]

export interface Builder {
  id: string
  name: string
  category: string
  location: string
  verified?: boolean
  logoBg: string
  logoColor: string
  logoText: string
  isFeatured?: boolean
  isRecentlyJoined?: boolean
}

export const BUILDERS: Builder[] = [
  {
    id: 'b-1',
    name: 'Srikara Constructions',
    category: 'Residential - Commercial',
    location: 'Hyderabad',
    verified: true,
    logoBg: '#133E2B',
    logoColor: '#F59E0B',
    logoText: 'SRIKARA',
    isFeatured: true
  },
  {
    id: 'b-2',
    name: 'Vaishnavi Builders',
    category: 'Residential - Villas',
    location: 'Hyderabad',
    verified: true,
    logoBg: '#1E293B',
    logoColor: '#F59E0B',
    logoText: 'V',
    isFeatured: true
  },
  {
    id: 'b-3',
    name: 'Prime Builders',
    category: 'Commercial - Infra',
    location: 'Hyderabad',
    verified: true,
    logoBg: '#F8FAFC',
    logoColor: '#3B82F6',
    logoText: 'PRIME',
    isFeatured: true
  },
  {
    id: 'b-4',
    name: 'Alpha Builders',
    category: 'Residential - Commercial',
    location: 'Hyderabad',
    logoBg: '#0F766E',
    logoColor: '#FFFFFF',
    logoText: 'A',
    isRecentlyJoined: true
  },
  {
    id: 'b-5',
    name: 'Sumadhura Developers',
    category: 'Residential - Villas',
    location: 'Bangalore',
    verified: true,
    logoBg: '#1E3A8A',
    logoColor: '#FBBF24',
    logoText: 'SD',
    isRecentlyJoined: true
  },
  {
    id: 'b-6',
    name: 'Fortune Infra',
    category: 'Commercial - Industrial',
    location: 'Hyderabad',
    logoBg: '#FFFBEB',
    logoColor: '#F97316',
    logoText: 'F',
    isRecentlyJoined: true
  },
  {
    id: 'b-7',
    name: 'Prestige Group',
    category: 'Premium Residential - Commercial',
    location: 'Bangalore',
    verified: true,
    logoBg: '#000000',
    logoColor: '#EAB308',
    logoText: 'PRESTIGE',
    isFeatured: true
  },
  {
    id: 'b-8',
    name: 'DLF Limited',
    category: 'Commercial - Townships',
    location: 'Gurgaon',
    verified: true,
    logoBg: '#1D4ED8',
    logoColor: '#FFFFFF',
    logoText: 'DLF',
    isFeatured: true
  },
  {
    id: 'b-9',
    name: 'Lodha Group',
    category: 'Luxury Residential',
    location: 'Mumbai',
    verified: true,
    logoBg: '#7F1D1D',
    logoColor: '#FCA5A5',
    logoText: 'LODHA',
    isFeatured: true
  },
  {
    id: 'b-10',
    name: 'Godrej Properties',
    category: 'Residential - Mixed Use',
    location: 'Mumbai',
    verified: true,
    logoBg: '#166534',
    logoColor: '#FFFFFF',
    logoText: 'GP',
    isRecentlyJoined: true
  },
  {
    id: 'b-11',
    name: 'Aparna Constructions',
    category: 'Residential - Gated Communities',
    location: 'Hyderabad',
    verified: true,
    logoBg: '#831843',
    logoColor: '#FBCFE8',
    logoText: 'APARNA',
    isFeatured: true
  },
  {
    id: 'b-12',
    name: 'Casagrand',
    category: 'Residential - Apartments',
    location: 'Chennai',
    logoBg: '#4C1D95',
    logoColor: '#EDE9FE',
    logoText: 'CG',
    isRecentlyJoined: true
  },
  {
    id: 'b-13',
    name: 'Sobha Developers',
    category: 'Luxury Villas - Apartments',
    location: 'Bangalore',
    verified: true,
    logoBg: '#B45309',
    logoColor: '#FEF3C7',
    logoText: 'SOBHA',
    isFeatured: true
  },
  {
    id: 'b-14',
    name: 'Kolte-Patil',
    category: 'Residential - Townships',
    location: 'Pune',
    logoBg: '#3F6212',
    logoColor: '#ECFCCB',
    logoText: 'KP',
    isRecentlyJoined: true
  },
  {
    id: 'b-15',
    name: 'Brigade Group',
    category: 'Commercial - Residential',
    location: 'Bangalore',
    verified: true,
    logoBg: '#312E81',
    logoColor: '#E0E7FF',
    logoText: 'BG',
    isRecentlyJoined: true
  },
  {
    id: 'b-16',
    name: 'Puravankara Limited',
    category: 'Premium Residential',
    location: 'Bangalore',
    verified: true,
    logoBg: '#064E3B',
    logoColor: '#A7F3D0',
    logoText: 'PURVA',
    isFeatured: true
  },
  {
    id: 'b-17',
    name: 'Mahindra Lifespaces',
    category: 'Sustainable Townships',
    location: 'Mumbai',
    verified: true,
    logoBg: '#E11D48',
    logoColor: '#FFE4E6',
    logoText: 'ML',
    isFeatured: true
  },
  {
    id: 'b-18',
    name: 'Tata Housing',
    category: 'Residential - Affordable Housing',
    location: 'Mumbai',
    verified: true,
    logoBg: '#1E40AF',
    logoColor: '#DBEAFE',
    logoText: 'TATA',
    isFeatured: true
  },
  {
    id: 'b-19',
    name: 'Omaxe Ltd',
    category: 'Commercial - Malls',
    location: 'Delhi',
    verified: true,
    logoBg: '#9D174D',
    logoColor: '#FCE7F3',
    logoText: 'OLtd',
    isRecentlyJoined: true
  },
  {
    id: 'b-20',
    name: 'Salarpuria Sattva',
    category: 'IT Parks - Commercial',
    location: 'Bangalore',
    verified: true,
    logoBg: '#065F46',
    logoColor: '#D1FAE5',
    logoText: 'SATTVA',
    isFeatured: true
  },
  {
    id: 'b-21',
    name: 'K Raheja Corp',
    category: 'Commercial - Hospitality',
    location: 'Mumbai',
    verified: true,
    logoBg: '#701A75',
    logoColor: '#FAE8FF',
    logoText: 'KRC',
    isFeatured: true
  },
  {
    id: 'b-22',
    name: 'Shapoorji Pallonji',
    category: 'Infrastructure - Residential',
    location: 'Mumbai',
    verified: true,
    logoBg: '#374151',
    logoColor: '#F3F4F6',
    logoText: 'SP',
    isFeatured: true
  },
  {
    id: 'b-23',
    name: 'Kalpataru Limited',
    category: 'Premium Residential',
    location: 'Mumbai',
    verified: true,
    logoBg: '#9F1239',
    logoColor: '#FFE4E6',
    logoText: 'KL',
    isRecentlyJoined: true
  },
  {
    id: 'b-24',
    name: 'Oberoi Realty',
    category: 'Luxury Residential',
    location: 'Mumbai',
    verified: true,
    logoBg: '#0F172A',
    logoColor: '#E2E8F0',
    logoText: 'OBEROI',
    isFeatured: true
  },
  {
    id: 'b-25',
    name: 'Hiranandani Group',
    category: 'Townships - Commercial',
    location: 'Mumbai',
    verified: true,
    logoBg: '#0284C7',
    logoColor: '#E0F2FE',
    logoText: 'HG',
    isFeatured: true
  },
  {
    id: 'b-26',
    name: 'My Home Constructions',
    category: 'Residential - Gated Communities',
    location: 'Hyderabad',
    verified: true,
    logoBg: '#047857',
    logoColor: '#D1FAE5',
    logoText: 'MYHOME',
    isFeatured: true
  },
  {
    id: 'b-27',
    name: 'Phoenix Group',
    category: 'IT Parks - Commercial',
    location: 'Hyderabad',
    verified: true,
    logoBg: '#B91C1C',
    logoColor: '#FEE2E2',
    logoText: 'PHX',
    isFeatured: true
  },
  {
    id: 'b-28',
    name: 'Rajapushpa Properties',
    category: 'Premium Residential - IT Parks',
    location: 'Hyderabad',
    verified: true,
    logoBg: '#4338CA',
    logoColor: '#E0E7FF',
    logoText: 'RP',
    isRecentlyJoined: true
  },
  {
    id: 'b-29',
    name: 'NCC Urban',
    category: 'Residential - Villas',
    location: 'Hyderabad',
    verified: true,
    logoBg: '#0369A1',
    logoColor: '#E0F2FE',
    logoText: 'NCC',
    isRecentlyJoined: true
  },
  {
    id: 'b-30',
    name: 'Ashoka Builders',
    category: 'Commercial - Residential',
    location: 'Hyderabad',
    logoBg: '#A16207',
    logoColor: '#FEF9C3',
    logoText: 'ASB',
    isRecentlyJoined: true
  },
  {
    id: 'b-31',
    name: 'Vamsiram Builders',
    category: 'Boutique Residential - Commercial',
    location: 'Hyderabad',
    verified: true,
    logoBg: '#BE185D',
    logoColor: '#FCE7F3',
    logoText: 'VB',
    isRecentlyJoined: true
  },
  {
    id: 'b-32',
    name: 'Embassy Group',
    category: 'IT Parks - Luxury Residential',
    location: 'Bangalore',
    verified: true,
    logoBg: '#0F766E',
    logoColor: '#CCFBF1',
    logoText: 'EMBASSY',
    isFeatured: true
  },
  {
    id: 'b-33',
    name: 'Mantri Developers',
    category: 'Residential - Retail',
    location: 'Bangalore',
    logoBg: '#6D28D9',
    logoColor: '#EDE9FE',
    logoText: 'MANTRI',
    isRecentlyJoined: true
  },
  {
    id: 'b-34',
    name: 'Rohan Builders',
    category: 'Residential - Industrial',
    location: 'Pune',
    verified: true,
    logoBg: '#1D4ED8',
    logoColor: '#DBEAFE',
    logoText: 'ROHAN',
    isFeatured: true
  },
  {
    id: 'b-35',
    name: 'Panchshil Realty',
    category: 'Luxury Corporate - Residential',
    location: 'Pune',
    verified: true,
    logoBg: '#B45309',
    logoColor: '#FEF3C7',
    logoText: 'PR',
    isFeatured: true
  },
  {
    id: 'b-36',
    name: 'Amanora Park Town',
    category: 'Integrated Townships',
    location: 'Pune',
    verified: true,
    logoBg: '#15803D',
    logoColor: '#DCFCE7',
    logoText: 'AMANORA',
    isRecentlyJoined: true
  },
  {
    id: 'b-37',
    name: 'ATS Infrastructure',
    category: 'Premium Residential',
    location: 'Noida',
    verified: true,
    logoBg: '#0F172A',
    logoColor: '#F8FAFC',
    logoText: 'ATS',
    isFeatured: true
  },
  {
    id: 'b-38',
    name: 'Gaurs Group',
    category: 'Residential - Townships',
    location: 'Noida',
    verified: true,
    logoBg: '#C2410C',
    logoColor: '#FFEDD5',
    logoText: 'GAURS',
    isRecentlyJoined: true
  },
  {
    id: 'b-39',
    name: 'Navins',
    category: 'Residential - Apartments',
    location: 'Chennai',
    verified: true,
    logoBg: '#86198F',
    logoColor: '#FAE8FF',
    logoText: 'NAV',
    isRecentlyJoined: true
  },
  {
    id: 'b-40',
    name: 'Akshaya',
    category: 'Residential - Commercial',
    location: 'Chennai',
    logoBg: '#4338CA',
    logoColor: '#EEF2FF',
    logoText: 'AKSHAYA',
    isRecentlyJoined: true
  },
  {
    id: 'b-41',
    name: 'Baashyaam Constructions',
    category: 'Luxury Residential',
    location: 'Chennai',
    verified: true,
    logoBg: '#115E59',
    logoColor: '#CCFBF1',
    logoText: 'BC'
  },
  {
    id: 'b-42',
    name: 'PS Group',
    category: 'Residential - IT Parks',
    location: 'Kolkata',
    verified: true,
    logoBg: '#9D174D',
    logoColor: '#FCE7F3',
    logoText: 'PS',
    isFeatured: true
  },
  {
    id: 'b-43',
    name: 'Ambuja Neotia',
    category: 'Mixed Use - Healthcare',
    location: 'Kolkata',
    verified: true,
    logoBg: '#A21CAF',
    logoColor: '#FDF4FF',
    logoText: 'AN',
    isFeatured: true
  },
  {
    id: 'b-44',
    name: 'South City Projects',
    category: 'Premium Residential - Malls',
    location: 'Kolkata',
    verified: true,
    logoBg: '#0369A1',
    logoColor: '#E0F2FE',
    logoText: 'SCP',
    isRecentlyJoined: true
  },
  {
    id: 'b-45',
    name: 'Srijan Realty',
    category: 'Residential - Commercial',
    location: 'Kolkata',
    logoBg: '#15803D',
    logoColor: '#F0FDF4',
    logoText: 'SRIJAN',
    isRecentlyJoined: true
  }
]