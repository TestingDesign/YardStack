export interface SpotlightLinkData {
  actionText?: string
}

export const SPOTLIGHT_LINKS: Record<string, SpotlightLinkData> = {
  seniorAgent: {
    actionText: 'Apply'
  },
  luxuryVilla: {
    actionText: 'Buy Now'
  },
  commercialOffice: {
    actionText: 'Lease'
  }
}

interface SpotlightLinkProps {
  linkData: SpotlightLinkData
}

export default function SpotlightLink({ linkData }: SpotlightLinkProps) {
  return (
    <div className="group relative inline-flex h-9 cursor-pointer items-center justify-center overflow-hidden rounded-[4px] p-[1px] shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 animate-in fade-in zoom-in-95">
      
      <div className="absolute inset-[-1000%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#8b5cf6_50%,#3b82f6_100%)] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex h-full w-full items-center justify-center rounded-[3px] bg-black/90 px-4 py-1.5 backdrop-blur-3xl transition-colors duration-300 group-hover:bg-black/70">
        <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-[11px] font-bold tracking-wider text-transparent uppercase transition-all duration-300 group-hover:to-white">
          {linkData.actionText || 'Apply Now'}
        </span>
      </div>

      <div className="absolute -inset-1 -z-10 rounded-[6px] bg-blue-500/10 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  )
}