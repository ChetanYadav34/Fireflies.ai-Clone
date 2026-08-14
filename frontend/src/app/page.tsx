'use client'

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, Star, ShieldCheck, Search, Layers } from "lucide-react";

export default function LandingPage() {
  const [hideBanner, setHideBanner] = useState(false)

  return (
    <div className="min-h-screen bg-[#08051a] text-white selection:bg-purple-500/30 font-sans selection:text-white">
      {/* Subtle Star/Dust Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-white rounded-full opacity-30"></div>
        <div className="absolute top-[40%] right-[20%] w-1.5 h-1.5 bg-white rounded-full opacity-20"></div>
        <div className="absolute top-[60%] left-[30%] w-1 h-1 bg-white rounded-full opacity-40"></div>
        <div className="absolute top-[80%] right-[40%] w-2 h-2 bg-purple-500 rounded-full opacity-20 blur-[1px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-900/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Top Notification Banner */}
      {!hideBanner && (
        <div className="bg-[#5629c4] text-[13px] font-medium py-2.5 px-6 flex items-center justify-center relative z-50">
          <span>
            🔥 Meet Fireflies 2.0: The biggest update yet. <a href="/signup" className="ml-2 font-semibold underline decoration-white/50 hover:decoration-white underline-offset-2 flex items-center gap-1 transition-all">Read announcement <ArrowRight className="w-3 h-3"/></a>
          </span>
          <button onClick={() => setHideBanner(true)} className="absolute right-4 text-white/70 hover:text-white text-lg leading-none">&times;</button>
        </div>
      )}

      {/* Navbar */}
      <nav className="relative z-50">
        <div className="max-w-[1200px] mx-auto px-6 h-[88px] flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/logo-dark.svg" alt="Fireflies.ai Logo" width={140} height={28} className="h-7 w-auto object-contain" />
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="#demo" 
              className="hidden md:flex bg-white text-gray-900 hover:bg-gray-100 px-5 py-2.5 rounded text-sm font-semibold transition-colors"
            >
              Request Demo
            </Link>
            <Link 
              href="/login" 
              className="bg-[#7852ff] hover:bg-[#6b47ff] text-white px-5 py-2.5 rounded text-sm font-semibold transition-colors"
            >
              Open App
            </Link>
            <button className="ml-2 p-2 text-gray-300 hover:text-white transition-colors md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16 lg:pt-28 lg:pb-24 flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-[56px] font-semibold tracking-tight mb-6 leading-[1.15] max-w-[800px]">
            The #1 AI Assistant For <br />
            Your Meetings
          </h1>
          
          <p className="text-[19px] text-gray-200 max-w-[700px] mx-auto mb-10 leading-relaxed font-light">
            Transcribe, summarize, search, and analyze all your team conversations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link 
              href="/signup" 
              className="w-full sm:w-auto bg-[#7852ff] hover:bg-[#6b47ff] text-white px-7 py-3.5 rounded text-[15px] font-semibold transition-all flex items-center justify-center gap-2 group"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#demo" 
              className="w-full sm:w-auto bg-[#252538] hover:bg-[#2d2d44] border border-white/5 text-white px-7 py-3.5 rounded text-[15px] font-semibold transition-all flex items-center justify-center"
            >
              Request Demo
            </Link>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium text-gray-300 bg-[#16132b]/80 border border-white/10 rounded-full px-5 py-2 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-[#ff5a30]">
              <div className="w-4 h-4 bg-[#ff5a30] rounded-full flex items-center justify-center text-[10px] font-bold text-white">G</div>
              <span className="text-gray-200">Rated 4.8 / 5</span>
            </div>
            <div className="flex text-[#fbbf24]">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <span className="text-gray-600">|</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10b981]" />
              <span>GDPR, SOC2, More</span>
            </div>
          </div>
        </section>

        {/* Hero Image Mockup */}
        <section className="px-4 pb-32 max-w-[1100px] mx-auto">
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-white shadow-purple-900/20">
            {/* Browser/App Header */}
            <div className="h-12 bg-white border-b border-gray-100 flex items-center px-4 gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-md flex-1 max-w-sm border border-gray-100">
                <span className="text-gray-400"># Sales /</span> Kickoff Call - Fireflies.ai x Acme
                <span className="bg-[#10b981]/10 text-[#10b981] px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ml-2">Rec</span>
              </div>
            </div>
            {/* App Content */}
            <div className="flex h-[600px]">
              {/* Sidebar Mock */}
              <div className="w-[60px] border-r border-gray-100 bg-white flex flex-col items-center py-4 gap-6">
                <div className="w-6 h-6 text-gray-400"><Search className="w-full h-full" /></div>
                <div className="w-6 h-6 text-gray-400"><Star className="w-full h-full" /></div>
                <div className="w-6 h-6 text-gray-400"><Layers className="w-full h-full" /></div>
              </div>
              
              {/* Main Content Mock */}
              <div className="flex-1 bg-white p-8 flex">
                <div className="flex-1 border-r border-gray-100 pr-8">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Kickoff Call - Fireflies.ai x Acme</h2>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-[10px]">S</div>
                        Sarah Watts, +3 &bull; Mar 15 - 11:30 AM
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-md text-xs font-medium text-gray-600">
                      <div className="w-3 h-3 border border-current rounded-sm flex items-center justify-center">▶</div> Video
                    </div>
                  </div>

                  <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Overview</h3>
                      <p>The kickoff call served as an introduction between Fireflies.ai and Acme Inc. They aim to use Fireflies.ai primarily to streamline internal communications, automate sales call follow-ups, and improve meeting workflows.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Use Case & Requirements: 00:00 - 10:12</li>
                        <li>Acme wants their sales team more present during calls.</li>
                        <li>Integration with HubSpot and Slack is a priority.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Transcript Mock */}
                <div className="w-[300px] pl-8">
                  <h3 className="font-semibold text-gray-900 mb-4 text-sm">Transcript</h3>
                  <div className="relative mb-6">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input type="text" placeholder="Search" className="w-full bg-gray-50 border border-gray-200 rounded-md py-2 pl-9 pr-3 text-sm focus:outline-none" />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex gap-3 text-sm">
                      <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0">S</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">Sarah</span>
                          <span className="text-blue-500 text-xs">00:53</span>
                        </div>
                        <p className="text-gray-600">We're aiming for a seamless onboarding experience, especially around the integrations with Slack and HubSpot.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-sm">
                      <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0">J</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">Janice</span>
                          <span className="text-blue-500 text-xs">01:24</span>
                        </div>
                        <p className="text-gray-600">Absolutely, our team will work closely with your tech lead to ensure a smooth integration process.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* AskFred Chat Head Mock */}
            <div className="absolute bottom-6 right-6 w-12 h-12 bg-indigo-600 rounded-full shadow-lg flex items-center justify-center border-2 border-white">
              <span className="text-white font-serif text-lg font-bold">f</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
