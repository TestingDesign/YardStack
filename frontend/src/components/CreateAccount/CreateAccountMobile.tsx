import React from 'react'
import CreateAccountForm, { type CreateAccountFormProps } from './CreateAccountForm'
import mobileBg from '../commonfiles/Images/Login&create/mobile.png'

export default function CreateAccountMobile(props: CreateAccountFormProps) {
  return (
    <main className="h-dvh w-full bg-[#150f23] flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <header
        className="relative shrink-0 pb-12 ys-fade-in-down motion-reduce:animate-none motion-reduce:transform-none motion-reduce:opacity-100 bg-no-repeat bg-[length:100%_100%] bg-center bg-(image:--mobile-bg)"
        style={{ '--mobile-bg': `url(${mobileBg})` } as React.CSSProperties}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#150f23]/95 via-[#1f1633]/80 to-[#150f23]" 
        />

        <div className="relative z-10 px-5 pt-10">
          <h1 className="text-white text-[1.6rem] font-extrabold leading-tight tracking-tight drop-shadow-lg mt-2">
            Welcome to <span className="text-[#c2ef4e] drop-shadow-[0_0_8px_rgba(194,239,78,0.2)]">N4RE</span>
          </h1>
          <p className="text-[#bdb8c0] text-[13px] mt-2.5 leading-relaxed max-w-[85%]">
            Create your account and unlock the power of intelligent real estate insights.
          </p>
        </div>
      </header>

      <section
        aria-labelledby="mobile-create-account-heading"
        className="relative z-20 w-full flex-1 flex flex-col mt-1 pb-10 ys-scale-in motion-reduce:animate-none motion-reduce:transform-none motion-reduce:opacity-100 [animation-delay:80ms]" 
      >
        <div className="flex-1 bg-gradient-to-b from-[#ffffff] to-[#f9fafb] rounded-t-[18px] p-5 shadow-[0_-8px_24px_rgba(21,15,35,0.4)] border-t border-[#cfcfdb]">
          <CreateAccountForm {...props} showLoginLink={true} isMobile={true} />
        </div>
      </section>
    </main>
  )
}