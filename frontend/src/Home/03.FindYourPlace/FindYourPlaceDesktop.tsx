import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  ArrowRight,
  Check,
  Building2,
  Sparkles,
  Target
} from 'lucide-react';
import { FIND_YOUR_PLACE_CONTENT, ROLES, POPULAR_ROLES, type RoleInfo } from './data';
import BG from './BG.png';

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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-300/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center mb-12 lg:mb-16 text-center"
        >
          <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600 mb-4">
            <Sparkles size={14} className="text-purple-600" aria-hidden="true" />
            {FIND_YOUR_PLACE_CONTENT.sectionLabel}
          </span>
          <h2 className="text-4xl lg:text-[44px] leading-[1.2] font-extrabold text-gray-900 max-w-3xl tracking-tight mb-4">
            {FIND_YOUR_PLACE_CONTENT.heading}
          </h2>
          <p className="text-lg font-medium text-gray-600 max-w-2xl leading-relaxed">
            {FIND_YOUR_PLACE_CONTENT.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-[320px_1fr] items-stretch bg-white/80 backdrop-blur-xl rounded-[4px] border border-white shadow-2xl shadow-purple-900/5 overflow-hidden"
        >

          <div className="flex flex-col h-full p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2.5 mb-5">
              <Target size={18} className="text-purple-600" />
              <p className="text-sm font-extrabold text-gray-900 uppercase tracking-wide">
                {FIND_YOUR_PLACE_CONTENT.inputPrefix}
              </p>
            </div>

            <div className="relative z-30 mb-8" ref={dropdownRef}>
              <div className="relative group">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setIsDropdownOpen(true); }}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder={FIND_YOUR_PLACE_CONTENT.placeholder}
                  className="w-full py-3 pl-10 pr-4 rounded-[4px] border border-gray-200 text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none bg-white hover:border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/10 transition-all shadow-sm"
                />
              </div>

              {isDropdownOpen && filteredRoles.length > 0 && (
                <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-[4px] border border-gray-100 shadow-xl shadow-purple-900/10 z-40 max-h-[220px] overflow-y-auto p-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                  <ul className="flex flex-col gap-0.5">
                    {filteredRoles.map((role) => (
                      <li key={role.key}>
                        <button
                          type="button"
                          onClick={() => handleRoleSelect(role)}
                          className="w-full text-left px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-purple-900 hover:bg-purple-50 rounded-[4px] transition-colors"
                        >
                          {role.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-auto pt-4">
              <p className="text-[11px] font-black text-gray-400 mb-3.5 uppercase tracking-[0.15em]">
                Popular Roles
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_ROLES.map((role) => {
                  const isSelected = selectedRole.key === role.key;
                  return (
                    <button
                      key={role.key}
                      type="button"
                      onClick={() => handleRoleSelect(role)}
                      className={`px-3.5 py-2 rounded-[4px] text-xs font-bold border transition-all duration-300 ${isSelected
                          ? 'bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] text-white border-transparent shadow-[0_2px_12px_rgba(124,58,237,0.3)] hover:shadow-[0_6px_24px_rgba(124,58,237,0.45)] scale-[1.02] hover:scale-[1.03] active:scale-[0.97]'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-[var(--color-primary-600)] hover:bg-purple-50/50 hover:shadow-sm'
                        }`}
                    >
                      {role.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center h-full p-8 lg:p-12 relative overflow-hidden bg-white">
            <div className="absolute bottom-0 right-0 w-[55%] h-[90%] pointer-events-none z-0" aria-hidden="true">
              <img src={BG} alt="" className="w-full h-full object-contain object-right-bottom opacity-90" draggable={false} />
            </div>

            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-purple-100/40 to-transparent rounded-bl-full -z-10 pointer-events-none opacity-50" aria-hidden="true" />

            <motion.div
              key={selectedRole.key}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 w-full lg:w-[65%]"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center shrink-0 border border-purple-100/50 shadow-inner">
                  <Building2 size={26} className="text-purple-700" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl lg:text-[28px] font-extrabold text-gray-900 leading-tight tracking-tight">
                  {selectedRole.helpTitle}
                </h3>
              </div>

              <ul className="flex flex-col gap-4">
                {selectedRole.helpPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3.5 text-[15px] text-gray-600 font-medium leading-relaxed">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-purple-100/80 flex items-center justify-center mt-0.5">
                      <Check size={14} strokeWidth={2.5} className="text-purple-700" />
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <button className="group inline-flex items-center justify-center gap-2 mt-10 px-7 py-3.5 rounded-[4px] bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:from-[#8B5CF6] hover:to-[#F472B6] text-white text-[15px] font-bold shadow-lg shadow-[#7C3AED]/25 hover:shadow-xl hover:shadow-[#7C3AED]/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/50 focus-visible:ring-offset-2">
                {selectedRole.ctaLabel}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
