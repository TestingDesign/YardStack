import type { ReactNode } from 'react'
import { Monitor, Building2, ClipboardList, GraduationCap, Clock, Sparkles } from 'lucide-react'

interface LaunchingItem {
  key: string
  icon: ReactNode
  title: string
  description: string
}

const LAUNCHING_ITEMS: LaunchingItem[] = [
  {
    key: 'showcase',
    icon: <Monitor size={26} strokeWidth={1.5} />,
    title: 'Showcase',
    description: 'Highlight your projects, wins, and impact in one centralized space.',
  },
  {
    key: 'city-inventory',
    icon: <Building2 size={26} strokeWidth={1.5} />,
    title: 'City Inventory',
    description: 'View and manage detailed information about cities and communities.',
  },
  {
    key: 'survey-pools',
    icon: <ClipboardList size={26} strokeWidth={1.5} />,
    title: 'Survey Pools',
    description: 'Access and contribute to a variety of surveys and polls.',
  },
  {
    key: 'lms',
    icon: <GraduationCap size={26} strokeWidth={1.5} />,
    title: 'LMS',
    description: 'Access learning resources and build your skills on your schedule.',
  },
]

function LaunchingCard({ item }: { item: LaunchingItem }) {
  return (
    <div className="group flex flex-col aspect-square justify-between bg-white/80 backdrop-blur-xl border border-white/40 rounded-[8px] p-4 pb-3 relative shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-500 ease-out hover:shadow-[0_15px_30px_-10px_rgba(107,33,168,0.25)] hover:-translate-y-1 hover:bg-white hover:border-purple-300 overflow-hidden cursor-default">
      
      {/* Glass Shine Sweep Animation */}
      <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-25deg] z-20 pointer-events-none" />
      
      {/* Dynamic Background Glow Fade */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
      
      <div className="relative z-10 flex flex-col items-center text-center gap-3 pt-1 transition-transform duration-500 ease-out group-hover:-translate-y-1">
        {/* Icon Container with Glow */}
        <div className="w-[48px] h-[48px] shrink-0 rounded-[4px] bg-purple-50/80 flex items-center justify-center text-purple-700 border border-purple-100/50 shadow-sm transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:bg-purple-100 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:border-purple-200">
          <div className="transition-transform duration-500 group-hover:scale-105">
            {item.icon}
          </div>
        </div>
        
        <div className="flex flex-col gap-1.5 px-1">
          <h3 className="text-[13px] font-black text-[#1A1A2E] leading-tight tracking-wide transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-800 group-hover:to-indigo-600">
            {item.title}
          </h3>
          <p className="text-[10px] text-gray-500 leading-snug font-medium transition-colors duration-500 group-hover:text-gray-700 line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>

      {/* Bottom Banner Section */}
      <div className="relative z-10 flex items-center justify-center gap-1.5 mt-auto pt-2.5 border-t border-gray-100 text-purple-700 transition-all duration-500 -mx-4 px-4 pb-1 -mb-1 rounded-b-[8px] group-hover:border-purple-200/60 group-hover:bg-purple-50/50">
        <Sparkles 
          size={12} 
          strokeWidth={2.5} 
          className="opacity-0 -ml-4 scale-0 group-hover:opacity-100 group-hover:ml-0 group-hover:scale-100 group-hover:rotate-12 group-hover:animate-pulse transition-all duration-500 text-amber-500" 
        />
        <Clock size={12} strokeWidth={2.5} className="group-hover:hidden text-gray-400 transition-all duration-300" />
        <span className="text-[9px] font-bold uppercase tracking-[0.1em] transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-800 group-hover:to-indigo-600">
          Launching Soon
        </span>
      </div>
    </div>
  )
}

export default function LaunchingSoonMobile() {
  return (
    <div className="flex-1 w-full h-full bg-gradient-to-br from-[#F8F7FC] via-[#F4F2FA] to-[#F1EEF9] overflow-y-auto py-6 px-4 box-border [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      <div className="w-full flex flex-col justify-center h-full">
        <div className="grid grid-cols-2 gap-4">
          {LAUNCHING_ITEMS.map((item) => (
            <LaunchingCard key={item.key} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}