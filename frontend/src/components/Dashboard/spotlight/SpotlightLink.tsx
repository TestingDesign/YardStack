import { useState, useEffect } from 'react'

export interface SpotlightLinkData {
  actionText?: string
  actionType?: 'apply' | 'buy' | 'lease'
}

export const SPOTLIGHT_LINKS: Record<string, SpotlightLinkData> = {
  seniorAgent: {
    actionText: 'Apply',
    actionType: 'apply'
  },
  luxuryVilla: {
    actionText: 'Buy Now',
    actionType: 'buy'
  },
  commercialOffice: {
    actionText: 'Lease',
    actionType: 'lease'
  }
}

interface SpotlightLinkProps {
  linkData?: SpotlightLinkData
}

export default function SpotlightLink({ linkData }: SpotlightLinkProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 800)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const data = linkData || { actionText: 'Apply Now', actionType: 'apply' }
  const getGradientClasses = () => {
    switch (data.actionType) {
      case 'buy':
        return 'from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-[0_4px_16px_rgba(16,185,129,0.25)] hover:shadow-[0_8px_24px_rgba(16,185,129,0.4)]'
      case 'lease':
        return 'from-cyan-600 to-blue-500 hover:from-cyan-500 hover:to-blue-400 shadow-[0_4px_16px_rgba(6,182,212,0.25)] hover:shadow-[0_8px_24px_rgba(6,182,212,0.4)]'
      case 'apply':
      default:
        return 'from-[#7C3AED] to-[#EC4899] hover:from-[#8B5CF6] hover:to-[#F472B6] shadow-[0_4px_16px_rgba(124,58,237,0.25)] hover:shadow-[0_8px_24px_rgba(124,58,237,0.4)]'
    }
  }

  return (
    <div className={`group relative flex items-center justify-center px-6 py-2.5 rounded-[4px] bg-gradient-to-r ${getGradientClasses()} hover:-translate-y-0.5 transition-all duration-300 ease-out active:scale-95 cursor-pointer animate-in fade-in zoom-in-95 overflow-hidden ${isAnimating ? 'scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)]' : ''}`}>
      <span className="text-white font-extrabold text-[14px] tracking-wide relative z-10">
        {data.actionText || 'Apply Now'}
      </span>
      {isAnimating && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_0.8s_ease-in-out_forwards] skew-x-[-20deg]" />
      )}
    </div>
  )
}