"use client";

import React from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { ArrowLeft, Clock, Zap, Settings, Play } from "lucide-react";
import Link from "next/link";

export default function DailyBriefPage() {
  return (
    <AppLayout>
      <div className="flex-1 bg-gray-50/50 dark:bg-black h-[calc(100vh-60px)] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-white dark:bg-[#1a1d21] border-b border-gray-200 dark:border-gray-800 p-6 sticky top-0 z-10">
          <Link href="/dashboard/skills" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to AI Skills
          </Link>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Brief</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Get a concise summary of all your daily meetings delivered to your inbox.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1d21] hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors">
                Configure
              </button>
              <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <Play className="w-4 h-4" />
                Enable Skill
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-w-5xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left Column - Details */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white dark:bg-[#1a1d21] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">How it works</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">1</div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Automatic Processing</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">At the end of your workday, the AI reviews all your transcribed meetings.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">2</div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Intelligent Extraction</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Key decisions, action items, and important discussions are extracted.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">3</div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Email Delivery</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">A formatted digest is emailed to you so you can catch up in minutes.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1a1d21] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customization</h2>
                <p className="text-sm text-gray-500 mb-4">Choose what information you want included in your daily brief.</p>
                <div className="space-y-3">
                  {['Action Items', 'Key Decisions', 'Questions Asked', 'Sentiment Analysis'].map((item, idx) => (
                    <label key={idx} className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1a1d21] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">Skill Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category</span>
                    <span className="font-medium text-gray-900 dark:text-white">Productivity</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Pricing</span>
                    <span className="font-medium text-gray-900 dark:text-white">Included in Pro</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Author</span>
                    <span className="font-medium text-primary">Fireflies.ai</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </AppLayout>
  );
}

