import React, { useState, useRef, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Sparkles, Lightbulb } from 'lucide-react'
import VerifiedIcon from '@mui/icons-material/Verified'
import FeaturedListingCard from './FeaturedListingCard'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ShareIcon from '@mui/icons-material/Share'
import PodcastVideoPlayerDesktop from './PodcastVideoPlayerDesktop'
import { PODCAST_EPISODES, type PodcastEpisode } from './data'
import { motion } from 'framer-motion'

export default function PodcastActiveEpisodeDesktop({
  activeEpisode,
  setActiveEpisode,
  activeIdx,
  filteredWithoutTop,
  DesktopEpisodeCard,
  lastPoppedId
}: {
  activeEpisode: PodcastEpisode
  setActiveEpisode: (ep: PodcastEpisode | null) => void
  activeIdx: number
  filteredWithoutTop: PodcastEpisode[]
  DesktopEpisodeCard: React.FC<any>
  lastPoppedId?: string | null
}) {
  const [autoplay, setAutoplay] = useState(true)
  
  const dialogScrollRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)

  const handleScroll = useCallback(() => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
      setCanScrollLeft(scrollLeft > 5)
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 24)
    }
  }, [])

  useEffect(() => {
    handleScroll()
    const timer = setTimeout(() => handleScroll(), 50)
    window.addEventListener('resize', handleScroll)
    return () => { clearTimeout(timer); window.removeEventListener('resize', handleScroll) }
  }, [handleScroll, filteredWithoutTop])

  useEffect(() => {
    if (lastPoppedId) {
      const timeoutId = setTimeout(() => {
        const el = document.getElementById(`dialog-${lastPoppedId}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
        }
      }, 50)
      return () => clearTimeout(timeoutId)
    } else if (dialogScrollRef.current) {
      dialogScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [activeEpisode, lastPoppedId])

  const scrollRight = () => sliderRef.current?.scrollBy({ left: 280, behavior: 'smooth' })
  const scrollLeft  = () => sliderRef.current?.scrollBy({ left: -280, behavior: 'smooth' })

  return (
    <motion.div 
      ref={dialogScrollRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, type: "spring", damping: 25, stiffness: 350 }}
      className="absolute inset-0 z-[100] bg-[#FDFDFD] flex flex-col overflow-y-auto hide-scrollbar"
    >
      <div className="w-full max-w-[1400px] mx-auto p-4 md:p-4 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-5 min-w-0">
          <div className="relative w-full bg-black rounded-[4px] overflow-hidden aspect-[16/9] shadow-sm border border-black/5">
            <PodcastVideoPlayerDesktop
              episode={activeEpisode}
              onClose={() => setActiveEpisode(null)}
              onNext={() => setActiveEpisode(activeIdx < PODCAST_EPISODES.length - 1 ? PODCAST_EPISODES[activeIdx + 1] : null)}
              onPrev={() => setActiveEpisode(activeIdx > 0 ? PODCAST_EPISODES[activeIdx - 1] : null)}
              hasNext={activeIdx < PODCAST_EPISODES.length - 1}
              hasPrev={activeIdx > 0}
              inline
            />
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white font-medium flex items-center justify-center text-[20px] shadow-sm shrink-0">
                {activeEpisode.speaker?.charAt(0)}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h3 className="text-[16px] font-medium text-gray-900 leading-none tracking-tight">{activeEpisode.speaker}</h3>
                  {activeEpisode.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="text-blue-500" />}
                </div>
                <p className="text-[12px] text-gray-500 font-medium leading-none">{activeEpisode.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-700 rounded-[4px] text-[13px] font-medium transition-colors cursor-pointer border border-gray-200 shadow-sm">
                <BookmarkBorderIcon sx={{ fontSize: 16 }} /> Save
              </button>
              <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-700 rounded-[4px] text-[13px] font-medium transition-colors cursor-pointer border border-gray-200 shadow-sm">
                <ShareIcon sx={{ fontSize: 16 }} /> Share
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-[4px] p-4 border border-gray-100 shadow-sm">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-purple-600" />
                <h4 className="text-[14px] font-medium text-gray-900">AI Generated Summary</h4>
              </div>
              <p className="text-[12px] text-gray-600 leading-relaxed font-medium">
                In this episode, {activeEpisode.speaker || 'Murali Krishna'} shares insights on real estate market trends, key growth corridors, pricing outlook, and what investors and homebuyers should watch in 2025 and beyond. He also discusses infrastructure developments, demand drivers, and strategies for long-term real estate investment.
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-1.5">
                <Lightbulb size={14} className="text-purple-600" />
                <h4 className="text-[14px] font-medium text-gray-900">Key Takeaways</h4>
              </div>
              <ul className="flex flex-col gap-1.5 list-none pl-0 m-0">
                {[
                  "Real estate is increasingly infrastructure-led.",
                  "Outer Ring Road and Metro expansion are game changers.",
                  "Residential demand will remain strong in 2025.",
                  "Focus on long-term value, not short-term hype.",
                  "Verify legal approvals and infrastructure before investing."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12px] text-gray-600 font-medium">
                    <span className="w-1 h-1 rounded-full bg-purple-600 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[16px] font-medium text-gray-900 tracking-tight">Up Next</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-medium text-gray-500">Autoplay</span>
                  <button 
                    type="button"
                    onClick={() => setAutoplay(v => !v)}
                    className={`relative w-9 h-5 rounded-full transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500 border-none cursor-pointer shadow-inner ${
                      autoplay ? 'bg-gradient-to-r from-purple-600 to-fuchsia-500' : 'bg-gray-200'
                    }`}
                    aria-label="Toggle autoplay"
                  >
                    <span 
                      className={`absolute top-[2px] left-[2px] w-[16px] h-[16px] bg-white rounded-full shadow-sm transition-transform duration-200 ${
                        autoplay ? 'translate-x-[16px]' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
              <div className="relative group/slider w-full mt-1">
                {canScrollLeft && (
                  <div className="absolute left-0 top-0 bottom-0 w-10 z-30 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-auto">
                      <button
                        onClick={scrollLeft}
                        className="w-7 h-7 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-all duration-200 cursor-pointer active:scale-95"
                        aria-label="Scroll left"
                      >
                        <ChevronLeft size={16} />
                      </button>
                    </div>
                  </div>
                )}

                <div
                  ref={sliderRef}
                  onScroll={handleScroll}
                  className="flex gap-3 overflow-x-auto pb-2 scroll-px-0 snap-x snap-mandatory hide-scrollbar"
                >
                  {filteredWithoutTop.slice(0, 10).map((ep, idx) => (
                    <div key={ep.id} className="min-w-[200px] w-[200px] snap-start relative pt-2 pl-1">
                      <DesktopEpisodeCard episode={ep} onPlay={setActiveEpisode} index={idx} idPrefix="dialog-" />
                    </div>
                  ))}
                </div>

                {canScrollRight && (
                  <div className="absolute right-0 top-0 bottom-0 w-10 z-30 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-auto">
                      <button
                        onClick={scrollRight}
                        className="w-7 h-7 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-all duration-200 cursor-pointer active:scale-95"
                        aria-label="Scroll right"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        <div className="w-full lg:w-[320px] shrink-0 flex flex-col mt-4 lg:mt-0 gap-4 sticky top-4 self-start">
          <FeaturedListingCard episode={activeEpisode} />
        </div>
      </div>
    </motion.div>
  )
}