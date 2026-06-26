import { Building2, GraduationCap, MonitorPlay, BarChart2, ArrowRight } from 'lucide-react';
import { COMING_SOON_ITEMS } from './data';

const ItemIcon = ({ icon, color, size = 28 }: { icon: string; color: string; size?: number }) => {
  const props = { size, color, strokeWidth: 1.5 };
  switch (icon) {
    case 'building': return <Building2 {...props} />;
    case 'graduation-cap': return <GraduationCap {...props} />;
    case 'monitor-play': return <MonitorPlay {...props} />;
    case 'bar-chart-2': return <BarChart2 {...props} />;
    default: return null;
  }
};

export default function ComingSoonDesktop() {
  return (
    <section id="coming-soon" className="bg-[#F9FAFB] font-['Outfit',sans-serif] py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-center">
          {/* Left: Coming Soon Cards */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6B21A8]/60 mb-3">
              WHAT&apos;S COMING NEXT
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {COMING_SOON_ITEMS.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col gap-3 p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-[#FEF3C7] text-[#B45309] text-[8px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-bl-xl">
                    Coming Soon
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <ItemIcon icon={item.icon} color={item.color} />
                  </div>
                  <div>
                    <h3 className="text-[0.9rem] font-bold text-[#1A1A2E] m-0 mb-1">{item.name}</h3>
                    <p className="text-[0.78rem] text-[#6B7280] leading-relaxed m-0">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: CTA Box */}
          <div className="rounded-2xl bg-gradient-to-br from-[#6B21A8] via-[#7C3AED] to-[#D946EF] p-8 flex flex-col gap-4 shadow-[0_8px_32px_rgba(107,33,168,0.3)]">
            <h3 className="text-[1.35rem] leading-[1.3] font-extrabold text-white m-0">
              Join Hyderabad&apos;s Real Estate Ecosystem
            </h3>
            <p className="text-[0.85rem] text-white/80 leading-relaxed m-0">
              Learn from experts. Connect with professionals. Discover opportunities. Grow with the ecosystem.
            </p>
            <button className="inline-flex items-center gap-2 self-start mt-2 px-6 py-3 rounded-lg bg-white text-[#6B21A8] text-[13px] font-bold border-none cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.97]">
              Join N4RE Today
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
