import { ArrowRight } from 'lucide-react';
import { NAV_CTAS } from './data';
import Logo from '../01.Hero/Logo.png';

interface HomeNavDesktopProps {
  viewMode: 'desktop' | 'mobile';
}

export default function HomeNavDesktop({ viewMode }: HomeNavDesktopProps) {
  return (
    <header className="absolute top-0 left-0 w-full z-50 animate-in fade-in slide-in-from-top-4 duration-700 ease-out">
      <div className="flex items-center justify-between w-full px-16 lg:px-16 -py-8">
        
        <a
          href="#hero"
          className="flex shrink-0 items-center outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 rounded-[4px] transition-transform active:scale-95"
        >
          <img 
            src={Logo} 
            alt="N4RE Logo" 
            className="w-[100px] lg:w-[100px] h-auto object-contain drop-shadow-sm" 
            draggable={false} 
          />
        </a>

        <div className="flex items-center justify-end gap-3 flex-1 ml-auto">
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