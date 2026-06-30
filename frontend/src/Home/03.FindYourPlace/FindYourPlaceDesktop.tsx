import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Search, ArrowRight, Sparkles, Target, Building2, Users, BarChart3, Megaphone, 
  Monitor, Palette, GraduationCap, Landmark, Star, BookOpen, ClipboardList, Briefcase, 
  Video, ShieldCheck, Mail, TrendingUp, Compass, FileText, Lightbulb, MessageSquare, 
  UserCheck, Cpu, Eye, Truck, Scale, PenTool, BarChart2, Globe, Database,
  Building, MonitorPlay, Handshake, UserPlus, Network, Layout, Inbox, Award, Clock,
  BarChart, PieChart, Shield, Repeat, Laptop, Bell, Code, Zap, Workflow, Settings,
  Wrench, PlayCircle, MessageCircle, Image, Share2, CreditCard, DollarSign, Mic, ThumbsUp,
  Calendar, Send
} from 'lucide-react';
import { FIND_YOUR_PLACE_CONTENT, ROLES, POPULAR_ROLES, type RoleInfo } from './data';
import BG from './BG.png';

const ICONS: Record<string, any> = {
  Building2, Users, BarChart3, Megaphone, Monitor, Palette,
  GraduationCap, Landmark, Star, BookOpen, ClipboardList,
  Briefcase, Video, Target, ShieldCheck, Mail, TrendingUp,
  Compass, FileText, Lightbulb, MessageSquare, UserCheck,
  Cpu, Eye, Truck, Scale, PenTool, BarChart2, Globe, Database,
  Building, MonitorPlay, Handshake, UserPlus, Network, Layout, Inbox, Award, Clock,
  BarChart, PieChart, Shield, Repeat, Laptop, Bell, Code, Zap, Workflow, Settings,
  Wrench, PlayCircle, MessageCircle, Image, Share2, CreditCard, DollarSign, Mic, ThumbsUp,
  Calendar, Send
};

function Icon({ name, size = 18, className = '', strokeWidth = 1.5 }: { name: string; size?: number; className?: string; strokeWidth?: number }) {
  const Comp = ICONS[name];
  return Comp ? <Comp size={size} className={className} strokeWidth={strokeWidth} /> : null;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 30 } 
  }
};

export default function FindYourPlaceDesktop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<RoleInfo>(ROLES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredRoles = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return ROLES.filter((role) => role.label.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const handleRoleSelect = useCallback((role: RoleInfo) => {
    setSelectedRole(role);
    setSearchQuery('');
    setIsDropdownOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section
      id="find-your-place"
      className="relative bg-slate-50 overflow-hidden selection:bg-purple-200 selection:text-purple-900 py-8 lg:py-12"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-400/15 rounded-[4px] blur-[120px] pointer-events-none animate-pulse"
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-12 lg:mb-16 text-center"
        >
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600 mb-4 cursor-default"
          >
            <Sparkles size={14} className="text-purple-600" aria-hidden="true" />
            {FIND_YOUR_PLACE_CONTENT.sectionLabel}
          </motion.span>
          <h2 className="text-4xl lg:text-[44px] leading-[1.2] font-extrabold text-gray-900 max-w-3xl tracking-tight mb-4">
            {FIND_YOUR_PLACE_CONTENT.heading}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-[250px_1fr] bg-white/80 backdrop-blur-xl rounded-[4px] border border-white shadow-2xl shadow-purple-900/10 overflow-hidden ring-1 ring-purple-100/50"
        >
          <div className="flex flex-col h-full border-r border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2.5 px-5 pt-6 pb-3">
              <div className="w-7 h-7 rounded-[4px] bg-gradient-to-br from-purple-600 to-fuchsia-500 flex items-center justify-center shadow-md shadow-purple-500/20">
                <Target size={14} className="text-white" strokeWidth={2.5} />
              </div>
              <p className="text-sm font-extrabold text-gray-900 uppercase tracking-wide">
                {FIND_YOUR_PLACE_CONTENT.inputPrefix}
              </p>
            </div>

            <div className="px-4 pb-4 relative z-30" ref={dropdownRef}>
              <div className="relative group">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setIsDropdownOpen(true); }}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder={FIND_YOUR_PLACE_CONTENT.placeholder}
                  className="w-full py-2.5 pl-9 pr-3 rounded-[4px] border border-gray-200 text-[13px] font-medium text-gray-900 placeholder:text-gray-400 outline-none bg-white hover:border-purple-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 shadow-sm"
                />
              </div>

              <AnimatePresence>
                {isDropdownOpen && filteredRoles.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[calc(100%-8px)] left-4 right-4 bg-white rounded-[4px] border border-gray-100 shadow-2xl shadow-purple-900/10 z-40 max-h-[220px] overflow-y-auto p-1.5"
                  >
                    <ul className="flex flex-col gap-0.5">
                      {filteredRoles.map((role) => (
                        <li key={role.key}>
                          <button
                            type="button"
                            onClick={() => handleRoleSelect(role)}
                            className="w-full text-left px-3 py-2 text-[13px] font-medium text-gray-600 hover:text-purple-900 hover:bg-purple-50 rounded-[4px] transition-all duration-200 flex items-center gap-2.5"
                          >
                            <Icon name={role.roleIcon} size={16} className="text-gray-400" />
                            {role.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="px-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1.5">
              Popular Roles
            </p>

            <nav className="flex-1 overflow-y-auto px-2 pb-4" aria-label="Role selection">
              <ul className="flex flex-col gap-0.5">
                {POPULAR_ROLES.map((role) => {
                  const isSelected = selectedRole.key === role.key;
                  return (
                    <li key={role.key}>
                      <button
                        type="button"
                        onClick={() => handleRoleSelect(role)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[4px] text-[13px] font-semibold transition-all duration-300 text-left border-l-[3px] ${
                          isSelected
                            ? 'bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] text-white border-transparent shadow-[0_4px_15px_rgba(124,58,237,0.35)] translate-x-1'
                            : 'bg-transparent text-gray-600 border-transparent hover:bg-purple-50/80 hover:text-purple-700 hover:border-purple-300 hover:translate-x-0.5'
                        }`}
                      >
                        <Icon
                          name={role.roleIcon}
                          size={18}
                          className={isSelected ? 'text-white/90' : 'text-gray-400'}
                          strokeWidth={1.5}
                        />
                        {role.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col bg-white relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRole.key}
                initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col h-full"
              >
                <div className="relative px-8 pt-4 pb-3 ">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 0.8, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute top-0 right-0 w-[220px] h-[140px] pointer-events-none z-0" 
                    aria-hidden="true"
                  >
                    <img src={BG} alt="" className="w-[800px] h-auto object-contain object-right-top mix-blend-multiply" draggable={false} />
                  </motion.div>

                  <div className="relative z-10 max-w-[65%]">
                    <div className="flex items-center gap-3 mb-2">
                      <motion.div 
                        whileHover={{ rotate: 5, scale: 1.05 }}
                        className="w-12 h-12 rounded-[4px] bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center shrink-0 border border-purple-200/60 shadow-sm"
                      >
                        <Icon name={selectedRole.roleIcon} size={24} className="text-purple-700" strokeWidth={1.5} />
                      </motion.div>
                      <h3 className="text-2xl lg:text-[28px] font-extrabold text-gray-900 leading-tight tracking-tight">
                        {selectedRole.label}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-0 flex-1">
                  <div className="p-4 group">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-9 h-9 rounded-[4px] bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-110">
                        <Send size={18} className="text-white" strokeWidth={2.5} />
                      </div>
                      <h4 className="text-[17px] font-extrabold text-emerald-600 tracking-tight">
                        What You Can Offer
                      </h4>
                    </div>

                    <motion.ul 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex flex-col gap-5"
                    >
                      {selectedRole.offerPoints.map((point, i) => (
                        <motion.li 
                          key={i} 
                          variants={itemVariants} 
                          whileHover={{ x: 4 }}
                          className="flex items-start gap-3 p-2 -ml-2 rounded-[4px] hover:bg-emerald-50/50 transition-colors duration-200"
                        >
                          <div className="w-10 h-10 rounded-[4px] bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-200/60 shadow-sm">
                            <Icon name={point.icon} size={18} className="text-emerald-600" strokeWidth={1.5} />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[14px] font-bold text-gray-900 leading-snug">
                              {point.title}
                            </span>
                            <span className="text-[12.5px] font-medium text-gray-500 leading-relaxed mt-0.5">
                              {point.description}
                            </span>
                          </div>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>

                  <div className="p-8 group">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-9 h-9 rounded-[4px] bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-600/30 transition-transform duration-300 group-hover:scale-110">
                        <Inbox size={18} className="text-white" strokeWidth={2.5} />
                      </div>
                      <h4 className="text-[17px] font-extrabold text-purple-600 tracking-tight">
                        What You Can Get
                      </h4>
                    </div>

                    <motion.ul 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex flex-col gap-5"
                    >
                      {selectedRole.getPoints.map((point, i) => (
                        <motion.li 
                          key={i} 
                          variants={itemVariants} 
                          whileHover={{ x: 4 }}
                          className="flex items-start gap-3 p-2 -ml-2 rounded-[4px] hover:bg-purple-50/50 transition-colors duration-200"
                        >
                          <div className="w-10 h-10 rounded-[4px] bg-purple-50 flex items-center justify-center shrink-0 border border-purple-200/60 shadow-sm">
                            <Icon name={point.icon} size={18} className="text-purple-600" strokeWidth={1.5} />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[14px] font-bold text-gray-900 leading-snug">
                              {point.title}
                            </span>
                            <span className="text-[12.5px] font-medium text-gray-500 leading-relaxed mt-0.5">
                              {point.description}
                            </span>
                          </div>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </div>

                <div className="px-8 pb-8 pt-4 flex justify-center border-t border-gray-100 bg-gray-50/30">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-sm bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:from-[#8B5CF6] hover:to-[#F472B6] text-white text-[12px] font-bold shadow-lg shadow-[#7C3AED]/30 hover:shadow-2xl hover:shadow-[#7C3AED]/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#7C3AED]/40 focus-visible:ring-offset-1"
                  >
                    {selectedRole.ctaLabel}
                    <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}