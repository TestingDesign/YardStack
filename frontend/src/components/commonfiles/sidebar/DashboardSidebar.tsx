import React, {
  useState,
  useEffect,
  useCallback,
  type MouseEvent,
  type FocusEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { Home, Users, Settings2, Bookmark, PlusSquare, PanelLeftClose, PanelLeft, Menu } from 'lucide-react'

export type DashboardNavKey = 'home' | 'leads' | 'manage' | 'saved' | 'post'

interface DashboardNavItem {
  key: DashboardNavKey
  label: string
  Icon: React.ElementType
  description: string
}

interface DashboardSidebarProps {
  active?: DashboardNavKey
  onNavigate?: (k: DashboardNavKey) => void
}

interface TooltipState {
  label: string
  x: number
  y: number
  visible: boolean
}

const HIDDEN_TOOLTIP: TooltipState = { label: '', x: 0, y: 0, visible: false }

const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { key: 'home', label: 'Home', Icon: Home, description: 'Dashboard overview & activity feed' },
  { key: 'leads', label: 'Leads', Icon: Users, description: 'Manage and track your lead pipeline' },
  { key: 'manage', label: 'Manage', Icon: Settings2, description: 'Listings, settings & configurations' },
  { key: 'saved', label: 'Saved', Icon: Bookmark, description: 'Bookmarked properties & searches' },
  { key: 'post', label: 'Post', Icon: PlusSquare, description: 'Create & publish new listings' },
]

const InlineLogo = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" className={className} fill="currentColor">
    <g>
      <path d="M257.43,306.28l-18.53,22.17-72.97,85.02.02,89.62-89.08.02c-.62,6.03-.7,10.72-.37,16.55l.06,200.24h100.56l.11-67.57,84.49,67.64,98.18-.2.06-354.27-102.54-59.21ZM267.54,709.09l-101.56-81.19-.04,81.21-78.34.02-.04-195.1h78.9s46.33,41.98,46.33,41.98l55.99,50.18.04-280.66,80.01,46.08.05,337.55-81.34-.06Z"/>
      <path d="M797.41,643.07c6.7-11.96,9.34-24.94,8.67-38.67-.49-19.62-8.79-37.85-24.09-50.09-12.7-9.5-27.25-14-43.42-13.99l-139.31.05v177.21s59.4-.01,59.4-.01v-43.41l49.47-.02,26.11,43.47,69.86-.12-31.65-51.36c10.57-5.54,18.77-13.27,24.96-23.07ZM744.53,617.84c-2.61,4.47-7.37,5.65-12.05,6.43l-73.81-.06v-33.69s72.98,0,72.98,0c4.48.47,9.56,1.7,12.23,5.44,4.37,6.16,4.58,15.17.65,21.89Z"/>
      <polygon points="1003.69 649.12 876.02 649.17 876.03 671.86 1003.67 671.86 1003.66 717.58 816.24 717.58 816.26 540.3 1003.67 540.31 1003.66 586.25 876.03 586.23 876.03 609.45 1003.64 609.48 1003.69 649.12"/>
      <path d="M586.04,644.67l-28.16-.13v-104.26s-59.36.05-59.36.05l-104.25,91.89-14.45,12.26-.02,50.27h118.48s.33,22.83.33,22.83h59.18l.2-22.82,28.06-.02.19-25.83-.22-24.24ZM437.42,644.56l61.02-51.49.04,51.6-61.06-.11Z"/>
      <path d="M76.31,735.3h927.37v38.41H76.31v-38.41Z"/>
      <rect x="76.31" y="752.01" width="147.65" height="5"/>
      <rect x="856.04" y="752.01" width="147.65" height="5"/>
      <path d="M653.63,765.72l-11-.06c.8-2.74,2.8-4.34,4.96-4.36,2.69-.02,5.07.27,6.04,4.42Z"/>
      <path d="M260.59,768.15c-2.57,0-4.89-.56-6.95-1.69-2.07-1.12-3.7-2.68-4.87-4.66-1.17-1.98-1.75-4.22-1.75-6.7s.59-4.73,1.77-6.7c1.19-1.98,2.82-3.54,4.89-4.66,2.07-1.13,4.38-1.71,6.93-1.71,2.08,0,3.98.37,5.7,1.1,1.72.72,3.17,1.77,4.35,3.14l-3.04,2.87c-1.85-1.98-4.11-2.98-6.79-2.98-1.75,0-3.31.39-4.68,1.14-1.37.77-2.45,1.83-3.23,3.19-.78,1.35-1.17,2.88-1.17,4.6s.39,3.26,1.17,4.62c.78,1.35,1.85,2.4,3.23,3.16,1.37.77,2.94,1.14,4.68,1.14,2.68,0,4.94-1,6.79-3.02l3.04,2.89c-1.18,1.39-2.64,2.45-4.37,3.16-1.74.72-3.64,1.08-5.7,1.08Z"/>
      <path d="M291.75,752.99c-.87-1.5-2.1-2.67-3.69-3.52-1.57-.84-3.34-1.27-5.33-1.27s-3.73.43-5.31,1.27c-1.57.85-2.8,2.02-3.69,3.52-.87,1.5-1.31,3.21-1.31,5.13s.44,3.61,1.31,5.12c.89,1.52,2.12,2.7,3.69,3.55,1.58.84,3.35,1.27,5.31,1.27.6,0,1.19-.04,1.75-.12,1.3-.18,2.49-.56,3.58-1.15,1.59-.85,2.82-2.03,3.69-3.55.28-.48.52-.99.71-1.51.42-1.11.63-2.32.63-3.61,0-1.92-.45-3.63-1.34-5.13ZM287.22,762.11c-.1.13-.22.26-.34.39-.32.33-.67.61-1.05.84-.89.56-1.92.83-3.1.83-1.67,0-3.04-.55-4.12-1.67-1.08-1.12-1.61-2.58-1.61-4.39s.53-3.28,1.61-4.4c1.08-1.11,2.45-1.66,4.12-1.66s3.06.55,4.15,1.66c1.08,1.12,1.62,2.58,1.62,4.4,0,1.61-.43,2.93-1.28,3.99h0Z"/>
      <path d="M308.42,748.2c2.44,0,4.4.72,5.87,2.14,1.48,1.42,2.23,3.53,2.23,6.35v11.1h-4.54v-10.51c0-1.69-.41-2.97-1.21-3.83-.79-.86-1.93-1.29-3.39-1.29-1.68,0-3.01.5-3.98,1.5-.96,1-1.44,2.45-1.44,4.33v9.81h-4.54v-19.38h4.31v2.52c.75-.9,1.69-1.58,2.83-2.04,1.13-.46,2.42-.69,3.85-.69Z"/>
      <path d="M333.27,748.2c2.44,0,4.4.72,5.87,2.14,1.48,1.42,2.23,3.53,2.23,6.35v11.1h-4.54v-10.51c0-1.69-.41-2.97-1.21-3.83-.79-.86-1.93-1.29-3.39-1.29-1.68,0-3.01.5-3.98,1.5-.96,1-1.44,2.45-1.44,4.33v9.81h-4.54v-19.38h4.31v2.52c.75-.9,1.69-1.58,2.83-2.04,1.13-.46,2.42-.69,3.85-.69Z"/>
      <path d="M365.52,758.21c0-1.98-.41-3.73-1.25-5.25-.83-1.51-2-2.68-3.5-3.52-1.49-.83-3.18-1.25-5.06-1.25s-3.62.43-5.15,1.27c-1.53.85-2.72,2.03-3.58,3.54-.86,1.52-1.29,3.22-1.29,5.11s.44,3.61,1.31,5.12c.89,1.52,2.15,2.7,3.77,3.55,1.63.84,3.5,1.27,5.63,1.27,1.67,0,3.17-.26,4.5-.8.98-.38,1.83-.91,2.56-1.57.27-.24.52-.5.75-.78l-2.44-2.81c-1.01,1.03-2.23,1.68-3.65,1.95-.51.1-1.04.15-1.6.15-1.68,0-3.08-.41-4.21-1.25-1.12-.83-1.82-1.96-2.08-3.39h15.2c.05-.57.08-1.01.08-1.34ZM350.2,756.56c.22-1.43.83-2.58,1.83-3.44,1.01-.86,2.24-1.29,3.69-1.29s2.72.43,3.71,1.31c1,.87,1.59,2.02,1.77,3.42h-10.99Z"/>
      <path d="M378.75,768.04c-2.01,0-3.82-.42-5.41-1.27-1.6-.84-2.85-2.02-3.75-3.54-.89-1.51-1.33-3.22-1.33-5.12s.44-3.62,1.33-5.12c.9-1.5,2.14-2.67,3.73-3.52,1.59-.84,3.4-1.27,5.43-1.27,1.92,0,3.59.39,5.02,1.17,1.44.77,2.52,1.87,3.25,3.33l-3.48,2.04c-.56-.9-1.25-1.57-2.08-2.02-.83-.44-1.75-.67-2.75-.67-1.7,0-3.1.55-4.21,1.64-1.11,1.1-1.67,2.57-1.67,4.41s.55,3.3,1.64,4.41c1.09,1.1,2.5,1.64,4.23,1.64,1,0,1.92-.22,2.75-.67.83-.46,1.52-1.13,2.08-2.02l3.48,2.02c-.75,1.46-1.85,2.58-3.29,3.37-1.43.78-3.09,1.17-4.98,1.17Z"/>
      <path d="M402.83,766.73c-.53.45-1.18.78-1.94,1-.77.21-1.57.31-2.41.31-2.12,0-3.77-.55-4.93-1.67-1.16-1.11-1.73-2.73-1.73-4.87v-9.31h-3.21v-3.64h3.21v-4.41h4.52v4.41h5.2v3.64h-5.2v9.2c0,.95.23,1.67.69,2.17.47.5,1.13.75,2,.75,1.03,0,1.87-.27,2.54-.81l1.27,3.23Z"/>
      <path d="M415.6,755.82h9.97v3.77h-9.97v-3.77Z"/>
      <path d="M452.75,768.15c-2.57,0-4.89-.56-6.95-1.69-2.07-1.12-3.7-2.68-4.87-4.66-1.17-1.98-1.75-4.22-1.75-6.7s.59-4.73,1.77-6.7c1.19-1.98,2.82-3.54,4.89-4.66,2.07-1.13,4.38-1.71,6.93-1.71,2.08,0,3.98.37,5.7,1.1,1.72.72,3.17,1.77,4.35,3.14l-3.04,2.87c-1.85-1.98-4.11-2.98-6.79-2.98-1.75,0-3.31.39-4.68,1.14-1.37.77-2.45,1.83-3.23,3.19-.78,1.35-1.17,2.88-1.17,4.6s.39,3.26,1.17,4.62c.78,1.35,1.85,2.4,3.23,3.16,1.37.77,2.94,1.14,4.68,1.14,2.68,0,4.94-1,6.79-3.02l3.04,2.89c-1.18,1.39-2.64,2.45-4.37,3.16-1.74.72-3.64,1.08-5.7,1.08Z"/>
      <path d="M483.91,752.99c-.87-1.5-2.1-2.67-3.68-3.52-1.58-.84-3.35-1.27-5.34-1.27s-3.73.43-5.31,1.27c-1.57.85-2.8,2.02-3.69,3.52-.87,1.5-1.31,3.21-1.31,5.13s.44,3.61,1.31,5.12c.89,1.52,2.12,2.7,3.69,3.55,1.58.84,3.35,1.27,5.31,1.27.58,0,1.13-.04,1.67-.11,1.33-.17,2.55-.56,3.67-1.16,1.58-.85,2.81-2.03,3.68-3.55.28-.48.52-.98.71-1.5.42-1.12.63-2.32.63-3.62,0-1.92-.45-3.63-1.34-5.13ZM479.04,762.5c-.37.39-.78.7-1.23.95t-.01.01c-.84.48-1.81.71-2.91.71-1.66,0-3.04-.55-4.12-1.67s-1.61-2.58-1.61-4.39.53-3.28,1.61-4.4c1.08-1.11,2.46-1.66,4.12-1.66s3.06.55,4.15,1.66c1.08,1.12,1.62,2.58,1.62,4.4,0,1.58-.41,2.89-1.23,3.94-.12.16-.25.31-.39.45Z"/>
      <path d="M489.59,740.88h4.54v26.92h-4.54v-26.92Z"/>
      <path d="M500.07,740.88h4.54v26.92h-4.54v-26.92Z"/>
      <path d="M524.49,750.26c-1.51-1.37-3.7-2.06-6.56-2.06-1.6,0-3.11.21-4.54.63-1.42.4-2.64.99-3.65,1.77l1.77,3.29c.72-.59,1.61-1.06,2.67-1.4,1.05-.34,2.13-.52,3.21-.52,1.59,0,2.8.37,3.6,1.11.82.72,1.23,1.76,1.23,3.1v.29h-5c-2.79,0-4.83.53-6.12,1.59-1.29,1.05-1.94,2.45-1.94,4.18,0,1.12.29,2.12.87,3,.6.89,1.44,1.59,2.53,2.09,1.09.48,2.37.73,3.83.73s2.68-.23,3.71-.67c1.02-.44,1.82-1.09,2.37-1.94v2.36h4.29v-11.37c0-2.75-.76-4.8-2.27-6.17ZM522.23,761.73c-.36.98-.99,1.73-1.87,2.25-.88.52-1.89.77-3.02.77s-2.08-.24-2.73-.72c-.66-.49-.98-1.14-.98-1.96,0-1.72,1.3-2.59,3.91-2.59h4.69v2.25Z"/>
      <path d="M551.86,752.91c-.85-1.5-2.02-2.66-3.5-3.48-1.49-.82-3.18-1.23-5.06-1.23-1.27,0-2.43.23-3.48.67-1.04.43-1.96,1.07-2.73,1.92v-9.91h-4.54v26.92h4.31v-2.5c.75.91,1.67,1.6,2.77,2.06,1.11.46,2.33.69,3.67.69.45,0,.89-.02,1.32-.08,1.36-.14,2.61-.53,3.74-1.15,1.48-.82,2.65-1.99,3.5-3.5.29-.53.54-1.08.72-1.66.37-1.09.55-2.27.55-3.55,0-1.97-.43-3.71-1.27-5.21ZM546.35,763s-.01.01-.02.01c0,.01-.01.01-.01.01h-.01c-.97.78-2.15,1.15-3.52,1.15-1.09,0-2.07-.25-2.94-.75s-1.55-1.21-2.06-2.12c-.52-.92-.77-1.98-.77-3.19s.25-2.29.77-3.21c.51-.92,1.19-1.61,2.06-2.1.87-.5,1.85-.75,2.94-.75,1.67,0,3.05.55,4.12,1.66,1.08,1.12,1.63,2.58,1.63,4.4s-.55,3.27-1.63,4.39c-.04.04-.08.09-.13.12-.13.14-.28.27-.43.38Z"/>
      <path d="M575.17,752.99c-.88-1.5-2.11-2.67-3.69-3.52-1.57-.84-3.35-1.27-5.34-1.27s-3.72.43-5.31,1.27c-1.57.85-2.8,2.02-3.69,3.52-.87,1.5-1.31,3.21-1.31,5.13s.44,3.61,1.31,5.12c.89,1.52,2.12,2.7,3.69,3.55,1.59.84,3.36,1.27,5.31,1.27.65,0,1.29-.05,1.89-.14,1.25-.19,2.4-.57,3.45-1.13,1.58-.85,2.81-2.03,3.69-3.55.27-.45.49-.93.67-1.42.44-1.14.66-2.37.66-3.7,0-1.92-.45-3.63-1.33-5.13ZM562.03,762.5c-1.07-1.12-1.6-2.58-1.6-4.39s.53-3.28,1.6-4.4c1.08-1.11,2.46-1.66,4.12-1.66s3.07.55,4.15,1.66c1.08,1.12,1.63,2.58,1.63,4.4s-.55,3.27-1.63,4.39c-1.08,1.12-2.47,1.67-4.15,1.67s-3.04-.55-4.12-1.67Z"/>
      <path d="M585.15,751.24c1.3-2.02,3.61-3.04,6.91-3.04v4.31c-.39-.07-.74-.1-1.06-.1-1.76,0-3.14.52-4.14,1.54-.99,1.03-1.48,2.51-1.48,4.45v9.39h-4.54v-19.38h4.31v2.83Z"/>
      <path d="M609.73,750.26c-1.52-1.37-3.7-2.06-6.56-2.06-1.6,0-3.12.21-4.54.63-1.42.4-2.64.99-3.65,1.77l1.77,3.29c.72-.59,1.61-1.06,2.67-1.4,1.05-.34,2.12-.52,3.21-.52,1.59,0,2.79.37,3.6,1.11.82.72,1.23,1.76,1.23,3.1v.29h-5c-2.79,0-4.83.53-6.13,1.59-1.29,1.05-1.93,2.45-1.93,4.18,0,1.12.29,2.12.87,3,.6.89,1.44,1.59,2.52,2.09,1.1.48,2.38.73,3.84.73s2.67-.23,3.7-.67c1.03-.44,1.82-1.09,2.38-1.94v2.36h4.29v-11.37c0-2.75-.76-4.8-2.27-6.17ZM607.46,761.73c-.36.98-.99,1.73-1.88,2.25-.87.52-1.88.77-3.02.77s-2.07-.24-2.73-.72c-.65-.49-.97-1.14-.97-1.96,0-1.72,1.3-2.59,3.91-2.59h4.69v2.25Z"/>
      <path d="M629.44,766.73c-.53.45-1.18.78-1.94,1-.77.21-1.57.31-2.41.31-2.12,0-3.77-.55-4.93-1.67-1.16-1.11-1.73-2.73-1.73-4.87v-9.31h-3.21v-3.64h3.21v-4.41h4.52v4.41h5.2v3.64h-5.2v9.2c0,.95.23,1.67.69,2.17.47.5,1.13.75,2,.75,1.03,0,1.87-.27,2.54-.81l1.27,3.23Z"/>
      <path d="M650.74,758.21c0-1.98-.42-3.73-1.25-5.25-.83-1.51-2-2.68-3.5-3.52-1.49-.83-3.18-1.25-5.06-1.25s-3.62.43-5.15,1.27c-1.53.85-2.72,2.03-3.58,3.54-.87,1.52-1.29,3.22-1.29,5.11s.43,3.61,1.31,5.12c.88,1.52,2.14,2.7,3.77,3.55,1.62.84,3.5,1.27,5.62,1.27,1.68,0,3.18-.26,4.5-.8.97-.38,1.82-.9,2.55-1.56.27-.24.53-.51.77-.79l-2.44-2.81c-1.02,1.04-2.25,1.69-3.68,1.96-.5.09-1.02.14-1.57.14-1.68,0-3.08-.41-4.21-1.25-1.12-.83-1.82-1.96-2.08-3.39h15.2c.05-.57.08-1.01.08-1.34ZM635.42,756.56c.22-1.43.83-2.58,1.83-3.44,1.01-.86,2.24-1.29,3.69-1.29s2.72.43,3.71,1.31c1,.87,1.58,2.02,1.77,3.42h-10.99Z"/>
      <path d="M664.11,755.82h9.97v3.77h-9.97v-3.77Z"/>
      <path d="M701.27,768.15c-2.57,0-4.89-.56-6.95-1.69-2.07-1.12-3.7-2.68-4.87-4.66-1.17-1.98-1.75-4.22-1.75-6.7s.59-4.73,1.77-6.7c1.19-1.98,2.82-3.54,4.89-4.66,2.07-1.13,4.38-1.71,6.93-1.71,2.08,0,3.98.37,5.7,1.1,1.72.72,3.17,1.77,4.35,3.14l-3.04,2.87c-1.85-1.98-4.11-2.98-6.79-2.98-1.75,0-3.31.39-4.68,1.14-1.37.77-2.45,1.83-3.23,3.19-.78,1.35-1.17,2.88-1.17,4.6s.39,3.26,1.17,4.62c.78,1.35,1.85,2.4,3.23,3.16,1.37.77,2.94,1.14,4.68,1.14,2.68,0,4.94-1,6.79-3.02l3.04,2.89c-1.18,1.39-2.64,2.45-4.37,3.16-1.74.72-3.64,1.08-5.7,1.08Z"/>
      <path d="M732.43,752.99c-.88-1.5-2.11-2.67-3.69-3.52-1.57-.84-3.35-1.27-5.33-1.27s-3.73.43-5.32,1.27c-1.57.85-2.8,2.02-3.68,3.52s-1.32,3.21-1.32,5.13.44,3.61,1.32,5.12c.88,1.52,2.11,2.7,3.68,3.55,1.59.84,3.36,1.27,5.32,1.27.51,0,1.01-.03,1.5-.09,1.39-.16,2.67-.56,3.83-1.18,1.58-.85,2.81-2.03,3.69-3.55.27-.46.49-.93.68-1.43.43-1.13.65-2.37.65-3.69,0-1.92-.45-3.63-1.33-5.13ZM728.07,761.87h-.01c-.14.22-.32.43-.51.63-.41.43-.86.77-1.36,1.03h-.01c-.81.43-1.74.64-2.77.64-1.67,0-3.04-.55-4.13-1.67-1.07-1.12-1.6-2.58-1.6-4.39s.53-3.28,1.6-4.4c1.09-1.11,2.46-1.66,4.13-1.66s3.06.55,4.14,1.66c1.09,1.12,1.63,2.58,1.63,4.4,0,1.49-.37,2.73-1.11,3.75h0Z"/>
      <path d="M749.09,748.2c2.44,0,4.4.72,5.87,2.14,1.48,1.42,2.23,3.53,2.23,6.35v11.1h-4.54v-10.51c0-1.69-.41-2.97-1.21-3.83-.79-.86-1.93-1.29-3.39-1.29-1.68,0-3.01.5-3.98,1.5-.96,1-1.44,2.45-1.44,4.33v9.81h-4.54v-19.38h4.31v2.52c.75-.9,1.69-1.58,2.83-2.04,1.13-.46,2.42-.69,3.85-.69Z"/>
      <path d="M780.72,748.41l-8.31,19.38h-4.68l-8.31-19.38h4.73l6.02,14.36,6.2-14.36h4.35Z"/>
      <path d="M801.21,758.21c0-1.98-.41-3.73-1.25-5.25-.83-1.51-2-2.68-3.5-3.52-1.48-.83-3.17-1.25-5.06-1.25s-3.62.43-5.14,1.27c-1.53.85-2.73,2.03-3.59,3.54-.86,1.52-1.29,3.22-1.29,5.11s.44,3.61,1.31,5.12c.89,1.52,2.15,2.7,3.77,3.55,1.63.84,3.5,1.27,5.63,1.27,1.68,0,3.18-.26,4.5-.8.95-.37,1.79-.88,2.51-1.53.29-.25.55-.53.8-.82l-2.44-2.81c-1.03,1.05-2.27,1.71-3.72,1.97-.49.09-1,.13-1.53.13-1.68,0-3.08-.41-4.2-1.25-1.13-.83-1.83-1.96-2.09-3.39h15.2c.05-.57.08-1.01.08-1.34ZM785.9,756.56c.22-1.43.83-2.58,1.83-3.44,1.02-.86,2.24-1.29,3.69-1.29s2.72.43,3.71,1.31c1,.87,1.59,2.02,1.77,3.42h-10.99Z"/>
      <path d="M809.87,751.24c1.3-2.02,3.61-3.04,6.91-3.04v4.31c-.39-.07-.74-.1-1.06-.1-1.76,0-3.14.52-4.14,1.54-.99,1.03-1.48,2.51-1.48,4.45v9.39h-4.54v-19.38h4.31v2.83Z"/>
      <path d="M832.98,766.73c-.53.45-1.18.78-1.94,1-.77.21-1.57.31-2.41.31-2.12,0-3.77-.55-4.93-1.67-1.16-1.11-1.73-2.73-1.73-4.87v-9.31h-3.21v-3.64h3.21v-4.41h4.52v4.41h5.2v3.64h-5.2v9.2c0,.95.23,1.67.69,2.17.47.5,1.13.75,2,.75,1.03,0,1.87-.27,2.54-.81l1.27,3.23Z"/>
    </g>
  </svg>
)

function getPos(el: HTMLElement) {
  const r = el.getBoundingClientRect()
  return { x: r.right + 10, y: r.top + r.height / 2 }
}

export default function DashboardSidebar({
  active = 'home',
  onNavigate,
}: DashboardSidebarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [tooltip, setTooltip] = useState<TooltipState>(HIDDEN_TOOLTIP)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const hide = () => setTooltip(HIDDEN_TOOLTIP)
    window.addEventListener('scroll', hide, { capture: true, passive: true })
    return () => window.removeEventListener('scroll', hide, { capture: true })
  }, [])

  const showTooltip = useCallback(
    (e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>, label: string) => {
      if (isOpen) return
      const pos = getPos(e.currentTarget)
      setTooltip({ label, x: pos.x, y: pos.y, visible: true })
    },
    [isOpen]
  )

  const hideTooltip = useCallback(() => setTooltip(HIDDEN_TOOLTIP), [])

  const handleNavigate = (key: DashboardNavKey) => {
    onNavigate?.(key)
  }

  return (
    <>
      <style>
        {`
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(-15px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .nav-item-enter {
            animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
          }
        `}
      </style>

      <aside
        aria-label="Dashboard Navigation Sidebar"
        className={`flex flex-col shrink-0 h-full text-white transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative z-[50] shadow-[4px_0_32px_rgba(0,0,0,0.5)] bg-[linear-gradient(175deg,#2a1550_0%,#1A1A2E_30%,#16213E_60%,#1A1A2E_80%,#16213E_100%)] motion-reduce:transition-none ${
          !isOpen ? 'w-[72px]' : 'w-60'
        }`}
      >
        <div className="flex flex-col w-full overflow-hidden shrink-0 mt-2 px-3">
          <div className="flex items-center w-full h-10">
            <div className={`flex items-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${!isOpen ? 'justify-center w-full' : 'gap-3 px-1'}`}>
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="hover:scale-110 hover:bg-white/10 p-1.5 rounded-sm transition-all duration-300 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[#D946EF]"
                aria-label="Toggle menu"
              >
                <Menu size={24} className="text-white shrink-0" aria-hidden="true" />
              </button>
              <div className={`flex items-center transition-all duration-500 overflow-hidden ${!isOpen ? 'w-0 opacity-0 translate-x-4' : 'w-auto opacity-100 translate-x-0'}`}>
                <InlineLogo className="h-20 mt-0.5 w-auto text-white drop-shadow-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-3 my-2">
          <div className="border-t border-white/10 w-full shadow-[0_1px_2px_rgba(255,255,255,0.05)]" aria-hidden="true" />
        </div>

        <nav
          aria-label="Sidebar Menu"
          className="flex-1 overflow-y-auto overflow-x-hidden pb-2 flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none px-2"
        >
          <ul className="list-none p-0 m-0 flex flex-col gap-1 flex-1" role="list">
            {DASHBOARD_NAV_ITEMS.map(({ key, label, Icon }, index) => {
              const isActive = key === active
              return (
                <li 
                  key={key} 
                  className="relative group nav-item-enter"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <button
                    onClick={() => handleNavigate(key)}
                    onMouseEnter={(e) => showTooltip(e, label)}
                    onFocus={(e) => showTooltip(e, label)}
                    onMouseLeave={hideTooltip}
                    onBlur={hideTooltip}
                    aria-label={label}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center py-2 rounded-[8px] transition-all duration-300 bg-transparent border-none cursor-pointer active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-[#D946EF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A2E] motion-reduce:transition-none motion-reduce:transform-none ${
                      !isOpen ? 'justify-center px-0' : 'justify-start px-3 gap-3.5'
                    } ${
                      isActive
                        ? 'bg-white/10 shadow-[inset_0_0_20px_rgba(217,70,239,0.2),0_4px_12px_rgba(0,0,0,0.2)]'
                        : 'hover:bg-white/5 hover:translate-x-1'
                    }`}
                  >
                    <div className={`flex items-center justify-center rounded-[8px] shrink-0 transition-all duration-300 ${!isOpen ? 'w-full' : 'w-8 h-8'} ${isActive && isOpen ? 'bg-[#D946EF]/20 shadow-[0_0_15px_rgba(217,70,239,0.4)]' : 'group-hover:scale-110'}`}>
                      <Icon
                        size={!isOpen ? 22 : 18}
                        aria-hidden="true"
                        className={`shrink-0 transition-all duration-300 motion-reduce:transition-none ${
                          isActive ? 'text-[#D946EF] stroke-[2.5] drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]' : 'text-white/65 stroke-[1.8] group-hover:text-white'
                        }`}
                      />
                    </div>
                    
                    <div
                      className={`flex flex-col justify-center transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
                        !isOpen ? 'w-0 opacity-0 overflow-hidden translate-x-4' : 'flex-1 opacity-100 overflow-hidden translate-x-0'
                      }`}
                    >
                      <span className={`text-[0.875rem] text-left leading-tight font-semibold truncate transition-colors duration-300 ${isActive ? 'text-white drop-shadow-md' : 'text-white/80 group-hover:text-white'}`}>
                        {label}
                      </span>
                    </div>

                    {isActive && !isOpen && (
                      <span
                        aria-hidden="true"
                        className="absolute right-1 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-[#D946EF] shadow-[0_0_12px_rgba(217,70,239,0.9)] animate-pulse"
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          <div
            className={`mx-2 mt-2 mb-2 rounded-[8px] transition-all duration-500 overflow-hidden flex flex-col items-center justify-center bg-[linear-gradient(160deg,#2a1550_0%,#1A1A2E_60%,#16213E_100%)] shadow-[inset_0_0_20px_rgba(217,70,239,0.08),0_8px_24px_rgba(0,0,0,0.4)] hover:shadow-[inset_0_0_30px_rgba(217,70,239,0.15),0_12px_32px_rgba(0,0,0,0.5)] hover:border-[#D946EF]/40 hover:-translate-y-0.5 cursor-pointer ${
              !isOpen ? 'max-h-0 opacity-0 border-none m-0 p-0 scale-95' : 'max-h-32 p-3 opacity-100 border border-[#D946EF]/25 scale-100'
            }`}
          >
            <p className="text-[0.62rem] font-extrabold tracking-[0.14em] uppercase text-[#D946EF] m-0 mb-1 whitespace-nowrap drop-shadow-[0_0_5px_rgba(217,70,239,0.3)] transition-all duration-300 hover:scale-105">
              Premium Platform
            </p>
            <p className="text-[0.7rem] text-center text-white/65 leading-tight m-0 whitespace-nowrap transition-colors duration-300 hover:text-white/90">
              Built for visionaries.<br />Designed for excellence.
            </p>
          </div>
        </nav>

        <div className="px-2 pb-3 mt-auto">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Collapse menu' : 'Expand menu'}
            className={`group w-full flex items-center py-2 rounded-[8px] transition-all duration-300 bg-transparent border-none cursor-pointer active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-[#D946EF] hover:bg-white/10 hover:shadow-lg ${
              !isOpen ? 'justify-center px-0' : 'justify-start px-3 gap-3.5'
            }`}
          >
            <div className={`flex items-center justify-center rounded-[8px] shrink-0 transition-all duration-300 group-hover:scale-110 ${!isOpen ? 'w-full' : 'w-8 h-8'}`}>
              {isOpen ? (
                <PanelLeftClose size={!isOpen ? 22 : 18} className="text-white/65 stroke-[1.8] group-hover:text-white shrink-0 transition-all duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
              ) : (
                <PanelLeft size={!isOpen ? 22 : 18} className="text-white/65 stroke-[1.8] group-hover:text-white shrink-0 transition-all duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              )}
            </div>
            <div
              className={`flex flex-col justify-center transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
                !isOpen ? 'w-0 opacity-0 overflow-hidden translate-x-4' : 'flex-1 opacity-100 overflow-hidden translate-x-0'
              }`}
            >
              <span className="text-[0.875rem] leading-tight font-semibold truncate text-white/80 group-hover:text-white text-left transition-colors duration-300">
                Collapse
              </span>
            </div>
          </button>
        </div>
      </aside>

      {mounted &&
        tooltip.visible &&
        !isOpen &&
        createPortal(
          <div
            role="tooltip"
            style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
            className="fixed -translate-y-1/2 z-[10000] pointer-events-none flex items-center gap-0 animate-in fade-in zoom-in-95 slide-in-from-left-2 duration-200"
          >
            <div
              className="w-0 h-0 shrink-0 border-y-[6px] border-y-transparent border-r-[7px] border-r-[#2a1550]"
              aria-hidden="true"
            />
            <div className="bg-[linear-gradient(135deg,#2a1550_0%,#1A1A2E_100%)] border border-white/15 rounded-[8px] px-3 py-1.5 text-white/90 text-[12px] font-semibold whitespace-nowrap shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
              {tooltip.label}
            </div>
          </div>,
          document.body
        )}
    </>
  )
}