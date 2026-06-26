export const WHY_N4RE_CONTENT = {
  subtitle: "WHY N4RE?",
  heading: <>Hyderabad Has Thousands of Real Estate Professionals.</>,
  headingHighlight: "But No Common Platform.",
  todayHeader: "TODAY — EVERYTHING IS DISCONNECTED",
  n4reHeader: "N4RE BRINGS IT TOGETHER",
  footerText: "FIND YOUR PLACE IN N4RE"
}

export interface DisconnectedPoint {
  icon: string
  color: string
  bgColor: string
  text: string
}

export const TODAY_PROBLEMS: DisconnectedPoint[] = [
  { icon: 'youtube', color: '#EF4444', bgColor: '#FEE2E2', text: 'Knowledge is scattered on YouTube' },
  { icon: 'whatsapp', color: '#22C55E', bgColor: '#DCFCE7', text: 'Networking happens on WhatsApp groups' },
  { icon: 'users', color: '#C026D3', bgColor: '#FAE8FF', text: 'Business opportunities shared in private circles' },
  { icon: 'book', color: '#E11D48', bgColor: '#FFE4E6', text: 'Learning is spread across multiple platforms' },
  { icon: 'message', color: '#7C3AED', bgColor: '#EDE9FE', text: 'Industry conversations in disconnected communities' },
]

export interface N4reSolution {
  pillar: string
  icon: string
  color: string
  bgColor: string
  description: string
}

export const N4RE_SOLUTIONS: N4reSolution[] = [
  {
    pillar: 'CONTENT',
    icon: 'file-text',
    color: '#4C1D95',
    bgColor: '#EDE9FE',
    description: 'Learn from experts, practitioners and industry leaders.',
  },
  {
    pillar: 'CONNECTIONS',
    icon: 'users',
    color: '#15803D',
    bgColor: '#DCFCE7',
    description: 'Discover professionals, businesses and opportunities.',
  },
  {
    pillar: 'CONVERSATIONS',
    icon: 'message',
    color: '#C2410C',
    bgColor: '#FFEDD5',
    description: 'Engage, collaborate and grow through meaningful interactions.',
  },
]