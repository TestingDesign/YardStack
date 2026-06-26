import { useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { NAV_LINKS, NAV_CTAS } from './data';
import Logo from '../01.Hero/Logo.png';

interface HomeNavDesktopProps {
  viewMode: 'desktop' | 'mobile';
}

export default function HomeNavDesktop({ viewMode }: HomeNavDesktopProps) {
  const [activeLink, setActiveLink] = useState('home');

  const handleNavClick = useCallback((key: string, href: string) => {
    setActiveLink(key);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <header className="absolute top-0 w-full z-50 pt-4 animate-in fade-in slide-in-from-top-4 duration-700 ease-out">
      <div className="flex items-center justify-between h-[72px] px-4 lg:px-8 max-w-[1400px] mx-auto w-full">
        
        <a
          href="#hero"
          onClick={() => setActiveLink('home')}
          className="flex shrink-0 items-center outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 rounded-[4px] transition-transform active:scale-95"
        >
          <img src={Logo} alt="N4RE Logo" className="h-16 lg:h-20 w-auto object-contain drop-shadow-sm" draggable={false} />
        </a>

        <nav aria-label="Main Navigation" className="hidden md:flex items-center justify-center flex-1 mx-8">
          <ul className="flex items-center gap-1 m-0 p-1.5 bg-white/90 backdrop-blur-md rounded-[4px] shadow-sm border border-gray-100">
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.key;
              return (
                <li key={link.key}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.key, link.href)}
                    className={`px-5 py-2 text-[13px] font-extrabold rounded-[4px] transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 cursor-pointer ${
                      isActive
                        ? 'bg-purple-50 text-purple-900 shadow-sm border border-purple-100/50'
                        : 'text-gray-600 hover:text-purple-900 hover:bg-purple-50/50 border border-transparent'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          {NAV_CTAS.map((cta) => {
            const isPrimary = cta.variant === 'primary';
            return (
              <a
                key={cta.label}
                href={`/${viewMode}${cta.href}`}
                className={`group inline-flex items-center justify-center px-6 py-2.5 rounded-[4px] text-[13px] font-extrabold transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 cursor-pointer ${
                  isPrimary
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:from-[#8B5CF6] hover:to-[#F472B6] text-white shadow-lg shadow-[#7C3AED]/25 hover:shadow-xl hover:shadow-[#7C3AED]/40 hover:-translate-y-0.5 active:scale-95'
                    : 'bg-white/90 backdrop-blur-md text-gray-900 border border-gray-200 hover:border-purple-200 hover:text-purple-700 hover:bg-white hover:-translate-y-0.5 shadow-sm hover:shadow-md hover:shadow-purple-900/5 active:scale-95'
                }`}
              >
                {cta.label} 
                {isPrimary && (
                  <ArrowRight 
                    size={14} 
                    className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1" 
                  />
                )}
              </a>
            );
          })}
        </div>
        
      </div>
    </header>
  );
}