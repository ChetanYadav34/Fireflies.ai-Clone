"use client";

import React, { useState } from "react";
import { Download, Filter, ChevronDown, MessageSquare, Clock, HelpCircle, Scissors, Mic, User, Headphones, Zap, VolumeX, Smile } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("Team Insights");

  const statCards = [
    { title: "Total number of conversations", value: "24", change: "+12%", icon: MessageSquare },
    { title: "Total time spent in conversations", value: "14h 30m", change: "+5%", icon: Clock },
    { title: "Total number of questions asked", value: "156", change: "+22%", icon: HelpCircle },
    { title: "Total number of filler words", value: "842", change: "-8%", icon: Scissors },
    { title: "Total number of monologues", value: "45", change: "+2%", icon: Mic },
    { title: "Longest monologue", value: "4m 12s", change: "-15s", icon: User },
    { title: "Average talk to listen ratio", value: "45/55", change: "+2%", icon: Headphones },
    { title: "Average words spoken per minute (WPM)", value: "135", change: "+5", icon: Zap },
    { title: "Total silence duration", value: "1h 15m", change: "-10%", icon: VolumeX },
    { title: "Sentiments in conversations", value: "Positive", change: "", icon: Smile },
  ];

  return (
    <AppLayout>
    <div className="flex flex-col h-full bg-[#f8f9fa] dark:bg-[#111315] relative overflow-hidden">
      
      {/* Paywall Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center pt-32 bg-white/60 dark:bg-black/60 backdrop-blur-[8px]">
        <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-full mb-6">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Upgrade your account to view analytics</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-md mb-8">
          You are on the free plan. To view your analytics please upgrade to business plan
        </p>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 rounded-lg font-medium bg-white dark:bg-[#1a1d21] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Request free trial
          </button>
          <button className="px-6 py-2.5 rounded-lg font-medium bg-primary text-white hover:bg-primary/90 transition-colors">
            Upgrade account
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 max-w-7xl mx-auto w-full relative z-10 pointer-events-none select-none opacity-40">
        
        {/* Tabs */}
        <div className="flex items-center space-x-6 border-b border-gray-200 dark:border-gray-800 mb-6">
          <button
            onClick={() => setActiveTab("Team Insights")}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "Team Insights"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Team Insights
          </button>
          <button
            onClick={() => setActiveTab("Topic Insights")}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "Topic Insights"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Topic Insights
          </button>
        </div>

        {/* Filters Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a1d21] border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed">
            <Download className="w-4 h-4" />
            Export
          </button>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a1d21] border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a1d21] border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300">
              Last 7 days
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Warning Alert */}
        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-lg flex items-start gap-3 mb-8 text-sm">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>Any meeting with labelled speaker names will automatically have analytics. You can also edit speaker names.</p>
        </div>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white dark:bg-[#1a1d21] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 pr-4">{stat.title}</h3>
                  <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  {stat.change && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 pb-1">
                      <span className={stat.change.startsWith('+') ? "text-green-600 dark:text-green-400 font-medium" : "text-red-600 dark:text-red-400 font-medium"}>
                        {stat.change}
                      </span>
                      {" vs prev"}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
    </AppLayout>
  );
}

