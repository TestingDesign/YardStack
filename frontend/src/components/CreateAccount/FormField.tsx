import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  id: string
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  icon: ReactNode
  rightIcon?: ReactNode
  error?: string
  required?: boolean
  isMobile?: boolean
}

export default function FormField({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  rightIcon,
  error,
  required,
  isMobile = false,
}: FormFieldProps) {
  const errorId = `${id}-error`

  return (
    <div className="group">
      <label 
        htmlFor={id} 
        className={`block font-medium text-[#1f1633] mb-1 transition-colors duration-200 group-focus-within:text-[#6a5fc1] ${
          isMobile ? 'text-[12px]' : 'text-[14px]'
        }`}
      >
        {label}
        {required && (
          <span className="text-[#fa7faa] ml-0.5" aria-hidden="true">*</span>
        )}
        {required && <span className="sr-only">Required</span>}
      </label>
      
      <div 
        className={`flex items-center border transition-all duration-300 rounded-[6px] motion-reduce:transition-none ${
          error 
            ? 'border-[#fa7faa] ring-1 ring-[#fa7faa]/20 bg-gradient-to-b from-[#ffffff] to-[#fff0f5]' 
            : 'border-[#cfcfdb] hover:border-[#79628c] focus-within:!border-[#6a5fc1] focus-within:ring-2 focus-within:ring-[#6a5fc1]/20 bg-gradient-to-b from-[#ffffff] to-[#f9fafb]'
        }`}
      >
        <span 
          aria-hidden="true" 
          className={`text-[#79628c] shrink-0 transition-colors duration-200 group-focus-within:text-[#6a5fc1] motion-reduce:transition-none ${
            isMobile ? 'pl-3' : 'pl-3.5'
          }`}
        >
          {icon}
        </span>
        
        <input
          id={id} 
          type={type} 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} 
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`flex-1 text-[#1f1633] placeholder-[#79628c] bg-transparent outline-none w-full ${
            isMobile ? 'px-2.5 py-2 text-[13px]' : 'px-3 py-2 text-[15px]'
          }`}
        />
        
        {rightIcon && (
          <span className={`shrink-0 flex items-center justify-center ${isMobile ? 'pr-3' : 'pr-3.5'}`}>
            {rightIcon}
          </span>
        )}
      </div>
      
      {error && (
        <p id={errorId} className="text-[#fa7faa] font-medium text-[12px] mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}