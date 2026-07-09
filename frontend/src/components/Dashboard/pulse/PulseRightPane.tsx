import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ShieldCheck, TrendingUp, Globe, Briefcase, Zap, Info } from 'lucide-react';
import { N4RE_HIGHLIGHTS } from './data';
import { AdvertisementPlaceholder } from '../activityBoard/ActivityBoardDesktop';

const iconConfig: Record<string, { component: React.ElementType, bg: string, color: string, shadow: string }> = {
  ShieldCheck: {
    component: ShieldCheck,
    bg: 'bg-emerald-50 group-hover:bg-emerald-500',
    color: 'text-emerald-500 group-hover:text-white',
    shadow: 'hover:shadow-emerald-500/20'
  },
  TrendingUp: {
    component: TrendingUp,
    bg: 'bg-blue-50 group-hover:bg-blue-500',
    color: 'text-blue-500 group-hover:text-white',
    shadow: 'hover:shadow-blue-500/20'
  },
  Globe: {
    component: Globe,
    bg: 'bg-fuchsia-50 group-hover:bg-fuchsia-500',
    color: 'text-fuchsia-500 group-hover:text-white',
    shadow: 'hover:shadow-fuchsia-500/20'
  },
  Briefcase: {
    component: Briefcase,
    bg: 'bg-purple-50 group-hover:bg-purple-500',
    color: 'text-purple-500 group-hover:text-white',
    shadow: 'hover:shadow-purple-500/20'
  }
};

const defaultIconConfig = {
  component: Info,
  bg: 'bg-gray-50 group-hover:bg-gray-500',
  color: 'text-gray-500 group-hover:text-white',
  shadow: 'hover:shadow-gray-500/20'
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 15, scale: 0.98 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 120, damping: 20 }
  },
};

export default function PulseRightPane() {
  return (
    <div className="sticky top-[10px] mb-20 flex flex-col gap-4 w-full">
      <motion.div 
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.25, 0, 1] }}
        className="flex items-center gap-2.5 mb-1"
      >
        <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-500 flex items-center justify-center shadow-md shadow-purple-900/20">
          <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300" />
          <Zap size={20} className="text-white fill-white drop-shadow-sm animate-pulse" />
        </div>
        <div>
          <h2 className="text-[22px] font-extrabold text-gray-900 tracking-tight leading-tight">
            Network Highlights
          </h2>
          <p className="text-[13px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">
            Maximize your platform benefits
          </p>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-2.5"
      >
        {N4RE_HIGHLIGHTS.map((item) => {
          const config = iconConfig[item.icon] || defaultIconConfig;
          const IconComponent = config.component;
          
          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -2, scale: 1.01 }}
              className={`group bg-white rounded-[8px] p-3 border border-gray-100 shadow-sm hover:shadow-md ${config.shadow} transition-all duration-300 ease-out cursor-default`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-[4px] flex items-center justify-center shrink-0 transition-all duration-300 ${config.bg}`}>
                  <IconComponent size={18} strokeWidth={2.5} className={`transition-colors duration-300 ${config.color}`} />
                </div>
                <div>
                  <h3 className="text-[14px] font-extrabold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[12px] font-medium text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Advertisement Space */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-2"
      >
        <AdvertisementPlaceholder />
      </motion.div>
    </div>
  );
}