import { PlaySquare, MessageCircle, BookOpen, MessageSquare, FileText, Users, ChevronRight } from 'lucide-react';
import { WHY_N4RE_CONTENT, TODAY_PROBLEMS, N4RE_SOLUTIONS } from './data';

const IconRenderer = ({ icon, color }: { icon: string; color: string }) => {
  const props = { size: 20, color };
  switch (icon) {
    case 'youtube': return <PlaySquare {...props} />;
    case 'whatsapp': return <MessageCircle {...props} />;
    case 'users': return <Users {...props} />;
    case 'book': return <BookOpen {...props} />;
    case 'message': return <MessageSquare {...props} />;
    case 'file-text': return <FileText {...props} />;
    default: return null;
  }
};

export default function WhyN4reDesktop() {
  return (
    <section id="why-n4re" className="bg-[#F8FAFC] font-['Outfit',sans-serif] py-16 lg:py-20 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative z-10">
        <p className="text-center text-[12px] font-bold uppercase tracking-[0.2em] text-[#6B21A8] mb-4">
          {WHY_N4RE_CONTENT.subtitle}
        </p>

        <h2 className="text-center text-[1.8rem] lg:text-[2.2rem] leading-[1.3] font-bold text-[#111827] max-w-4xl mx-auto mb-12">
          {WHY_N4RE_CONTENT.heading}
          <br />
          <span className="text-[#6B21A8]">
            {WHY_N4RE_CONTENT.headingHighlight}
          </span>
        </h2>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 rounded-2xl bg-white shadow-sm border border-gray-100">
            <div className="p-10 lg:pl-12">
              <div className="flex items-center gap-2 mb-8 justify-center lg:justify-start">
                <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#DC2626] m-0">
                  {WHY_N4RE_CONTENT.todayHeader}
                </p>
              </div>
              <ul className="list-none m-0 p-0 flex flex-col gap-6">
                {TODAY_PROBLEMS.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[15px] text-[#374151]">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: item.bgColor }}
                    >
                      <IconRenderer icon={item.icon} color={item.color} />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-px border-l border-dashed border-gray-200 -translate-x-1/2" />

            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#6B21A8] text-white items-center justify-center">
              <ChevronRight size={22} strokeWidth={2.5} />
            </div>

            <div className="p-10 lg:pl-16 border-t lg:border-t-0 border-gray-100">
              <div className="flex items-center gap-2 mb-8 justify-center lg:justify-start">
                <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#16A34A] m-0">
                  {WHY_N4RE_CONTENT.n4reHeader}
                </p>
              </div>
              <div className="flex flex-col gap-10">
                {N4RE_SOLUTIONS.map((sol, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: sol.bgColor }}
                    >
                      <IconRenderer icon={sol.icon} color={sol.color} />
                    </div>
                    <div className="pt-1">
                      <p className="text-[14px] font-bold uppercase tracking-wide m-0 mb-1" style={{ color: sol.color }}>
                        {sol.pillar}
                      </p>
                      <p className="text-[15px] text-[#4B5563] leading-relaxed m-0 font-medium pr-4">
                        {sol.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a href="#join" className="inline-block text-[13px] font-bold uppercase tracking-[0.1em] text-[#6B21A8] hover:text-[#581C87] transition-colors">
            {WHY_N4RE_CONTENT.footerText}
          </a>
        </div>
      </div>
    </section>
  );
}