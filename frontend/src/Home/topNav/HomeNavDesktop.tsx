import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { NAV_CTAS } from './data';
import Logo from '../01.Hero/Logo.png';

interface HomeNavDesktopProps {
  viewMode: 'desktop' | 'mobile';
}

export default function HomeNavDesktop({ viewMode }: HomeNavDesktopProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.04)] py-4' 
          : 'bg-transparent py-6'
      }`}
      style={{
        paddingLeft: scrolled ? '16px' : 'max(1rem, calc(50vw - 608px))',
        paddingRight: scrolled ? '16px' : 'max(1rem, calc(50vw - 608px))'
      }}
    >
      <div className="flex items-center justify-between w-full h-full mx-auto">
        
        <a
          href="#hero"
          className={`relative flex shrink-0 items-center outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 rounded-[4px] transition-all duration-700 ease-out active:scale-95 h-[40px] ${
            scrolled ? 'w-[110px]' : 'w-[160px] translate-x-0'
          }`}
        >
          <img
            src={Logo}
            alt="N4RE Logo"
            className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-auto object-contain drop-shadow-sm transition-all duration-700"
            draggable={false}
          />
        </a>

        <div className="flex-1 min-w-[80px] lg:min-w-[120px]" aria-hidden="true" />

        <div className="flex items-center justify-end gap-3 shrink-0">
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
    </motion.header>
  );
}