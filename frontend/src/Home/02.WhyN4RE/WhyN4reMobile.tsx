import { PlaySquare, MessageCircle, BookOpen, MessageSquare, FileText, Users, ChevronRight } from 'lucide-react';
import { WHY_N4RE_CONTENT, TODAY_PROBLEMS, N4RE_SOLUTIONS } from './data';

const IconRenderer = ({ icon, color, size = 16 }: { icon: string; color: string; size?: number }) => {
  const props = { size, color, strokeWidth: 2 };
  switch (icon) {
    case 'youtube':
      return <PlaySquare {...props} />;
    case 'whatsapp':
      return <MessageCircle {...props} />;
    case 'users':
      return <Users {...props} />;
    case 'book':
      return <BookOpen {...props} />;
    case 'message':
      return <MessageSquare {...props} />;
    case 'file-text':
      return <FileText {...props} />;
    default:
      return null;
  }
};

export default function WhyN4reMobile() {
  return (
    <section id="why-n4re" className="bg-[#F8F7FC] font-['Outfit',sans-serif] py-10">
      <div className="px-4">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#6B21A8] mb-2">
          {WHY_N4RE_CONTENT.subtitle}
        </p>

        <h2 className="text-center text-[1.35rem] leading-[1.25] font-extrabold text-[#1A1A2E] mb-7">
          {WHY_N4RE_CONTENT.heading}
          <br />
          <span className="text-[#6B21A8]">{WHY_N4RE_CONTENT.headingHighlight}</span>
        </h2>

        <div className="rounded-[20px] bg-white border border-[#ECEAF5] shadow-[0_8px_24px_rgba(26,26,46,0.06)] overflow-hidden">
          <div className="p-5">
            <p className="text-center text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#DC2626] m-0 mb-4">
              {WHY_N4RE_CONTENT.todayHeader}
            </p>
            <ul className="list-none m-0 p-0 flex flex-col gap-3.5">
              {TODAY_PROBLEMS.map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-[0.82rem] text-[#334155]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: item.bgColor }}>
                    <IconRenderer icon={item.icon} color={item.color} />
                  </div>
                  <span className="font-medium leading-[1.45]">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative border-t border-[#F0EEF7] py-3">
            <div className="absolute left-1/2 -top-4 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-[#6B21A8] text-white shadow-[0_6px_16px_rgba(107,33,168,0.3)] flex items-center justify-center">
              <ChevronRight size={18} strokeWidth={2.5} className="rotate-90" />
            </div>
          </div>

          <div className="p-5 pt-3">
            <p className="text-center text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#16A34A] m-0 mb-4">
              {WHY_N4RE_CONTENT.n4reHeader}
            </p>
            <div className="flex flex-col gap-4">
              {N4RE_SOLUTIONS.map((sol) => (
                <div key={sol.pillar} className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: sol.bgColor }}>
                    <IconRenderer icon={sol.icon} color={sol.color} size={17} />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider m-0 mb-0.5" style={{ color: sol.color }}>
                      {sol.pillar}
                    </p>
                    <p className="text-[0.8rem] text-[#475569] leading-[1.55] m-0 font-medium">
                      {sol.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="#join" className="inline-block text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#6B21A8]">
            {WHY_N4RE_CONTENT.footerText}
          </a>
        </div>
      </div>
    </section>
  );
}