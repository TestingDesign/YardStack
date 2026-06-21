import { memo, useCallback, type ElementType } from 'react'
import { Users, Plus, SlidersHorizontal, Bookmark } from 'lucide-react'
import LogoPng from '../sidebar/Logo.png'

const LogoIcon = ({ className }: any) => (
  <img 
    src={LogoPng} 
    alt="N4RE" 
    className={`${className} w-auto h-12 mt-1`}
    style={{ objectFit: 'contain' }} 
  />
)

export interface FooterNavItem {
  key: string
  label: string
  Icon: ElementType
}

const FOOTER_NAV_ITEMS: FooterNavItem[] = [
  { key: 'home',   label: '',   Icon: LogoIcon },
  { key: 'leads',  label: 'Leads',  Icon: Users },
  { key: 'post',   label: 'Post',   Icon: Plus },
  { key: 'manage', label: 'Manage', Icon: SlidersHorizontal },
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
    <button
      type="button"
      aria-current={isActive ? 'page' : undefined}
      onClick={() => onClick(key)}
      className="group relative flex w-full flex-col items-center justify-center gap-1.5 min-w-0 py-2 sm:py-2.5 px-1 border-none outline-none cursor-pointer bg-transparent transition-all duration-300 ease-out active:scale-[0.92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D946EF]/50 focus-visible:ring-inset motion-reduce:transition-none motion-reduce:transform-none tap-highlight-transparent"
    >
      <div className="relative z-10">
        <Icon
          size={20}
          strokeWidth={isActive ? 2.2 : 1.8}
          fill={isActive ? 'currentColor' : 'none'}
          aria-hidden="true"
          className={`transition-all duration-300 motion-reduce:transition-none ${
            isActive
              ? 'text-[#D946EF] drop-shadow-[0_2px_4px_rgba(217,70,239,0.3)] -translate-y-0.5'
              : 'text-gray-400 group-hover:text-[#D946EF] translate-y-0'
          }`}
        />
      </div>

      {label && (
        <span
          className={`relative z-10 font-['Outfit',sans-serif] text-[10px] uppercase tracking-[0.2px] leading-none transition-all duration-300 motion-reduce:transition-none ${
            isActive
              ? 'font-bold text-[#D946EF] -translate-y-0.5'
              : 'font-semibold text-gray-400 group-hover:text-[#D946EF] translate-y-0'
          }`}
        >
          {label}
        </span>
      )}

      {isActive && (
        <div
          aria-hidden="true"
          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-0.75 rounded-sm bg-[#D946EF] shadow-[0_0_8px_rgba(217,70,239,0.8)] animate-[fadeScale_0.3s_ease-out_0.1s_both]"
        />
      )}
    </button>
  )
})

const PostNavButton = memo(function PostNavButton({ item, isActive, onClick }: FooterNavButtonProps) {
  const { key, label, Icon } = item

  return (
    <button
      type="button"
      aria-current={isActive ? 'page' : undefined}
      onClick={() => onClick(key)}
      className="group relative flex w-full flex-col items-center justify-end min-w-0 py-2 sm:py-2.5 px-1 border-none outline-none cursor-pointer bg-transparent focus-visible:outline-none tap-highlight-transparent"
    >
      <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 z-20">
        <div
          className={`relative flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-tr from-[#7C3AED] to-[#D946EF] transition-all duration-300 ease-out border border-white/20 group-active:scale-90 ${
            isActive 
              ? 'shadow-[0_0_15px_rgba(217,70,239,0.5)] translate-y-0.5' 
              : 'shadow-[0_4px_12px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(217,70,239,0.5)]'
          }`}
        >
          <Icon
            size={24}
            strokeWidth={2.5}
            fill={isActive ? 'currentColor' : 'none'}
            aria-hidden="true"
            className={`text-white transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              isActive 
                ? 'rotate-135 scale-110' 
                : 'rotate-0 scale-100 group-hover:rotate-90'
            }`}
          />
          <div className="absolute inset-0 rounded-xl bg-linear-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />
        </div>
      </div>

      <span
        className={`relative z-10 font-['Outfit',sans-serif] text-[10px] uppercase tracking-[0.2px] leading-none transition-all duration-300 mt-6.5 ${
          isActive
            ? 'font-bold text-[#D946EF]'
            : 'font-semibold text-gray-400 group-hover:text-[#D946EF]'
        }`}
      >
        {label}
      </span>
      
      {isActive && (
        <div
          aria-hidden="true"
          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-0.75 rounded-sm bg-[#D946EF] shadow-[0_0_8px_rgba(217,70,239,0.8)] animate-[fadeScale_0.3s_ease-out_0.1s_both]"
        />
      )}
    </button>
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
      className="shrink-0 relative z-40 bg-[#16213E]/95 backdrop-blur-2xl backdrop-saturate-150 border-t border-white/10"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-t from-[#1A1A2E]/80 to-transparent" />
      </div>

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