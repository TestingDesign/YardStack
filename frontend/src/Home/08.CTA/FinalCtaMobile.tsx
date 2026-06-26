import { FINAL_CTA_CONTENT } from './data';

export default function FinalCtaMobile() {
  return (
    <section id="final-cta" className="font-['Outfit',sans-serif] bg-gradient-to-br from-[#6B21A8] via-[#7C3AED] to-[#D946EF] py-10">
      <div className="px-4 text-center">
        <h2 className="text-[1.35rem] leading-tight font-extrabold text-white mb-3">
          {FINAL_CTA_CONTENT.heading}
        </h2>
        <p className="text-[0.82rem] text-white/80 leading-relaxed mb-6">
          {FINAL_CTA_CONTENT.description}
        </p>
        <div className="flex flex-col items-center gap-2.5">
          <button className="w-full max-w-65 px-6 py-2.5 rounded-lg bg-white text-[#6B21A8] text-[13px] font-bold border-none cursor-pointer shadow-sm transition-all active:scale-[0.97]">
            {FINAL_CTA_CONTENT.primaryCta}
          </button>
          <button className="w-full max-w-65 px-5 py-2.5 rounded-lg bg-transparent text-white text-[13px] font-bold border border-white/30 cursor-pointer transition-all">
            {FINAL_CTA_CONTENT.secondaryCta}
          </button>
        </div>
      </div>
    </section>
  );
}
