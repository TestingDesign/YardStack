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
    <header className="absolute top-0 w-full z-50 pt-4">
      <div className="flex items-center justify-between h-[72px] px-4 lg:px-8 max-w-[1400px] mx-auto w-full">
        <a
          href="#hero"
          onClick={() => setActiveLink('home')}
          className="flex shrink-0 items-center outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-md transition-transform active:scale-[0.98]"
        >
          <img src={Logo} alt="Logo" className="h-20 w-auto object-contain" draggable={false} />
        </a>

        <nav aria-label="Main Navigation" className="hidden md:flex items-center justify-center flex-1 mx-8">
          <ul className="flex items-center gap-1 m-0 p-1 bg-white/90 backdrop-blur-md rounded-[4px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-white">
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.key;
              return (
                <li key={link.key}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.key, link.href)}
                    className={`px-5 py-2 text-[13px] font-extrabold rounded-[4px] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer ${
                      isActive
                        ? 'bg-purple-50 text-[#422082] shadow-sm'
                        : 'text-[#79628c] hover:text-[#422082] hover:bg-purple-50/50 bg-transparent'
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
                className={`inline-flex items-center justify-center px-6 py-2.5 rounded-[4px] text-[13px] font-extrabold transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] cursor-pointer ${
                  isPrimary
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white shadow-[0_4px_16px_rgba(124,58,237,0.25)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 active:scale-[0.98]'
                    : 'bg-white/90 backdrop-blur-md text-[#422082] border border-gray-100 hover:border-purple-200 hover:text-[#7C3AED] hover:bg-white hover:-translate-y-0.5 shadow-sm active:scale-[0.98]'
                }`}
              >
                {cta.label} {isPrimary && <ArrowRight size={14} className="ml-1" />}
              </a>
            );
          })}
        </div>
        
      </div>
    </header>
  );
}