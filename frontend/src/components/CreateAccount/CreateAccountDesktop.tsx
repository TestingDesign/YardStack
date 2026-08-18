import { memo } from 'react'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import BarChartIcon from '@mui/icons-material/BarChart'
import GroupsIcon from '@mui/icons-material/Groups'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import React from 'react'
import Dropdown from '../commonfiles/Dropdown'
import CreateAccountForm, { type CreateAccountFormProps } from './CreateAccountForm'
import { STATS_DESKTOP } from './constants'
import desktopBg from '../commonfiles/Images/Login&create/Desktop1.png'

interface CreateAccountDesktopProps extends CreateAccountFormProps {
  language: string
  setLanguage: (v: string) => void
}

const LANG_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'Hindi' },
  { value: 'mr', label: 'Marathi' },
]

const FEATURES = [
  {
    Icon: VerifiedUserOutlinedIcon,
    title: 'Secure & Trusted',
    desc: 'Enterprise-grade security for your data'
  },
  {
    Icon: BarChartIcon,
    title: 'Smart & Powerful',
    desc: 'Advanced analytics for smarter decisions'
  },
  {
    Icon: GroupsIcon,
    title: 'Built for Professionals',
    desc: 'Designed for agents, developers & teams'
  },
]

const FEATURE_DELAYS = ['[animation-delay:0ms]', '[animation-delay:90ms]', '[animation-delay:180ms]'] as const

const HeroSection = memo(function HeroSection({ onLoginClick }: { onLoginClick?: () => void }) {
  return (
    <section
      aria-label="Welcome Information"
      className="flex-1 relative bg-cover bg-center ys-slide-in-left motion-reduce:transform-none motion-reduce:transition-none motion-reduce:animate-none bg-(image:--desktop-bg)"
      style={{ '--desktop-bg': `url(${desktopBg})` } as React.CSSProperties}
    >
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-linear-to-r from-[#150f23]/90 via-[#1f1633]/70 to-transparent" 
      />

      <div className="relative z-10 flex flex-col justify-between h-full px-10 py-8 max-w-130">
        <div className="mt-2">
          <p className="text-[#fa7faa] text-[0.82rem] font-semibold tracking-wider uppercase drop-shadow-sm">
            Create Your Account
          </p>
          <div
            aria-hidden="true"
            className="w-10 h-0.5 bg-[#fa7faa] mt-2 mb-5 shadow-[0_2px_8px_rgba(250,127,170,0.5)]" 
          />
          <h1 className="text-white text-[2.1rem] font-extrabold leading-[1.15] tracking-tight drop-shadow-lg">
            Join India's Most Intelligent<br />
            Real Estate Platform <span className="text-[#c2ef4e]">N4RE</span>
          </h1>
          <p className="text-white/90 text-[0.9rem] mt-4 leading-relaxed drop-shadow-md">
            Get started and unlock the power of<br />data-driven real estate intelligence.
          </p>

          <div className="mt-7 space-y-2" role="list" aria-label="Platform Features">
            {FEATURES.map(({ Icon, title, desc }, idx) => (
              <div
                key={title}
                role="listitem"
                className={`flex items-center gap-3 p-2.5 rounded-[8px] hover:bg-white/10 hover:-translate-y-0.5 border border-transparent hover:border-white/10 transition-all duration-300 cursor-default hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] group ys-fade-in-up motion-reduce:transform-none motion-reduce:transition-none motion-reduce:animate-none ${FEATURE_DELAYS[idx]}`}
              >
                <div
                  aria-hidden="true"
                  className="bg-[#422082] rounded-[8px] p-2.5 shrink-0 shadow-[0_4px_12px_rgba(66,32,130,0.4)] group-hover:scale-110 group-hover:bg-[#6a5fc1] transition-all duration-300 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <Icon sx={{ fontSize: 18, color: 'white' }} />
                </div>
                <div>
                  <p className="text-white font-semibold text-[0.85rem] group-hover:text-[#c2ef4e] transition-colors duration-300 motion-reduce:transition-none">
                    {title}
                  </p>
                  <p className="text-white/80 text-[0.73rem] group-hover:text-white transition-colors duration-300 motion-reduce:transition-none">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-[8px] p-2 mb-20 shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:bg-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-500 group motion-reduce:transition-none">
          <div className="flex items-center divide-x divide-white/20 py-1" role="group" aria-label="Platform Statistics">
            {STATS_DESKTOP.map(({ value, label }) => (
              <div
                key={label}
                className="flex-1 text-center px-1 first:pl-0 last:pr-0 transform transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
              >
                <p className="text-white font-extrabold text-[1.15rem] drop-shadow-md">{value}</p>
                <p className="text-white/80 text-[0.68rem] mt-0.5">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-white/90 text-[0.8rem] text-center mt-2 border-t border-white/15 pt-2 pb-1">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onLoginClick}
              aria-label="Login to your existing account"
              className="text-[#c2ef4e] font-bold hover:text-white hover:underline transition-all underline duration-300 rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2ef4e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f1633] motion-reduce:transition-none"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </section>
  )
})

export default function CreateAccountDesktop({
  language,
  setLanguage,
  onLoginClick,
  ...formProps
}: CreateAccountDesktopProps) {
  return (
    <main className="h-screen w-full flex overflow-hidden bg-[#150f23]">

      <HeroSection onLoginClick={onLoginClick} />

      <section
        aria-label="Account Creation Form"
        className="w-160 shrink-0 bg-[#ffffff] flex flex-col shadow-[-12px_0_40px_rgba(0,0,0,0.12)] z-10 relative ys-slide-in-right motion-reduce:transform-none motion-reduce:animate-none"
      >
        <header className="flex justify-end pt-8 px-10 pb-4 shrink-0">
          <Dropdown
            id="language-selector"
            options={LANG_OPTIONS}
            value={language}
            onChange={setLanguage}
            leftIcon={<LanguageIcon sx={{ fontSize: 15 }} aria-hidden="true" />}
            size="sm"
            className="w-32"
          />
        </header>

        <div className="flex-1 px-10 flex flex-col justify-start overflow-y-auto">
          <CreateAccountForm
            {...formProps}
            onLoginClick={onLoginClick}
            twoColumn
            showLoginLink={true}
          />
        </div>

        <div className="shrink-0 border-t border-[#e5e7eb] bg-[#f0f0f0]/50 py-3 px-6 flex items-center justify-around">
          {([
            { Icon: VerifiedUserOutlinedIcon, label: 'Bank-Level\nSecurity' },
            { Icon: AccessTimeOutlinedIcon, label: '99.9%\nUptime' },
            { Icon: StarBorderOutlinedIcon, label: 'Trusted by Top\nDevelopers' },
          ] as { Icon: React.ElementType; label: string }[]).map(({ Icon, label }, i) => (
            <React.Fragment key={label}>
              {i > 0 && <div aria-hidden="true" className="w-px h-7 bg-[#e5e7eb]" />}
              <div className="flex flex-col items-center gap-1 text-center px-3 group">
                <Icon sx={{ fontSize: 19 }} className="text-[#6a5fc1] transition-transform duration-300 group-hover:scale-110 group-hover:text-[#422082] motion-reduce:transform-none motion-reduce:transition-none" aria-hidden="true" />
                <p className="text-[0.57rem] text-[#79628c] font-medium leading-tight whitespace-pre-line group-hover:text-[#1f1633] transition-colors">
                  {label}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>
    </main>
  )
}