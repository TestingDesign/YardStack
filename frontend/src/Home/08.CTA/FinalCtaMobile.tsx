import { FINAL_CTA_CONTENT } from './data';

export default function FinalCtaMobile() {
  return (
    <section id="final-cta" className="bg-[linear-gradient(175deg,#2a1550_0%,#1A1A2E_30%,#16213E_60%,#1A1A2E_80%,#16213E_100%)] py-8">
      <div className="px-4 text-center">
        <h2 className="text-[1.35rem] leading-tight font-extrabold text-white mb-3">
          {FINAL_CTA_CONTENT.heading}
        </h2>
        <p className="text-[0.82rem] text-white/80 leading-relaxed mb-6">
          {FINAL_CTA_CONTENT.description}
        </p>
        <div className="flex flex-col items-center gap-2.5">
          <button className="w-full max-w-65 px-6 py-2.5 rounded-[4px] bg-white text-[#6B21A8] text-[13px] font-bold border-none cursor-pointer shadow-sm transition-all active:scale-[0.97]">
            {FINAL_CTA_CONTENT.primaryCta}
          </button>
          <button className="w-full max-w-65 px-5 py-2.5 rounded-[4px] bg-transparent text-white text-[13px] font-bold border border-white/30 cursor-pointer transition-all">
            {FINAL_CTA_CONTENT.secondaryCta}
          </button>
        </div>
      </div>
    </section>
  );
}
