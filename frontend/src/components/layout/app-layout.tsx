'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from './sidebar'
import { TopNavbar } from './top-navbar'
import { GlobalModals } from '../home/modals'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [hideBanner, setHideBanner] = useState(false)
  const pathname = usePathname()
  const isSettings = pathname?.startsWith('/settings')

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex font-sans">
      {!isSettings && <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${!isSettings ? (isCollapsed ? 'md:ml-[64px]' : 'md:ml-[260px]') : ''}`}>
        {!hideBanner && (
          <div className="bg-purple-50 text-purple-700 text-[13px] font-medium py-2 px-6 flex items-center justify-center relative border-b border-purple-100">
            <span>You are eligible for 7 days business plan free trial. <a href="#" className="font-semibold hover:underline">Start free trial &rarr;</a></span>
            <button onClick={() => setHideBanner(true)} className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600 text-xl leading-none flex items-center justify-center">&times;</button>
          </div>
        )}
        <TopNavbar />
        {children}
        <GlobalModals />
      </div>
    </div>
  )
}

