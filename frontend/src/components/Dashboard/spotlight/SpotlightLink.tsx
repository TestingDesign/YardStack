import { useState, useEffect } from 'react'
import {
  Building2,
  Users,
  Handshake,
  CalendarCheck,
  TrendingUp,
  Home,
  FileText,
  ArrowRight,
  type LucideIcon
} from 'lucide-react'

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

interface ActionTheme {
  gradient: string
  shadow: string
  ring: string
  glow: string
  icon: LucideIcon
}

const ACTION_THEMES: Record<ActionType, ActionTheme> = {
  apply: {
    gradient: 'from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500',
    shadow: 'shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50',
    ring: 'ring-blue-400/60',
    glow: 'bg-blue-400',
    icon: Building2,
  },
  connect: {
    gradient: 'from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500',
    shadow: 'shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50',
    ring: 'ring-violet-400/60',
    glow: 'bg-violet-400',
    icon: Users,
  },
  buy: {
    gradient: 'from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500',
    shadow: 'shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50',
    ring: 'ring-emerald-400/60',
    glow: 'bg-emerald-400',
    icon: Home,
  },
  lease: {
    gradient: 'from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500',
    shadow: 'shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50',
    ring: 'ring-cyan-400/60',
    glow: 'bg-cyan-400',
    icon: Handshake,
  },
  schedule: {
    gradient: 'from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400',
    shadow: 'shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50',
    ring: 'ring-orange-400/60',
    glow: 'bg-orange-400',
    icon: CalendarCheck,
  },
  invest: {
    gradient: 'from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500',
    shadow: 'shadow-lg shadow-green-500/30 hover:shadow-green-500/50',
    ring: 'ring-green-400/60',
    glow: 'bg-green-400',
    icon: TrendingUp,
  },
  enquire: {
    gradient: 'from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500',
    shadow: 'shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50',
    ring: 'ring-indigo-400/60',
    glow: 'bg-indigo-400',
    icon: Building2,
  },
  register: {
    gradient: 'from-fuchsia-500 to-purple-600 hover:from-fuchsia-400 hover:to-purple-500',
    shadow: 'shadow-lg shadow-fuchsia-500/30 hover:shadow-fuchsia-500/50',
    ring: 'ring-fuchsia-400/60',
    glow: 'bg-fuchsia-400',
    icon: FileText,
  },
}

interface SpotlightLinkProps {
  linkData?: SpotlightLinkData
}

export default function SpotlightLink({ linkData }: SpotlightLinkProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const data = linkData || { actionText: 'Apply Now', actionType: 'apply' as ActionType }
  const theme = ACTION_THEMES[data.actionType || 'apply']
  const IconComponent = theme.icon

  return (
    <div className="relative group/wrapper inline-block">
      <div 
        className={`absolute -inset-0.5 rounded-[4px] blur-md opacity-0 transition-opacity duration-300 
          ${theme.glow} 
          ${isAnimating ? 'opacity-40' : 'group-hover/wrapper:opacity-30'}`}
      />

      <button
        className={`
          group relative flex items-center justify-center gap-1.5 overflow-hidden
          px-3.5 py-1.5 sm:px-4 sm:py-2
          rounded-[4px] border border-white/10
          text-white font-extrabold text-[11px] sm:text-[13px] tracking-wide
          transition-all duration-200 ease-out active:scale-95
          bg-gradient-to-r ${theme.gradient}
          ${theme.shadow} hover:shadow-xl hover:-translate-y-0.5
          ${isAnimating ? `ring-2 ring-offset-1 ring-offset-transparent ${theme.ring} -translate-y-0.5` : 'ring-0 ring-offset-0'}
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]
        `}
      >
        <IconComponent
          strokeWidth={2.5}
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 transition-transform duration-200 ease-out 
            ${isAnimating ? 'scale-110 -rotate-3' : 'group-hover:scale-110 group-hover:-rotate-3'}`}
        />
        
        <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
          {data.actionText || 'Apply Now'}
        </span>
        
        <ArrowRight
          strokeWidth={2.5}
          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 relative z-10 transition-transform duration-200 ease-out
            ${isAnimating ? 'translate-x-1' : 'group-hover:translate-x-1'}`}
        />

        <div className="absolute inset-0 rounded-[4px] bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-50 pointer-events-none" />

        {isAnimating && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[4px]">
            <div className="absolute inset-0 animate-[spotlightShimmer_0.8s_cubic-bezier(0.4,0,0.2,1)_forwards]">
              <div className="w-[150%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12" />
            </div>
          </div>
        )}
      </button>

      <style>{`
        @keyframes spotlightShimmer {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
      `}</style>
    </div>
  )
}