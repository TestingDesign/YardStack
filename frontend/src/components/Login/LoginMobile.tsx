import React, { useId, useState, useCallback } from 'react'
import mobileBg from '../commonfiles/Images/Login&create/mobile.png'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined'
import { SOCIAL } from './constants'

interface LoginMobileProps {
  email: string
  setEmail: (v: string) => void
  password: string
  setPassword: (v: string) => void
  showPwd: boolean
  setShowPwd: (v: boolean) => void
  remember: boolean
  setRemember: (v: boolean) => void
  loginMode: 'email' | 'phone'
  setLoginMode: (m: 'email' | 'phone') => void
  phone: string
  setPhone: (v: string) => void
  otp: string
  setOtp: (v: string) => void
  otpSent: boolean
  onSendOtp: () => void
  onSubmit: (e: React.FormEvent) => void
  onCreateAccountClick?: () => void
}

export default function LoginMobile({
  email, setEmail, password, setPassword,
  showPwd, setShowPwd, remember, setRemember,
  loginMode, setLoginMode, phone, setPhone,
  otp, setOtp, otpSent, onSendOtp,
  onSubmit, onCreateAccountClick,
}: LoginMobileProps) {
  const emailId = useId()
  const passwordId = useId()
  const rememberId = useId()
  const phoneId = useId()
  const otpId = useId()

  const [errors, setErrors] = useState<{ email?: string; password?: string; phone?: string; otp?: string }>({})

  const handleLocalSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const next: { email?: string; password?: string; phone?: string; otp?: string } = {}

    if (loginMode === 'email') {
      if (!email.trim()) next.email = 'Please enter your email address'
      if (!password) next.password = 'Please enter your password'
    } else {
      if (!phone.trim() || phone.replace(/\D/g, '').length < 10) next.phone = 'Please enter a valid phone number'
      if (!otp || otp.length !== 6) next.otp = 'Enter the 6-digit OTP'
    }

    setErrors(next)
    if (Object.keys(next).length === 0) {
      onSubmit(e)
    }
  }, [loginMode, email, password, phone, otp, onSubmit])

  return (
    <main className="h-dvh w-full bg-[#150f23] flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
      <svg aria-hidden="true" className="sr-only" style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id="loginGradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#422082" />
            <stop offset="100%" stopColor="#6a5fc1" />
          </linearGradient>
        </defs>
      </svg>
      <header
        className="relative shrink-0 pb-20 ys-fade-in-down motion-reduce:animate-none motion-reduce:transform-none motion-reduce:opacity-100 bg-no-repeat bg-[length:100%_100%] bg-center bg-(image:--mobile-bg)"
        style={{ '--mobile-bg': `url(${mobileBg})` } as React.CSSProperties}
      >
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#150f23]/95 via-[#1f1633]/80 to-[#150f23]" />
        
        <div className="relative z-10 px-5 pt-10 ">
          <div className="flex items-center gap-3 mb-6">
           
          </div>

          <h1 className="text-white text-[1.6rem] font-extrabold leading-tight drop-shadow-lg mt-10">
            Welcome <span className="text-[#c2ef4e] drop-shadow-[0_0_8px_rgba(194,239,78,0.2)]">Back</span>
          </h1>
          <p className="text-[#bdb8c0] text-[0.75rem] mt-2 leading-relaxed max-w-70 drop-shadow-md">
            Sign in to access powerful insights and manage your real estate intelligence.
          </p>
        </div>
      </header>

      <section 
        aria-label="Login Form Section"
        className={`relative z-20 w-full mt-auto ${loginMode === 'email' ? 'pb-14' : 'pb-10'} ys-scale-in motion-reduce:animate-none motion-reduce:transform-none motion-reduce:opacity-100 [animation-delay:80ms]`} 
      >
        <div className="bg-white rounded-[8px] p-5 shadow-[0_8px_30px_rgba(21,15,35,0.4)] border border-[#cfcfdb]">
          
          <div role="tablist" aria-label="Login method" className="flex rounded-[8px] bg-[#f4f6f9] p-1 mb-4 gap-1">
            <button
              role="tab"
              type="button"
              aria-selected={loginMode === 'email' ? 'true' : 'false'}
              onClick={() => setLoginMode('email')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[8px] text-[0.72rem] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 motion-reduce:transition-none ${
                loginMode === 'email'
                  ? 'bg-white text-transparent bg-clip-text bg-gradient-to-r from-[#422082] to-[#6a5fc1] shadow-sm'
                  : 'text-[#79628c] hover:text-[#1f1633]'
              }`}
            >
              <EmailOutlinedIcon sx={ loginMode === 'email' ? { fontSize: 14, fill: 'url(#loginGradient)' } : { fontSize: 14 } } className={loginMode === 'email' ? '' : 'text-[#79628c]'} aria-hidden="true" />
              Email & Password
            </button>
            <button
              role="tab"
              type="button"
              aria-selected={loginMode === 'phone' ? 'true' : 'false'}
              onClick={() => setLoginMode('phone')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[8px] text-[0.72rem] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 motion-reduce:transition-none ${
                loginMode === 'phone'
                  ? 'bg-white text-transparent bg-clip-text bg-gradient-to-r from-[#422082] to-[#6a5fc1] shadow-sm'
                  : 'text-[#79628c] hover:text-[#1f1633]'
              }`}
            >
              <PhoneOutlinedIcon sx={ loginMode === 'phone' ? { fontSize: 14, fill: 'url(#loginGradient)' } : { fontSize: 14 } } className={loginMode === 'phone' ? '' : 'text-[#79628c]'} aria-hidden="true" />
              Phone & OTP
            </button>
          </div>

          <form onSubmit={handleLocalSubmit} className="space-y-3.5" noValidate>
            {loginMode === 'email' ? (
              <>
                <div className="group">
                  <label htmlFor={emailId} className="block text-[0.7rem] font-semibold text-[#1f1633] mb-1 transition-colors duration-300 group-focus-within:text-[#6a5fc1]">
                    Work Email
                  </label>
                  <div className="flex items-center rounded-[8px] border border-[#cfcfdb] bg-gradient-to-b from-[#ffffff] to-[#f9fafb] group-hover:border-[#79628c] focus-within:!border-[#6a5fc1] focus-within:ring-2 focus-within:ring-[#6a5fc1]/20 transition-all duration-300 motion-reduce:transition-none">
                    <span aria-hidden="true" className="pl-3 text-[#79628c] shrink-0 group-focus-within:text-[#6a5fc1] transition-colors duration-300">
                      <EmailOutlinedIcon sx={{ fontSize: 16 }} />
                    </span>
                    <input
                      id={emailId}
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      placeholder="Enter your work email"
                      className="flex-1 px-2.5 py-2 text-[0.75rem] text-[#1f1633] placeholder-[#79628c] bg-transparent outline-none w-full"
                    />
                    </div>
                    {errors.email && <p className="text-[#fa7faa] font-medium text-[0.72rem] mt-1">{errors.email}</p>}
                  </div>

                <div className="group">
                  <label htmlFor={passwordId} className="block text-[0.7rem] font-semibold text-[#1f1633] mb-1 transition-colors duration-300 group-focus-within:text-[#6a5fc1]">
                    Password
                  </label>
                  <div className="flex items-center rounded-[8px] border border-[#cfcfdb] bg-gradient-to-b from-[#ffffff] to-[#f9fafb] group-hover:border-[#79628c] focus-within:!border-[#6a5fc1] focus-within:ring-2 focus-within:ring-[#6a5fc1]/20 transition-all duration-300 motion-reduce:transition-none">
                    <span aria-hidden="true" className="pl-3 text-[#79628c] shrink-0 group-focus-within:text-[#6a5fc1] transition-colors duration-300">
                      <LockOutlinedIcon sx={{ fontSize: 16 }} />
                    </span>
                    <input
                      id={passwordId}
                      type={showPwd ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="flex-1 px-2.5 py-2 text-[0.75rem] text-[#1f1633] placeholder-[#79628c] bg-transparent outline-none w-full"
                    />
                      <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      aria-label={showPwd ? 'Hide password' : 'Show password'}
                      aria-pressed={showPwd}
                      className="pr-3 text-[#79628c] hover:text-[#6a5fc1] shrink-0 focus-visible:outline-none focus-visible:text-[#6a5fc1] transition-colors duration-300 motion-reduce:transition-none"
                    >
                      {showPwd ? <VisibilityOutlinedIcon sx={{ fontSize: 16 }} aria-hidden="true" /> : <VisibilityOffOutlinedIcon sx={{ fontSize: 16 }} aria-hidden="true" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-[#fa7faa] font-medium text-[0.72rem] mt-1">{errors.password}</p>}
                </div>
              </>
            ) : (
              <>
                <div className="group">
                  <label htmlFor={phoneId} className="block text-[0.7rem] font-semibold text-[#1f1633] mb-1 transition-colors duration-300 group-focus-within:text-[#6a5fc1]">
                    Mobile Number
                  </label>
                  <div className="flex items-center rounded-[8px] border border-[#cfcfdb] bg-gradient-to-b from-[#ffffff] to-[#f9fafb] group-hover:border-[#79628c] focus-within:!border-[#6a5fc1] focus-within:ring-2 focus-within:ring-[#6a5fc1]/20 transition-all duration-300 motion-reduce:transition-none">
                    <span aria-hidden="true" className="pl-3 text-[#79628c] shrink-0 group-focus-within:text-[#6a5fc1] transition-colors duration-300">
                      <PhoneOutlinedIcon sx={{ fontSize: 16 }} />
                    </span>
                    <input
                      id={phoneId}
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      autoComplete="tel"
                      placeholder="Enter your mobile number"
                      className="flex-1 px-2.5 py-2 text-[0.75rem] text-[#1f1633] placeholder-[#79628c] bg-transparent outline-none w-full"
                    />
                    <button
                      type="button"
                      onClick={onSendOtp}
                      disabled={phone.trim().length < 10}
                      className="mr-2 px-2.5 py-1 rounded-[8px] text-[0.65rem] font-bold bg-[#422082] text-white hover:bg-[#6a5fc1] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 motion-reduce:transition-none"
                    >
                      {otpSent ? 'Resend' : 'Send OTP'}
                    </button>
                  </div>
                  {errors.phone && <p className="text-[#fa7faa] font-medium text-[0.72rem] mt-1">{errors.phone}</p>}
                </div>

                <div className="group">
                  <label htmlFor={otpId} className="block text-[0.7rem] font-semibold text-[#1f1633] mb-1 transition-colors duration-300 group-focus-within:text-[#6a5fc1]">
                    OTP
                  </label>
                  <div className="flex items-center rounded-[8px] border border-[#cfcfdb] bg-gradient-to-b from-[#ffffff] to-[#f9fafb] group-hover:border-[#79628c] focus-within:!border-[#6a5fc1] focus-within:ring-2 focus-within:ring-[#6a5fc1]/20 transition-all duration-300 motion-reduce:transition-none">
                    <span aria-hidden="true" className="pl-3 text-[#79628c] shrink-0 group-focus-within:text-[#6a5fc1] transition-colors duration-300">
                      <SmsOutlinedIcon sx={{ fontSize: 16 }} />
                    </span>
                    <input
                      id={otpId}
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                      autoComplete="one-time-code"
                      placeholder="Enter 6-digit OTP"
                      className="flex-1 px-2.5 py-2 text-[0.75rem] text-[#1f1633] placeholder-[#79628c] bg-transparent outline-none w-full tracking-widest"
                    />
                  </div>
                  {otpSent && <p className="text-[#6a5fc1] font-normal text-[0.65rem] mt-1">Sent to your number</p>}
                  {errors.otp && <p className="text-[#fa7faa] font-medium text-[0.72rem] mt-1">{errors.otp}</p>}
                </div>
              </>
            )}

            {loginMode === 'email' && (
            <div className="flex items-center justify-between pt-1">
              <label htmlFor={rememberId} className="flex items-center gap-2 cursor-pointer text-[0.72rem] text-[#1f1633] group/check">
                <input 
                  id={rememberId}
                  type="checkbox" 
                  checked={remember} 
                  onChange={e => setRemember(e.target.checked)} 
                  className="w-3.5 h-3.5 rounded-[4px] accent-[#422082] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 focus-visible:ring-offset-1 transition-transform group-hover/check:scale-110 motion-reduce:transform-none" 
                />
                Remember me
              </label>
              <button 
                type="button" 
                className="text-[0.72rem] underline font-medium text-[#6a5fc1] hover:text-[#422082] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 rounded-[4px] transition-colors"
              >
                Forgot Password?
              </button>
            </div>
            )}

            <button 
              type="submit" 
              className="w-full flex items-center justify-center h-[42px] rounded-[8px] font-bold text-[0.95rem] text-white bg-gradient-to-r from-[#422082] to-[#6a5fc1] hover:from-[#6a5fc1] hover:to-[#422082] active:scale-[0.97] active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 focus-visible:ring-offset-2 transition-all duration-300 shadow-[0_4px_16px_rgba(66,32,130,0.3)] hover:shadow-[0_6px_20px_rgba(106,95,193,0.4)] motion-reduce:transform-none motion-reduce:transition-none"
            >
              <span>{loginMode === 'phone' ? 'Verify & Login' : 'Login'}</span>
            </button>

            <div className="flex items-center gap-3 my-4" aria-hidden="true">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#cfcfdb] to-[#cfcfdb]" />
              <span className="font-semibold text-[#79628c] tracking-[0.14em] uppercase text-[0.6rem]">
                Or sign in with
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#cfcfdb] to-[#cfcfdb]" />
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {SOCIAL.map(({ label, logo }) => (
                <button 
                  key={label} 
                  type="button" 
                  aria-label={`Sign in with ${label}`}
                  className="flex items-center justify-center gap-2 border border-[#cfcfdb] font-medium text-[#1f1633] bg-gradient-to-b from-white to-[#f9fafb] hover:from-[#f0f0f0] hover:to-[#e5e7eb] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 shadow-sm transition-all duration-300 py-2 rounded-[6px] text-[0.75rem] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <img src={logo} alt="" aria-hidden="true" className="object-contain w-3.5 h-3.5 drop-shadow-sm" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <p className="text-center text-[#79628c] text-[0.75rem] pt-3">
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={onCreateAccountClick} 
                className="text-[#6a5fc1] underline font-medium hover:text-[#422082] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 rounded-[4px] transition-all"
              >
                Create Account
              </button>
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}