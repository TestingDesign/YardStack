import { ArrowRight } from 'lucide-react';
import { FINAL_CTA_CONTENT } from './data';

export default function FinalCtaDesktop() {
  return (
    <section 
      id="final-cta" 
      className="relative py-16 lg:py-24 overflow-hidden bg-[linear-gradient(175deg,#2a1550_0%,#1A1A2E_30%,#16213E_60%,#1A1A2E_80%,#16213E_100%)] selection:bg-fuchsia-500/30 selection:text-white"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-800 rounded-full blur-[120px] opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <h2 className="text-4xl lg:text-[52px] leading-[1.15] font-extrabold text-white tracking-tight mb-6 drop-shadow-sm">
          {FINAL_CTA_CONTENT.heading}
        </h2>
        
        <p className="text-[17px] lg:text-[19px] text-purple-100/80 leading-relaxed mb-12 max-w-2xl font-medium">
          {FINAL_CTA_CONTENT.description}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
          <button className="group relative w-full sm:w-auto flex items-center justify-center gap-2 px-9 py-4 rounded-2xl bg-white text-purple-950 text-[15px] font-extrabold shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] outline-none focus-visible:ring-4 focus-visible:ring-white/30">
            {FINAL_CTA_CONTENT.primaryCta}
            <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          
          <button className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-white/5 backdrop-blur-xl text-white text-[15px] font-bold border border-white/10 hover:bg-white/15 hover:border-white/30 hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] outline-none focus-visible:ring-4 focus-visible:ring-white/20">
            {FINAL_CTA_CONTENT.secondaryCta}
          </button>
        </div>
      </div>
    </section>
  );
}