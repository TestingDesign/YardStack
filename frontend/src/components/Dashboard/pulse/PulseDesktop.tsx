import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { OpportunityCard } from '../activityBoard/ActivityBoardDesktop'
import { BuilderCard } from '../directory/DirectoryDesktop'
import { DesktopEpisodeCard, HorizontalEpisodeCard } from '../podcasts/PodcastDesktop'
import ActiveSpotlightDesktop from '../spotlight/ActiveSpotlightDesktop'
import PodcastActiveEpisodeDesktop from '../podcasts/PodcastActiveEpisodeDesktop'
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
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 400, damping: 30 }
  }
}

const menuVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 0.15, ease: 'easeOut' as const } 
  },
  exit: { 
    opacity: 0, 
    y: -8, 
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-150 border-none cursor-pointer outline-none ${
          open ? 'bg-gray-100 text-gray-700' : 'bg-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-700'
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
            className="absolute right-0 top-[110%] w-44 bg-white rounded-[4px] shadow-lg border border-gray-100 z-50 py-1.5 origin-top-right overflow-hidden"
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
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors border-none bg-transparent cursor-pointer text-left"
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
    <div className="flex items-center gap-3 px-5 pt-5 pb-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[13px] font-semibold shadow-sm shrink-0"
        style={{ background: config.color }}
      >
        {author.initial}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[14px] text-gray-900 leading-tight truncate">
          <span className="font-semibold">{author.name}</span>
          <span className="text-gray-500 font-normal ml-1.5">{TYPE_ACTION_MAP[item.type]}</span>
        </p>
        <p className="text-[12px] text-gray-400 mt-0.5">{author.time}</p>
      </div>

      <FeedMoreMenu />
    </div>
  )
}

function PulseSpotlightCard({ item, onPlay }: { item: PulseItem & { type: 'spotlight' }, onPlay: (v: SpotlightVideo) => void }) {
  const video = item.data

  return (
    <motion.div 
      variants={itemVariants} 
      layout="position"
      whileHover={{ y: -2 }}
      className="bg-white rounded-[8px] mb-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden group/card w-full"
    >
      <ActionHeader item={item} />

      <div className="px-5 pb-5 pt-1 flex flex-col items-center">
        <div className="w-full max-w-[280px]">
          <div
            className="relative w-full aspect-[9/16] rounded-[8px] overflow-hidden bg-gray-900 border border-black/5 shadow-sm cursor-pointer group hover:shadow-lg transition-all duration-500"
            onClick={() => onPlay(video)}
          >
            {video.image ? (
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                src={video.image} 
                alt={video.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100" 
              />
            ) : (
              <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${video.gradient} opacity-90 group-hover:opacity-100 transition-opacity`} />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg group-hover:bg-black/40 group-hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100">
                <PlayArrowRoundedIcon sx={{ fontSize: 28 }} />
              </div>
            </div>

            <div className="absolute bottom-3 left-3 flex items-center z-20">
              <div className="flex items-center gap-1.5 text-white text-[11px] font-medium drop-shadow-md bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-[4px]">
                <PlayArrowRoundedIcon sx={{ fontSize: 14 }} />
                {video.views}
              </div>
            </div>

            {video.duration && (
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-1 rounded-[4px] z-20">
                {video.duration}
              </div>
            )}
          </div>
          {/* Removed repetitive title/author elements here */}
        </div>
      </div>
    </motion.div>
  )
}

function PulseOpportunityCard({ item, expandedId, onToggleExpand }: { item: PulseItem & { type: 'opportunity' }, expandedId: string | null, onToggleExpand: (id: string) => void }) {
  return (
    <motion.div 
      variants={itemVariants} 
      layout="position"
      whileHover={{ y: -2 }}
      className="bg-white rounded-[8px] mb-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden"
    >
      <ActionHeader item={item} />
      <div className="px-5 pb-5 pt-1">
        <OpportunityCard
          item={item.data}
          index={0}
          isExpanded={expandedId === item.id}
          onToggle={() => onToggleExpand(item.id)}
        />
      </div>
    </motion.div>
  )
}

function PulseExpertCard({ item, onPlay }: { item: PulseItem & { type: 'expert' }, onPlay: (ep: PodcastEpisode) => void }) {
  return (
    <motion.div 
      variants={itemVariants} 
      layout="position"
      whileHover={{ y: -2 }}
      className="bg-white rounded-[8px] mb-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden"
    >
      <ActionHeader item={item} />
      <div className="px-5 pb-5 pt-1 flex flex-col items-center">
        <div className="w-full">
          <DesktopEpisodeCard episode={item.data} onPlay={onPlay} hideDetails={true} />
        </div>
      </div>
    </motion.div>
  )
}

function PulseDirectoryCard({ item }: { item: PulseItem & { type: 'directory' } }) {
  return (
    <motion.div 
      variants={itemVariants} 
      layout="position"
      whileHover={{ y: -2 }}
      className="bg-white rounded-[8px] mb-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden"
    >
      <ActionHeader item={item} />
      <div className="px-3 pb-4">
        <BuilderCard builder={item.data} />
      </div>
    </motion.div>
  )
}

export default function PulseDesktop() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [activeSpotlight, setActiveSpotlight] = useState<SpotlightVideo | null>(null)
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode | null>(null)

  const handleToggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8F9FA] p-6 sm:p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none min-h-screen">
      <div className="max-w-[760px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key="pulse-feed"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            {PULSE_FEED.map(item => {
              switch (item.type) {
                case 'opportunity':
                  return <PulseOpportunityCard key={item.id} item={item} expandedId={expandedId} onToggleExpand={handleToggleExpand} />
                case 'spotlight':
                  return <PulseSpotlightCard key={item.id} item={item} onPlay={setActiveSpotlight} />
                case 'expert':
                  return <PulseExpertCard key={item.id} item={item} onPlay={setActiveEpisode} />
                case 'directory':
                  return <PulseDirectoryCard key={item.id} item={item} />
                default:
                  return null
              }
            })}

            {PULSE_FEED.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24 bg-white rounded-[8px] border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              >
                <AutorenewIcon className="text-gray-300 mb-4" sx={{ fontSize: 44 }} />
                <h3 className="text-gray-900 text-[17px] font-semibold mb-1.5">No Updates Available</h3>
                <p className="text-gray-500 text-[14px]">Check back later for more recent activity.</p>
              </motion.div>
            )}

            {PULSE_FEED.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center py-8"
              >
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-[#9B51E0] text-[14px] font-semibold text-[#9B51E0] hover:bg-[#F9F5FF] transition-all shadow-sm cursor-pointer group"
                >
                  <AutorenewIcon sx={{ fontSize: 18 }} className="group-hover:rotate-180 transition-transform duration-500" />
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
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md"
          >
            <ActiveSpotlightDesktop
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
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <PodcastActiveEpisodeDesktop
              activeEpisode={activeEpisode}
              setActiveEpisode={setActiveEpisode}
              activeIdx={0}
              filteredWithoutTop={[]}
              DesktopEpisodeCard={DesktopEpisodeCard}
              HorizontalEpisodeCard={HorizontalEpisodeCard}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}