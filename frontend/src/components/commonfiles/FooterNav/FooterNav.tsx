import { memo, useCallback, type ElementType } from 'react'
import { motion } from 'framer-motion'
import { Users, Plus, LayoutDashboard, Bookmark } from 'lucide-react'
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

interface FooterNavButtonProps {
  item: FooterNavItem
  isActive: boolean
  onClick: (key: string) => void
}

const StandardNavButton = memo(function StandardNavButton({ item, isActive, onClick }: FooterNavButtonProps) {
  const { key, label, Icon } = item

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      type="button"
      aria-current={isActive ? 'page' : undefined}
      onClick={() => onClick(key)}
      className="group relative flex w-full flex-col items-center justify-center gap-1 min-w-0 py-1.5 sm:py-2 px-1 border-none outline-none cursor-pointer bg-transparent transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D946EF]/50 focus-visible:ring-inset tap-highlight-transparent"
    >
      <div className="relative z-10">
        <Icon
          size={18}
          strokeWidth={isActive ? 2.2 : 2}
          fill={isActive ? 'currentColor' : 'none'}
          aria-hidden="true"
          className={`transition-all duration-300 ${
            isActive
              ? 'text-[#D946EF] drop-shadow-[0_0_8px_rgba(217,70,239,0.8)] -translate-y-0.5'
              : 'text-white/65 group-hover:text-white translate-y-0'
          }`}
        />
      </div>

      {label && (
        <span
          className={`relative z-10 text-[9px] sm:text-[10px] uppercase tracking-[0.2px] leading-none transition-all duration-300 ${
            isActive
              ? 'font-bold text-[#D946EF] -translate-y-0.5'
              : 'font-semibold text-white/65 group-hover:text-white translate-y-0'
          }`}
        >
          {label}
        </span>
      )}

      {isActive && (
        <motion.div
          layoutId="footerActiveTab"
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-t-full bg-[#D946EF] shadow-[0_-1px_8px_rgba(217,70,239,0.9)]"
        />
      )}
    </motion.button>
  )
})

const PostNavButton = memo(function PostNavButton({ item, isActive, onClick }: FooterNavButtonProps) {
  const { key, label, Icon } = item

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      type="button"
      aria-current={isActive ? 'page' : undefined}
      onClick={() => onClick(key)}
      className="group relative flex w-full flex-col items-center justify-end min-w-0 py-1.5 sm:py-2 px-1 border-none outline-none cursor-pointer bg-transparent focus-visible:outline-none tap-highlight-transparent"
    >
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
        <div
          className={`relative flex items-center justify-center w-11 h-11 rounded-xl bg-[linear-gradient(135deg,#2a1550_0%,#1A1A2E_100%)] transition-all duration-300 ease-out border border-[#D946EF]/25 group-active:scale-90 ${
            isActive 
              ? 'shadow-[inset_0_0_20px_rgba(217,70,239,0.2),0_4px_16px_rgba(0,0,0,0.5)] translate-y-0.5 bg-[#D946EF]/20' 
              : 'shadow-[inset_0_0_20px_rgba(217,70,239,0.08),0_4px_12px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 hover:shadow-[inset_0_0_30px_rgba(217,70,239,0.15),0_6px_16px_rgba(0,0,0,0.5)] hover:border-[#D946EF]/40'
          }`}
        >
          <Icon
            size={22}
            strokeWidth={2.5}
            fill={isActive ? 'currentColor' : 'none'}
            aria-hidden="true"
            className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              isActive 
                ? 'rotate-135 scale-110 text-[#D946EF] drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]' 
                : 'rotate-0 scale-100 text-[#D946EF] group-hover:rotate-90 group-hover:drop-shadow-[0_0_5px_rgba(217,70,239,0.3)]'
            }`}
          />
        </div>
      </div>

      <span
        className={`relative z-10 text-[9px] sm:text-[10px] uppercase tracking-[0.2px] leading-none transition-all duration-300 mt-5 sm:mt-6 ${
          isActive
            ? 'font-bold text-[#D946EF]'
            : 'font-semibold text-white/65 group-hover:text-white'
        }`}
      >
        {label}
      </span>
      
      {isActive && (
        <motion.div
          layoutId="footerActiveTab"
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-t-full bg-[#D946EF] shadow-[0_-1px_8px_rgba(217,70,239,0.9)]"
        />
      )}
    </motion.button>
  )
})

interface FooterNavProps {
  active: string
  onChange: (key: string) => void
}

export default memo(function FooterNav({ active, onChange }: FooterNavProps) {
  const handleClick = useCallback((key: string) => onChange(key), [onChange])

  return (
    <nav
      aria-label="Bottom Navigation"
      className="shrink-0 relative z-9999 bg-[linear-gradient(175deg,#2a1550_0%,#1A1A2E_30%,#16213E_60%,#1A1A2E_80%,#16213E_100%)] shadow-[0_-4px_32px_rgba(0,0,0,0.5)] border-t border-white/10"
    >
      <ul className="relative z-10 flex items-stretch w-full max-w-lg mx-auto pb-[env(safe-area-inset-bottom)] list-none m-0 p-0">
        {FOOTER_NAV_ITEMS.map((item) => {
          const isActive = item.key === active
          
          return (
            <li key={item.key} className="flex flex-1">
              {item.key === 'post' ? (
                <PostNavButton
                  item={item}
                  isActive={isActive}
                  onClick={handleClick}
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
  )
})