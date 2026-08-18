import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FINAL_CTA_CONTENT } from './data';

export default function FinalCtaMobile() {
  return (
    <section id="final-cta" className="relative overflow-hidden bg-[linear-gradient(175deg,#2a1550_0%,#1A1A2E_30%,#16213E_60%,#1A1A2E_80%,#16213E_100%)] selection:bg-fuchsia-500/30 selection:text-white pt-10 pb-16">
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-800 rounded-full blur-[80px] opacity-40 pointer-events-none" 
        aria-hidden="true"
      />

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="px-5 text-center relative z-10 flex flex-col items-center"
      >
        <h2 className="text-[28px] leading-[1.2] font-extrabold text-white tracking-tight mb-4 drop-shadow-sm">
          {FINAL_CTA_CONTENT.heading}
        </h2>
        <p className="text-[15px] text-purple-100/80 leading-relaxed mb-8 max-w-sm font-medium">
          {FINAL_CTA_CONTENT.description}
        </p>
        <div className="flex flex-col items-center gap-3 w-full">
          <button className="group relative w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[4px] bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:from-[#8B5CF6] hover:to-[#F472B6] text-white text-[15px] font-extrabold shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-all duration-300 ease-out active:scale-95 outline-none">
            {FINAL_CTA_CONTENT.primaryCta}
            <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button className="w-full px-6 py-3.5 rounded-[4px] bg-white/5 backdrop-blur-xl text-white text-[15px] font-bold border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 ease-out active:scale-95 outline-none">
            {FINAL_CTA_CONTENT.secondaryCta}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
