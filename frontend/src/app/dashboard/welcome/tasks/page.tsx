'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { Plus, CheckSquare } from 'lucide-react'
import { useState } from 'react'

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState<'my-tasks' | 'all-tasks'>('my-tasks')

  return (
    <AppLayout>
      <div className="flex-1 bg-white min-h-[calc(100vh-4rem)] flex flex-col">
        <div className="max-w-6xl mx-auto w-full px-8 py-8 flex-1 flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[28px] font-semibold text-gray-900 tracking-tight">Tasks</h1>
          </div>

          {/* Tabs & Feedback */}
          <div className="flex items-center justify-between border-b border-gray-200 mb-8">
            <div className="flex gap-8">
              {(['my-tasks', 'all-tasks'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-medium transition-colors relative ${
                    activeTab === tab 
                      ? 'text-primary' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'my-tasks' && 'My Tasks'}
                  {tab === 'all-tasks' && 'All Tasks'}
                  {activeTab === tab && (
                    <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-primary rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
            <button className="text-sm font-medium text-primary hover:underline pb-4">
              Share Feedback
            </button>
          </div>

          {/* Integration Banner */}
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 flex items-center justify-between mb-16 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center z-20">
                  <span className="text-xs font-bold text-gray-700">A</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center z-10">
                  <span className="text-xs font-bold text-red-500">M</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center z-0">
                  <span className="text-xs font-bold text-blue-500">T</span>
                </div>
              </div>
              <span className="text-[15px] font-medium text-gray-800">
                Automatically send all your tasks to your work apps.
              </span>
            </div>
            <button className="text-sm font-medium text-primary hover:text-primary/80 mr-2 flex items-center gap-1">
              Connect <span className="text-lg leading-none">&rarr;</span>
            </button>
          </div>

          {/* Empty State */}
          <div className="flex-1 flex flex-col items-center justify-center text-center pb-20">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <CheckSquare className="w-10 h-10" />
            </div>
            
            <h2 className="text-[22px] font-semibold text-gray-900 mb-3">
              All your meeting tasks in one place
            </h2>
            <p className="text-[15px] text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
              Manage, assign and update all your meeting tasks here.
            </p>
            
            <button className="flex items-center justify-center gap-2 bg-primary text-white rounded-xl px-6 py-3 text-[15px] font-medium hover:bg-primary/90 transition-colors shadow-sm">
              <Plus className="w-5 h-5" />
              New Task
            </button>
          </div>

        </div>
      </div>
    </AppLayout>
  )
}

