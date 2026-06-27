import { SEGMENTS_CONTENT, SEGMENTS } from './data';
import { Sparkles } from 'lucide-react';
import Logo from './Logo.png';

export default function SegmentsMobile() {
  return (
    <section id="segments" className="relative bg-[var(--color-bg-muted)] py-12 overflow-hidden selection:bg-purple-200 selection:text-purple-900">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600 mb-2">
            <Sparkles size={12} className="text-purple-600" />
            {SEGMENTS_CONTENT.tagline}
          </span>
          <h2 className="text-[28px] leading-[1.2] font-extrabold text-[var(--color-text-primary)] tracking-tight mb-3">
            We serve professionals from <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-800 to-purple-500">
              every real estate segment
            </span>
          </h2>
          <p className="text-sm font-medium text-[var(--color-text-secondary)] leading-relaxed">
            Whether you work in residential, luxury, plotted developments, commercial real estate or investment advisory, N4RE helps you connect and grow.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          {/* Central Hub */}
          <div className="relative w-full max-w-[280px] aspect-square rounded-full border border-purple-200/50 bg-white/40 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
            <div className="absolute inset-4 rounded-full border border-purple-200/70 bg-purple-50/50 backdrop-blur-md flex items-center justify-center">
              <div className="w-[140px] h-[140px] rounded-full bg-gradient-to-br from-purple-900 to-[#3b0764] shadow-[0_0_30px_rgba(88,28,135,0.3)] flex flex-col items-center justify-center text-center px-3 text-white border-[3px] border-white">
                <div className="flex flex-col items-center -mt-3">
                  <img src={Logo} alt="N4RE Logo" className="w-[75px] h-auto object-contain mb-1" draggable={false} />
                  <div className="w-6 h-0.5 bg-purple-400/50 mb-1 rounded-full" />
                  <p className="text-[8px] font-bold uppercase tracking-wider text-purple-200 leading-tight">
                    One Ecosystem.<br/>Every Connection.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Segment Cards */}
          <div className="flex flex-col gap-3 w-full">
            {SEGMENTS.map((segment) => {
              const Icon = segment.icon;
              return (
                <div
                  key={segment.id}
                  className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100"
                >
                  <div 
                    className="w-12 h-12 rounded-[8px] flex items-center justify-center shrink-0 shadow-sm"
                    style={{ backgroundColor: segment.color }}
                  >
                    <Icon size={22} color="white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-extrabold text-[var(--color-text-primary)] leading-tight mb-1">
                      {segment.title}
                    </h4>
                    <p className="text-[11px] font-semibold text-[var(--color-text-secondary)] leading-tight">
                      {segment.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
