'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { Bot, MessageSquare, Play, Video, Search, FastForward, Rewind, Download, Star, CheckSquare, ThumbsUp, ThumbsDown, ChevronDown, Copy, Settings, ArrowUp, Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function TranscriptPage() {
  const [rightTab, setRightTab] = useState<'askfred' | 'transcript'>('transcript')

  return (
    <AppLayout>
      {/* Transcript Page Wrapper (hides global sidebar if possible, but assuming standard AppLayout here) */}
      <div className="flex-1 bg-white flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
        
        {/* Breadcrumb Header */}
        <div className="h-14 border-b border-gray-200 px-6 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <Link href="/dashboard/meetings" className="hover:text-primary transition-colors"># All Meetings</Link>
            <span>/</span>
            <span className="text-gray-900">fireflies test</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Share
            </button>
            <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Split Content */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Pane: Notes & Summary */}
          <div className="flex-1 flex flex-col border-r border-gray-200 bg-white overflow-y-auto">
            <div className="p-8 max-w-4xl mx-auto w-full">
              
              <div className="flex items-center gap-4 mb-6">
                <button className="px-4 py-1.5 bg-gray-100 text-gray-900 text-sm font-semibold rounded-md border border-gray-200">
                  Notes
                </button>
                <button className="px-4 py-1.5 text-gray-500 hover:text-gray-700 text-sm font-medium">
                  AI Skills
                </button>
              </div>

              {/* Meeting Meta Header */}
              <div className="flex items-start justify-between mb-8 pb-8 border-b border-gray-100">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">fireflies test</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs">G</div>
                      <span className="font-medium text-gray-700">User</span>
                    </div>
                    <span>Aug 14, 2026</span>
                    <span>10:00 AM</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">English (Global)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-1">
                  <button className="px-3 py-1.5 bg-white shadow-sm border border-gray-200 rounded-md text-sm font-medium flex items-center gap-2">
                    <Video className="w-4 h-4" /> Video
                  </button>
                  <button className="px-3 py-1.5 text-gray-500 hover:text-gray-700 text-sm font-medium">
                    Audio
                  </button>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
                    General Summary <ChevronDown className="w-4 h-4" />
                  </button>
                  <button className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                    Refine Summary <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                <button className="p-1.5 text-gray-400 hover:text-gray-600">
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              {/* Summary Content */}
              <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
                <div>
                  <h3 className="text-gray-900 font-bold flex items-center gap-2">Notes</h3>
                  <p>
                    <span className="text-primary font-medium cursor-pointer hover:underline">00:00</span> The meeting aimed to discuss the UI redesign project and establish key milestones for the next sprint.
                  </p>
                  <p>
                    <span className="text-primary font-medium cursor-pointer hover:underline">12:34</span> The team agreed that the sidebar navigation needs to be simplified.
                  </p>
                </div>

                <div>
                  <h3 className="text-gray-900 font-bold flex items-center gap-2">Action Items</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><span className="text-primary font-medium cursor-pointer hover:underline">14:20</span> Update the Uploads page empty state (User)</li>
                    <li><span className="text-primary font-medium cursor-pointer hover:underline">18:45</span> Finalize the Meeting Status API integration</li>
                  </ul>
                </div>
              </div>

              {/* Feedback Rating */}
              <div className="mt-12 bg-gray-50 border border-gray-100 rounded-xl p-5 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Did you like the summary?</span>
                <div className="flex items-center gap-1 text-gray-300">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 cursor-pointer hover:text-yellow-400 transition-colors" />)}
                </div>
              </div>

            </div>
          </div>

          {/* Right Pane: Transcript / AskFred */}
          <div className="w-[400px] flex flex-col bg-gray-50/50 shrink-0">
            <div className="flex p-2 gap-2 border-b border-gray-200 bg-white">
              <button 
                onClick={() => setRightTab('askfred')}
                className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-colors ${rightTab === 'askfred' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                Ask Fred
              </button>
              <button 
                onClick={() => setRightTab('transcript')}
                className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-colors ${rightTab === 'transcript' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                Transcript
              </button>
            </div>

            {rightTab === 'transcript' ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Find or Replace" className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  
                  {/* Transcript Block */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-xs font-bold shrink-0">S1</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-gray-900">Speaker 1</span>
                        <span className="text-xs text-gray-400">00:00</span>
                      </div>
                      <p className="text-[15px] text-gray-700 leading-relaxed">
                        Alright, let's get started. We have a lot to cover today regarding the UI redesign. First, let's talk about the sidebar navigation.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">G</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-gray-900">User</span>
                        <span className="text-xs text-gray-400">12:34</span>
                      </div>
                      <p className="text-[15px] text-gray-700 leading-relaxed">
                        I think the sidebar needs to be simplified. We should group the AI skills under a single collapsible menu.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-end p-4">
                 {/* Ask Fred Mockup (simplified for space) */}
                 <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-4">
                    <Bot className="w-6 h-6 text-green-500 mb-2" />
                    <h4 className="font-bold text-gray-900 mb-1">Hi User!</h4>
                    <p className="text-sm text-gray-500 mb-4">Ask anything about this meeting.</p>
                    <div className="space-y-2">
                       <button className="w-full text-left p-2 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700 hover:bg-gray-100 transition-colors">Summarize</button>
                    </div>
                 </div>
                 <div className="border border-gray-200 rounded-xl p-2 bg-white flex items-center gap-2">
                    <Plus className="w-5 h-5 text-gray-400 cursor-pointer" />
                    <input type="text" placeholder="Ask anything..." className="flex-1 outline-none text-sm bg-transparent" />
                    <button className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors">
                       <ArrowUp className="w-4 h-4" />
                    </button>
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Global Bottom Media Player */}
        <div className="h-16 border-t border-gray-200 bg-white shrink-0 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 w-1/4">
             <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
               <Video className="w-4 h-4 text-gray-600" />
             </div>
             <div className="text-sm font-medium text-gray-900 truncate">fireflies test</div>
          </div>

          <div className="flex items-center justify-center gap-6 flex-1">
             <span className="text-xs font-semibold text-gray-500 w-12 text-right">00:00</span>
             
             <div className="flex items-center gap-4">
                <button className="text-xs font-bold text-gray-500 hover:text-gray-900 px-2">1x</button>
                <button className="text-gray-400 hover:text-gray-900 transition-colors"><Rewind className="w-5 h-5" /></button>
                <button className="w-10 h-10 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-105">
                   <Play className="w-4 h-4 ml-1" />
                </button>
                <button className="text-gray-400 hover:text-gray-900 transition-colors"><FastForward className="w-5 h-5" /></button>
             </div>

             <span className="text-xs font-semibold text-gray-500 w-12">45:00</span>
          </div>

          <div className="flex items-center justify-end gap-4 w-1/4">
             <button className="text-gray-400 hover:text-gray-700 transition-colors"><Download className="w-4 h-4" /></button>
             <button className="text-gray-400 hover:text-yellow-500 transition-colors"><Star className="w-4 h-4" /></button>
             <button className="text-gray-400 hover:text-gray-700 transition-colors"><CheckSquare className="w-4 h-4" /></button>
             <div className="h-4 w-px bg-gray-200 mx-1"></div>
             <button className="text-gray-400 hover:text-green-500 transition-colors"><ThumbsUp className="w-4 h-4" /></button>
             <button className="text-gray-400 hover:text-red-500 transition-colors"><ThumbsDown className="w-4 h-4" /></button>
          </div>
        </div>

      </div>
    </AppLayout>
  )
}

