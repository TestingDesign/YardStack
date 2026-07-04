import { useState } from 'react'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CloseIcon from '@mui/icons-material/Close'
import type { SpotlightLinkData } from './SpotlightLinkData'

interface SpotlightLinkProps {
  linkData: SpotlightLinkData
}

export default function SpotlightLink({ linkData }: SpotlightLinkProps) {
  const [isMinimized, setIsMinimized] = useState(false)

  const getIcon = () => {
    switch (linkData.iconType) {
      case 'job':
        return <BusinessCenterOutlinedIcon sx={{ fontSize: 20 }} className="text-white group-hover:text-purple-300 transition-colors" />
      case 'post':
        return <ArticleOutlinedIcon sx={{ fontSize: 20 }} className="text-white group-hover:text-blue-300 transition-colors" />
      case 'property-buy':
        return <HomeOutlinedIcon sx={{ fontSize: 20 }} className="text-white group-hover:text-emerald-300 transition-colors" />
      case 'property-lease':
        return <VpnKeyOutlinedIcon sx={{ fontSize: 20 }} className="text-white group-hover:text-cyan-300 transition-colors" />
      case 'interior-design':
        return <BrushOutlinedIcon sx={{ fontSize: 20 }} className="text-white group-hover:text-pink-300 transition-colors" />
      case 'opportunity':
      default:
        return <LightbulbOutlinedIcon sx={{ fontSize: 20 }} className="text-white group-hover:text-amber-300 transition-colors" />
    }
  }

  const getHoverBg = () => {
    switch (linkData.iconType) {
      case 'job': return 'group-hover:bg-purple-500/20 group-hover:border-purple-400/30'
      case 'post': return 'group-hover:bg-blue-500/20 group-hover:border-blue-400/30'
      case 'property-buy': return 'group-hover:bg-emerald-500/20 group-hover:border-emerald-400/30'
      case 'property-lease': return 'group-hover:bg-cyan-500/20 group-hover:border-cyan-400/30'
      case 'interior-design': return 'group-hover:bg-pink-500/20 group-hover:border-pink-400/30'
      case 'opportunity':
      default: return 'group-hover:bg-amber-500/20 group-hover:border-amber-400/30'
    }
  }

  if (isMinimized) {
    return (
      <div 
        onClick={(e) => {
          e.stopPropagation()
          setIsMinimized(false)
        }}
        className="group flex items-center justify-center bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-full w-12 h-12 transition-all duration-300 cursor-pointer shadow-lg mb-3 self-end ml-auto mr-4 animate-in fade-in zoom-in-75"
        title={`View ${linkData.title}`}
      >
        <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-colors ${getHoverBg()}`}>
          {getIcon()}
        </div>
      </div>
    )
  }

  return (
    <div className="relative group flex items-center justify-between bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-xl p-3 w-full transition-all duration-300 cursor-pointer shadow-lg mb-3 animate-in fade-in zoom-in-95">
      <button 
        onClick={(e) => {
          e.stopPropagation()
          setIsMinimized(true)
        }}
        className="absolute -top-2 -right-2 bg-[#262626]/90 hover:bg-[#363636] border border-white/20 text-white/70 hover:text-white rounded-full w-[22px] h-[22px] flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md z-10"
        aria-label="Minimize link widget"
      >
        <CloseIcon sx={{ fontSize: 13 }} />
      </button>

      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/10 transition-colors ${getHoverBg()}`}>
          {getIcon()}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-white font-bold text-[13px] truncate drop-shadow-md tracking-tight group-hover:text-gray-100 transition-colors">
            {linkData.title}
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-white/80 text-[11px] font-medium truncate">{linkData.subtitle}</span>
            {(linkData.detail1 || linkData.detail2) && <span className="text-white/40 text-[10px]">•</span>}
            <span className="text-white/70 text-[11px] truncate">
              {linkData.detail2 ? linkData.detail2 : linkData.detail1}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 shrink-0 ml-2">
        <div className="hidden @sm:flex px-3 py-1.5 rounded-[8px] bg-white text-black text-[11px] font-bold shadow-sm transition-transform group-hover:scale-105 active:scale-95">
          {linkData.actionText || 'View'}
        </div>
        <div className="flex w-7 h-7 rounded-full bg-white/10 items-center justify-center group-hover:bg-white/20 transition-colors @sm:hidden">
          <ArrowForwardIosIcon sx={{ fontSize: 12 }} className="text-white translate-x-[1px]" />
        </div>
      </div>
    </div>
  )
}
