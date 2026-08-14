'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetchMeetings, deleteMeeting, Meeting } from '@/lib/api'

import { AppLayout } from '@/components/layout/app-layout'
import { Video, Bot, Search, Plus, SlidersHorizontal, MessageSquare, ChevronDown, Mic, ArrowUp, Layers, MoreVertical, ChevronRight, Trash2 } from 'lucide-react'

export default function MeetingsPage() {
  const [activeView, setActiveView] = useState<'my-meetings' | 'all-meetings' | 'voice-agents'>('my-meetings')
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (activeView === 'my-meetings' || activeView === 'all-meetings') {
      setLoading(true)
      fetchMeetings(searchQuery).then(data => {
        setMeetings(data.items)
        setLoading(false)
      }).catch(err => {
        console.error(err)
        setLoading(false)
      })
    }
  }, [activeView, searchQuery])

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Are you sure you want to delete this meeting?')) {
      try {
        await deleteMeeting(id)
        setMeetings(meetings.filter(m => m.id !== id))
      } catch(err) {
        alert('Failed to delete meeting')
      }
    }
  }

  return (
    <AppLayout>
      <main className="flex-1 flex overflow-hidden">
          
          {/* Inner Left Sidebar */}
          <div className="w-64 border-r border-gray-200 bg-gray-50/30 flex flex-col shrink-0">
            <div className="p-4">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search channels or meetings..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                />
              </div>

              <div className="space-y-1 mb-8">
                <button 
                  onClick={() => setActiveView('my-meetings')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${activeView === 'my-meetings' ? 'text-primary bg-primary/10' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <span className="text-gray-400 text-lg">#</span>
                  My Meetings
                </button>
                <button 
                  onClick={() => setActiveView('all-meetings')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${activeView === 'all-meetings' ? 'text-primary bg-primary/10' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Layers className="w-4 h-4 text-gray-500" />
                  All Meetings
                </button>
                <button 
                  onClick={() => setActiveView('voice-agents')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${activeView === 'voice-agents' ? 'text-primary bg-primary/10' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Bot className="w-4 h-4 text-gray-500" />
                  Voice Agent Meetings
                </button>
              </div>

              <div>
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">All channels</h3>
                <p className="text-xs text-gray-500 mb-4 px-3 leading-relaxed">
                  Create channels to organize your conversations
                </p>
                <button className="flex items-center gap-2 text-primary font-medium text-sm px-3 hover:underline">
                  <Plus className="w-4 h-4" />
                  Channel
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content Area (Meetings List) */}
          <div className="flex-1 flex flex-col bg-white">
            <div className="flex-1 p-6 flex flex-col h-full">
              
              {/* Header inside meetings */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <div className="flex bg-gray-50/80 border border-gray-200 rounded-lg p-0.5">
                  <button className="px-4 py-1.5 text-sm font-medium bg-white shadow-sm rounded-md text-gray-900">
                    Hosted by me
                  </button>
                  <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Shared with me
                  </button>
                </div>
                
                <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
              </div>

              {/* Main Area based on activeView */}
              {activeView === 'voice-agents' ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center pb-20">
                  <div className="w-24 h-24 mb-6 relative">
                     <svg className="w-full h-full text-gray-200" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="#F3F4F6"/>
                        <rect x="25" y="30" width="50" height="40" rx="8" fill="#E5E7EB"/>
                     </svg>
                  </div>
                  <h2 className="text-[22px] font-bold text-gray-900 mb-2">Let a voice agent take your meetings</h2>
                  <p className="text-[15px] text-gray-500 max-w-md mx-auto mb-8">
                    Create a voice agent to attend meetings on your behalf, or explore existing agents.
                  </p>
                  <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-[15px] font-medium flex items-center gap-2 mx-auto transition-colors shadow-sm">
                    <Plus className="w-5 h-5" />
                    Create
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  {/* List Header */}
                  <div className="flex items-center justify-between py-2 mb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                      <span className="text-sm font-semibold text-gray-900">Today</span>
                    </div>
                    <button className="text-sm text-gray-500 hover:text-gray-700">Feedback</button>
                  </div>

                  {/* Meeting Item */}
                  {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading meetings...</div>
                  ) : meetings.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No meetings found.</div>
                  ) : (
                    meetings.map(meeting => (
                      <div 
                        key={meeting.id}
                        onClick={() => router.push(`/dashboard/meeting/${meeting.id}`)}
                        className="group flex items-center justify-between p-4 bg-white hover:bg-gray-50/80 border border-transparent hover:border-gray-200 rounded-xl transition-all cursor-pointer mb-2"
                      >
                        <div className="flex items-center gap-4">
                          <input type="checkbox" onClick={e => e.stopPropagation()} className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm shadow-sm border border-blue-200">
                            {meeting.title.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-[15px] font-semibold text-gray-900 mb-0.5">{meeting.title}</h3>
                            <div className="flex items-center gap-2 text-[13px] text-gray-500">
                              <span>{meeting.participants?.map(p => p.name).join(', ') || 'Unknown'}</span>
                              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                              <span>{new Date(meeting.date).toLocaleDateString()}</span>
                              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                              <span>{Math.round(meeting.duration_seconds / 60)} min</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => handleDelete(meeting.id, e)}
                            className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete Meeting"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          <button className="flex items-center gap-1 bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-50">
                            Details <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                  
                  <div className="text-center text-sm text-gray-400 mt-8">
                    You've reached the end of your meetings.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ask Fred Right Sidebar Mockup */}
          <div className="w-[380px] border-l border-gray-200 bg-[#FAFAFA] flex flex-col hidden lg:flex relative h-[calc(100vh-64px)] overflow-hidden">
            {/* Ask Fred Header */}
            <div className="h-12 border-b border-gray-200 px-4 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center text-primary">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm text-gray-900">Ask Fred</span>
              </div>
              <div className="flex items-center gap-2">
                 <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded">
                   <MessageSquare className="w-4 h-4" />
                 </button>
                 <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded">
                   <Plus className="w-4 h-4" />
                 </button>
              </div>
            </div>
            
            {/* Connect Banner */}
            <div className="p-4 shrink-0 bg-white border-b border-gray-100">
               <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-3 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                     <div className="flex -space-x-1">
                        <div className="w-6 h-6 rounded bg-white shadow-sm flex items-center justify-center border border-gray-100">S</div>
                        <div className="w-6 h-6 rounded bg-white shadow-sm flex items-center justify-center border border-gray-100">G</div>
                     </div>
                     <p className="text-xs text-gray-700 leading-tight">
                       <span className="font-semibold">Connect Slack and Gmail</span> — get answers with full context.
                     </p>
                  </div>
                  <button className="text-primary text-xs font-semibold pr-2">Connect</button>
               </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center">
              <div className="max-w-[280px]">
                <Bot className="w-6 h-6 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">Hi User!<br/>Get ready for your meeting</h3>
                
                <div className="space-y-2 mt-6">
                  <button className="w-full text-left bg-white border border-gray-200 rounded-lg p-2.5 text-[13px] text-gray-700 flex items-center gap-3 hover:border-gray-300 shadow-sm transition-colors">
                    <span className="text-green-500">✓</span>
                    My action items
                  </button>
                  <button className="w-full text-left bg-white border border-gray-200 rounded-lg p-2.5 text-[13px] text-gray-700 flex items-center gap-3 hover:border-gray-300 shadow-sm transition-colors">
                    <span className="text-blue-500">◎</span>
                    Key decisions
                  </button>
                  <button className="w-full text-left bg-white border border-gray-200 rounded-lg p-2.5 text-[13px] text-gray-700 flex items-center gap-3 hover:border-gray-300 shadow-sm transition-colors">
                    <span className="text-red-500">📌</span>
                    Key initiatives
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-gray-200 shrink-0">
               <div className="border border-gray-200 rounded-xl p-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary shadow-sm bg-white">
                 <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 bg-gray-50 w-fit px-2 py-1 rounded">
                   <span className="text-gray-400">#</span> My Meetings
                 </div>
                 <input 
                   type="text" 
                   placeholder="Ask anything. Type / to run AI skills."
                   className="w-full outline-none text-sm placeholder:text-gray-400 bg-transparent"
                 />
                 <div className="flex items-center justify-between mt-3">
                   <div className="flex items-center gap-3 text-gray-400">
                     <Plus className="w-4 h-4 cursor-pointer hover:text-gray-600" />
                     <Search className="w-4 h-4 cursor-pointer hover:text-gray-600" />
                   </div>
                   <div className="flex items-center gap-3">
                     <Mic className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                     <button className="w-7 h-7 rounded bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors">
                       <ArrowUp className="w-4 h-4" />
                     </button>
                   </div>
                 </div>
               </div>
            </div>

          </div>
        </main>
    </AppLayout>
  )
}

