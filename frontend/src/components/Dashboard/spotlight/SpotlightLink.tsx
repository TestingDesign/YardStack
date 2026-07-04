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
  hoverGradient: string
  shadow: string
  hoverShadow: string
  ring: string
  icon: LucideIcon
}

const ACTION_THEMES: Record<ActionType, ActionTheme> = {
  apply: {
    gradient: 'from-[#7C3AED] to-[#EC4899]',
    hoverGradient: 'hover:from-[#8B5CF6] hover:to-[#F472B6]',
    shadow: 'shadow-[0_4px_16px_rgba(124,58,237,0.25)]',
    hoverShadow: 'hover:shadow-[0_8px_28px_rgba(124,58,237,0.4)]',
    ring: 'ring-purple-400/60',
    icon: Building2,
  },
  connect: {
    gradient: 'from-[#2563EB] to-[#7C3AED]',
    hoverGradient: 'hover:from-[#3B82F6] hover:to-[#8B5CF6]',
    shadow: 'shadow-[0_4px_16px_rgba(37,99,235,0.25)]',
    hoverShadow: 'hover:shadow-[0_8px_28px_rgba(37,99,235,0.4)]',
    ring: 'ring-blue-400/60',
    icon: Users,
  },
  buy: {
    gradient: 'from-[#059669] to-[#0D9488]',
    hoverGradient: 'hover:from-[#10B981] hover:to-[#14B8A6]',
    shadow: 'shadow-[0_4px_16px_rgba(5,150,105,0.25)]',
    hoverShadow: 'hover:shadow-[0_8px_28px_rgba(5,150,105,0.4)]',
    ring: 'ring-emerald-400/60',
    icon: Home,
  },
  lease: {
    gradient: 'from-[#0891B2] to-[#2563EB]',
    hoverGradient: 'hover:from-[#06B6D4] hover:to-[#3B82F6]',
    shadow: 'shadow-[0_4px_16px_rgba(8,145,178,0.25)]',
    hoverShadow: 'hover:shadow-[0_8px_28px_rgba(8,145,178,0.4)]',
    ring: 'ring-cyan-400/60',
    icon: Handshake,
  },
  schedule: {
    gradient: 'from-[#D97706] to-[#EA580C]',
    hoverGradient: 'hover:from-[#F59E0B] hover:to-[#F97316]',
    shadow: 'shadow-[0_4px_16px_rgba(217,119,6,0.25)]',
    hoverShadow: 'hover:shadow-[0_8px_28px_rgba(217,119,6,0.4)]',
    ring: 'ring-amber-400/60',
    icon: CalendarCheck,
  },
  invest: {
    gradient: 'from-[#E11D48] to-[#BE123C]',
    hoverGradient: 'hover:from-[#F43F5E] hover:to-[#E11D48]',
    shadow: 'shadow-[0_4px_16px_rgba(225,29,72,0.25)]',
    hoverShadow: 'hover:shadow-[0_8px_28px_rgba(225,29,72,0.4)]',
    ring: 'ring-rose-400/60',
    icon: TrendingUp,
  },
  enquire: {
    gradient: 'from-[#4F46E5] to-[#7C3AED]',
    hoverGradient: 'hover:from-[#6366F1] hover:to-[#8B5CF6]',
    shadow: 'shadow-[0_4px_16px_rgba(79,70,229,0.25)]',
    hoverShadow: 'hover:shadow-[0_8px_28px_rgba(79,70,229,0.4)]',
    ring: 'ring-indigo-400/60',
    icon: Building2,
  },
  register: {
    gradient: 'from-[#A21CAF] to-[#7C3AED]',
    hoverGradient: 'hover:from-[#C026D3] hover:to-[#8B5CF6]',
    shadow: 'shadow-[0_4px_16px_rgba(162,28,175,0.25)]',
    hoverShadow: 'hover:shadow-[0_8px_28px_rgba(162,28,175,0.4)]',
    ring: 'ring-fuchsia-400/60',
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
        text-white font-extrabold text-[11px] sm:text-[13px] tracking-wide
        transition-all duration-300 ease-out active:scale-95
        bg-gradient-to-r ${theme.gradient} ${theme.hoverGradient}
        ${theme.shadow} ${theme.hoverShadow}
        ${isAnimating ? `ring-2 ring-offset-1 ring-offset-transparent ${theme.ring} -translate-y-[2px]` : 'ring-0 ring-offset-0 hover:-translate-y-[1px]'}
      `}
    >
      <IconComponent
        size={14}
        strokeWidth={2.5}
        className={`relative z-10 transition-transform duration-300 ${isAnimating ? 'scale-110' : 'group-hover:scale-110'}`}
      />
      <span className="relative z-10 drop-shadow-sm">
        {data.actionText || 'Apply Now'}
      </span>
      <ArrowRight
        size={12}
        strokeWidth={2.5}
        className={`relative z-10 transition-transform duration-300 ${isAnimating ? 'translate-x-0.5' : 'group-hover:translate-x-0.5'}`}
      />

      {/* Top glass highlight */}
      <div className="absolute inset-0 rounded-[4px] bg-gradient-to-b from-white/15 via-white/5 to-transparent pointer-events-none" />

      {/* Shimmer sweep on interval */}
      {isAnimating && (
        <div className="absolute inset-0 animate-[spotlightShimmer_0.8s_ease-in-out_forwards] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12" />
        </div>
      )}

      <style>{`
        @keyframes spotlightShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </button>
  )
}