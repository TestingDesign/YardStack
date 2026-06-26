import { PlaySquare, MessageCircle, BookOpen, MessageSquare, FileText, Users, ChevronRight } from 'lucide-react';
import { WHY_N4RE_CONTENT, TODAY_PROBLEMS, N4RE_SOLUTIONS } from './data';

const IconRenderer = ({ icon, color, size = 18 }: { icon: string; color: string; size?: number }) => {
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

export default function WhyN4reDesktop() {
  return (
    <section id="why-n4re" className="bg-[#F8F7FC] font-['Outfit',sans-serif] py-16 lg:py-20">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <p className="text-center text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.24em] text-[#6B21A8] mb-3">
          {WHY_N4RE_CONTENT.subtitle}
        </p>

        <h2 className="text-center text-[1.85rem] lg:text-[2.2rem] leading-[1.25] font-extrabold text-[#1A1A2E] max-w-[900px] mx-auto mb-10 lg:mb-12">
          {WHY_N4RE_CONTENT.heading}
          <br />
          <span className="text-[#6B21A8]">{WHY_N4RE_CONTENT.headingHighlight}</span>
        </h2>

        <div className="relative max-w-[1040px] mx-auto">
          <div className="rounded-[24px] bg-white border border-[#ECEAF5] shadow-[0_10px_30px_rgba(26,26,46,0.06)] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] relative">
              <div className="p-8 lg:p-10 lg:pr-8">
                <p className="text-center lg:text-left text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#DC2626] m-0 mb-6">
                  {WHY_N4RE_CONTENT.todayHeader}
                </p>
                <ul className="list-none m-0 p-0 flex flex-col gap-4 lg:gap-5">
                  {TODAY_PROBLEMS.map((item) => (
                    <li key={item.text} className="flex items-center gap-3.5 text-[14px] lg:text-[15px] text-[#334155]">
                      <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: item.bgColor }}>
                        <IconRenderer icon={item.icon} color={item.color} />
                      </div>
                      <span className="font-medium leading-[1.45]">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-px border-l border-dashed border-[#E5E7EB] -translate-x-1/2" />
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#6B21A8] text-white items-center justify-center shadow-[0_8px_20px_rgba(107,33,168,0.35)]">
                <ChevronRight size={22} strokeWidth={2.5} />
              </div>

              <div className="border-t border-[#F0EEF7] lg:border-t-0 p-8 lg:p-10 lg:pl-10">
                <p className="text-center lg:text-left text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#16A34A] m-0 mb-6">
                  {WHY_N4RE_CONTENT.n4reHeader}
                </p>
                <div className="flex flex-col gap-6 lg:gap-8">
                  {N4RE_SOLUTIONS.map((sol) => (
                    <div key={sol.pillar} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: sol.bgColor }}>
                        <IconRenderer icon={sol.icon} color={sol.color} size={20} />
                      </div>
                      <div className="pt-0.5">
                        <p className="text-[12px] lg:text-[13px] font-extrabold uppercase tracking-[0.14em] m-0 mb-1" style={{ color: sol.color }}>
                          {sol.pillar}
                        </p>
                        <p className="text-[14px] lg:text-[15px] leading-[1.55] text-[#475569] m-0 font-medium max-w-[360px]">
                          {sol.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 lg:mt-10 text-center">
          <a href="#join" className="inline-block text-[12px] lg:text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#6B21A8] hover:text-[#581C87] transition-colors">
            {WHY_N4RE_CONTENT.footerText}
          </a>
        </div>
      </div>
    </section>
  );
}