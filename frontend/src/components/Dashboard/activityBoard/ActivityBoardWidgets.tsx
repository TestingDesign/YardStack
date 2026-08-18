import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Star, Mic, ChevronRight } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 300, damping: 24 } 
  }
}

export function ActivityBoardWidgets({ adsContent }: { adsContent?: ReactNode }) {
  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "50px" }}
      className="flex flex-col gap-4 w-full"
    >
      <motion.div variants={itemVariants} className="bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[12px] font-black text-[#1A1A2E] tracking-wide">
            Hiring for Open Plots
          </h3>
          <button className="flex items-center gap-0.5 text-[11px] font-bold text-purple-600 hover:text-purple-700 transition-colors group">
            View all
            <ChevronRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 shrink-0 rounded-md bg-[#0A0B1A] flex items-center justify-center p-1 shadow-sm border border-gray-100">
                <div className="text-white text-[7px] font-black leading-[1.1] text-center tracking-wider">
                  SUNRISE<br/>
                  <span className="text-orange-500">GROUP</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#1A1A2E]">Sunrise Group</span>
                <span className="text-[11px] font-semibold text-gray-500">60 Plot Sales Executives</span>
                <span className="text-[11px] font-medium text-gray-400">Hyderabad</span>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-[2px] border border-[#E91E8C] text-[#E91E8C] text-[11px] font-bold hover:bg-[#E91E8C] hover:text-white transition-all shrink-0">
              Apply Now
            </button>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 shrink-0 rounded-md bg-[#0F5A3E] flex items-center justify-center p-1 shadow-sm border border-gray-100">
                <div className="text-white text-[7px] font-black leading-[1.1] text-center tracking-wider">
                  GREEN<br/>ACRES
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#1A1A2E]">Green Acres Realty</span>
                <span className="text-[11px] font-semibold text-gray-500">25 Field Sales Executives</span>
                <span className="text-[11px] font-medium text-gray-400">Hyderabad</span>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-[2px] border border-[#E91E8C] text-[#E91E8C] text-[11px] font-bold hover:bg-[#E91E8C] hover:text-white transition-all shrink-0">
              Apply Now
            </button>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 shrink-0 rounded-md bg-[#0A0B1A] flex items-center justify-center p-1 shadow-sm border border-gray-100">
                <div className="text-white text-[7px] font-black leading-[1.1] text-center tracking-wider">
                  LAND<br/>MARK
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#1A1A2E]">Landmark Developers</span>
                <span className="text-[11px] font-semibold text-gray-500">40 Sales Team Members</span>
                <span className="text-[11px] font-medium text-gray-400">Hyderabad</span>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-[2px] border border-[#E91E8C] text-[#E91E8C] text-[11px] font-bold hover:bg-[#E91E8C] hover:text-white transition-all shrink-0">
              Apply Now
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[12px] font-black text-[#1A1A2E] tracking-wide">
            Upskill Your Career
          </h3>
          <button className="flex items-center gap-0.5 text-[11px] font-bold text-purple-600 hover:text-purple-700 transition-colors group">
            View all
            <ChevronRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-[84px] h-[52px] shrink-0 rounded-md bg-gray-200 overflow-hidden relative shadow-sm border border-gray-100">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="w-full h-full object-cover object-top" alt="Course" />
              <div className="absolute top-1 right-1 bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                <Star size={8} fill="currentColor" />
              </div>
            </div>
            <div className="flex flex-col flex-1 justify-center">
              <span className="text-[12px] font-bold text-[#1A1A2E] leading-tight mb-0.5">Open Plots Sales Mastery</span>
              <span className="text-[9px] font-semibold text-gray-500 mb-1.5">12 Week Certification Program</span>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-[1px] bg-blue-600 text-white text-[8px] font-bold rounded-[2px] ">
                  Popular
                </span>
                <span className="flex items-center gap-0.5 text-[9px] text-orange-500 font-bold">
                  <Star size={9} fill="currentColor" /> 4.8 <span className="text-gray-400 font-normal">(320)</span>
                </span>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-[2px] border border-purple-600 text-purple-600 text-[11px] font-bold hover:bg-purple-600 hover:text-white transition-all shrink-0">
              Enroll Now
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-[84px] h-[52px] shrink-0 rounded-md bg-gray-200 overflow-hidden shadow-sm border border-gray-100">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" className="w-full h-full object-cover object-top" alt="Course" />
            </div>
            <div className="flex flex-col flex-1 justify-center">
              <span className="text-[12px] font-bold text-[#1A1A2E] leading-tight mb-0.5">FARE Launch Pad</span>
              <span className="text-[9px] font-semibold text-gray-500 mb-1.5">For Freshers in Real Estate</span>
              <span className="flex items-center gap-0.5 text-[9px] text-orange-500 font-bold">
                <Star size={9} fill="currentColor" /> 4.7 <span className="text-gray-400 font-normal">(210)</span>
              </span>
            </div>
            <button className="px-3 py-1.5 rounded-[2px] border border-purple-600 text-purple-600 text-[11px] font-bold hover:bg-purple-600 hover:text-white transition-all shrink-0">
              Enroll Now
            </button>
          </div>
        </div>
      </motion.div>

      {adsContent && <motion.div variants={itemVariants}>{adsContent}</motion.div>}

      <motion.div variants={itemVariants} className="bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[12px] font-black text-[#1A1A2E] tracking-wide">
            Upcoming RED Conversation
          </h3>
          <button className="flex items-center gap-0.5 text-[11px] font-bold text-purple-600 hover:text-purple-700 transition-colors group">
            View all
            <ChevronRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="flex items-start gap-3 relative">
          <div className="w-[52px] h-[52px] shrink-0 rounded-md bg-gray-200 overflow-hidden shadow-sm border border-gray-100">
            <img src="https://i.pravatar.cc/150?u=a04258114e29026702d" className="w-full h-full object-cover object-top" alt="Speaker" />
          </div>
          <div className="flex flex-col flex-1 pt-0 pr-[85px]">
            <h4 className="text-[12px] font-bold text-[#1A1A2E] leading-tight mb-2">
              How Top Teams Sell<br/>100+ Open Plots Monthly
            </h4>
            <span className="text-[11px] font-bold text-[#1A1A2E]">Vikram Arora</span>
            <span className="text-[10px] font-medium text-gray-500 mb-2">Head of Sales, Sunrise Group</span>
            <span className="text-[10px] font-bold text-gray-600">24 May 2024 • 7:00 PM</span>
          </div>
          
          <div className="absolute right-0 top-0 bottom-0 flex flex-col items-center justify-between">
            <div className="w-10 h-10 mt-1 flex items-center justify-center text-purple-600 opacity-80">
              <Mic size={24} strokeWidth={2.5} />
            </div>
            <button className="px-3 py-1.5 rounded-[4px] bg-[#E91E8C] text-white text-[11px] font-bold hover:bg-[#d11a7d] transition-all whitespace-nowrap shadow-md">
              Register Now
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[12px] font-black text-[#1A1A2E] tracking-wide">
            Featured Companies
          </h3>
          <button className="flex items-center gap-0.5 text-[11px] font-bold text-purple-600 hover:text-purple-700 transition-colors group">
            View all
            <ChevronRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none pb-1">
          <div className="w-[52px] h-[52px] shrink-0 rounded-md bg-[#0A0B1A] flex items-center justify-center p-1.5 shadow-sm border border-gray-100">
            <div className="text-white text-[9px] font-black leading-tight text-center tracking-wider">
              ABC<br/>REALTY
            </div>
          </div>
          
          <div className="w-[52px] h-[52px] shrink-0 rounded-md bg-white flex items-center justify-center p-1.5 shadow-sm border border-gray-100">
            <div className="text-[#1A1A2E] text-[9px] font-black leading-tight text-center tracking-wider">
              PRIME<br/>INFRA
            </div>
          </div>
          
          <div className="w-[52px] h-[52px] shrink-0 rounded-md bg-white flex items-center justify-center p-1.5 shadow-sm border border-gray-100 text-[#0F5A3E]">
            <div className="text-[9px] font-black leading-tight text-center tracking-wider">
              GREEN<br/>ACRES
            </div>
          </div>
          
          <div className="w-[52px] h-[52px] shrink-0 rounded-md bg-white flex items-center justify-center p-1.5 shadow-sm border border-gray-100">
            <div className="text-[#1A1A2E] text-[9px] font-black leading-tight text-center tracking-wider">
              URBAN<br/>STUDIO
            </div>
          </div>
          
          <div className="w-[52px] h-[52px] shrink-0 rounded-md bg-white flex items-center justify-center p-1.5 shadow-sm border border-gray-100">
            <div className="text-[7px] font-black leading-[1.1] text-center tracking-wider text-[#0A0B1A]">
              SUNRISE<br/>
              <span className="text-orange-500">GROUP</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}