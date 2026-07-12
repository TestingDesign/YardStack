import type { SubTabItem } from '../TabBar/SubTabBar' 

import { 
  PlayCircle, 
  Mic, 
  Megaphone, 
  Folder, 
  Rocket, 
  Building2, 
  ClipboardList, 
  BookOpen 
} from 'lucide-react'
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'

export type NavKey =
  | 'activityBoard'
  | 'podcasts'
  | 'learn'
  | 'spotlight'
  | 'directory'
  | 'cityInventory'
  | 'showcase'
  | 'events'
  | 'analytics'
  | 'settings'
  | 'pulse'
  | 'showcase'
  | 'cityInventory'
  | 'surveyPools'
  | 'lms'

export interface NavItem {
  key: NavKey
  label: string
  activeIcon: string
  Icon?: string 
  badge?: string
  hasArrow?: boolean
  subTabs?: SubTabItem[]
  tooltip?: string
}

export const NAV_ITEMS: NavItem[] = [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { key: 'pulse',         label: 'Pulse',          activeIcon: DynamicFeedIcon as any, Icon: DynamicFeedIcon as any, tooltip: 'Your daily feed of real estate updates, news, and community highlights.' },
  { key: 'spotlight',     label: 'Spotlight',      activeIcon: PlayCircle as any, Icon: PlayCircle as any, tooltip: 'Bite-sized, high-impact videos to engage, learn, build credibility and stay updated with the real estate ecosystem.' },
  { key: 'podcasts',      label: 'RED Expert',     activeIcon: Mic as any,           Icon: Mic as any, tooltip: 'In-depth conversations with real estate domain experts, practitioners and industry leaders sharing practical insights and experiences.' },
  { key: 'activityBoard', label: 'Opportunities',  activeIcon: Megaphone as any,  Icon: Megaphone as any, tooltip: 'Discover jobs, vendor requirements, agent hiring, partnerships, collaborations and other B2B opportunities across the ecosystem.' },
  { key: 'directory',     label: 'Directory',      activeIcon: Folder as any, Icon: Folder as any, tooltip: 'Explore a comprehensive directory of verified professionals, businesses and service providers across the real estate ecosystem.' },
  { key: 'showcase',      label: 'Launching',      activeIcon: Rocket as any,     Icon: Rocket as any, badge: 'Soon', tooltip: 'New features and modules launching soon.' },
  { key: 'cityInventory', label: 'City Inventory', activeIcon: Building2 as any,      Icon: Building2 as any, tooltip: 'Browse properties and inventory across different cities.' },
  { key: 'surveyPools',   label: 'Survey Pools',   activeIcon: ClipboardList as any,     Icon: ClipboardList as any, tooltip: 'Participate in surveys and share your feedback.' },
  { key: 'lms',           label: 'LMS',            activeIcon: BookOpen as any,     Icon: BookOpen as any, tooltip: 'Learning Management System for continuous education.' }
]