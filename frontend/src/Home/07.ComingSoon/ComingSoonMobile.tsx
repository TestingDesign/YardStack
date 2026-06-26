import { Building2, GraduationCap, MonitorPlay, BarChart2, ArrowRight } from 'lucide-react';
import { COMING_SOON_ITEMS } from './data';

const ItemIcon = ({ icon, color, size = 24 }: { icon: string; color: string; size?: number }) => {
  const props = { size, color, strokeWidth: 1.5 };
  switch (icon) {
    case 'building': return <Building2 {...props} />;
    case 'graduation-cap': return <GraduationCap {...props} />;
    case 'monitor-play': return <MonitorPlay {...props} />;
    case 'bar-chart-2': return <BarChart2 {...props} />;
    default: return null;
  }
};

export default function ComingSoonMobile() {
  return (
    <section id="coming-soon" className="bg-[#F9FAFB] font-['Outfit',sans-serif] py-10">
      <div className="px-4">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#6B21A8]/60 mb-6">
          WHAT&apos;S COMING NEXT
        </p>

        <div className="flex flex-col gap-3 mb-6">
          {COMING_SOON_ITEMS.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: item.bgColor }}>
                <ItemIcon icon={item.icon} color={item.color} />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-[0.88rem] font-bold text-[#1A1A2E] m-0 mb-0.5">{item.name}</h3>
                <p className="text-[0.75rem] text-[#6B7280] leading-relaxed m-0 line-clamp-2">{item.description}</p>
              </div>
              <div className="absolute top-0 right-0 bg-[#FEF3C7] text-[#B45309] text-[7px] font-bold uppercase tracking-wider px-2 py-1 rounded-bl-xl">
                Coming Soon
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-[#6B21A8] via-[#7C3AED] to-[#D946EF] p-6 text-center shadow-[0_8px_24px_rgba(107,33,168,0.25)]">
          <h3 className="text-[1.1rem] leading-[1.3] font-extrabold text-white m-0 mb-2">
            Join Hyderabad&apos;s Real Estate Ecosystem
          </h3>
          <p className="text-[0.8rem] text-white/80 leading-relaxed mb-4">
            Learn from experts. Connect with professionals. Discover opportunities. Grow with the ecosystem.
          </p>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#6B21A8] text-[13px] font-bold border-none cursor-pointer shadow-sm transition-all active:scale-[0.97]">
            Join N4RE Today
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
