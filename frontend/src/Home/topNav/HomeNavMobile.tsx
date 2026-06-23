import { useState, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, NAV_CTAS } from './data'
import LogoPng from '../../components/commonfiles/sidebar/Logo.png'

interface HomeNavMobileProps {
  viewMode: 'desktop' | 'mobile'
}

export default function HomeNavMobile({ viewMode }: HomeNavMobileProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('home')

  const handleNavClick = useCallback((key: string, href: string) => {
    setActiveLink(key)
    setIsOpen(false)
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 font-['Outfit',sans-serif]">
        <div className="flex items-center justify-between h-14 px-4">
          <a href="#hero" className="shrink-0 flex items-center">
            <img src={LogoPng} alt="N4RE" className="h-8 w-auto object-contain" />
          </a>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[#374151] hover:bg-gray-100 transition-colors border-none bg-transparent cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] font-['Outfit',sans-serif]" onClick={() => setIsOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="absolute top-0 right-0 w-[280px] h-full bg-white shadow-[-8px_0_32px_rgba(0,0,0,0.1)] flex flex-col animate-[slideInRight_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <img src={LogoPng} alt="N4RE" className="h-8 w-auto object-contain" />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors border-none bg-transparent cursor-pointer"
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
                      className={`w-full text-left px-4 py-3 rounded-lg text-[14px] font-semibold transition-all duration-200 border-none cursor-pointer bg-transparent ${
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
                  className={`flex items-center justify-center px-5 py-2.5 rounded-lg text-[14px] font-bold transition-all duration-300 no-underline ${
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
  )
}
