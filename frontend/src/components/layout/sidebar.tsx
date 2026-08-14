'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { 
  Home, Bot, Video, Activity, UploadCloud, Layers, 
  BarChart2, Headset, Wand2, Users, Star, Settings, 
  MoreHorizontal, Lock, Plus, ChevronsLeft, ChevronsRight, X
} from 'lucide-react'

const topNavItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/ask-fred', label: 'AskFred', icon: Bot, shortcut: 'Ctrl + J' },
  { href: '/dashboard/notebook/mine-shared', label: 'Meetings', icon: Video },
  { href: '/dashboard/status', label: 'Meeting Status', icon: Activity },
  { href: '/dashboard/upload', label: 'Uploads', icon: UploadCloud },
]

const bottomNavItems = [
  { href: '/dashboard/integrations', label: 'Integrations', icon: Layers },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/dashboard/agents', label: 'Voice Agents', icon: Headset, badge: 'NEW' },
  { href: '/dashboard/skills', label: 'AI Skills', icon: Wand2 },
  { href: '/dashboard/settings/team/members-and-groups', label: 'Team', icon: Users },
  { href: '/dashboard/upgrade', label: 'Upgrade', icon: Star },
  { href: '/dashboard/settings/meeting-recording', label: 'Settings', icon: Settings },
  { href: '#', label: 'More', icon: MoreHorizontal },
]

interface SidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (v: boolean) => void
}

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname()
  const [hideBanner, setHideBanner] = useState(false)

  const navItems = [...topNavItems, { separator: true, key: 'sep1' }, ...bottomNavItems]

  return (
    <aside className={`group bg-white border-r h-screen fixed left-0 top-0 hidden md:flex flex-col transition-all duration-300 z-50 ${isCollapsed ? 'w-[64px]' : 'w-[260px]'}`}>
      {/* Logo */}
      <div className={`px-4 py-5 flex items-center relative ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed ? (
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-[22px] text-gray-900 tracking-tight">
            <Image src="/logo.svg" alt="Fireflies.ai Logo" width={117} height={24} className="h-6 w-auto object-contain" />
          </Link>
        ) : (
          <Link href="/dashboard" className="flex justify-center w-full">
            <Image src="/logo.png" alt="Fireflies.ai" width={24} height={24} className="h-6 w-6 object-contain" />
          </Link>
        )}

        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100
            ${isCollapsed ? 'absolute top-5 right-[20px] bg-white border shadow-sm z-50' : ''}`}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronsRight className="w-3.5 h-3.5" /> : <ChevronsLeft className="w-4 h-4" />}
        </button>
      </div>
      
      {/* Navigation Links */}
      <nav className={`flex-1 overflow-y-auto pb-4 scrollbar-thin ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <ul className="space-y-0.5">
          {navItems.map((item: any) => {
            if (item.separator) {
              return <li key={item.key} className="h-px bg-gray-100 my-2 mx-2" />
            }
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href!))
            return (
              <li key={item.label}>
                <Link 
                  href={item.href!} 
                  className={`flex items-center px-3 py-2 text-[14px] font-medium rounded-lg transition-colors group relative
                    ${isActive 
                      ? 'bg-purple-50 text-primary' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                    ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'text-gray-500 group-hover:text-gray-700'}`} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>
                  {!isCollapsed && (
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-500 text-white leading-none">
                          {item.badge}
                        </span>
                      )}
                      {item.shortcut && (
                        <span className="text-xs text-gray-400 font-normal">
                          {item.shortcut}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className={`p-4 border-t border-gray-100 space-y-4 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
        <button className={`flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 px-2 font-medium w-full ${isCollapsed ? 'justify-center' : ''}`} title={isCollapsed ? "Your Privacy Choices" : ""}>
          <Lock className="w-3.5 h-3.5 shrink-0" />
          {!isCollapsed && <span>Your Privacy Choices</span>}
        </button>

        {!isCollapsed && !hideBanner && (
          <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-3 relative">
            <button 
              onClick={() => setHideBanner(true)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <p className="text-xs text-gray-600 leading-relaxed pr-4">
              Invite coworkers to your Fireflies team
            </p>
            <button 
              onClick={() => alert("Create Team clicked!")}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-2 text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Create Team
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}

