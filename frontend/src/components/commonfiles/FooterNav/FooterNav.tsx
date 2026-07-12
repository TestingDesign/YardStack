import { memo, useCallback, useState, type ElementType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Plus, LayoutDashboard, Bookmark, Video, Briefcase, Clapperboard } from 'lucide-react'
import LogoPng from '../sidebar/Logo.png'

const LogoIcon = ({ className }: { className?: string }) => (
  <img 
    src={LogoPng} 
    alt="N4RE" 
    className={`${className} w-auto h-10 mt-0.5`}
    style={{ objectFit: 'contain' }} 
  />
)

export interface FooterNavItem {
  key: string
  label: string
  Icon: ElementType
}

const FOOTER_NAV_ITEMS: FooterNavItem[] = [
  { key: 'home',   label: '',       Icon: LogoIcon },
  { key: 'leads',  label: 'Leads',  Icon: Users },
  { key: 'post',   label: 'Post',   Icon: Plus },
  { key: 'manage', label: 'Manage', Icon: LayoutDashboard },
  { key: 'saved',  label: 'Saved',  Icon: Bookmark },
]

interface PostOption {
  key: string
  label: string
  Icon: ElementType
  color: string
  bg: string
}

const POST_OPTIONS: PostOption[] = [
  { key: 'short', label: 'Short',  Icon: Clapperboard, color: 'text-emerald-500', bg: 'bg-emerald-500' },
  { key: 'video', label: 'Video',  Icon: Video,        color: 'text-blue-500', bg: 'bg-blue-500' },
  { key: 'job',   label: 'Job',    Icon: Briefcase,    color: 'text-amber-500', bg: 'bg-amber-500' },
]

interface FooterNavButtonProps {
  item: FooterNavItem
  isActive: boolean
  onClick: (key: string) => void
}

const StandardNavButton = memo(function StandardNavButton({ item, isActive, onClick }: FooterNavButtonProps) {
  const { key, label, Icon } = item

  return (
    <motion.button
      type="button"
      aria-current={isActive ? 'page' : undefined}
      onClick={() => onClick(key)}
      whileHover={{ scale: 1.1, z: 20, rotateX: -10 }}
      whileTap={{ scale: 0.9, z: 0 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="group relative flex w-full flex-col items-center justify-center gap-0.5 min-w-0 py-2 px-1 border-none outline-none cursor-pointer bg-transparent transition-colors duration-150 focus-visible:outline-none tap-highlight-transparent"
    >
      <div className="relative z-10" style={{ transformStyle: 'preserve-3d' }}>
        <Icon
          size={18}
          strokeWidth={isActive ? 2.2 : 2}
          fill={isActive ? 'currentColor' : 'none'}
          aria-hidden="true"
          className={`transition-colors duration-150 ${
            isActive
              ? 'text-[#D946EF]'
              : 'text-white/60 group-hover:text-white/90'
          }`}
        />
      </div>

      {label && (
        <span
          className={`relative z-10 text-[9px] uppercase tracking-[0.2px] leading-none transition-colors duration-150 ${
            isActive
              ? 'font-medium text-[#D946EF]'
              : 'font-medium text-white/60 group-hover:text-white/90'
          }`}
        >
          {label}
        </span>
      )}

      {isActive && (
        <motion.div
          layoutId="footerActiveTab"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-t-full bg-[#D946EF]"
        />
      )}
    </motion.button>
  )
})

interface PostNavButtonProps {
  isOpen: boolean
  onToggle: () => void
}

const PostNavButton = memo(function PostNavButton({ isOpen, onToggle }: PostNavButtonProps) {
  return (
    <div className="group relative flex w-full flex-col items-center justify-end min-w-0 py-1.5 px-1" style={{ transformStyle: 'preserve-3d' }}>
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20" style={{ perspective: '800px' }}>
        <motion.button
          type="button"
          onClick={onToggle}
          whileHover={{ 
            scale: 1.15, 
            rotateX: 15, 
            z: 30,
            boxShadow: "0 15px 25px -5px rgba(109,40,217,0.6)" 
          }}
          whileTap={{ scale: 0.9, z: 0 }}
          className="w-10 h-10 rounded-[4px] flex items-center justify-center border-none outline-none cursor-pointer bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 shadow-[0_2px_12px_rgba(109,40,217,0.4)] transition-transform duration-150"
          aria-label="Create new post"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 135 : 0, z: isOpen ? 10 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Plus
              size={24}
              strokeWidth={2.5}
              className="text-white"
            />
          </motion.div>
        </motion.button>
      </div>

      <span
        className={`relative z-10 text-[9px] uppercase tracking-[0.2px] leading-none mt-6 font-medium transition-colors duration-150 ${
          isOpen ? 'text-purple-500' : 'text-white/60'
        }`}
      >
        Post
      </span>
    </div>
  )
})

interface PostFanMenuProps {
  isOpen: boolean
  onSelect: (key: string) => void
  onClose: () => void
}

const PostFanMenu = memo(function PostFanMenu({ isOpen, onSelect, onClose }: PostFanMenuProps) {
  const positions = [
    { x: -64, y: -80, rotateZ: -15 },
    { x: 0,   y: -100, rotateZ: 0 },
    { x: 64,  y: -80, rotateZ: 15 },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="fixed bottom-[60px] left-1/2 -translate-x-1/2 z-[9999]" style={{ pointerEvents: 'none', perspective: '1000px' }}>
            {POST_OPTIONS.map((option, idx) => (
              <motion.button
                key={option.key}
                type="button"
                initial={{ 
                  x: 0, 
                  y: 0, 
                  z: -100,
                  rotateX: 45,
                  scale: 0, 
                  opacity: 0 
                }}
                animate={{ 
                  x: positions[idx].x, 
                  y: positions[idx].y, 
                  z: 0,
                  rotateX: 0,
                  rotateZ: positions[idx].rotateZ,
                  scale: 1, 
                  opacity: 1 
                }}
                exit={{ 
                  x: 0, 
                  y: 0, 
                  z: -100,
                  rotateX: -45,
                  scale: 0, 
                  opacity: 0 
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 250,
                  damping: 20,
                  delay: isOpen ? idx * 0.05 : (POST_OPTIONS.length - 1 - idx) * 0.03,
                }}
                whileHover={{ 
                  scale: 1.2, 
                  z: 50, 
                  rotateY: 15,
                  rotateZ: 0
                }}
                whileTap={{ scale: 0.9, z: 0 }}
                onClick={() => onSelect(option.key)}
                className="absolute flex flex-col items-center gap-1.5 border-none outline-none cursor-pointer bg-transparent"
                style={{ pointerEvents: 'auto', left: '-24px', top: '-24px', transformStyle: 'preserve-3d' }}
              >
                <div className={`w-12 h-12 rounded-full ${option.bg} flex items-center justify-center shadow-lg shadow-${option.color}/30`}>
                  <option.Icon size={20} strokeWidth={2} className="text-white" />
                </div>
                <span className="text-[10px] font-medium text-white tracking-wide drop-shadow-md">
                  {option.label}
                </span>
              </motion.button>
            ))}
          </div>
        </>
      )}
    </AnimatePresence>
  )
})

interface FooterNavProps {
  active: string
  onChange: (key: string) => void
}

export default memo(function FooterNav({ active, onChange }: FooterNavProps) {
  const [postMenuOpen, setPostMenuOpen] = useState(false)
  
  const handleClick = useCallback((key: string) => {
    setPostMenuOpen(false)
    onChange(key)
  }, [onChange])

  const handlePostToggle = useCallback(() => {
    setPostMenuOpen(prev => !prev)
  }, [])

  const handlePostSelect = useCallback((key: string) => {
    setPostMenuOpen(false)
    console.log('Post option selected:', key)
  }, [])

  return (
    <>
      <PostFanMenu 
        isOpen={postMenuOpen} 
        onSelect={handlePostSelect} 
        onClose={() => setPostMenuOpen(false)} 
      />

      <nav
        aria-label="Bottom Navigation"
        className="shrink-0 relative z-[9999] bg-[linear-gradient(175deg,#2a1550_0%,#1A1A2E_30%,#16213E_60%,#1A1A2E_80%,#16213E_100%)] border-t border-white/10 overflow-visible"
        style={{ perspective: '1200px' }}
      >
        <ul 
          className="relative z-10 flex items-stretch w-full max-w-lg mx-auto pb-[env(safe-area-inset-bottom)] list-none m-0 p-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {FOOTER_NAV_ITEMS.map((item) => {
            const isActive = item.key === active
            
            return (
              <li key={item.key} className="flex flex-1" style={{ transformStyle: 'preserve-3d' }}>
                {item.key === 'post' ? (
                  <PostNavButton
                    isOpen={postMenuOpen}
                    onToggle={handlePostToggle}
                  />
                ) : (
                  <StandardNavButton
                    item={item}
                    isActive={isActive}
                    onClick={handleClick}
                  />
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
})