import { SPOTLIGHT_VIDEOS } from '../spotlight/data'
import type { SpotlightVideo } from '../spotlight/data'
import { PODCAST_EPISODES } from '../podcasts/data'
import type { PodcastEpisode } from '../podcasts/data'
import { ACTIVITY_ITEMS } from '../activityBoard/data'
import type { ActivityItem } from '../activityBoard/data'
import { BUILDERS } from '../directory/data'
import type { Builder } from '../directory/data'

export type FeedType = 'spotlight' | 'expert' | 'opportunity' | 'directory'

export interface PulseSpotlightItem {
  type: 'spotlight'
  id: string
  timestamp: number
  data: SpotlightVideo
}

export interface PulseExpertItem {
  type: 'expert'
  id: string
  timestamp: number
  data: PodcastEpisode
}

export interface PulseOpportunityItem {
  type: 'opportunity'
  id: string
  timestamp: number
  data: ActivityItem
}

export interface PulseDirectoryItem {
  type: 'directory'
  id: string
  timestamp: number
  data: Builder
}

export type PulseItem = PulseSpotlightItem | PulseExpertItem | PulseOpportunityItem | PulseDirectoryItem

const now = Date.now()
const hour = 60 * 60 * 1000

const spotlightItems: PulseSpotlightItem[] = SPOTLIGHT_VIDEOS.map((item, index) => ({
  type: 'spotlight',
  id: `pulse-sp-${item.id}`,
  timestamp: now - (index * 2 * hour) - (Math.random() * hour),
  data: item,
}))

const expertItems: PulseExpertItem[] = PODCAST_EPISODES.map((item, index) => ({
  type: 'expert',
  id: `pulse-ex-${item.id}`,
  timestamp: now - (index * 3 * hour) - (Math.random() * hour),
  data: item,
}))

const opportunityItems: PulseOpportunityItem[] = ACTIVITY_ITEMS.map((item, index) => ({
  type: 'opportunity',
  id: `pulse-op-${item.id}`,
  timestamp: now - (index * 1.5 * hour) - (Math.random() * hour),
  data: item,
}))

const directoryItems: PulseDirectoryItem[] = BUILDERS.map((item, index) => ({
  type: 'directory',
  id: `pulse-dir-${item.id}`,
  timestamp: now - (index * 4 * hour) - (Math.random() * hour),
  data: item,
}))

export const PULSE_FEED: PulseItem[] = [
  ...spotlightItems,
  ...expertItems,
  ...opportunityItems,
  ...directoryItems,
].sort((a, b) => b.timestamp - a.timestamp)

export const FEED_TYPE_CONFIG = {
  spotlight: {
    label: 'Spotlight',
    color: '#9B51E0',
    bg: '#F9F5FF',
    gradient: 'from-[#9B51E0] to-[#7C3AED]',
  },
  expert: {
    label: 'RED Expert',
    color: '#7C3AED',
    bg: '#F3E8FF',
    gradient: 'from-[#7C3AED] to-[#5B21B6]',
  },
  opportunity: {
    label: 'Opportunity',
    color: '#F14698',
    bg: '#FDF2F8',
    gradient: 'from-[#F14698] to-[#D93D89]',
  },
  directory: {
    label: 'New Builder',
    color: '#2563EB',
    bg: '#F0F5FF',
    gradient: 'from-[#2563EB] to-[#1D4ED8]',
  },
} as const