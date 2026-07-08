import type { SubTabItem } from '../TabBar/SubTabBar' 

import micPurple from './Images/mic.png' 
import activityactiveIcon from './Images/activity.png'
import learnactiveIcon from './Images/learn.png'
import spotlightactiveIcon from './Images/spotlight.png'
import directoryactiveIcon from './Images/directory.png'
import cityactiveIcon from './Images/city.png'
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'

/* import micWhite from './Images1/mic1.png'
import activityWhite from './Images1/activity1.png'
import learnWhite from './Images1/learn1.png'
import spotlightWhite from './Images1/spotlight1.png'
import directoryWhite from './Images1/directory1.png'
import cityWhite from './Images1/city1.png' */

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
  { key: 'spotlight',     label: 'Spotlight',      activeIcon: spotlightactiveIcon, Icon: spotlightactiveIcon },
  { key: 'podcasts',      label: 'RED Expert',     activeIcon: micPurple,           Icon: micPurple },
  { key: 'activityBoard', label: 'Opportunities',  activeIcon: activityactiveIcon,  Icon: activityactiveIcon },
  { key: 'directory',     label: 'Directory',      activeIcon: directoryactiveIcon, Icon: directoryactiveIcon },
  { key: 'showcase',      label: 'Showcase',       activeIcon: learnactiveIcon,     Icon: learnactiveIcon },
  { key: 'cityInventory', label: 'City Inventory', activeIcon: cityactiveIcon,      Icon: cityactiveIcon },
  { key: 'surveyPools',   label: 'Survey Pools',   activeIcon: learnactiveIcon,     Icon: learnactiveIcon },
  { key: 'lms',           label: 'LMS',            activeIcon: learnactiveIcon,     Icon: learnactiveIcon }
]