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
    pillar: 'One Connected Ecosystem',
    icon: 'globe',
    color: '#4C1D95',
    bgColor: '#EDE9FE',
    description: 'Connect, collaborate, learn and grow through a single professional ecosystem.',
  },
  {
    pillar: 'Discover & Create Opportunities',
    icon: 'briefcase',
    color: '#15803D',
    bgColor: '#DCFCE7',
    description: 'Find or publish jobs, business requirements, vendor requirements, partnerships and collaboration opportunities.',
  },
  {
    pillar: 'Build Your Presence',
    icon: 'megaphone',
    color: '#C2410C',
    bgColor: '#FFEDD5',
    description: 'Publish content, build your professional brand and learn from industry experts through engaging video-first experiences.',
  },
]