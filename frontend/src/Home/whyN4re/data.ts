export const WHY_N4RE_CONTENT = {
  heading: "Hyderabad Has Thousands of Real Estate Professionals.",
  headingHighlight: "But No Common Platform.",
}

export interface DisconnectedPoint {
  icon: string
  color: string
  text: string
}

export const TODAY_PROBLEMS: DisconnectedPoint[] = [
  { icon: 'youtube', color: '#EF4444', text: 'Knowledge is scattered on YouTube' },
  { icon: 'whatsapp', color: '#22C55E', text: 'Networking happens on WhatsApp groups' },
  { icon: 'briefcase', color: '#EC4899', text: 'Business opportunities shared in private circles' },
  { icon: 'book', color: '#EF4444', text: 'Learning is spread across multiple platforms' },
  { icon: 'message', color: '#8B5CF6', text: 'Industry conversations happen in disconnected communities' },
]

export interface N4reSolution {
  pillar: string
  icon: string
  color: string
  description: string
}

export const N4RE_SOLUTIONS: N4reSolution[] = [
  {
    pillar: 'CONTENT',
    icon: 'file-text',
    color: '#6B21A8',
    description: 'Learn from experts, practitioners and industry leaders.',
  },
  {
    pillar: 'CONNECTIONS',
    icon: 'users',
    color: '#22C55E', // Green in the screenshot
    description: 'Discover professionals, businesses and opportunities.',
  },
  {
    pillar: 'CONVERSATIONS',
    icon: 'message-circle',
    color: '#F97316', // Orange in the screenshot
    description: 'Engage, collaborate and grow through meaningful interactions.',
  },
]
