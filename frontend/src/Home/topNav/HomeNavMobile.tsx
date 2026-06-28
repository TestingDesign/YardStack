import { NAV_CTAS } from './data';
import Logo from '../01.Hero/Logo.png';
import { motion } from 'framer-motion';


interface HomeNavMobileProps {
  viewMode: 'desktop' | 'mobile';
}

export default function HomeNavMobile({ viewMode }: HomeNavMobileProps) {
  return (
    <>
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-purple-900/5 shadow-[0_4px_30px_rgba(0,0,0,0.04)]"
      >
        <div className="flex items-center justify-between min-h-[80px] py-2 px-4">
          <a
            href="#hero"
            className="relative flex shrink-0 items-center outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-md transition-transform active:scale-[0.98] w-[110px] h-[36px]"
          >
            <img src={Logo} alt="Logo" className="absolute top-1/2 left-0 -translate-y-1/2 w-[110px] h-auto object-contain" draggable={false} />
          </a>

          <div className="flex items-center gap-2 shrink-0">
            {NAV_CTAS.map((cta) => {
              const isPrimary = cta.variant === 'primary';
              return (
                <a
                  key={cta.label}
                  href={`/${viewMode}${cta.href}`}
                  className={`flex items-center justify-center px-3 py-1.5 rounded-[4px] text-[11px] font-extrabold transition-all duration-300 no-underline cursor-pointer ${
                    isPrimary
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white shadow-[0_4px_16px_rgba(124,58,237,0.25)] hover:-translate-y-0.5'
                      : 'bg-white text-[#422082] border border-gray-200 hover:border-purple-200 hover:text-[#7C3AED] shadow-sm'
                  }`}
                >
                  {cta.label}
                </a>
              );
            })}
          </div>
        </div>
      </motion.header>
    </>
  );
}