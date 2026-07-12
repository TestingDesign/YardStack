import React, { useState, useRef, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VerifiedIcon from '@mui/icons-material/Verified'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import type { SpotlightVideo } from './data'
import SpotlightLink from './SpotlightLink'

const ActiveSpotlightDesktop = memo(function ActiveSpotlightDesktop({ 
  video, 
  onClose,
  onNext,
  onPrev
}: { 
  video: SpotlightVideo, 
  onClose: () => void,
  onNext?: () => void,
  onPrev?: () => void
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [clickAnim, setClickAnim] = useState(false)
  
  const menuRef = useRef<HTMLDivElement>(null)
  const scrollLockRef = useRef<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    setProgress(0)
    setIsPlaying(true)
    const loadTimer = setTimeout(() => setIsLoading(false), 350)
    return () => clearTimeout(loadTimer)
  }, [video])

  useEffect(() => {
    if (isLoading || !isPlaying) return
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.15))
    }, 16)
    return () => clearInterval(interval)
  }, [isLoading, isPlaying])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollLockRef.current) return
      if (e.deltaY > 50 && onNext) {
        triggerScroll(onNext)
      } else if (e.deltaY < -50 && onPrev) {
        triggerScroll(onPrev)
      }
    }

    const triggerScroll = (action: () => void) => {
      scrollLockRef.current = true
      action()
      setTimeout(() => {
        scrollLockRef.current = false
      }, 700)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && onNext) {
        triggerScroll(onNext)
      } else if (e.key === 'ArrowUp' && onPrev) {
        triggerScroll(onPrev)
      } else if (e.key === ' ') {
        e.preventDefault()
        handleVideoClick(e as unknown as React.MouseEvent)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onNext, onPrev])

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlaying((prev) => !prev)
    setClickAnim(true)
    setTimeout(() => setClickAnim(false), 300)
  }

  const springTransition = { type: "spring" as const, damping: 20, stiffness: 350 }

  return (
    <div className={`w-full h-full flex items-center justify-center overflow-hidden relative transition-colors duration-500 ${theme === 'light' ? 'bg-white' : ''}`}>
      {theme === 'dark' && (
        <div className="absolute inset-0 opacity-20 overflow-hidden mix-blend-screen pointer-events-none">
          <img src={video.image} alt="" className="w-full h-full object-cover blur-[80px] scale-150 transition-all duration-500 animate-pulse" />
        </div>
      )}
      <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${theme === 'light' ? 'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.8)_100%)]' : 'bg-[radial-gradient(ellipse_at_center,transparent_20%,#050505_80%)]'}`} />
      
      <button 
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className={`absolute top-6 left-4 w-10 h-10 flex items-center justify-center backdrop-blur-2xl rounded-full transition-all duration-200 hover:scale-110 active:scale-90 z-50 cursor-pointer pr-0.5 ${
          theme === 'light' 
            ? 'bg-white hover:bg-purple-50 text-gray-600 hover:text-purple-600 border border-gray-100 hover:border-purple-200' 
            : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]'
        }`}
        aria-label="Go back"
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
      </button>

      <div className="flex flex-row items-center justify-center w-full h-[90vh] max-h-[920px] px-8">
        
        <div className="flex-1 flex justify-end h-full min-w-0">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...springTransition }}
            className="flex flex-col justify-end gap-2 h-full w-[300px] shrink-0 pb-10 z-10 -mr-16"
          >
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 p-[2px] shadow-[0_0_20px_rgba(236,72,153,0.3)] flex-shrink-0 cursor-pointer transition-all duration-200 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]">
                <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center overflow-hidden">
                   <span className="text-white text-[16px] font-bold tracking-wider">{video.authorInitial}</span>
                </div>
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-[16px] hover:underline cursor-pointer drop-shadow-lg truncate transition-colors ${theme === 'light' ? 'text-gray-800 hover:text-purple-600' : 'text-white hover:text-pink-100'}`}>{video.author}</span>
                  {video.verified && <VerifiedIcon sx={{ fontSize: 16 }} className="text-blue-500 drop-shadow-md shrink-0" />}
                </div>
              </div>
            </div>

            <p className={`text-[16px] leading-relaxed drop-shadow-xl font-medium tracking-wide ${theme === 'light' ? 'text-gray-600' : 'text-white/95'}`}>
              {video.title}
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...springTransition }}
          className={`relative h-full aspect-[9/16] rounded-[4px] overflow-hidden bg-black shrink-0 cursor-pointer transition-shadow duration-300 ${
            theme === 'light' 
              ? 'border border-gray-100' 
              : 'shadow-[0_30px_100px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10 hover:shadow-[0_30px_100px_-15px_rgba(255,255,255,0.05)]'
          }`}
          onClick={handleVideoClick}
        >
          <img 
            src={video.image} 
            alt={video.title} 
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`} 
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-60" />

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60 backdrop-blur-md">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 border-4 border-white/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-white rounded-full border-t-transparent animate-spin" />
              </div>
            </div>
          )}

          <div className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-all duration-200 ${!isPlaying ? 'opacity-100 backdrop-blur-sm bg-black/20' : 'opacity-0'}`}>
            <div className="relative flex items-center justify-center">
              <div className="absolute w-24 h-24 bg-white/10 rounded-full animate-ping" />
              <div className="w-20 h-20 bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-transform duration-200 hover:scale-110">
                <PlayArrowRoundedIcon sx={{ fontSize: 50 }} className="drop-shadow-2xl pl-1" />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {clickAnim && isPlaying && (
              <motion.div 
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
              >
                <div className="w-20 h-20 bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20">
                  <PlayArrowRoundedIcon sx={{ fontSize: 50 }} className="drop-shadow-2xl pl-1" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute top-4 right-4 z-20">
            <div className="pointer-events-auto origin-top-right transition-transform duration-200 hover:scale-[1.02]" onClick={(e) => e.stopPropagation()}>
              <SpotlightLink linkData={video.link} />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-50 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 relative transition-all ease-linear"
              style={{ width: `${progress}%`, transitionDuration: isPlaying ? '16ms' : '0ms' }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)] translate-x-1/2" />
            </div>
          </div>
        </motion.div>

        <div className="flex-1 flex justify-start h-full min-w-0">
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...springTransition }}
            className="flex flex-col items-center justify-end gap-2 shrink-0 pb-10 z-10 ml-4"
          >
            <div className={`flex flex-col items-center gap-2 mb-4 backdrop-blur-xl p-2 rounded-[8px] border transition-colors duration-500 ${theme === 'light' ? 'bg-white/90 border-gray-100' : 'bg-white/5 border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.2)]'}`}>
              <NavButton onClick={onPrev} disabled={!onPrev} icon={<KeyboardArrowUpIcon sx={{ fontSize: 26 }} />} ariaLabel="Previous video" theme={theme} />
              <div className={`w-6 h-px ${theme === 'light' ? 'bg-gray-100' : 'bg-white/10'}`} />
              <NavButton onClick={onNext} disabled={!onNext} icon={<KeyboardArrowDownIcon sx={{ fontSize: 26 }} />} ariaLabel="Next video" theme={theme} />
            </div>
            
            <ActionButton icon={<ShareOutlinedIcon sx={{ fontSize: 22 }} />} label="Share" theme={theme} />
            
            <ActionButton 
              icon={isSaved ? <BookmarkIcon sx={{ fontSize: 22 }} /> : <BookmarkBorderIcon sx={{ fontSize: 22 }} />} 
              label="Save" 
              onClick={() => setIsSaved(v => !v)}
              active={isSaved}
              theme={theme}
            />
            
            <div className="relative flex flex-col items-center" ref={menuRef}>
              <ActionButton 
                icon={<MoreVertIcon sx={{ fontSize: 22 }} />} 
                onClick={(e) => { e?.preventDefault(); e?.stopPropagation(); setIsMenuOpen(!isMenuOpen) }}
                active={isMenuOpen}
                theme={theme}
              />
              
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 backdrop-blur-2xl rounded-xl py-1.5 z-50 flex flex-col text-[14px] border overflow-hidden ${theme === 'light' ? 'bg-white/95 border-gray-100' : 'bg-neutral-900/95 border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)]'}`}
                  >
                  <button 
                    onClick={(e) => { e.stopPropagation(); setTheme(theme === 'dark' ? 'light' : 'dark'); setIsMenuOpen(false); }} 
                    className={`flex items-center gap-3 px-4 py-3 transition-all w-full text-left font-medium cursor-pointer border-none bg-transparent ${theme === 'light' ? 'text-gray-600 hover:text-purple-600 hover:bg-purple-50' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
                  >
                    {theme === 'dark' ? <LightModeOutlinedIcon sx={{ fontSize: 18 }} /> : <DarkModeOutlinedIcon sx={{ fontSize: 18 }} />} 
                    {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }} 
                    className={`flex items-center gap-3 px-4 py-3 transition-all w-full text-left font-medium cursor-pointer border-none bg-transparent ${theme === 'light' ? 'text-gray-600 hover:text-purple-600 hover:bg-purple-50' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
                  >
                    <BookmarkBorderIcon sx={{ fontSize: 18 }} /> Save to playlist
                  </button>
                  <div className={`h-px mx-3 ${theme === 'light' ? 'bg-gray-100' : 'bg-white/10'}`} />
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }} 
                    className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-all w-full text-left font-medium cursor-pointer border-none bg-transparent"
                  >
                    <ReportProblemOutlinedIcon sx={{ fontSize: 18 }} /> Report Video
                  </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
})

function ActionButton({ 
  icon, label, onClick, active, theme = 'dark'
}: { 
  icon: React.ReactNode, label?: string, onClick?: (e?: React.MouseEvent) => void, active?: boolean, theme?: 'dark' | 'light'
}) {
  return (
    <motion.button 
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation()
        onClick?.(e)
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-1.5 group cursor-pointer border-none bg-transparent p-0"
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 relative overflow-hidden ${
        active 
          ? (theme === 'light' ? 'bg-gradient-to-tr from-purple-100 to-pink-100 text-purple-700 shadow-[0_4px_20px_rgba(168,85,247,0.4)] border border-purple-200' : 'bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)] border border-pink-400/50')
          : (theme === 'light' ? 'bg-white/80 hover:bg-white border border-gray-100 hover:border-purple-200 text-gray-600 hover:text-purple-600 shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(168,85,247,0.15)]' : 'bg-white/5 hover:bg-white/20 border border-white/10 hover:border-white/30 text-white/80 hover:text-white shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_25px_rgba(255,255,255,0.1)]')
      }`}>
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        <motion.div
          animate={active ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 400, damping: 15 }}
          className="flex items-center justify-center relative z-10"
        >
          {icon}
        </motion.div>
      </div>
      {label && (
        <span className={`text-[12px] font-bold tracking-wide drop-shadow-md transition-all duration-300 ${
          active 
            ? (theme === 'light' ? 'text-purple-700 translate-y-0' : 'text-pink-400 translate-y-0') 
            : (theme === 'light' ? 'text-gray-500 group-hover:text-purple-600 group-hover:-translate-y-0.5' : 'text-white/60 group-hover:text-white group-hover:-translate-y-0.5')
        }`}>
          {label}
        </span>
      )}
    </motion.button>
  )
}

function NavButton({ onClick, disabled, icon, ariaLabel, theme = 'dark' }: { onClick?: () => void, disabled: boolean, icon: React.ReactNode, ariaLabel: string, theme?: 'dark' | 'light' }) {
  return (
    <button 
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }} 
      disabled={disabled} 
      aria-label={ariaLabel}
      className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 border-none overflow-hidden group ${
        !disabled 
          ? (theme === 'light' ? 'bg-transparent hover:bg-white text-gray-500 hover:text-purple-600 cursor-pointer hover:scale-110 active:scale-95 hover:shadow-[0_4px_15px_rgba(168,85,247,0.15)]' : 'bg-transparent hover:bg-white/15 text-white/70 hover:text-white cursor-pointer hover:scale-110 active:scale-95 hover:shadow-[0_4px_15px_rgba(255,255,255,0.15)]')
          : (theme === 'light' ? 'bg-transparent text-gray-200 cursor-not-allowed' : 'bg-transparent text-white/10 cursor-not-allowed')
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <span className="relative z-10 flex items-center justify-center transition-transform duration-200 group-hover:-translate-y-px">{icon}</span>
    </button>
  )
}

export default ActiveSpotlightDesktop