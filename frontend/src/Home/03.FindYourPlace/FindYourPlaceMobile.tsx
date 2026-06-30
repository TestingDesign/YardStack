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
  Calendar, Send, Plus, Minus
} from 'lucide-react';
import { FIND_YOUR_PLACE_CONTENT, ROLES, POPULAR_ROLES, type RoleInfo } from './data';

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
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 350, damping: 25 } 
  }
};

export default function FindYourPlaceMobile() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<RoleInfo>(ROLES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<'offer' | 'get'>('offer');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredRoles = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return ROLES.filter((role) => role.label.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const handleRoleSelect = useCallback((role: RoleInfo) => {
    setSelectedRole(role);
    setSearchQuery('');
    setIsDropdownOpen(false);
    setActiveAccordion('offer');
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
      className="relative bg-slate-50 overflow-hidden selection:bg-purple-200 selection:text-purple-900 py-4"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-300/10 rounded-full blur-[80px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="px-2 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center mb-8 text-center"
        >
          <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600 mb-3">
            <Sparkles size={12} className="text-purple-600" aria-hidden="true" />
            {FIND_YOUR_PLACE_CONTENT.sectionLabel}
          </span>
          <h2 className="text-[24px] leading-[1.2] font-extrabold text-gray-900 tracking-tight">
            {FIND_YOUR_PLACE_CONTENT.heading}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-xl rounded-[4px] shadow-purple-900/5 overflow-hidden"
        >
          <div className="p-4 ">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-500 flex items-center justify-center">
                <Target size={12} className="text-white" strokeWidth={2.5} />
              </div>
              <p className="text-xs font-extrabold text-gray-900 uppercase tracking-wide">
                {FIND_YOUR_PLACE_CONTENT.inputPrefix}
              </p>
            </div>

            <p className="text-[9px] font-black text-gray-400 mb-2 uppercase tracking-[0.15em]">
              Popular Roles & Search
            </p>

            <div className="flex flex-col gap-3">
              <div className="relative z-30" ref={dropdownRef}>
                <div className="relative group h-[34px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setIsDropdownOpen(true); }}
                    onFocus={() => setIsDropdownOpen(true)}
                    placeholder={FIND_YOUR_PLACE_CONTENT.placeholder}
                    className="w-full h-full pl-9 pr-3 rounded-[4px] border border-gray-200 text-[12px] font-medium text-gray-900 placeholder:text-gray-400 outline-none bg-white hover:border-purple-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-500/10 transition-all shadow-sm"
                  />
                </div>

                {isDropdownOpen && filteredRoles.length > 0 && (
                  <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white rounded-[4px] border border-gray-100 shadow-xl shadow-purple-900/10 z-40 max-h-[180px] overflow-y-auto p-1">
                    <ul className="flex flex-col gap-0.5">
                      {filteredRoles.map((role) => (
                        <li key={role.key}>
                          <button
                            type="button"
                            onClick={() => handleRoleSelect(role)}
                            className="w-full text-left px-2.5 py-2 text-[12px] font-medium text-gray-600 hover:text-purple-900 hover:bg-purple-50 rounded-[4px] transition-colors flex items-center gap-2"
                          >
                            <Icon name={role.roleIcon} size={15} className="text-gray-400" />
                            {role.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* UPDATED TAB CONTROL: Uses flex-wrap to prevent truncation and display all tags clearly */}
              <div className="flex flex-wrap gap-2 pt-1 pb-1">
                {POPULAR_ROLES.map((role) => {
                  const isSelected = selectedRole.key === role.key;
                  return (
                    <button
                      key={role.key}
                      type="button"
                      onClick={() => handleRoleSelect(role)}
                      className={`px-3 h-[32px] flex items-center justify-center gap-1.5 rounded-[4px] text-[11px] font-bold border transition-all duration-300 shrink-0 ${
                        isSelected
                          ? 'bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] text-white border-transparent shadow-[0_2px_8px_rgba(124,58,237,0.3)]'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-[var(--color-primary-600)] hover:bg-purple-50/50'
                      }`}
                    >
                      <Icon
                        name={role.roleIcon}
                        size={13}
                        className={isSelected ? 'text-white/90' : 'text-gray-400'}
                        strokeWidth={1.5}
                      />
                      <span className="whitespace-nowrap">{role.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRole.key}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex flex-col"
            >
              <div className="px-4 pt-5 pb-4 ">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center shrink-0 border border-purple-100/50 shadow-inner">
                    <Icon name={selectedRole.roleIcon} size={18} className="text-purple-700" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[18px] font-extrabold text-gray-900 leading-tight tracking-tight">
                    {selectedRole.label}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col gap-3 px-2 pt-5 pb-4 ">
                {/* Offer Accordion */}
                <div className={`rounded-[8px] border transition-colors duration-300 ${activeAccordion === 'offer' ? 'bg-emerald-50/40 border-emerald-200' : 'bg-white border-gray-200 hover:border-emerald-200'}`}>
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 'offer' ? 'get' : 'offer')}
                    className="w-full flex items-center justify-between p-3.5 outline-none rounded-[8px]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-[4px] bg-emerald-500 flex items-center justify-center shadow-sm shadow-emerald-500/20">
                        <Send size={15} className="text-white" strokeWidth={2.5} />
                      </div>
                      <h4 className="text-[15px] font-extrabold text-emerald-600 tracking-tight">
                        What You Can Offer
                      </h4>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors border ${activeAccordion === 'offer' ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-transparent border-gray-300 text-gray-400'}`}>
                      {activeAccordion === 'offer' ? <Minus size={12} strokeWidth={3} /> : <Plus size={12} strokeWidth={3} />}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {activeAccordion === 'offer' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 pt-0 pl-14">
                          <motion.ul 
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col gap-4"
                          >
                            {selectedRole.offerPoints.map((point, i) => (
                              <motion.li key={i} variants={itemVariants} className="flex items-start gap-2.5 p-1 -ml-1 rounded-[4px] hover:bg-emerald-50/50">
                                <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center shrink-0 border border-emerald-100/60 shadow-sm">
                                  <Icon name={point.icon} size={15} className="text-emerald-600" strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className="text-[12px] font-bold text-gray-900 leading-snug">
                                    {point.title}
                                  </span>
                                  <span className="text-[11px] font-medium text-gray-500 leading-relaxed mt-0.5">
                                    {point.description}
                                  </span>
                                </div>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Get Accordion */}
                <div className={`rounded-[8px] border transition-colors duration-300 ${activeAccordion === 'get' ? 'bg-purple-50/50 border-purple-200' : 'bg-white border-gray-200 hover:border-purple-200'}`}>
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 'get' ? 'offer' : 'get')}
                    className="w-full flex items-center justify-between p-3.5 outline-none rounded-[8px]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-[4px] bg-purple-600 flex items-center justify-center shadow-sm shadow-purple-600/20">
                        <Inbox size={15} className="text-white" strokeWidth={2.5} />
                      </div>
                      <h4 className="text-[15px] font-extrabold text-purple-600 tracking-tight">
                        What You Can Get
                      </h4>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors border ${activeAccordion === 'get' ? 'bg-purple-600 border-purple-600 text-white' : 'bg-transparent border-gray-300 text-gray-400'}`}>
                      {activeAccordion === 'get' ? <Minus size={12} strokeWidth={3} /> : <Plus size={12} strokeWidth={3} />}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {activeAccordion === 'get' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 pt-0 pl-14">
                          <motion.ul 
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col gap-4"
                          >
                            {selectedRole.getPoints.map((point, i) => (
                              <motion.li key={i} variants={itemVariants} className="flex items-start gap-2.5 p-1 -ml-1 rounded-[4px] hover:bg-purple-50/50">
                                <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center shrink-0 border border-purple-100/60 shadow-sm">
                                  <Icon name={point.icon} size={15} className="text-purple-600" strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className="text-[12px] font-bold text-gray-900 leading-snug">
                                    {point.title}
                                  </span>
                                  <span className="text-[11px] font-medium text-gray-500 leading-relaxed mt-0.5">
                                    {point.description}
                                  </span>
                                </div>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="px-10 py-5 flex justify-center">
                <button className="group inline-flex items-center justify-center gap-2 px-3 py-3 rounded-[8px] bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:from-[#8B5CF6] hover:to-[#F472B6] text-white text-[13px] font-bold shadow-lg shadow-[#7C3AED]/25 transition-all duration-300 active:scale-95 focus-visible:outline-none w-full max-w-sm">
                  {selectedRole.ctaLabel}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}