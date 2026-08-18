import type { SubTabItem } from '../TabBar/SubTabBar' 

import { 
  Rocket, 
  ClipboardList, 
} from 'lucide-react'
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'

import spotlightPink from './Images/spotlight.png'
import spotlightWhite from './Images1/spotlight1.png'
import micPink from './Images/mic.png'
import micWhite from './Images1/mic1.png'
import activityPink from './Images/activity.png'
import activityWhite from './Images1/activity1.png'
import directoryPink from './Images/directory.png'
import directoryWhite from './Images1/directory1.png'
import cityPink from './Images/city.png'
import cityWhite from './Images1/city1.png'
import learnPink from './Images/learn.png'
import learnWhite from './Images1/learn1.png'

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
  { key: 'spotlight',     label: 'Spotlight',      activeIcon: spotlightWhite, Icon: spotlightPink, tooltip: 'Bite-sized, high-impact videos to engage, learn, build credibility and stay updated with the real estate ecosystem.' },
  { key: 'podcasts',      label: 'RED Expert',     activeIcon: micWhite,       Icon: micPink, tooltip: 'In-depth conversations with real estate domain experts, practitioners and industry leaders sharing practical insights and experiences.' },
  { key: 'activityBoard', label: 'Opportunities',  activeIcon: activityWhite,  Icon: activityPink, tooltip: 'Discover jobs, vendor requirements, agent hiring, partnerships, collaborations and other B2B opportunities across the ecosystem.' },
  { key: 'directory',     label: 'Directory',      activeIcon: directoryWhite, Icon: directoryPink, tooltip: 'Explore a comprehensive directory of verified professionals, businesses and service providers across the real estate ecosystem.' },
  { key: 'showcase',      label: 'Launching',      activeIcon: Rocket as any, Icon: Rocket as any, badge: 'Soon', tooltip: 'New features and modules launching soon.' },
  { key: 'cityInventory', label: 'City Inventory', activeIcon: cityWhite,      Icon: cityPink, tooltip: 'Browse properties and inventory across different cities.' },
  { key: 'surveyPools',   label: 'Survey Pools',   activeIcon: ClipboardList as any, Icon: ClipboardList as any, tooltip: 'Participate in surveys and share your feedback.' },
  { key: 'lms',           label: 'LMS',            activeIcon: learnWhite,     Icon: learnPink, tooltip: 'Learning Management System for continuous education.' }
]