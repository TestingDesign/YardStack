import { ArrowRight } from 'lucide-react';
import { FINAL_CTA_CONTENT } from './data';

export default function FinalCtaDesktop() {
  return (
    <section 
      id="final-cta" 
      className="relative overflow-hidden bg-[linear-gradient(175deg,#2a1550_0%,#1A1A2E_30%,#16213E_60%,#1A1A2E_80%,#16213E_100%)] selection:bg-fuchsia-500/30 selection:text-white py-8 lg:py-12"
    >
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-800 rounded-full blur-[120px] opacity-40 pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center animate-in zoom-in-95 fade-in slide-in-from-bottom-8 duration-700 ease-out">
        <h2 className="text-4xl lg:text-[52px] leading-[1.2] font-extrabold text-white tracking-tight mb-4 drop-shadow-sm">
          {FINAL_CTA_CONTENT.heading}
        </h2>
        
        <p className="text-lg lg:text-[19px] text-purple-100/80 leading-relaxed mb-8 max-w-2xl font-medium">
          {FINAL_CTA_CONTENT.description}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button className="group relative w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-[4px] bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:from-[#8B5CF6] hover:to-[#F472B6] text-white text-[15px] font-extrabold shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 transition-all duration-300 ease-out active:scale-95 outline-none focus-visible:ring-4 focus-visible:ring-white/30">
            {FINAL_CTA_CONTENT.primaryCta}
            <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-[4px] bg-white/5 backdrop-blur-xl text-white text-[15px] font-bold border border-white/10 hover:bg-white/15 hover:border-white/30 hover:-translate-y-0.5 transition-all duration-300 ease-out active:scale-95 outline-none focus-visible:ring-4 focus-visible:ring-white/20">
            {FINAL_CTA_CONTENT.secondaryCta}
          </button>
        </div>
      </div>
    </section>
  );
}