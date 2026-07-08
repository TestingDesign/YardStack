import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ActivityCard } from '../activityBoard/ActivityBoardMobile'
import { BuilderCardMobile } from '../directory/DirectoryMobile'
import { EpisodeListCard, EpisodeGridCard } from '../podcasts/PodcastMobile'
import ActiveSpotlightMobile from '../spotlight/ActiveSpotlightMobile'
import PodcastActiveEpisodeMobile from '../podcasts/PodcastActiveEpisodeMobile'
import type { SpotlightVideo } from '../spotlight/data'
import type { PodcastEpisode } from '../podcasts/data'
import { PULSE_FEED, FEED_TYPE_CONFIG } from './data'
import type { PulseItem } from './data'

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.02 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 400, damping: 30 }
  }
}

const menuVariants = {
  hidden: { opacity: 0, y: -4, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 0.15, ease: 'easeOut' as const } 
  },
  exit: { 
    opacity: 0, 
    y: -4, 
    scale: 0.95, 
    transition: { duration: 0.1, ease: 'easeIn' as const } 
  }
}

const TYPE_ACTION_MAP = {
  spotlight: 'posted a spotlight',
  expert: 'shared a podcast',
  opportunity: 'posted an opportunity',
  directory: 'joined the directory',
} as const

function getAuthorInfo(item: PulseItem) {
  switch (item.type) {
    case 'spotlight':
      return { name: item.data.author, initial: item.data.authorInitial || item.data.author?.[0] || 'S', time: item.data.timeAgo || 'Recently' }
    case 'expert':
      return { name: item.data.speaker, initial: item.data.speaker[0], time: item.data.timeAgo || 'Recently' }
    case 'opportunity':
      return { name: item.data.company, initial: item.data.company[0], time: item.data.postedAgo || 'Recently' }
    case 'directory':
      return { name: item.data.name, initial: item.data.name[0], time: 'Recently added' }
  }
}

function FeedMoreMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function out(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', out)
    return () => document.removeEventListener('mousedown', out)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        whileTap={{ scale: 0.9 }}
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-150 border-none cursor-pointer outline-none ${
          open ? 'bg-gray-100 text-gray-700' : 'bg-transparent text-gray-400 active:bg-gray-100 active:text-gray-700'
        }`}
      >
        <MoreVertIcon sx={{ fontSize: 18 }} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div 
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-[110%] w-44 bg-white rounded-[4px] shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 z-50 py-1 origin-top-right overflow-hidden"
          >
            {[
              { Icon: BookmarkBorderIcon, label: 'Save' },
              { Icon: VisibilityOffOutlinedIcon, label: 'Not interested' },
              { Icon: SettingsOutlinedIcon, label: 'Control' },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                type="button"
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-gray-600 active:bg-gray-50 active:text-gray-900 transition-colors border-none bg-transparent cursor-pointer text-left"
              >
                <Icon sx={{ fontSize: 18 }} className="text-gray-400" />
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ActionHeader({ item }: { item: PulseItem }) {
  const config = FEED_TYPE_CONFIG[item.type]
  const author = getAuthorInfo(item)

  return (
    <div className="flex items-center gap-2.5 px-3.5 pt-3.5 pb-2">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-semibold shadow-sm shrink-0"
        style={{ background: config.color }}
      >
        {author.initial}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[12px] text-gray-900 leading-tight truncate">
          <span className="font-semibold">{author.name}</span>
          <span className="text-gray-500 font-normal ml-1">{TYPE_ACTION_MAP[item.type]}</span>
        </p>
        <p className="text-[10px] text-gray-400 mt-0.5">{author.time}</p>
      </div>

      <FeedMoreMenu />
    </div>
  )
}

function PulseSpotlightCardMobile({ item, onPlay }: { item: PulseItem & { type: 'spotlight' }, onPlay: (v: SpotlightVideo) => void }) {
  const video = item.data

  return (
    <motion.div 
      variants={itemVariants} 
      layout="position" 
      className="bg-white rounded-[4px] mb-3 border border-gray-200 shadow-sm overflow-hidden w-full"
    >
      <ActionHeader item={item} />

      <div className="px-3.5 pb-3.5 pt-1 flex flex-col items-center">
        <div className="w-full max-w-[120px]">
          <motion.div
            whileTap={{ scale: 0.96 }}
            className="relative w-full aspect-[9/16] rounded-[4px] overflow-hidden bg-gray-900 border border-black/5 shadow-sm transition-shadow duration-300"
            onClick={() => onPlay(video)}
          >
            {video.image ? (
              <img src={video.image} alt={video.title} className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-300" />
            ) : (
              <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${video.gradient} opacity-90`} />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white shadow-md">
                <PlayArrowRoundedIcon sx={{ fontSize: 24 }} />
              </div>
            </div>

            <div className="absolute bottom-2 left-2 flex items-center z-20">
              <div className="flex items-center gap-0.5 text-white text-[10px] font-medium drop-shadow-md bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded-[2px]">
                <PlayArrowRoundedIcon sx={{ fontSize: 11 }} />
                {video.views}
              </div>
            </div>

            {video.duration && (
              <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[9px] font-medium px-1.5 py-0.5 rounded-[2px] z-20">
                {video.duration}
              </div>
            )}
          </motion.div>
          {/* Removed the repetitive title/author block that was here */}
        </div>
      </div>
    </motion.div>
  )
}

function PulseOpportunityCardMobile({ item, expandedId, onToggleExpand, index }: { item: PulseItem & { type: 'opportunity' }, expandedId: string | null, onToggleExpand: (id: string) => void, index: number }) {
  return (
    <motion.div 
      variants={itemVariants} 
      layout="position" 
      className="bg-white rounded-[4px] mb-3 border border-gray-200 shadow-sm overflow-hidden"
    >
      <ActionHeader item={item} />
      <div className="px-3 pb-3 pt-0">
        <ActivityCard
          item={item.data}
          index={index}
          isExpanded={expandedId === item.id}
          onToggle={() => onToggleExpand(item.id)}
        />
      </div>
    </motion.div>
  )
}

function PulseExpertCardMobile({ item, onPlay }: { item: PulseItem & { type: 'expert' }, onPlay: (ep: PodcastEpisode) => void }) {
  return (
    <motion.div 
      variants={itemVariants} 
      layout="position" 
      className="bg-white rounded-[4px] mb-3 border border-gray-200 shadow-sm overflow-hidden"
    >
      <ActionHeader item={item} />
      <div className="px-3 pb-3 pt-0">
        <EpisodeListCard episode={item.data} onPlay={onPlay} hideDetails={true} />
      </div>
    </motion.div>
  )
}

function PulseDirectoryCardMobile({ item }: { item: PulseItem & { type: 'directory' } }) {
  return (
    <motion.div 
      variants={itemVariants} 
      layout="position" 
      className="bg-white rounded-[4px] mb-3 border border-gray-200 shadow-sm overflow-hidden"
    >
      <ActionHeader item={item} />
      <div className="px-1 pb-2 pt-0">
        <BuilderCardMobile builder={item.data} />
      </div>
    </motion.div>
  )
}

export default function PulseMobile() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [activeSpotlight, setActiveSpotlight] = useState<SpotlightVideo | null>(null)
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode | null>(null)

  const handleToggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <div className="flex-1 w-full h-full overflow-y-auto bg-[#F8F9FA] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
      <div className="p-2">
        <AnimatePresence mode="wait">
          <motion.div
            key="pulse-feed"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="flex flex-col"
          >
            {PULSE_FEED.map((item, index) => {
              switch (item.type) {
                case 'opportunity':
                  return <PulseOpportunityCardMobile key={item.id} item={item} index={index} expandedId={expandedId} onToggleExpand={handleToggleExpand} />
                case 'spotlight':
                  return <PulseSpotlightCardMobile key={item.id} item={item} onPlay={setActiveSpotlight} />
                case 'expert':
                  return <PulseExpertCardMobile key={item.id} item={item} onPlay={setActiveEpisode} />
                case 'directory':
                  return <PulseDirectoryCardMobile key={item.id} item={item} />
                default:
                  return null
              }
            })}

            {PULSE_FEED.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 bg-white rounded-[4px] border border-gray-200 shadow-sm"
              >
                <AutorenewIcon className="text-gray-300 mb-2" sx={{ fontSize: 32 }} />
                <h3 className="text-gray-900 text-[14px] font-medium mb-1">No Updates Available</h3>
                <p className="text-gray-500 text-[12px]">Check back later for more activity.</p>
              </motion.div>
            )}

            {PULSE_FEED.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center pt-3 pb-5"
              >
                <motion.button 
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center justify-center gap-2 mx-auto px-6 py-2.5 rounded-[4px] bg-white border border-[#9B51E0] text-[13px] font-medium text-[#9B51E0] active:bg-[#F9F5FF] transition-all shadow-sm w-fit"
                >
                  <AutorenewIcon sx={{ fontSize: 16 }} />
                  Load More Updates
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {activeSpotlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
          >
            <ActiveSpotlightMobile
              video={activeSpotlight}
              onClose={() => setActiveSpotlight(null)}
            />
          </motion.div>
        )}

        {activeEpisode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
          >
            <PodcastActiveEpisodeMobile
              activeEpisode={activeEpisode}
              setActiveEpisode={setActiveEpisode}
              activeIdx={0}
              filteredWithoutTop={[]}
              EpisodeListCard={EpisodeListCard}
              EpisodeGridCard={EpisodeGridCard}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}