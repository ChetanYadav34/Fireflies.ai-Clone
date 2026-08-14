'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { X, Search, ChevronDown, CheckCircle2, Info } from 'lucide-react'
import Link from 'next/link'

export default function MeetingStatusPage() {
  return (
    <AppLayout>
      <div className="flex-1 bg-white flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
        
        {/* Top Information Banner */}
        <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-2.5 flex items-center justify-between shrink-0">
          <div className="text-sm font-medium text-yellow-800 flex items-center gap-2">
            Meeting Status is moving... <span className="text-primary cursor-pointer hover:underline">Check Now</span>
          </div>
          <button className="text-yellow-600 hover:bg-yellow-100 p-1 rounded-md transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                All <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                All Status <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
          <button className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
            Feedback
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-4xl">
            
            {/* Date Group Header */}
            <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">
              Aug 9 - Aug 15
            </div>
            
            {/* List Item - Link to Meeting View */}
            <Link href="/dashboard/meeting" className="block">
              <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all mb-4 group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm shadow-sm border border-blue-200 shrink-0">
                    G
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-gray-900 group-hover:text-primary transition-colors">fireflies test</h3>
                    <div className="text-[13px] text-gray-500 mt-0.5">
                      Aug 14, 2026 10:00 AM
                    </div>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-[13px] font-semibold border border-green-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Completed
                  </span>
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Link>

            {/* End Indicator */}
            <div className="text-center text-sm font-medium text-gray-400 mt-12 mb-8 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gray-300" />
              All caught up!
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  )
}

