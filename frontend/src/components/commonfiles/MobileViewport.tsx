import { type ReactNode } from 'react'

interface MobileViewportProps {
  children: ReactNode
  isMobile?: boolean
}

export default function MobileViewport({ children, isMobile = false }: MobileViewportProps) {
  if (isMobile) {
    return (
      <div 
        role="main"
        aria-label="Mobile Viewport"
        className="flex flex-col h-full w-full overflow-hidden bg-[#1A1A2E] @container" 
      >
        {children}
      </div>
    )
  }

  return (
    <div
      role="region"
      aria-label="Desktop Preview Environment"
      className="flex items-center justify-center h-full overflow-auto box-border bg-[#f0f2f5] p-[clamp(12px,3vh,28px)]"
    >
      <div
        role="region"
        aria-label="Mobile Device Simulator"
        className="relative shrink-0 overflow-hidden bg-white my-0.5 rounded-lg border-[1.5px] border-[#d1d5db] shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] aspect-11/19.5 h-[min(92vh,900px)]"
      >
        <div className="h-full w-full overflow-hidden @container">
          {children}
        </div>
      </div>
    </div>
  )
}