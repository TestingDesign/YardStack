import { useState, useCallback } from 'react';
import { NAV_LINKS, NAV_CTAS } from './data';

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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 font-['Outfit',sans-serif]">
      <div className="flex items-center h-[68px] px-6 lg:px-10 max-w-[1400px] mx-auto w-full">
        <a href="#hero" className="shrink-0 flex flex-col mr-8" onClick={() => setActiveLink('home')}>
          <span className="text-[1.6rem] font-extrabold text-[#1A1A2E] leading-none tracking-tight">
            N<span className="text-[#6B21A8]">4</span>RE
          </span>
          <span className="text-[7px] font-semibold text-[#6B7280] tracking-[0.08em] mt-0.5">
            Content • Connections • Conversations
          </span>
        </a>

        <nav aria-label="Main Navigation" className="flex-1 flex items-center justify-center">
          <ul className="flex items-center gap-1.5 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link.key, link.href)}
                  className={`px-4 py-2 text-[13.5px] font-semibold transition-all duration-200 border-none cursor-pointer bg-transparent ${
                    activeLink === link.key
                      ? 'text-[#6B21A8]'
                      : 'text-[#374151] hover:text-[#6B21A8]'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          {NAV_CTAS.map((cta) => (
            <a
              key={cta.label}
              href={`/${viewMode}${cta.href}`}
              className={`px-5 py-2 rounded-lg text-[13.5px] font-bold transition-all duration-300 no-underline ${
                cta.variant === 'primary'
                  ? 'bg-[#6B21A8] text-white hover:bg-[#5B1D99] shadow-[0_2px_12px_rgba(107,33,168,0.25)] hover:shadow-[0_4px_16px_rgba(107,33,168,0.35)] hover:-translate-y-0.5'
                  : 'bg-transparent text-[#374151] border border-gray-200 hover:border-[#6B21A8]/30 hover:text-[#6B21A8]'
              }`}
            >
              {cta.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}