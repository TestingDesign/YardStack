import { PlaySquare, MessageCircle, BookOpen, MessageSquare, FileText, Users, ChevronDown } from 'lucide-react';
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
    <section id="why-n4re" className="bg-[#F8F7FC] py-8">
      <div className="px-4">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#6B21A8] mb-2">
          {WHY_N4RE_CONTENT.subtitle}
        </p>

        <h2 className="text-center text-[1.35rem] leading-[1.25] font-extrabold text-[#1A1A2E] mb-7">
          {WHY_N4RE_CONTENT.heading}
          <br />
          <span className="text-[#6B21A8]">{WHY_N4RE_CONTENT.headingHighlight}</span>
        </h2>

        <div className="rounded-[8px] bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="p-6 sm:p-8">
            <p className="text-center text-[10px] font-extrabold uppercase tracking-widest text-red-600 mb-6">
              {WHY_N4RE_CONTENT.todayHeader}
            </p>
            <ul className="flex flex-col gap-4">
              {TODAY_PROBLEMS.map((item) => (
                <li key={item.text} className="flex items-center gap-4 text-[13px] text-slate-700">
                  <div 
                    className="w-9 h-9 rounded-[2px] flex items-center justify-center shrink-0 shadow-sm" 
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <IconRenderer icon={item.icon} color={item.color} size={16} />
                  </div>
                  <span className="font-medium leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-12 flex items-center justify-center bg-gray-50/50">
            <div className="absolute left-6 right-6 top-1/2 h-px border-t border-dashed border-gray-200 -translate-y-1/2" />
            <div className="relative z-10 w-10 h-10 rounded-[4px] bg-[#6B21A8] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(107,33,168,0.38)]">
              <ChevronDown size={20} strokeWidth={2.5} />
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-slate-50/30">
            <p className="text-center text-[10px] font-extrabold uppercase tracking-widest text-green-600 mb-6">
              {WHY_N4RE_CONTENT.n4reHeader}
            </p>
            <div className="flex flex-col gap-6">
              {N4RE_SOLUTIONS.map((sol) => (
                <div key={sol.pillar} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-[2px] flex items-center justify-center shrink-0 shadow-sm" 
                      style={{ backgroundColor: sol.bgColor }}
                    >
                      <IconRenderer icon={sol.icon} color={sol.color} size={17} />
                    </div>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider m-0" style={{ color: sol.color }}>
                      {sol.pillar}
                    </p>
                  </div>
                  <p className="text-[0.8rem] text-[#475569] leading-[1.55] m-0 font-medium pl-[52px]">
                    {sol.description}
                  </p>
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