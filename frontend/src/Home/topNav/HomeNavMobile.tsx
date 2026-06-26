import { useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, NAV_CTAS } from './data';


interface HomeNavMobileProps {
  viewMode: 'desktop' | 'mobile';
}

export default function HomeNavMobile({ viewMode }: HomeNavMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  const handleNavClick = useCallback((key: string, href: string) => {
    setActiveLink(key);
    setIsOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-purple-900/5 shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between h-[60px] px-4">
          <a
            href="#hero"
            onClick={() => { setActiveLink('home'); setIsOpen(false); }}
            className="flex shrink-0 items-center outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-md transition-transform active:scale-[0.98]"
          >
            <span className="text-[24px] font-extrabold text-[var(--color-text-primary)] leading-none tracking-tight">
              N<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-fuchsia-500">4</span>RE
            </span>
          </a>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-[4px] text-[var(--color-text-primary)] hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-[100]" onClick={() => setIsOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="absolute top-0 right-0 w-[280px] h-full bg-white/95 backdrop-blur-xl shadow-[-8px_0_32px_rgba(0,0,0,0.1)] flex flex-col animate-[slideInRight_0.3s_ease-out] border-l border-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-purple-900/5 h-[60px]">
              <span className="text-[24px] font-extrabold text-[var(--color-text-primary)] leading-none tracking-tight">
                N<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-fuchsia-500">4</span>RE
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-[4px] text-[var(--color-text-secondary)] hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-3 px-3">
              <ul className="list-none m-0 p-0 flex flex-col gap-0.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.key}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(link.key, link.href)}
                      className={`w-full text-left px-4 py-3 rounded-[4px] text-[14px] font-semibold transition-all duration-200 border-none cursor-pointer bg-transparent ${
                        activeLink === link.key
                          ? 'text-[#6B21A8] bg-[#6B21A8]/8'
                          : 'text-[#374151] hover:text-[#6B21A8] hover:bg-gray-50'
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t border-gray-100 flex flex-col gap-2.5">
              {NAV_CTAS.map((cta) => (
                <a
                  key={cta.label}
                  href={`/${viewMode}${cta.href}`}
                  className={`flex items-center justify-center px-5 py-2.5 rounded-[4px] text-[14px] font-bold transition-all duration-300 no-underline ${
                    cta.variant === 'primary'
                      ? 'bg-[#6B21A8] text-white hover:bg-[#5B1D99] shadow-[0_2px_12px_rgba(107,33,168,0.25)]'
                      : 'bg-transparent text-[#374151] border border-gray-200 hover:border-[#6B21A8]/30 hover:text-[#6B21A8]'
                  }`}
                >
                  {cta.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}