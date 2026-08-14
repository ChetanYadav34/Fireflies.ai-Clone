'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { Plus, Video, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useModals } from '@/components/layout/modal-context'

export default function MeetingPrepPage() {
  const [prepEnabled, setPrepEnabled] = useState(true)
  const { setCaptureOpen } = useModals()

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-4rem)] bg-white overflow-hidden">
        {/* Inner Contextual Sidebar */}
        <div className="w-[300px] border-r border-gray-200 flex flex-col bg-gray-50/30 shrink-0">
          <div className="p-5 border-b border-gray-200">
            <div className="text-[13px] font-medium text-gray-500 mb-4 flex items-center gap-1">
              <Link href="/dashboard" className="hover:text-primary transition-colors cursor-pointer">&larr; Home</Link>
              <span>/</span>
              <span className="text-gray-900">Meeting Prep</span>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900">Meeting Prep</h2>
              <button 
                onClick={() => setPrepEnabled(!prepEnabled)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${prepEnabled ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${prepEnabled ? 'translate-x-4' : 'translate-x-1'}`} />
              </button>
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Prepare for upcoming meetings with past context, open items and participant insights.
            </p>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Upcoming Meetings</div>
              <div className="flex items-center gap-3">
                <button className="text-xs text-primary font-medium hover:underline">Join All</button>
                <button className="text-gray-400 hover:text-gray-600"><Plus className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="text-center py-10 px-4">
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                No meetings in the next week. Schedule a meeting on your calendar or transcribe a live meeting.
              </p>
              <button onClick={() => setCaptureOpen(true)} className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors">
                <Plus className="w-4 h-4" />
                Capture
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area (Empty State) */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white p-8 text-center relative min-w-0">
          <div className="w-48 h-48 mb-8 relative">
            {/* SVG Placeholder matching empty state illustration */}
            <svg className="w-full h-full text-gray-200" viewBox="0 0 200 200" fill="currentColor">
               <circle cx="100" cy="100" r="80" fill="#F3F4F6" />
               <rect x="70" y="60" width="60" height="80" rx="8" fill="#E5E7EB" />
               <path d="M85 80h30M85 100h30M85 120h15" stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">No upcoming meetings to prepare for</h2>
          <p className="text-[15px] text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
            Review key takeaways from past meetings and get insights on participants.
          </p>
          
          <button onClick={() => setCaptureOpen(true)} className="flex items-center justify-center gap-2 bg-primary text-white rounded-xl px-6 py-3 text-[15px] font-medium hover:bg-primary/90 transition-colors shadow-sm">
            <Video className="w-5 h-5" />
            Capture Meeting
          </button>
        </div>
      </div>
    </AppLayout>
  )
}

