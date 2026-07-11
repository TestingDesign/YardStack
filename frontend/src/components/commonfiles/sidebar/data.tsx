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
}

export const NAV_ITEMS: NavItem[] = [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { key: 'pulse',         label: 'Pulse',          activeIcon: DynamicFeedIcon as any, Icon: DynamicFeedIcon as any },
  { key: 'spotlight',     label: 'Spotlight',      activeIcon: PlayCircle as any, Icon: PlayCircle as any },
  { key: 'podcasts',      label: 'RED Expert',     activeIcon: Mic as any,           Icon: Mic as any },
  { key: 'activityBoard', label: 'Opportunities',  activeIcon: Megaphone as any,  Icon: Megaphone as any },
  { key: 'directory',     label: 'Directory',      activeIcon: Folder as any, Icon: Folder as any },
  { key: 'showcase',      label: 'Launching',      activeIcon: Rocket as any,     Icon: Rocket as any, badge: 'Soon' },
  { key: 'cityInventory', label: 'City Inventory', activeIcon: Building2 as any,      Icon: Building2 as any },
  { key: 'surveyPools',   label: 'Survey Pools',   activeIcon: ClipboardList as any,     Icon: ClipboardList as any },
  { key: 'lms',           label: 'LMS',            activeIcon: BookOpen as any,     Icon: BookOpen as any }
]