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
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-purple-900/5 shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between h-[72px] px-4 lg:px-8 max-w-[1400px] mx-auto w-full">
        <a
          href="#hero"
          onClick={() => setActiveLink('home')}
          className="flex shrink-0 items-center outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-md transition-transform active:scale-[0.98]"
        >
          <span className="text-[28px] font-extrabold text-slate-900 leading-none tracking-tight">
            N<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-fuchsia-500">4</span>RE
          </span>
        </a>

        <nav aria-label="Main Navigation" className="hidden md:flex items-center justify-center flex-1 mx-8">
          <ul className="flex items-center gap-1.5 m-0 p-1.5 bg-slate-50/80 rounded-2xl border border-slate-100 shadow-inner">
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.key;
              return (
                <li key={link.key}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.key, link.href)}
                    className={`px-5 py-2 text-[13px] font-bold rounded-xl transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                      isActive
                        ? 'bg-white text-purple-700 shadow-sm border border-slate-200/60 scale-100'
                        : 'text-slate-500 hover:text-purple-700 hover:bg-purple-50/50 border border-transparent scale-100 hover:scale-[1.02]'
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
                className={`inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-[13px] font-extrabold transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                  isPrimary
                    ? 'bg-gradient-to-r from-purple-800 to-purple-600 text-white shadow-lg shadow-purple-900/20 hover:shadow-xl hover:shadow-purple-900/30 hover:-translate-y-0.5 active:scale-[0.98]'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-purple-300 hover:text-purple-800 hover:bg-purple-50 hover:-translate-y-0.5 hover:shadow-md hover:shadow-purple-900/5 active:scale-[0.98]'
                }`}
              >
                {cta.label}
              </a>
            );
          })}
        </div>
        
      </div>
    </header>
  );
}