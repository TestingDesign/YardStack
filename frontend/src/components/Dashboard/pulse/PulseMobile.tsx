import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ActivityCard, AdvertisementBlock } from '../activityBoard/ActivityBoardMobile'
import { BuilderCardMobile } from '../directory/DirectoryMobile'
import ActiveSpotlightMobile from '../spotlight/ActiveSpotlightMobile'
import PodcastActiveEpisodeMobile from '../podcasts/PodcastActiveEpisodeMobile'
import { EpisodeListCard, EpisodeGridCard } from '../podcasts/PodcastMobile'
import type { SpotlightVideo } from '../spotlight/data'
import type { PodcastEpisode } from '../podcasts/data'
import { SPOTLIGHT_VIDEOS } from '../spotlight/data'
import { PODCAST_EPISODES } from '../podcasts/data'
import { ACTIVITY_ITEMS } from '../activityBoard/data'
import { BUILDERS } from '../directory/data'

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import VerifiedIcon from '@mui/icons-material/Verified'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn'
import WorkIcon from '@mui/icons-material/Work'
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import GroupsIcon from '@mui/icons-material/Groups'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import EngineeringIcon from '@mui/icons-material/Engineering'
import PublicIcon from '@mui/icons-material/Public'
import { ArrowRight, Sparkles } from 'lucide-react'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
}

function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.25, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionHeader({
  icon: Icon,
  title,
  onLinkClick,
}: {
  icon: React.ElementType
  title: string
  onLinkClick?: () => void
}) {
  return (
    <div className="flex items-end justify-between mb-3">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1">
          <Icon sx={{ fontSize: 18 }} className="text-purple-600" />
          <button 
            onClick={onLinkClick}
            className="text-[16px] font-extrabold text-gray-900 tracking-tight flex items-center gap-1 hover:text-purple-600 transition-colors border-none bg-transparent p-0 cursor-pointer group"
          >
            {title}
            <ArrowRight size={14} strokeWidth={2.5} className="opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
          </button>
        </div>
      </div>
    </div>
  )
}

function SpotlightCarousel({ onPlay }: { onPlay: (v: SpotlightVideo) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const spotlightSlice = SPOTLIGHT_VIDEOS.slice(0, 10)
  const visibleCards = 2
  const totalPages = Math.ceil(spotlightSlice.length / visibleCards)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const cardWidth = el.scrollWidth / spotlightSlice.length
      const page = Math.round(el.scrollLeft / (cardWidth * visibleCards))
      setActiveIndex(Math.min(page, totalPages - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [spotlightSlice.length, totalPages])

  return (
    <ScrollReveal className="mb-5">
      <SectionHeader
        icon={AutoAwesomeIcon}
        title="Your Daily Spotlight"
      />

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none -mx-1 px-1"
      >
        {spotlightSlice.map((video) => (
          <div
            key={video.id}
            className="snap-start shrink-0 w-[140px]"
          >
            <motion.div
              whileTap={{ scale: 0.97 }}
              className="relative w-full aspect-[3/4] rounded-[4px] overflow-hidden bg-gray-900 cursor-pointer shadow-md shadow-gray-200/50 border border-white active:scale-95 transition-transform duration-200"
              onClick={() => onPlay(video)}
            >
              {video.image ? (
                <img
                  src={video.image}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${video.gradient}`} />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute top-1.5 right-1.5 z-10 w-5 h-5 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white">
                <OpenInFullIcon sx={{ fontSize: 11 }} />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
                <h3 className="text-white text-[11px] font-extrabold leading-tight line-clamp-2 mb-1 drop-shadow-sm">
                  {video.title}
                </h3>
                <div className="flex items-center gap-1 text-white text-[9px] font-bold bg-white/20 backdrop-blur-sm px-1 py-0.5 rounded-[2px] w-fit">
                  <PlayArrowRoundedIcon sx={{ fontSize: 10 }} />
                  {video.views}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-1 mt-2.5">
        {Array.from({ length: totalPages }).map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'w-4 h-1 bg-gradient-to-r from-purple-600 to-fuchsia-500'
                : 'w-1 h-1 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </ScrollReveal>
  )
}

function ExpertsRow({ onPlay }: { onPlay: (ep: PodcastEpisode) => void }) {
  const expertsSlice = PODCAST_EPISODES.slice(0, 8)

  return (
    <ScrollReveal className="mb-5">
      <SectionHeader
        icon={MicExternalOnIcon}
        title="Recommended Experts"
      />

      <div className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none -mx-1 px-1">
        {expertsSlice.map((ep) => (
          <motion.div
            key={ep.id}
            whileTap={{ scale: 0.97 }}
            className="snap-start shrink-0 w-[200px] cursor-pointer group/ep"
            onClick={() => onPlay(ep)}
          >
            <div className="relative w-full aspect-video rounded-[4px] overflow-hidden bg-black shadow-sm shadow-gray-200/50 mb-1.5 border border-white">
              <img
                src={ep.thumbnail}
                alt={ep.title}
                className="absolute inset-0 w-full h-full object-contain"
              />

              <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-sm text-white text-[8px] font-bold px-1 py-0.5 rounded-[2px] flex items-center gap-0.5 z-10">
                <PlayArrowRoundedIcon sx={{ fontSize: 9 }} />
                {ep.duration}
              </div>

              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-sm opacity-80">
                  <PlayArrowRoundedIcon sx={{ fontSize: 16 }} className="text-purple-600 ml-0.5" />
                </div>
              </div>
            </div>

            <h4 className="text-[11px] font-extrabold text-gray-900 leading-tight line-clamp-2 mb-0.5">
              {ep.title}
            </h4>
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[10px] text-gray-500 font-medium truncate">{ep.speaker}</span>
              {ep.verified && (
                <VerifiedIcon sx={{ fontSize: 10 }} className="text-blue-500 shrink-0" />
              )}
            </div>
            <span className="text-[9px] text-gray-400 font-medium">{ep.role}</span>
          </motion.div>
        ))}
      </div>
    </ScrollReveal>
  )
}

function OpportunitiesSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const opportunitiesSlice = ACTIVITY_ITEMS.slice(0, 3)

  const handleToggle = useCallback((id: string) => {
    setExpandedId(prev => prev === id ? null : id)
  }, [])

  return (
    <ScrollReveal className="mb-5">
      <SectionHeader
        icon={WorkIcon}
        title="Career Opportunities"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
        className="flex flex-col gap-2"
      >
        {opportunitiesSlice.map((item, index) => (
          <motion.div key={item.id} variants={itemVariants}>
            <ActivityCard
              item={item}
              index={index}
              isExpanded={expandedId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </ScrollReveal>
  )
}

function DirectorySection() {
  const buildersSlice = BUILDERS.slice(0, 6)

  return (
    <ScrollReveal className="mb-5">
      <SectionHeader
        icon={ContactsOutlinedIcon}
        title="Network Suggestions"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
        className="grid grid-cols-1 gap-2"
      >
        {buildersSlice.map((builder) => (
          <motion.div key={builder.id} variants={itemVariants}>
            <BuilderCardMobile builder={builder} />
          </motion.div>
        ))}
      </motion.div>
    </ScrollReveal>
  )
}

function CTABanner() {
  return (
    <ScrollReveal className="mb-20">
      <section className="relative overflow-hidden bg-[linear-gradient(175deg,#2a1550_0%,#1A1A2E_30%,#16213E_60%,#1A1A2E_80%,#16213E_100%)] rounded-[4px] py-6 px-4">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-800 rounded-full blur-[60px] opacity-25 pointer-events-none"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-1 mb-2">
            <Sparkles size={12} className="text-fuchsia-400" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-fuchsia-300">
              Your Dashboard
            </span>
            <Sparkles size={12} className="text-purple-400" />
          </div>

          <h3 className="text-[17px] font-extrabold text-white tracking-tight leading-snug mb-3">
            Maximize your tailored{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-purple-400">
              insights & connections.
            </span>
          </h3>

          <div className="grid grid-cols-2 gap-1.5 w-full mb-4">
            {[
              { icon: OndemandVideoIcon, label: '10K+ Videos' },
              { icon: GroupsIcon, label: '5K+ Experts' },
              { icon: EngineeringIcon, label: '2K+ Builders' },
              { icon: PublicIcon, label: '100K+ Community' },
            ].map(({ icon: StatIcon, label }) => (
              <span key={label} className="flex items-center gap-1 justify-center text-purple-100/70 text-[10px] font-medium">
                <StatIcon sx={{ fontSize: 12 }} className="text-fuchsia-400" />
                {label}
              </span>
            ))}
          </div>

          <button className="group w-full flex items-center justify-center gap-1.5 py-2.5 rounded-[4px] bg-gradient-to-r from-purple-600 to-pink-500 text-white text-[13px] font-extrabold shadow-md shadow-purple-500/25 active:scale-95 transition-all duration-300 border-none">
            Explore Network
            <ArrowRight size={14} strokeWidth={2.5} />
          </button>
        </motion.div>
      </section>
    </ScrollReveal>
  )
}

export default function PulseMobile() {
  const [activeSpotlight, setActiveSpotlight] = useState<SpotlightVideo | null>(null)
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode | null>(null)

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50 px-3 pt-4 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none min-h-screen selection:bg-purple-200 selection:text-purple-900">
      <div>
        <SpotlightCarousel onPlay={setActiveSpotlight} />
        <ExpertsRow onPlay={setActiveEpisode} />

        <ScrollReveal className="mb-5">
          <AdvertisementBlock />
        </ScrollReveal>

        <OpportunitiesSection />
        <DirectorySection />
        <CTABanner />
      </div>

      <AnimatePresence>
        {activeSpotlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm"
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
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col"
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
    </main>
  )
}