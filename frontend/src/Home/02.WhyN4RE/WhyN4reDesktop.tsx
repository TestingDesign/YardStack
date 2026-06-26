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
    <section id="why-n4re" className="bg-slate-50 font-sans py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        <div className="flex flex-col items-center mb-12 lg:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-800 mb-3">
            {WHY_N4RE_CONTENT.subtitle}
          </p>
          <h2 className="text-center text-3xl lg:text-4xl leading-tight font-extrabold text-slate-900 max-w-3xl">
            {WHY_N4RE_CONTENT.heading}
            <br />
            <span className="text-purple-800">{WHY_N4RE_CONTENT.headingHighlight}</span>
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="rounded-[8px] bg-white border border-gray-100 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 relative">
              
              <div className="p-8 lg:p-12 lg:pr-14">
                <p className="text-center lg:text-left text-xs font-extrabold uppercase tracking-widest text-red-600 mb-8">
                  {WHY_N4RE_CONTENT.todayHeader}
                </p>
                <ul className="flex flex-col gap-6">
                  {TODAY_PROBLEMS.map((item) => (
                    <li key={item.text} className="flex items-center gap-4 text-sm lg:text-base text-slate-700">
                      <div 
                        className="w-10 h-10 rounded-[4px] flex items-center justify-center shrink-0 shadow-sm" 
                        style={{ backgroundColor: item.bgColor }}
                      >
                        <IconRenderer icon={item.icon} color={item.color} />
                      </div>
                      <span className="font-medium leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-px border-l-2 border-dashed border-gray-200 -translate-x-1/2" />
              
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-[8px] bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] text-white items-center justify-center shadow-[0_4px_14px_rgba(124,58,237,0.38),0_1px_3px_rgba(124,58,237,0.2)]">
                <ChevronRight size={24} strokeWidth={2.5} />
              </div>

              <div className="border-t border-gray-100 lg:border-t-0 p-8 lg:p-12 lg:pl-14 bg-slate-50/50 lg:bg-transparent">
                <p className="text-center lg:text-left text-xs font-extrabold uppercase tracking-widest text-green-600 mb-8">
                  {WHY_N4RE_CONTENT.n4reHeader}
                </p>
                <div className="flex flex-col gap-8">
                  {N4RE_SOLUTIONS.map((sol) => (
                    <div key={sol.pillar} className="flex items-start gap-4 lg:gap-5">
                      <div 
                        className="w-12 h-12 rounded-[4px] flex items-center justify-center shrink-0 shadow-sm mt-1" 
                        style={{ backgroundColor: sol.bgColor }}
                      >
                        <IconRenderer icon={sol.icon} color={sol.color} size={20} />
                      </div>
                      <div>
                        <p 
                          className="text-xs font-extrabold uppercase tracking-widest mb-2" 
                          style={{ color: sol.color }}
                        >
                          {sol.pillar}
                        </p>
                        <p className="text-sm lg:text-base leading-relaxed text-slate-600 font-medium max-w-sm">
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
        
      </div>
    </section>
  );
}