import { ArrowRight } from 'lucide-react';
import { FINAL_CTA_CONTENT } from './data';

export default function FinalCtaMobile() {
  return (
    <section id="final-cta" className="relative overflow-hidden bg-[linear-gradient(175deg,#2a1550_0%,#1A1A2E_30%,#16213E_60%,#1A1A2E_80%,#16213E_100%)] selection:bg-fuchsia-500/30 selection:text-white py-8">
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-800 rounded-full blur-[80px] opacity-40 pointer-events-none" 
        aria-hidden="true"
      />

      <div className="px-4 text-center relative z-10 ys-fade-in-up">
        <h2 className="text-[1.6rem] leading-tight font-extrabold text-white mb-3">
          {FINAL_CTA_CONTENT.heading}
        </h2>
        <p className="text-[0.9rem] text-purple-100/80 leading-relaxed mb-8">
          {FINAL_CTA_CONTENT.description}
        </p>
        <div className="flex flex-col items-center gap-3">
          <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[4px] bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-[14px] font-extrabold shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all active:scale-[0.97]">
            {FINAL_CTA_CONTENT.primaryCta}
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
          <button className="w-full px-6 py-3.5 rounded-[4px] bg-white/5 backdrop-blur-xl text-white text-[14px] font-bold border border-white/10 transition-all active:scale-[0.97]">
            {FINAL_CTA_CONTENT.secondaryCta}
          </button>
        </div>
      </div>
    </section>
  );
}
