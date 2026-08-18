import { useRef, useCallback, memo, type ElementType, type RefObject } from 'react'

export interface SubTabItem {
  label: string
  Icon?: ElementType
}

interface SubTabBarProps {
  subTabs: SubTabItem[]
  active: string
  onChange: (label: string) => void
  variant?: 'mobile' | 'desktop'
}

interface ItemProps {
  item: SubTabItem
  isActive: boolean
  isFirst: boolean
  onClick: (label: string, el: HTMLButtonElement) => void
  variant?: 'mobile' | 'desktop'
}

const SubTabItemComponent = memo(function SubTabItemComponent({ item, isActive, isFirst, onClick, variant = 'mobile' }: ItemProps) {
  const { label, Icon } = item
  const isDesktop = variant === 'desktop'

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive ? 'true' : 'false'}
      id={`subtab-${label.toLowerCase().replace(/\s+/g, '-')}`}
      aria-controls={`subpanel-${label.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={(e) => onClick(label, e.currentTarget)}
      className={`group relative flex cursor-pointer border-none transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] [-webkit-tap-highlight-color:transparent] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 focus-visible:ring-inset motion-reduce:transition-none motion-reduce:transform-none ${
        isDesktop
          ? 'h-full min-w-[130px] flex-row items-center justify-center px-5 py-3 gap-2.5'
          : 'h-full min-w-[72px] flex-[1_0_auto] flex-col items-center justify-center gap-1.5 pb-2'
      } ${
        isActive 
          ? 'bg-gradient-to-t from-[#6a5fc1]/10 to-transparent' 
          : 'bg-transparent hover:bg-[#6a5fc1]/[0.04]'
      }`}
    >
      {!isFirst && (
        <div 
          aria-hidden="true" 
          className="absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-[#cfcfdb]/80 to-transparent pointer-events-none" 
        />
      )}

      <div className={`relative transition-transform duration-300 motion-reduce:transform-none ${isActive ? '-translate-y-0.5' : 'translate-y-0'}`}>
        {Icon && (
          <Icon
            size={isDesktop ? 18 : 20}
            strokeWidth={isActive ? 2 : 1.5}
            aria-hidden="true"
            className={`transition-all duration-300 motion-reduce:transition-none ${
              isActive 
                ? 'text-[#6a5fc1] drop-shadow-[0_2px_6px_rgba(106,95,193,0.4)]' 
                : 'text-[#79628c] group-hover:text-[#422082]'
            }`}
          />
        )}
      </div>
      
      <span
        className={`whitespace-nowrap transition-all duration-300 tracking-[0.01em] motion-reduce:transition-none motion-reduce:transform-none ${
          isDesktop 
            ? 'text-[0.95rem] leading-[1.1]' 
            : 'text-center text-[0.62rem] leading-[1.1]'
        } ${
          isActive 
            ? 'font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#422082] to-[#6a5fc1] drop-shadow-sm -translate-y-0.5' 
            : 'font-medium text-[#79628c] group-hover:text-[#1f1633] translate-y-0'
        }`}
      >
        {label}
      </span>

      {isActive && (
        <div 
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 h-[3px] w-[65%] -translate-x-1/2 rounded-t-[4px] bg-gradient-to-r from-[#422082] to-[#6a5fc1] shadow-[0_-3px_10px_rgba(106,95,193,0.45)]" 
        />
      )}
    </button>
  )
})

interface InnerProps {
  subTabs: SubTabItem[]
  active: string
  onItemClick: (label: string, el: HTMLButtonElement) => void
  scrollRef: RefObject<HTMLDivElement | null>
  variant?: 'mobile' | 'desktop'
}

const Inner = memo(function Inner({ subTabs, active, onItemClick, scrollRef, variant = 'mobile' }: InnerProps) {
  if (!subTabs?.length) return null

  return (
    <div className="w-full shrink-0 overflow-hidden">
      <div
        ref={scrollRef}
        role="tablist"
        aria-orientation="horizontal"
        className={`flex w-full items-stretch overflow-x-auto bg-white/95 backdrop-blur-xl shadow-[0_4px_24px_rgba(21,15,35,0.06)] border-b border-[#cfcfdb]/50 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          variant === 'desktop' ? 'h-[64px]' : 'h-[56px]'
        }`}
      >
        {subTabs.map((item, idx) => (
          <SubTabItemComponent
            key={item.label}
            item={item}
            isActive={item.label === active}
            isFirst={idx === 0}
            onClick={onItemClick}
            variant={variant}
          />
        ))}
      </div>
    </div>
  )
})

export default function SubTabBar({ subTabs, active, onChange, variant = 'mobile' }: SubTabBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(
    (label: string, el: HTMLButtonElement) => {
      onChange(label)
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ 
        behavior: prefersReducedMotion ? 'auto' : 'smooth', 
        block: 'nearest', 
        inline: 'center' 
      })
    },
    [onChange]
  )

  return (
    <Inner 
      subTabs={subTabs} 
      active={active} 
      onItemClick={handleClick} 
      scrollRef={scrollRef}
      variant={variant}
    />
  )
}