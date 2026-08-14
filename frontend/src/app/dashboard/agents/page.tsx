'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { Plus, Headphones, Play, MessageSquare, Monitor, Search, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function VoiceAgentsPage() {
  const [activeTab, setActiveTab] = useState<'discover' | 'my-agents'>('discover')

  const agentTemplates = [
    { title: 'Screening Interview Agent', desc: 'Conducts initial candidate screening calls, asks preset questions, and records responses.', color: 'bg-pink-100 text-pink-600' },
    { title: 'Discovery Call Agent', desc: 'Handles outbound discovery calls, qualifies leads, and answers basic product questions.', color: 'bg-blue-100 text-blue-600' },
    { title: 'Customer Support Agent', desc: 'Resolves common Tier 1 support tickets and routes complex issues to human agents.', color: 'bg-orange-100 text-orange-600' },
    { title: 'Onboarding Agent', desc: 'Welcomes new clients and guides them through the initial account setup steps.', color: 'bg-purple-100 text-purple-600' }
  ]

  return (
    <AppLayout>
      <div className="flex-1 bg-white min-h-[calc(100vh-4rem)] flex flex-col">
        <div className="max-w-6xl mx-auto w-full px-8 py-8 flex-1 flex flex-col">
          
          {/* Header & Tabs */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[28px] font-semibold text-gray-900 tracking-tight flex items-center gap-3">
              Voice Agents 
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded tracking-wider uppercase border border-green-200">
                New
              </span>
            </h1>
          </div>

          <div className="flex gap-8 border-b border-gray-200 mb-8">
            {(['discover', 'my-agents'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-medium transition-colors relative ${
                  activeTab === tab 
                    ? 'text-primary' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'discover' ? 'Discover' : 'My Voice Agents'}
                {activeTab === tab && (
                  <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-primary rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          {activeTab === 'discover' ? (
            <>
              {/* Hero Carousel Banner */}
              <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-100 rounded-2xl p-8 mb-6 flex relative overflow-hidden shadow-sm">
                
                {/* Text Content */}
                <div className="flex-1 z-10">
                  <div className="inline-block px-3 py-1 bg-white text-primary text-xs font-bold rounded-full border border-primary/20 mb-4 shadow-sm">
                    50 free AI credits
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Experience Voice Agents</h2>
                  <p className="text-[15px] text-gray-600 max-w-md mb-8 leading-relaxed">
                    Automate your outbound calls, interviews, and customer support with AI agents that sound exactly like humans.
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
                      <Headphones className="w-4 h-4" />
                      Try It Live
                    </button>
                    <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
                      <Play className="w-4 h-4" />
                      Watch Demo
                    </button>
                  </div>
                </div>

                {/* Illustration (Abstract visualizer) */}
                <div className="hidden md:flex flex-1 justify-end items-center relative z-10">
                  <div className="w-[300px] h-[180px] bg-gray-900 rounded-xl shadow-xl border border-gray-800 p-4 relative flex flex-col justify-between overflow-hidden">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400 font-medium">Acme's Voice Agent</span>
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    {/* Visualizer bars */}
                    <div className="flex items-center justify-center gap-1.5 h-16">
                      {[40, 70, 40, 90, 50, 80, 30].map((h, i) => (
                        <div key={i} className="w-1.5 bg-primary/80 rounded-full" style={{ height: `${h}%` }}></div>
                      ))}
                    </div>
                    {/* Fake Chat Bubble floating */}
                    <div className="absolute -left-6 -bottom-4 bg-white p-3 rounded-lg rounded-bl-none shadow-lg border border-gray-100 max-w-[200px]">
                      <p className="text-[11px] text-gray-700 font-medium">How do you handle tight deadlines?</p>
                    </div>
                  </div>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/30"></div>
                </div>
              </div>

              {/* Promo Alert */}
              <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 flex items-center justify-between mb-12 shadow-sm">
                <span className="text-sm font-medium text-blue-900">
                  <strong className="font-bold">Try Voice Cloning</strong> — Make your agent sound exactly like you in 30 seconds.
                </span>
                <button className="text-sm font-semibold text-primary hover:underline">
                  Create Voice Agent
                </button>
              </div>

              {/* Template Grid */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                    User, set up your Voice Agent in 2 minutes
                    <span className="text-sm font-medium text-gray-400 hover:text-gray-600 flex items-center gap-1 cursor-pointer">
                      <MessageSquare className="w-4 h-4" /> Share Feedback
                    </span>
                  </h3>
                  <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
                    <Plus className="w-4 h-4" />
                    Custom Agent
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {agentTemplates.map((template, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-md transition-all flex flex-col group cursor-pointer">
                      <div className={`w-10 h-10 rounded-lg ${template.color} flex items-center justify-center mb-4`}>
                        <Monitor className="w-5 h-5" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{template.title}</h4>
                      <p className="text-[13px] text-gray-500 mb-6 leading-relaxed flex-1">
                        {template.desc}
                      </p>
                      <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-[13px] font-semibold transition-colors shadow-sm">
                        Set-Up
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center pb-20">
              <div className="w-24 h-24 mb-6 relative">
                 <div className="absolute inset-0 bg-primary/10 rounded-full flex items-center justify-center">
                    <Headphones className="w-10 h-10 text-primary" />
                 </div>
                 <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
              </div>
              <h2 className="text-[22px] font-bold text-gray-900 mb-2">Automate Your Calls With Fireflies Voice Agents</h2>
              <p className="text-[15px] text-gray-500 max-w-md mx-auto mb-8">
                Create a custom voice agent to attend meetings, conduct interviews, or make outbound calls on your behalf.
              </p>
              <button 
                onClick={() => setActiveTab('discover')}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-[15px] font-medium flex items-center gap-2 mx-auto transition-colors shadow-sm"
              >
                Discover Templates
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}

