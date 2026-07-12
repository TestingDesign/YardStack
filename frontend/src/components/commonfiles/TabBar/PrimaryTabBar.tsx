import { useRef, useCallback, memo } from 'react'

export interface PrimaryTabItem {
  key: string
  label: string
  Icon: string
  activeIcon?: string 
  badge?: string
  tooltip?: string
}

export interface PrimaryTabBarProps {
  tabs: PrimaryTabItem[]
  active: string
  onChange: (key: string) => void
}

interface TabCardProps extends Omit<PrimaryTabItem, 'key'> {
  tabKey: string
  isActive: boolean
  onClick: (key: string, el: HTMLButtonElement) => void
}

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import type { TooltipProps } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { useState } from 'react'

const MobileNavTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  zIndex: 9999,
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: '#334155',
    maxWidth: 288,
    fontSize: '0.75rem',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.03)',
    borderRadius: '0.375rem',
    padding: '1rem',
    backdropFilter: 'blur(24px)',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: 'rgba(255, 255, 255, 0.95)',
    '&::before': {
      border: '1px solid rgba(255, 255, 255, 0.4)',
    }
  },
}))

const TabCard = memo(({ tabKey, label, Icon, activeIcon, badge, tooltip, isActive, onClick }: TabCardProps) => {
  const currentIcon = isActive && activeIcon ? activeIcon : Icon
  const [open, setOpen] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.altKey && e.key === 'ArrowUp') {
      e.preventDefault()
      setOpen((prev) => !prev)
    }
  }

  const tooltipContent = tooltip ? (
    <span className="block font-medium text-slate-600">{tooltip}</span>
  ) : ""

  const isMuiIcon = tabKey === 'pulse' || tabKey === 'launchingSoon' || tabKey === 'launching'

  const buttonContent = (
    <button
      type="button"
      role="tab"
      title={label}
      aria-selected={isActive}
      id={`tab-${tabKey}`}
      tabIndex={isActive ? 0 : -1}
      aria-controls={`panel-${tabKey}`}
      onClick={(e) => onClick(tabKey, e.currentTarget)}
      onKeyDown={handleKeyDown}
      className={`group relative shrink-0 flex flex-col items-center justify-center gap-0.5 transition-all duration-300 outline-none cursor-pointer w-[68px] h-[52px] px-1 py-0.5 rounded-[4px] border ${
        isActive
          ? 'border-transparent bg-gradient-to-r from-[#7C3AED] to-[#EC4899] shadow-sm shadow-violet-500/20'
          : 'border-slate-200/60 bg-white/50 text-slate-600 hover:bg-white hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)]'
      }`}
    >
      {badge && (
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-semibold px-1 py-0.5 rounded-full bg-[#7C3AED] text-white leading-none z-10">
          {badge}
        </span>
      )}

      <span className={`flex items-center justify-center transition-all duration-300 ${isActive ? 'h-5 w-5 text-white text-[16px]' : 'h-4 w-4 text-[14px]'}`}>
        {typeof currentIcon === 'string' && (currentIcon.includes('/') || currentIcon.includes('.png')) ? (
          <img src={currentIcon} alt="" className="w-full h-full object-contain" />
        ) : (
          <span className="flex items-center justify-center w-full h-full">
            {typeof currentIcon === 'object' && currentIcon !== null && '$$typeof' in currentIcon && !('props' in currentIcon)
              ? (() => { const IconCmp = currentIcon as React.ElementType; return <IconCmp strokeWidth={2.5} color={isActive ? undefined : 'url(#tab-icon-gradient)'} sx={isMuiIcon ? { fill: isActive ? undefined : 'url(#tab-icon-gradient)' } : undefined} />; })()
              : typeof currentIcon === 'function'
              ? (() => { const IconCmp = currentIcon as React.ElementType; return <IconCmp strokeWidth={2.5} color={isActive ? undefined : 'url(#tab-icon-gradient)'} sx={isMuiIcon ? { fill: isActive ? undefined : 'url(#tab-icon-gradient)' } : undefined} />; })()
              : currentIcon}
          </span>
        )}
      </span>
      
      <span
        title={label}
        className={`w-full px-0.5 text-[9px] leading-[1.1] text-center line-clamp-1 break-words transition-all duration-300 ${
          isActive ? 'font-bold text-white' : 'font-medium text-slate-600 group-hover:text-slate-900'
        }`}
      >
        {label}
      </span>
    </button>
  )

  return tooltip ? (
    <MobileNavTooltip 
      title={tooltipContent} 
      arrow 
      placement="bottom" 
      enterTouchDelay={50}
      leaveTouchDelay={3000}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      {buttonContent}
    </MobileNavTooltip>
  ) : buttonContent
})

TabCard.displayName = 'TabCard'

export const PrimaryTabBar = memo(function PrimaryTabBar({ tabs, active, onChange }: PrimaryTabBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback((key: string, el: HTMLButtonElement) => {
    onChange(key)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [onChange])

  return (
    <>
      <svg width="0" height="0" className="absolute" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="tab-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#9333EA" offset="0%" />
            <stop stopColor="#EC4899" offset="100%" />
          </linearGradient>
        </defs>
      </svg>
      <div role="tablist" aria-label="Primary Navigation" className="bg-white">
        <div
          ref={scrollRef}
          className="relative z-10 flex items-center gap-1.5 overflow-x-auto px-2 py-1.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
        >
          {tabs.map((tab) => (
            <TabCard
              key={tab.key}
              tabKey={tab.key}
              label={tab.label}
              Icon={tab.Icon}
              activeIcon={tab.activeIcon}
              badge={tab.badge}
              tooltip={tab.tooltip}
              isActive={tab.key === active}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>
    </>
  )
})

export default PrimaryTabBar;