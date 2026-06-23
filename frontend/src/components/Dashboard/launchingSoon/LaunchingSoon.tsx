import { memo } from 'react'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'

export default memo(function LaunchingSoon() {
  return (
    <div className="flex-1 w-full h-full bg-[#f8f9fb] flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500 min-h-[400px]">
      <div className="w-16 h-16 mb-4 rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center justify-center">
        <RocketLaunchIcon sx={{ fontSize: 32 }} className="text-[#6a5fc1]" />
      </div>
      <h2 className="text-[20px] font-extrabold text-[#1f1633] mb-2">
        Launching Soon
      </h2>
      <p className="text-[14px] text-gray-500 max-w-md">
        We are working hard to bring you this new feature. Stay tuned for updates and get ready to experience something amazing.
      </p>
    </div>
  )
})
