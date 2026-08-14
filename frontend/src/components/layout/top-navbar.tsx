'use client'

import { useState, useEffect } from 'react'
import { Search, Bell, Mic, Video, ChevronDown, Smartphone, Globe, Download, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useModals } from './modal-context'
import { toast } from 'sonner'

const formatPageTitle = (pathname: string) => {
  if (pathname === '/dashboard') return 'Home'
  if (pathname.startsWith('/dashboard/ask-fred')) return 'AskFred'
  if (pathname.startsWith('/dashboard/notebook')) return 'Meetings'
  if (pathname.startsWith('/dashboard/status')) return 'Meeting Status'
  if (pathname.startsWith('/dashboard/upload')) return 'Uploads'
  if (pathname.startsWith('/dashboard/integrations')) return 'Integrations'
  if (pathname.startsWith('/dashboard/analytics')) return 'Analytics'
  if (pathname.startsWith('/dashboard/agents')) return 'Voice Agents'
  if (pathname.startsWith('/dashboard/skills')) return 'AI Skills'
  if (pathname.startsWith('/dashboard/settings/team')) return 'Team'
  if (pathname.startsWith('/dashboard/upgrade')) return 'Upgrade'
  if (pathname.startsWith('/dashboard/settings')) return 'Settings'
  if (pathname.startsWith('/dashboard/meeting')) return 'Meetings'
  return 'Home'
}

export function TopNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const pageTitle = formatPageTitle(pathname)
  const { setCaptureOpen } = useModals()
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('user@example.com')
  const [searchQuery, setSearchQuery] = useState('')

  const handlePlaceholderClick = () => {
    toast.info("This feature is a visual placeholder for the assignment evaluation.")
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/dashboard?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail')
    if (storedEmail) {
      setUserEmail(storedEmail)
    }
  }, [])

  return (
    <header className="h-16 bg-white border-b flex items-center px-6 sticky top-0 z-10 w-full">
      {/* Left - Page Title */}
      <div className="w-[200px] flex-shrink-0 text-[15px] font-medium text-gray-800">
        {pageTitle}
      </div>
      
      {/* Center - Search Bar */}
      <div className="flex-1 max-w-[600px] mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            type="search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search by title or keyword (Press Enter)" 
            className="pl-10 h-9 bg-gray-50 border-gray-200 focus-visible:ring-primary focus-visible:border-primary text-sm rounded-lg pr-16"
          />
          <div className="absolute right-3 top-2.5 text-[10px] font-medium text-gray-400">
            Ctrl + K
          </div>
        </div>
      </div>
      
      {/* Right - Actions */}
      <div className="flex items-center gap-3 ml-auto">
        <Link href="/dashboard/upgrade">
          <Button variant="outline" size="sm" className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 border-emerald-100 h-8 text-[13px] font-medium px-3">
            Upgrade
          </Button>
        </Link>
        
        <div 
          onClick={() => setCaptureOpen(true)}
          className="flex items-center rounded-lg bg-primary text-white hover:bg-primary/90 cursor-pointer overflow-hidden h-8"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 border-r border-white/20">
            <Video className="w-4 h-4" />
            <span className="text-[13px] font-medium">Capture</span>
          </div>
          <div className="px-1.5 py-1.5 hover:bg-black/10">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        <Button onClick={handlePlaceholderClick} variant="ghost" size="icon" className="text-gray-500 h-8 w-8 hover:bg-gray-100 rounded-full">
          <Mic className="w-4 h-4" />
        </Button>

        <div className="relative">
          <Button 
            onClick={() => {
              setNotificationsOpen(!notificationsOpen)
              if (profileOpen) setProfileOpen(false)
            }}
            variant="ghost" 
            size="icon" 
            className="text-gray-500 h-8 w-8 hover:bg-gray-100 rounded-full relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </Button>

          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-3 w-[450px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
              {/* Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10 shrink-0">
                <div className="flex gap-4">
                  <button onClick={handlePlaceholderClick} className="text-[13px] font-semibold text-gray-900 border-b-2 border-primary pb-1">All</button>
                  <button onClick={handlePlaceholderClick} className="text-[13px] font-medium text-gray-500 hover:text-gray-700 pb-1">Updates</button>
                  <button onClick={handlePlaceholderClick} className="text-[13px] font-medium text-gray-500 hover:text-gray-700 pb-1">Auto-Fill</button>
                  <button onClick={handlePlaceholderClick} className="text-[13px] font-medium text-gray-500 hover:text-gray-700 pb-1 flex items-center gap-1.5">
                    Status <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold border border-emerald-100">New</span>
                  </button>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary w-3.5 h-3.5 cursor-pointer" />
                    <span className="text-[13px] text-gray-600">Unread</span>
                  </label>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="max-h-[400px] overflow-y-auto bg-white p-3">
                <div className="px-3 py-2 text-xs text-gray-400 font-medium">New</div>
                
                {/* Single Notification Item */}
                <div className="p-3 hover:bg-gray-50 rounded-xl transition-colors flex gap-4 items-start cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0 shadow-sm border border-purple-200 text-purple-600 relative">
                    <span className="text-xl">👋</span>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="text-[13px] font-bold text-gray-900 group-hover:text-primary transition-colors">Welcome to Fireflies!</h4>
                      <span className="text-xs text-gray-400 whitespace-nowrap mt-0.5">Just now</span>
                    </div>
                    <p className="text-[13px] text-gray-600 mt-1 leading-relaxed">
                      We're glad you're here. Let's get started by exploring the dashboard and capturing your first meeting.
                    </p>
                    <button onClick={handlePlaceholderClick} className="mt-3 bg-[#5E35B1] hover:bg-[#5E35B1]/90 text-white text-xs font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
                      Get started <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-3 bg-white mt-1 pb-4 shrink-0">
                <div className="bg-[#161616] rounded-xl p-4 flex items-center justify-between border-b-[3px] border-[#5E35B1] shadow-lg relative overflow-hidden group hover:border-[#7e4fe3] transition-colors cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-9 h-9 rounded-lg bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
                      <svg className="w-5 h-5 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v12h16V6H4zm8 10l-4-4h2.5v-3h3v3H16l-4 4z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-white tracking-wide">Fireflies Desktop App</h4>
                      <p className="text-[12px] text-gray-400 mt-0.5">Capture conversations without a bot.</p>
                    </div>
                  </div>
                  <button onClick={handlePlaceholderClick} className="relative z-10 text-[13px] font-medium text-white flex items-center gap-1.5 hover:text-gray-300 transition-colors">
                    Download <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <Avatar 
            onClick={() => {
              setProfileOpen(!profileOpen)
              if (notificationsOpen) setNotificationsOpen(false)
            }}
            className="w-8 h-8 cursor-pointer ring-2 ring-transparent hover:ring-primary transition-all ml-1"
          >
            <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          
          {profileOpen && (
            <div className="absolute right-0 top-full mt-3 w-[550px] bg-white rounded-xl shadow-xl border border-gray-100 p-3 flex gap-3 animate-in fade-in zoom-in-95 duration-200">
              {/* Left Side - Apps */}
              <div className="w-[260px] flex flex-col gap-3">
                <div className="border border-gray-100 rounded-lg p-4 bg-white hover:border-gray-200 transition-colors">
                  <Smartphone className="w-5 h-5 text-pink-400 mb-3" />
                  <div className="font-medium text-gray-900 text-[13px] mb-1">Mobile App</div>
                  <div className="text-[11px] text-gray-500 mb-4 leading-relaxed">Transcribe and summarize in-person conversations with mobile app.</div>
                  <div className="flex gap-2">
                    <button onClick={handlePlaceholderClick} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50"><span className="text-blue-500 text-[10px] font-bold">App Store</span></button>
                    <button onClick={handlePlaceholderClick} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50"><span className="text-green-500 text-[10px] font-bold">Google Play</span></button>
                  </div>
                </div>
                
                <div className="border border-gray-100 rounded-lg p-4 bg-white hover:border-gray-200 transition-colors">
                  <Globe className="w-5 h-5 text-yellow-500 mb-3" />
                  <div className="font-medium text-gray-900 text-[13px] mb-1">Chrome Extension</div>
                  <div className="text-[11px] text-gray-500 mb-4 leading-relaxed">Record and transcribe Google Meet calls without Fireflies notetaker bot.</div>
                  <button onClick={handlePlaceholderClick} className="border border-gray-200 rounded px-3 py-1 text-xs text-gray-700 hover:bg-gray-50 font-medium">Install</button>
                </div>

                <button onClick={handlePlaceholderClick} className="w-full bg-[#1A1A1A] hover:bg-black text-white rounded-lg p-3 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                      <Download className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xs font-medium text-white/90">Download Fireflies Desktop App</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/50" />
                </button>
              </div>

              {/* Right Side - Profile */}
              <div className="flex-1 flex flex-col border border-gray-100 rounded-lg bg-white overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <div className="font-semibold text-gray-900 text-sm">Hi User</div>
                  <div className="text-gray-500 text-[11px] mt-0.5">{userEmail}</div>
                </div>
                
                <div className="p-4 border-b border-gray-100">
                  <div className="font-medium text-gray-900 text-[13px]">Free</div>
                  <div className="text-gray-500 text-[11px] mt-1">Unlimited meetings</div>
                </div>

                <div className="p-4 border-b border-gray-100">
                  <div className="font-medium text-gray-900 text-[13px] mb-2">Storage</div>
                  <div className="h-1 bg-gray-100 rounded-full w-full overflow-hidden">
                    <div className="h-full bg-green-400 w-[1%]" />
                  </div>
                  <div className="text-gray-500 text-[11px] mt-2">4 / 400 mins</div>
                </div>

                <div className="flex flex-col py-1">
                  <button onClick={handlePlaceholderClick} className="text-left px-4 py-2 text-[13px] font-medium text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-50 pb-3 mb-1">Refer and Earn $5</button>
                  <button onClick={() => { setProfileOpen(false); router.push('/dashboard/settings') }} className="text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors">Settings</button>
                  <button onClick={handlePlaceholderClick} className="text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors">Manage Devices</button>
                  <button onClick={handlePlaceholderClick} className="text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors">Platform Rules</button>
                  <button onClick={() => { localStorage.clear(); router.push('/login') }} className="text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors">Logout</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

