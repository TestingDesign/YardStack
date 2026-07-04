import { useState, useEffect } from 'react'
import SendIcon from '@mui/icons-material/Send'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'

export type ActionType = 'apply' | 'connect' | 'lease' | 'buy' | 'schedule' | 'invest' | 'enquire' | 'register'

export interface SpotlightLinkData {
  actionText?: string
  actionType?: ActionType
}

export const SPOTLIGHT_LINKS: Record<string, SpotlightLinkData> = {
  seniorAgent: { actionText: 'Apply Now', actionType: 'apply' },
  agentNetwork: { actionText: 'Connect', actionType: 'connect' },
  luxuryVilla: { actionText: 'Buy Now', actionType: 'buy' },
  commercialOffice: { actionText: 'Lease', actionType: 'lease' },
  propertyTour: { actionText: 'Schedule Tour', actionType: 'schedule' },
  capitalFund: { actionText: 'Invest', actionType: 'invest' },
  enquiry: { actionText: 'Enquire', actionType: 'enquire' },
  registration: { actionText: 'Register', actionType: 'register' }
}

const ACTION_THEMES: Record<ActionType, { bg: string; hover: string; shadow: string; ring: string; icon: typeof SendIcon }> = {
  apply:    { bg: 'bg-violet-600',  hover: 'hover:bg-violet-500',  shadow: 'shadow-violet-900/30',  ring: 'ring-violet-400/60',  icon: SendIcon },
  connect:  { bg: 'bg-blue-600',    hover: 'hover:bg-blue-500',    shadow: 'shadow-blue-900/30',    ring: 'ring-blue-400/60',    icon: PeopleAltOutlinedIcon },
  buy:      { bg: 'bg-emerald-600', hover: 'hover:bg-emerald-500', shadow: 'shadow-emerald-900/30', ring: 'ring-emerald-400/60', icon: ShoppingCartOutlinedIcon },
  lease:    { bg: 'bg-teal-600',    hover: 'hover:bg-teal-500',    shadow: 'shadow-teal-900/30',    ring: 'ring-teal-400/60',    icon: HandshakeOutlinedIcon },
  schedule: { bg: 'bg-amber-600',   hover: 'hover:bg-amber-500',   shadow: 'shadow-amber-900/30',   ring: 'ring-amber-400/60',   icon: CalendarTodayOutlinedIcon },
  invest:   { bg: 'bg-rose-600',    hover: 'hover:bg-rose-500',    shadow: 'shadow-rose-900/30',    ring: 'ring-rose-400/60',    icon: TrendingUpOutlinedIcon },
  enquire:  { bg: 'bg-indigo-600',  hover: 'hover:bg-indigo-500',  shadow: 'shadow-indigo-900/30',  ring: 'ring-indigo-400/60',  icon: HomeWorkOutlinedIcon },
  register: { bg: 'bg-fuchsia-600', hover: 'hover:bg-fuchsia-500', shadow: 'shadow-fuchsia-900/30', ring: 'ring-fuchsia-400/60', icon: DescriptionOutlinedIcon },
}

interface SpotlightLinkProps {
  linkData?: SpotlightLinkData
}

export default function SpotlightLink({ linkData }: SpotlightLinkProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1200)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const data = linkData || { actionText: 'Apply Now', actionType: 'apply' as ActionType }
  const theme = ACTION_THEMES[data.actionType || 'apply']
  const IconComponent = theme.icon

  return (
    <button
      className={`
        group relative flex items-center justify-center gap-1.5 overflow-hidden
        px-3.5 py-1.5 sm:px-5 sm:py-2
        rounded-[4px] border border-white/15
        text-white font-semibold text-[11px] sm:text-[13px] tracking-wide
        transition-all duration-300 ease-out active:scale-95
        shadow-md hover:shadow-xl
        ${theme.bg} ${theme.hover} ${theme.shadow}
        ${isAnimating ? `ring-2 ring-offset-1 ring-offset-transparent ${theme.ring} -translate-y-[2px] shadow-lg` : 'ring-0 ring-offset-0 hover:-translate-y-[1px]'}
      `}
    >
      <IconComponent
        sx={{ fontSize: 14 }}
        className={`relative z-10 transition-transform duration-300 ${isAnimating ? 'scale-110' : 'group-hover:scale-110'}`}
      />
      <span className="relative z-10 drop-shadow-sm">
        {data.actionText || 'Apply Now'}
      </span>

      {/* Top glass highlight */}
      <div className="absolute inset-0 rounded-[4px] bg-gradient-to-b from-white/15 via-white/5 to-transparent pointer-events-none" />

      {/* Shimmer sweep on interval */}
      {isAnimating && (
        <div className="absolute inset-0 animate-[shimmer-sweep_0.8s_ease-in-out_forwards] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12" />
        </div>
      )}

      {/* Inline keyframes */}
      <style>{`
        @keyframes shimmer-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </button>
  )
}