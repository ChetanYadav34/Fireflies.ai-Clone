'use client'

import { useState } from 'react'
import { 
  MessageSquare, Info, Calendar, CheckSquare, ChevronRight, 
  Plus, Video, Settings, Monitor, Smartphone, Mic, Layers, HelpCircle,
  Rss, UploadCloud, ArrowUp
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { AppLayout } from '@/components/layout/app-layout'
import { useModals } from '@/components/layout/modal-context'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'recent' | 'upcoming' | 'ai-feed'>('recent')
  const [isAssistantEnabled, setIsAssistantEnabled] = useState(true)
  const { setCaptureOpen, setFeedbackOpen, setSettingsOpen, setAssistantOpen } = useModals()

  return (
    <AppLayout>
      <div className="relative min-h-[calc(100vh-4rem)]">
        <main className="max-w-5xl mx-auto px-8 py-8 space-y-10 pb-32">
        {/* Header & Personal Assistant */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight flex items-center gap-2">
              Good Morning, User <span className="text-2xl">🌤️</span>
            </h1>
            <button 
              onClick={() => setFeedbackOpen(true)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Feedback
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                <span className="text-xl">✨</span>
                Personal Assistant
                <div className="group relative">
                  <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg z-10 text-center">
                    Consumes AI credits. Consumption varies by usage. View Breakdown
                  </div>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsAssistantEnabled(!isAssistantEnabled)
                  setAssistantOpen(true)
                }}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isAssistantEnabled ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAssistantEnabled ? 'translate-x-4' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/dashboard/ai-skills/DailyBrief" className="block bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                  <Rss className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Daily Brief</div>
                  <div className="text-sm text-gray-500">No brief yet</div>
                </div>
              </Link>
              
              <Link href="/dashboard/welcome/meeting-prep" className="block bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Meeting Prep</div>
                  <div className="text-sm text-gray-500">No upcoming meetings</div>
                </div>
              </Link>

              <Link href="/dashboard/welcome/tasks" className="block bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-green-50 text-green-500 flex items-center justify-center">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 flex items-center gap-2">
                    Tasks
                  </div>
                  <div className="text-sm text-gray-500">0 New tasks</div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-wider text-[13px]">Quick Start</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/welcome/meeting-prep" className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center gap-4 group block">
              <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Schedule Meeting</div>
                <div className="text-xs text-gray-500 leading-snug mt-0.5">Invite Fireflies to your upcoming calls</div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
            </Link>

            <Link href="/dashboard/uploads" className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center gap-4 group block">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center shrink-0">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Upload File</div>
                <div className="text-xs text-gray-500 leading-snug mt-0.5">Transcribe an existing audio/video</div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
            </Link>

            <button onClick={() => setCaptureOpen(true)} className="group bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex items-start gap-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                <Video className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 flex items-center justify-between">
                  Capture Meeting
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition-colors" />
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Record a live meeting right now
                </p>
              </div>
            </button>
          </div>
        </section>

        {/* Tabs Area */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-px">
            <div className="flex gap-6">
              {(['recent', 'upcoming', 'ai-feed'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium transition-colors relative ${
                    activeTab === tab 
                      ? 'text-primary' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'recent' && 'Recent'}
                  {tab === 'upcoming' && 'Upcoming'}
                  {tab === 'ai-feed' && 'AI Feed'}
                  {activeTab === tab && (
                    <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-primary rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
            
            <button onClick={() => setSettingsOpen(true)} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium pb-3">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden min-h-[200px]">
            {activeTab === 'recent' && (
              <div className="divide-y divide-gray-100">
                <Link href="/dashboard/meeting" className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group block">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                      <Image src="/download.png" alt="Fireflies" width={24} height={24} className="w-6 h-6 object-contain" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">fireflies test</div>
                      <div className="text-[13px] text-gray-500">Aug 14 • 12:22 AM</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-gray-400 hover:text-gray-600"><Layers className="w-4 h-4" /></button>
                    <button className="text-gray-400 hover:text-gray-600">•••</button>
                  </div>
                </Link>
                
                <div className="p-6 flex justify-center">
                  <span className="px-3 py-1 bg-purple-50 text-primary text-xs font-medium rounded-full">All caught up!</span>
                </div>
              </div>
            )}
            
            {activeTab === 'upcoming' && (
              <div className="flex flex-col items-center justify-center p-12 text-center gap-4">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                  <Calendar className="w-8 h-8" />
                </div>
                <div className="text-gray-500 font-medium">No upcoming meetings scheduled</div>
                <button onClick={() => setCaptureOpen(true)} className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2 mt-2">
                  <Video className="w-4 h-4" />
                  Capture
                </button>
              </div>
            )}

            {activeTab === 'ai-feed' && (
              <div className="p-6 space-y-4">
                <h3 className="font-medium text-gray-900">Extract specific insights from your meetings ✨</h3>
                <div className="bg-teal-50/50 rounded-xl p-4 border border-teal-100/50 space-y-4">
                  <div className="text-sm font-medium text-gray-700">Recommended Skills</div>
                  <div className="space-y-3">
                    {['1:1', 'Idea Generator', 'Daily Standups'].map((skill) => (
                      <div key={skill} className="flex items-center justify-between bg-white p-3 rounded-lg border border-teal-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-teal-50 rounded-md flex items-center justify-center text-teal-600">
                            <Layers className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-gray-800 text-sm">{skill}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                            <span className="text-yellow-400">⚡</span> 306k
                          </span>
                          <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-200 transition-colors">
                            <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Try More */}
        <section className="space-y-4 pt-4">
          <h2 className="text-lg font-semibold text-gray-900">Try More</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-blue-500 mb-4">
                <Monitor className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Desktop App</h3>
              <p className="text-sm text-gray-600 mb-6 min-h-[40px]">
                Capture conversations without any bot present in your meeting.
              </p>
              <button className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 py-2.5 text-sm font-medium transition-colors">
                Download
              </button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-pink-500 mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mobile App</h3>
              <p className="text-sm text-gray-600 mb-6 min-h-[40px]">
                Record in-person conversations and review meetings on the go.
              </p>
              <div className="flex gap-3">
                <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg p-2.5 transition-colors">
                  {/* Apple Icon */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.05 2.53.68 3.14.68.65 0 1.95-.73 3.41-.63 1.39.06 2.65.55 3.53 1.54-3.02 1.65-2.55 5.56.32 6.64-1.05 2.15-2.22 4.19-2.4 3.74zm-2.92-14.8c.61-1.35.53-2.79-.19-3.95-1.32.18-2.73.95-3.47 2.18-.55 1.1-.73 2.5.02 3.73 1.33-.2 2.76-1.12 3.64-1.96z"/>
                  </svg>
                </button>
                <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg p-2.5 transition-colors">
                  {/* Google Play Icon */}
                  <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.73 2.51c-.13.13-.23.36-.23.68v17.62c0 .32.1.55.23.68l.06.06 9.87-9.87v-.12L3.79 2.45l-.06.06zM14.54 12.5l2.4 2.4-3.28 1.89-6.3-6.29 7.18 2zM19.12 9.85l-2.18-1.25-2.4 2.4v.12l2.4 2.4 2.18-1.25c.62-.35.62-1.67 0-2.02v-.4zM16.94 8.6L9.76 4.5l3.88 3.88 3.3-2zM3.5 12h-2c0-5.52 4.48-10 10-10v2c-4.41 0-8 3.59-8 8z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Elements */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[600px] z-40">
        <div className="bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex items-center p-2 px-4 gap-3">
          <div className="flex-1 flex items-center gap-3">
            <span className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold text-gray-500">AskFred</span>
            <input 
              type="text" 
              placeholder="Ask anything here or press Ctrl + J..." 
              className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-700"
            />
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Layers className="w-5 h-5 hover:text-gray-600 cursor-pointer" />
            <Mic className="w-5 h-5 hover:text-gray-600 cursor-pointer" />
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white cursor-pointer hover:bg-primary/90 ml-1">
              <ArrowUp className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      <button className="fixed bottom-8 right-8 w-12 h-12 bg-[#5E35B1] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#5E35B1]/90 transition-colors z-40">
        <HelpCircle className="w-6 h-6" />
      </button>
      </div>
    </AppLayout>
  )
}

