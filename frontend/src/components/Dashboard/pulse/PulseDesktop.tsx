import { useState, useCallback, useRef, useEffect } from 'react'
import PulseRightPane from './PulseRightPane'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { OpportunityCard, AdvertisementPlaceholder } from '../activityBoard/ActivityBoardDesktop'
import { BuilderCard } from '../directory/DirectoryDesktop'
import ActiveSpotlightDesktop from '../spotlight/ActiveSpotlightDesktop'
import PodcastActiveEpisodeDesktop from '../podcasts/PodcastActiveEpisodeDesktop'
import { DesktopEpisodeCard, HorizontalEpisodeCard } from '../podcasts/PodcastDesktop'
import type { SpotlightVideo } from '../spotlight/data'
import type { PodcastEpisode } from '../podcasts/data'
import { SPOTLIGHT_VIDEOS } from '../spotlight/data'
import { PODCAST_EPISODES } from '../podcasts/data'
import { ACTIVITY_ITEMS } from '../activityBoard/data'
import { BUILDERS } from '../directory/data'

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
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
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
}

function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: React.ElementType
  title: string
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon sx={{ fontSize: 22 }} className="text-purple-600" />
      <button className="text-[18px] font-medium text-gray-900 tracking-tight hover:text-purple-600 transition-colors cursor-pointer group flex items-center gap-1.5 border-none bg-transparent p-0">
        {title}
        <ArrowRight size={16} strokeWidth={2.5} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
      </button>
    </div>
  )
}

function SpotlightCarousel({ onPlay }: { onPlay: (v: SpotlightVideo) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const visibleCards = 5
  const spotlightSlice = SPOTLIGHT_VIDEOS.slice(0, 10)
  const totalPages = Math.ceil(spotlightSlice.length / visibleCards)

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 1)
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth)
    }
  }, [])

  const scroll = useCallback((dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.scrollWidth / spotlightSlice.length
    const scrollAmount = cardWidth * visibleCards
    el.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }, [spotlightSlice.length])

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      checkScroll()
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [spotlightSlice.length, totalPages, checkScroll])

  return (
    <ScrollReveal className="mb-6">
      <SectionHeader icon={AutoAwesomeIcon} title="Your Daily Spotlight" />

      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md shadow-gray-200/50 flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-purple-900/10 hover:border-purple-100 transition-all duration-300 text-gray-600"
            aria-label="Scroll left"
          >
            <ChevronLeftIcon sx={{ fontSize: 20 }} />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md shadow-gray-200/50 flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-purple-900/10 hover:border-purple-100 transition-all duration-300 text-gray-600"
            aria-label="Scroll right"
          >
            <ChevronRightIcon sx={{ fontSize: 20 }} />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none pb-2"
        >
          {spotlightSlice.map((video) => (
            <motion.div
              key={video.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="snap-start shrink-0 w-[calc((100%-32px)/5)] min-w-[160px]"
            >
              <div
                className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-900 cursor-pointer group/card shadow-md shadow-gray-200/50 hover:shadow-lg hover:shadow-purple-900/10 hover:border-purple-100 transition-all duration-500 border border-white"
                onClick={() => onPlay(video)}
              >
              {video.image ? (
                <img
                  src={video.image}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                />
              ) : (
                <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${video.gradient}`} />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 hover:bg-black/50">
                <OpenInFullIcon sx={{ fontSize: 14 }} />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
                <h3 className="text-white text-[12px] font-medium leading-tight mb-1.5 line-clamp-2 drop-shadow-sm">
                  {video.title}
                </h3>
                <div className="flex items-center gap-1 text-white text-[10px] font-medium bg-white/20 backdrop-blur-sm px-1.5 py-0.5 rounded-sm w-fit">
                  <PlayArrowRoundedIcon sx={{ fontSize: 12 }} />
                  {video.views}
                </div>
              </div>
            </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}

function ExpertsRow({ onPlay }: { onPlay: (ep: PodcastEpisode) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const expertsSlice = PODCAST_EPISODES.slice(0, 8)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 1)
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth)
    }
  }, [])

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll])

  return (
    <ScrollReveal className="mb-6">
      <SectionHeader icon={MicExternalOnIcon} title="Recommended Experts" />

      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
            className="absolute -left-3 top-[38%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md shadow-gray-200/50 flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-purple-900/10 hover:border-purple-100 transition-all duration-300 text-gray-600"
          >
            <ChevronLeftIcon sx={{ fontSize: 20 }} />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
            className="absolute -right-3 top-[38%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md shadow-gray-200/50 flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-purple-900/10 hover:border-purple-100 transition-all duration-300 text-gray-600"
          >
            <ChevronRightIcon sx={{ fontSize: 20 }} />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none pb-2"
        >
          {expertsSlice.map((ep) => (
            <motion.div
              key={ep.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="snap-start shrink-0 w-[220px] cursor-pointer group/ep"
              onClick={() => onPlay(ep)}
            >
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black shadow-md shadow-gray-200/50 mb-2 border border-white hover:shadow-lg hover:shadow-purple-900/10 transition-all duration-300">
              <img
                src={ep.thumbnail}
                alt={ep.title}
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover/ep:scale-105 opacity-90 group-hover/ep:opacity-100"
              />

              <div className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-sm text-white text-[9px] font-medium px-1.5 py-0.5 rounded-sm flex items-center gap-0.5 z-10">
                <PlayArrowRoundedIcon sx={{ fontSize: 10 }} />
                {ep.duration}
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover/ep:bg-black/20 transition-colors duration-300 z-10">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md opacity-0 group-hover/ep:opacity-100 scale-75 group-hover/ep:scale-100 transition-all duration-300">
                  <PlayArrowRoundedIcon sx={{ fontSize: 18 }} className="text-purple-600 ml-0.5" />
                </div>
              </div>
            </div>

            <h4 className="text-[12px] font-medium text-gray-900 leading-tight line-clamp-2 mb-0.5 group-hover/ep:text-purple-600 transition-colors duration-300">
              {ep.title}
            </h4>
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[11px] text-gray-500 font-medium truncate">{ep.speaker}</span>
              {ep.verified && (
                <VerifiedIcon sx={{ fontSize: 12 }} className="text-blue-500 shrink-0" />
              )}
            </div>
            <span className="text-[10px] text-gray-400 font-medium">{ep.role}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}

function OpportunitiesSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const opportunitiesSlice = ACTIVITY_ITEMS.slice(0, 4)

  const handleToggle = useCallback((id: string) => {
    setExpandedId(prev => prev === id ? null : id)
  }, [])

  return (
    <ScrollReveal className="mb-6">
      <SectionHeader icon={WorkIcon} title="Career Opportunities" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="flex flex-col gap-2"
      >
        {opportunitiesSlice.map((item, index) => (
          <motion.div key={item.id} variants={itemVariants}>
            <OpportunityCard
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

function DirectorySection({ isSidebarExpanded }: { isSidebarExpanded?: boolean }) {
  const buildersSlice = BUILDERS.slice(0, 9)

  return (
    <ScrollReveal className="mb-6">
      <SectionHeader icon={ContactsOutlinedIcon} title="Network Suggestions" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className={`grid gap-2 ${isSidebarExpanded ? 'grid-cols-2' : 'grid-cols-3'}`}
      >
        {buildersSlice.map((builder) => (
          <motion.div key={builder.id} variants={itemVariants}>
            <BuilderCard builder={builder} />
          </motion.div>
        ))}
      </motion.div>
    </ScrollReveal>
  )
}

function CTABanner() {
  return (
    <ScrollReveal className="mb-20">
      <section className="relative overflow-hidden bg-[linear-gradient(175deg,#2a1550_0%,#1A1A2E_30%,#16213E_60%,#1A1A2E_80%,#16213E_100%)] rounded-lg selection:bg-fuchsia-500/30 selection:text-white py-8 px-6 lg:px-8">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-800 rounded-lg blur-[100px] opacity-30 pointer-events-none"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-6"
        >
          <div className="flex-1 w-full text-center xl:text-left">
            <div className="flex items-center justify-center xl:justify-start gap-1.5 mb-3">
              <Sparkles size={14} className="text-fuchsia-400" />
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-fuchsia-300">
                Your Dashboard
              </span>
              <Sparkles size={14} className="text-purple-400" />
            </div>

            <h3 className="text-[20px] xl:text-[24px] font-medium text-white tracking-tight leading-snug mb-2 break-words whitespace-normal">
              Maximize your tailored{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-purple-400">
                insights & connections.
              </span>
            </h3>

            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-x-4 gap-y-1.5 mt-3">
              {[
                { icon: OndemandVideoIcon, label: '10K+ Videos' },
                { icon: GroupsIcon, label: '5K+ Experts' },
                { icon: EngineeringIcon, label: '2K+ Builders' },
                { icon: PublicIcon, label: '100K+ Community' },
              ].map(({ icon: StatIcon, label }) => (
                <span key={label} className="flex items-center gap-1 text-purple-100/70 text-[12px] font-medium">
                  <StatIcon sx={{ fontSize: 14 }} className="text-fuchsia-400" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
            <button className="group flex items-center justify-center gap-1.5 px-6 py-2.5 rounded bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white text-[14px] font-medium shadow-md shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 cursor-pointer border-none">
              Explore Network
              <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button className="px-6 py-2.5 rounded bg-white/5 backdrop-blur-sm text-white text-[14px] font-medium border border-white/10 hover:bg-white/15 hover:border-white/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 cursor-pointer">
              Update Profile
            </button>
          </div>
        </motion.div>
      </section>
    </ScrollReveal>
  )
}

interface PulseDesktopProps {
  isSidebarExpanded?: boolean;
}

export default function PulseDesktop({ isSidebarExpanded = true }: PulseDesktopProps) {
  const [activeSpotlight, setActiveSpotlight] = useState<SpotlightVideo | null>(null)
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode | null>(null)

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50 px-4 sm:px-6 pt-6 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none min-h-screen selection:bg-purple-200 selection:text-purple-900">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_280px] gap-6">
        <div className="min-w-0">
          <SpotlightCarousel onPlay={setActiveSpotlight} />
          <ExpertsRow onPlay={setActiveEpisode} />

          <ScrollReveal className="mb-6">
            <AdvertisementPlaceholder />
          </ScrollReveal>

          <OpportunitiesSection />
          <DirectorySection isSidebarExpanded={isSidebarExpanded} />
          <CTABanner />
        </div>

        <div className="hidden lg:block relative">
          <PulseRightPane />
        </div>
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
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
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
    </main>
  )
}