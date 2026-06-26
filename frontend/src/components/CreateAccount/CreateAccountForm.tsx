import React, { useId } from 'react'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import Dropdown from '../commonfiles/Dropdown'
import FormField from './FormField'
import { ROLE_OPTIONS, SOCIAL } from './constants'

export interface CreateAccountFormProps {
  name: string
  setName: (v: string) => void
  email: string
  setEmail: (v: string) => void
  phone: string
  setPhone: (v: string) => void
  phoneCode: string
  setPhoneCode: (v: string) => void
  company: string
  setCompany: (v: string) => void
  role: string
  setRole: (v: string) => void
  password: string
  setPassword: (v: string) => void
  confirmPassword: string
  setConfirmPassword: (v: string) => void
  showPwd: boolean
  setShowPwd: (v: boolean) => void
  showConfirm: boolean
  setShowConfirm: (v: boolean) => void
  agreed: boolean
  setAgreed: (v: boolean) => void
  errors: Record<string, string>
  onSubmit: (e: React.FormEvent) => void
  onLoginClick?: () => void
  twoColumn?: boolean
  showLoginLink?: boolean
  isMobile?: boolean
}

export default function CreateAccountForm(props: CreateAccountFormProps) {
  const {
    name, setName, email, setEmail, phone, setPhone,
    company, setCompany, role, setRole, password, setPassword,
    confirmPassword, setConfirmPassword, showPwd, setShowPwd,
    showConfirm, setShowConfirm, agreed, setAgreed, errors, onSubmit, onLoginClick,
    twoColumn = false, showLoginLink = true, isMobile = false
  } = props

  const formId = useId()

  const phoneField = (
    <div className="group">
      <label 
        htmlFor={`${formId}-phone`}
        className={`block font-medium text-[#1f1633] mb-1 transition-colors group-focus-within:text-[#6a5fc1] ${isMobile ? 'text-[12px]' : 'text-[14px]'}`}
      >
        Phone Number<span className="text-[#fa7faa] ml-0.5" aria-hidden="true">*</span>
        <span className="sr-only">Required</span>
      </label>
      <div 
        className={`flex items-center bg-[#ffffff] border ${errors.phone ? 'border-[#fa7faa]' : 'border-[#cfcfdb] hover:border-[#79628c]'} focus-within:!border-[#6a5fc1] focus-within:ring-2 focus-within:ring-[#6a5fc1]/20 transition-all duration-300 rounded-[6px] motion-reduce:transition-none`}
      >
        <span 
          aria-hidden="true" 
          className={`text-[#79628c] shrink-0 group-focus-within:text-[#6a5fc1] transition-colors duration-300 motion-reduce:transition-none ${isMobile ? 'pl-3' : 'pl-3.5'}`}
        >
          <PhoneOutlinedIcon sx={{ fontSize: isMobile ? 16 : 18 }} />
        </span>
        <input
          id={`${formId}-phone`}
          type="tel" 
          value={phone} 
          onChange={e => setPhone(e.target.value)}
          placeholder={isMobile ? "Enter your mobile number" : "Enter phone number"}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
          aria-required="true"
          className={`flex-1 bg-transparent outline-none text-[#1f1633] placeholder-[#79628c] ${isMobile ? 'px-2.5 py-2 text-[13px]' : 'px-3 py-2 text-[15px]'}`}
        />
      </div>
      {errors.phone && (
        <p id={`${formId}-phone-error`} className="text-[#fa7faa] text-[12px] mt-1 font-medium" role="alert">
          {errors.phone}
        </p>
      )}
    </div>
  )

  const roleField = (
    <div className="group">
      <label 
        id={`${formId}-role-label`}
        className={`block font-medium text-[#1f1633] mb-1 transition-colors group-focus-within:text-[#6a5fc1] ${isMobile ? 'text-[12px]' : 'text-[14px]'}`}
      >
        Role<span className="text-[#fa7faa] ml-0.5" aria-hidden="true">*</span>
        <span className="sr-only">Required</span>
      </label>
      <div 
        className={`shadow-sm group-hover:shadow transition-shadow duration-300 motion-reduce:transition-none ${isMobile ? '[&>div>button]:!rounded-[6px] [&>div>button]:!min-h-[36px] [&>div>button]:!text-[13px] rounded-[6px]' : 'rounded-[6px]'}`}
      >
        <Dropdown
          options={ROLE_OPTIONS}
          value={role}
          onChange={setRole}
          placeholder="Select your role"
          leftIcon={<BadgeOutlinedIcon sx={{ fontSize: isMobile ? 16 : 18 }} />}
          id={`${formId}-role`}
        />
      </div>
      {errors.role && (
        <p className="text-[#fa7faa] text-[12px] mt-1 font-medium" role="alert">
          {errors.role}
        </p>
      )}
    </div>
  )

  const companyField = (
    <FormField
      label="Company / Organization" 
      id="ca-company" 
      placeholder="Enter your company name"
      value={company} 
      onChange={setCompany} 
      isMobile={isMobile}
      icon={<BusinessOutlinedIcon sx={{ fontSize: isMobile ? 16 : 18 }} aria-hidden="true" />}
    />
  )

  const passwordField = (
    <FormField
      label="Password" 
      id="ca-password" 
      type={showPwd ? 'text' : 'password'}
      placeholder="Create a strong password"
      value={password} 
      onChange={setPassword} 
      isMobile={isMobile}
      icon={<LockOutlinedIcon sx={{ fontSize: isMobile ? 16 : 18 }} aria-hidden="true" />}
      rightIcon={
        <button 
          type="button" 
          onClick={() => setShowPwd(!showPwd)} 
          aria-label={showPwd ? "Hide password" : "Show password"}
          aria-pressed={showPwd}
          className="text-[#79628c] hover:text-[#6a5fc1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 rounded-[4px] p-0.5 transition-colors duration-300 motion-reduce:transition-none"
        >
          {showPwd ? (
            <VisibilityOutlinedIcon sx={{ fontSize: isMobile ? 16 : 18 }} aria-hidden="true" />
          ) : (
            <VisibilityOffOutlinedIcon sx={{ fontSize: isMobile ? 16 : 18 }} aria-hidden="true" />
          )}
        </button>
      }
      error={errors.password} 
      required
    />
  )

  const confirmPasswordField = (
    <FormField
      label="Confirm Password" 
      id="ca-confirm" 
      type={showConfirm ? 'text' : 'password'}
      placeholder="Confirm your password"
      value={confirmPassword} 
      onChange={setConfirmPassword} 
      isMobile={isMobile}
      icon={<LockOutlinedIcon sx={{ fontSize: isMobile ? 16 : 18 }} aria-hidden="true" />}
      rightIcon={
        <button 
          type="button" 
          onClick={() => setShowConfirm(!showConfirm)} 
          aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
          aria-pressed={showConfirm}
          className="text-[#79628c] hover:text-[#6a5fc1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 rounded-[4px] p-0.5 transition-colors duration-300 motion-reduce:transition-none"
        >
          {showConfirm ? (
            <VisibilityOutlinedIcon sx={{ fontSize: isMobile ? 16 : 18 }} aria-hidden="true" />
          ) : (
            <VisibilityOffOutlinedIcon sx={{ fontSize: isMobile ? 16 : 18 }} aria-hidden="true" />
          )}
        </button>
      }
      error={errors.confirmPassword} 
      required
    />
  )

  return (
    <form 
      onSubmit={onSubmit} 
      className={`overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isMobile ? "space-y-4" : "space-y-3.5"}`} 
      noValidate
    >
      {twoColumn ? (
        <>
          <FormField
            label="Full Name" 
            id="ca-name" 
            placeholder="Enter your full name"
            value={name} 
            onChange={setName} 
            isMobile={isMobile}
            icon={<PersonOutlinedIcon sx={{ fontSize: isMobile ? 16 : 18 }} aria-hidden="true" />}
            error={errors.name} 
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Work Email" 
              id="ca-email" 
              type="email" 
              placeholder="Enter your work email"
              value={email} 
              onChange={setEmail} 
              isMobile={isMobile}
              icon={<EmailOutlinedIcon sx={{ fontSize: isMobile ? 16 : 18 }} aria-hidden="true" />}
              error={errors.email} 
              required
            />
            {phoneField}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {companyField}
            {roleField}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {passwordField}
            {confirmPasswordField}
          </div>
        </>
      ) : (
        <>
          <FormField
            label="Full Name" 
            id="ca-name" 
            placeholder="Enter your full name"
            value={name} 
            onChange={setName} 
            isMobile={isMobile}
            icon={<PersonOutlinedIcon sx={{ fontSize: isMobile ? 16 : 18 }} aria-hidden="true" />}
            error={errors.name} 
            required
          />
          <FormField
            label="Work Email" 
            id="ca-email" 
            type="email" 
            placeholder="Enter your work email"
            value={email} 
            onChange={setEmail} 
            isMobile={isMobile}
            icon={<EmailOutlinedIcon sx={{ fontSize: isMobile ? 16 : 18 }} aria-hidden="true" />}
            error={errors.email} 
            required
          />
          {phoneField}
          {companyField}
          {roleField}
          {passwordField}
          {confirmPasswordField}
        </>
      )}

      {!isMobile && (
        <div 
          className="bg-gradient-to-r from-[#f0f0f0] to-white border border-[#e5e7eb] rounded-[8px] p-3 flex items-center justify-between gap-3 mt-3 shadow-sm transition-all duration-300 hover:shadow-md motion-reduce:transition-none"
          role="status"
          aria-label="Security Information"
        >
          <div className="flex items-start gap-3">
            <SecurityOutlinedIcon sx={{ fontSize: 20, color: '#422082', flexShrink: 0, mt: 0.2 }} aria-hidden="true" />
            <div>
              <p className="text-[13px] font-semibold text-[#1f1633]">Your security is our priority</p>
              <p className="text-[12px] text-[#79628c] leading-relaxed mt-0.5">
                We use advanced encryption and security protocols to protect your data.
              </p>
            </div>
          </div>
          <TaskAltIcon 
            className="animate-[pulse_3s_ease-in-out_infinite] motion-reduce:animate-none" 
            sx={{ fontSize: 24, color: '#c2ef4e', filter: 'drop-shadow(0 0 4px rgba(194,239,78,0.5))', flexShrink: 0 }} 
            aria-hidden="true" 
          />
        </div>
      )}

      <div className={`flex items-start gap-2.5 group ${isMobile ? 'pt-1.5' : 'pt-1'}`}>
        <input
          id={`${formId}-agreed`}
          type="checkbox" 
          checked={agreed} 
          onChange={e => setAgreed(e.target.checked)}
          aria-invalid={!!errors.agreed}
          aria-describedby={errors.agreed ? `${formId}-agreed-error` : undefined}
          aria-required="true"
          className={`mt-0.5 rounded-[4px] accent-[#422082] shrink-0 transition-transform group-hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:transform-none ${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'}`}
        />
        <span className={`text-[#1f1633] leading-relaxed ${isMobile ? 'text-[12px]' : 'text-[13px]'}`}>
          <label htmlFor={`${formId}-agreed`} className="cursor-pointer">I agree to the </label>
          <button 
            type="button" 
            className="text-[#6a5fc1] underline font-medium hover:text-[#422082] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 rounded-[4px] transition-colors"
          >
            Terms of Service
          </button>
          {' '}and{' '}
          <button 
            type="button" 
            className="text-[#6a5fc1] underline font-medium hover:text-[#422082] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 rounded-[4px] transition-colors"
          >
            Privacy Policy
          </button>
        </span>
      </div>
      {errors.agreed && (
        <p id={`${formId}-agreed-error`} className="text-[#fa7faa] font-medium text-[12px] -mt-1" role="alert">
          {errors.agreed}
        </p>
      )}

      <button
        type="submit"
        className={`relative ${isMobile ? 'w-full' : 'w-1/2 mx-auto'} flex items-center justify-center font-bold text-white uppercase tracking-[0.2px] bg-gradient-to-r from-[#422082] to-[#6a5fc1] hover:from-[#6a5fc1] hover:to-[#422082] active:scale-[0.98] shadow-[0_4px_16px_rgba(66,32,130,0.3)] hover:shadow-[0_6px_20px_rgba(106,95,193,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 focus-visible:ring-offset-2 transition-all duration-300 ease-out motion-reduce:transition-none ${isMobile ? 'py-3 mt-4 text-[13px] rounded-[8px]' : 'py-[12px] px-4 mt-3 text-[14px] rounded-[8px]'}`}
      >
        <span>Create Account</span>
      </button>

      <div className={`flex items-center gap-3 ${isMobile ? 'my-4' : 'my-3'}`} aria-hidden="true">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#cfcfdb] to-[#cfcfdb]" />
        <span className={`font-semibold text-[#79628c] uppercase tracking-[0.2px] ${isMobile ? 'text-[10px]' : 'text-[11px]'}`}>
          Or sign up with
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#cfcfdb] to-[#cfcfdb]" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {SOCIAL.map(({ label, logo }) => (
          <button 
            key={label} 
            type="button" 
            aria-label={`Sign up with ${label}`}
            className={`flex items-center justify-center gap-2 border border-[#cfcfdb] font-medium text-[#1f1633] bg-gradient-to-b from-white to-[#f9fafb] hover:from-[#f0f0f0] hover:to-[#e5e7eb] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 shadow-sm transition-all duration-300 ease-out motion-reduce:transition-none ${isMobile ? 'py-2 rounded-[6px] text-[12px]' : 'py-2.5 rounded-[8px] text-[14px]'}`}
          >
            <img src={logo} alt="" aria-hidden="true" className={`object-contain drop-shadow-sm ${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {showLoginLink && (
        <p className={`text-center text-[#79628c] ${isMobile ? 'text-[13px] pt-3' : 'text-[14px] pt-2'}`}>
          Already have an account?{' '}
          <button 
            type="button" 
            onClick={onLoginClick} 
            className="text-[#6a5fc1] font-medium hover:text-[#422082] hover:underline underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 rounded-[4px] transition-all duration-300 motion-reduce:transition-none"
          >
            Login here
          </button>
        </p>
      )}
    </form>
  )
}