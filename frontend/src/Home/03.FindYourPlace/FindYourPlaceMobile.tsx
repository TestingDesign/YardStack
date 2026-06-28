import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
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

export default function FindYourPlaceMobile() {
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
      className="relative bg-slate-50 overflow-hidden selection:bg-purple-200 selection:text-purple-900 py-12"
    >
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-300/10 rounded-full blur-[80px] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="px-4 relative z-10">
        <div className="flex flex-col items-center mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600 mb-3">
            <Sparkles size={12} className="text-purple-600" aria-hidden="true" />
            {FIND_YOUR_PLACE_CONTENT.sectionLabel}
          </span>
          <h2 className="text-[26px] leading-[1.2] font-extrabold text-gray-900 tracking-tight mb-3">
            {FIND_YOUR_PLACE_CONTENT.heading}
          </h2>
          <p className="text-[14px] font-medium text-gray-600 leading-relaxed px-2">
            {FIND_YOUR_PLACE_CONTENT.description}
          </p>
        </div>

        <div className="flex flex-col bg-white/80 backdrop-blur-xl rounded-2xl border border-white shadow-2xl shadow-purple-900/5 overflow-hidden animate-in zoom-in-95 fade-in duration-700 delay-150 ease-out">
          
          <div className="flex flex-col p-5 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2 mb-4">
              <Target size={16} className="text-purple-600" />
              <p className="text-xs font-extrabold text-gray-900 uppercase tracking-wide">
                {FIND_YOUR_PLACE_CONTENT.inputPrefix}
              </p>
            </div>

            <div className="relative z-30 mb-6" ref={dropdownRef}>
              <div className="relative group">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setIsDropdownOpen(true); }}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder={FIND_YOUR_PLACE_CONTENT.placeholder}
                  className="w-full py-2.5 pl-9 pr-3 rounded-[4px] border border-gray-200 text-[13px] font-medium text-gray-900 placeholder:text-gray-400 outline-none bg-white hover:border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/10 transition-all shadow-sm"
                />
              </div>

              {isDropdownOpen && filteredRoles.length > 0 && (
                <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white rounded-[4px] border border-gray-100 shadow-xl shadow-purple-900/10 z-40 max-h-[200px] overflow-y-auto p-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                  <ul className="flex flex-col gap-0.5">
                    {filteredRoles.map((role) => (
                      <li key={role.key}>
                        <button
                          type="button"
                          onClick={() => handleRoleSelect(role)}
                          className="w-full text-left px-3 py-2 text-[13px] font-medium text-gray-600 hover:text-purple-900 hover:bg-purple-50 rounded-[4px] transition-colors"
                        >
                          {role.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-auto">
              <p className="text-[10px] font-black text-gray-400 mb-2.5 uppercase tracking-[0.15em]">
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
                    className={`px-3 py-1.5 rounded-[4px] text-[11px] font-bold border transition-all duration-300 ${
  isSelected
    ? 'bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] text-white border-transparent shadow-[0_2px_12px_rgba(124,58,237,0.3)] hover:shadow-[0_4px_16px_rgba(124,58,237,0.45)]'
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

          <div className="flex flex-col h-full p-5 relative overflow-hidden bg-white">
            <div className="absolute bottom-0 right-0 w-[65%] h-[80%] pointer-events-none z-0" aria-hidden="true">
              <img src={BG} alt="" className="w-full h-full object-contain object-right-bottom opacity-[0.85]" draggable={false} />
            </div>
            
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-br from-purple-100/40 to-transparent rounded-bl-full -z-10 pointer-events-none opacity-50" aria-hidden="true" />
            
            <div 
              key={selectedRole.key} 
              className="relative z-10 w-full animate-in fade-in slide-in-from-right-4 duration-500"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center shrink-0 border border-purple-100/50 shadow-inner">
                  <Building2 size={20} className="text-purple-700" strokeWidth={1.5} />
                </div>
                <h3 className="text-[18px] font-extrabold text-gray-900 leading-tight tracking-tight">
                  {selectedRole.helpTitle}
                </h3>
              </div>

              <ul className="flex flex-col gap-3">
                {selectedRole.helpPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-[13px] text-gray-600 font-medium leading-relaxed">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-purple-100/80 flex items-center justify-center mt-0.5">
                      <Check size={12} strokeWidth={2.5} className="text-purple-700" />
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <button className="group inline-flex items-center justify-center gap-2 mt-8 px-6 py-3 w-full rounded-[4px] bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:from-[#8B5CF6] hover:to-[#F472B6] text-white text-[13px] font-bold shadow-lg shadow-[#7C3AED]/25 transition-all duration-300 active:scale-95 focus-visible:outline-none">
                {selectedRole.ctaLabel}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}