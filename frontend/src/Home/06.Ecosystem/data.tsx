
import AnimatedCity from '../01.Hero/AnimatedCity';

export interface EcosystemMember {
  label: string
  icon: string
}

export const ECOSYSTEM_MEMBERS: EcosystemMember[] = [
  { label: 'Builders &\nDevelopers', icon: 'building' },
  { label: 'Channel Partners\n& Agents', icon: 'users' },
  { label: 'Employees\n& Professionals', icon: 'user' },
  { label: 'Freelance\nProfessionals', icon: 'user-circle' },
  { label: 'Marketing\nAgencies', icon: 'megaphone' },
  { label: 'CRM & Technology\nProviders', icon: 'monitor' },
  { label: 'Banking & Financial\nExperts', icon: 'landmark' },
  { label: 'Interior Designers\n& Architects', icon: 'palette' },
  { label: 'Influencers &\nTrainers', icon: 'mic' },
  { label: 'Inventory Owners\n& Investors', icon: 'line-chart' },
  { label: 'Freshers & Career\nSeekers', icon: 'graduation-cap' },
]

export interface RoadmapItem {
  name: string
  description: React.ReactNode
  icon: string
  color: string
  bgColor: string
}

export const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    name: 'Learn',
    description: 'Courses, workshops and certifications.',
    icon: 'graduation-cap',
    color: '#6B21A8',
    bgColor: '#F3E8FF',
  },
  {
    name: 'City Inventory',
    description: <>Inventory and opportunities across <AnimatedCity />.</>,
    icon: 'building',
    color: '#7C3AED',
    bgColor: '#EDE9FE',
  },
  {
    name: 'Showcase',
    description: 'Interactive demos and business presentations.',
    icon: 'monitor-play',
    color: '#D946EF',
    bgColor: '#FAE8FF',
  },
  {
    name: 'Polls & Surveys',
    description: 'Industry intelligence and market insights.',
    icon: 'bar-chart-2',
    color: '#EC4899',
    bgColor: '#FCE7F3',
  },
]
