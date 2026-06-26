
export interface ComingSoonItem {
  name: string
  description: React.ReactNode
  icon: string
  color: string
  bgColor: string
}

export const COMING_SOON_ITEMS: ComingSoonItem[] = [
  {
    name: 'Learn',
    description: 'Courses, workshops and certifications.',
    icon: 'graduation-cap',
    color: '#6B21A8',
    bgColor: '#F3E8FF',
  },
  {
    name: 'City Inventory',
    description: <>Inventory and opportunities across Hyderabad.</>,
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
