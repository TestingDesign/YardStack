import { FINAL_CTA_CONTENT } from './data';

export default function FinalCtaDesktop() {
  return (
    <section id="final-cta" className="font-['Outfit',sans-serif] bg-gradient-to-r from-[#6B21A8] via-[#7C3AED] to-[#D946EF] py-16">
      <div className="max-w-[700px] mx-auto px-6 text-center">
        <h2 className="text-[1.8rem] lg:text-[2.2rem] leading-[1.2] font-extrabold text-white mb-4">
          {FINAL_CTA_CONTENT.heading}
        </h2>
        <p className="text-[0.95rem] text-white/80 leading-relaxed mb-8 max-w-lg mx-auto">
          {FINAL_CTA_CONTENT.description}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button className="px-7 py-3 rounded-lg bg-white text-[#6B21A8] text-[14px] font-bold border-none cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.97]">
            {FINAL_CTA_CONTENT.primaryCta}
          </button>
          <button className="px-6 py-3 rounded-lg bg-transparent text-white text-[14px] font-bold border border-white/30 cursor-pointer hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5 transition-all duration-300">
            {FINAL_CTA_CONTENT.secondaryCta}
          </button>
        </div>
      </div>
    </section>
  );
}