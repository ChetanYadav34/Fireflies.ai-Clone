'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { UploadCloud, X, HelpCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { createMeeting } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function UploadsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [transcript, setTranscript] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCreate = async () => {
    if (!title.trim()) return
    setIsLoading(true)
    try {
      // Mock duration 15 minutes = 900 seconds
      const newMeeting = await createMeeting(title, 900, new Date().toISOString())
      // In a real app we would also upload the transcript, but for now we just redirect
      router.push(`/dashboard/meeting/${newMeeting.id}`)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }
  return (
    <AppLayout>
      <div className="flex-1 bg-gray-50/30 flex flex-col min-h-[calc(100vh-4rem)] relative">
        <div className="max-w-4xl mx-auto w-full px-8 py-8 flex-1 flex flex-col">
          
          {/* Information Banner */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center justify-between mb-6 shadow-sm">
            <span className="text-sm font-medium text-yellow-800">
              Uploads are moving — you'll find them on the Meetings page soon.
            </span>
            <button className="text-yellow-600 hover:bg-yellow-100 p-1 rounded-md transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Upload Dropzone */}
          <div className="bg-white border-2 border-dashed border-indigo-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:bg-indigo-50/50 transition-colors cursor-pointer group mb-16 shadow-sm">
            <div className="w-16 h-16 bg-indigo-50 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Upload a file to generate a transcript</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-md leading-relaxed">
              Browse or drag and drop MP3, M4A, WAV, MP4 or WEBM files.
              <br />
              <span className="text-xs text-gray-400 mt-1 block">
                (Max video size: 100 MB, Max audio size: 500 MB)
              </span>
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-[15px] font-medium transition-colors shadow-sm"
            >
              Create Mock Meeting
            </button>
          </div>

          {/* Create Meeting Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-semibold text-gray-900">Create Meeting from Transcript</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title</label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Q3 Planning Sync"
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Paste Transcript (Optional)</label>
                    <textarea 
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      placeholder="Paste your raw transcript text here..."
                      className="w-full border rounded-lg px-3 py-2 text-sm min-h-[120px] focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                </div>
                <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleCreate}
                    disabled={isLoading || !title.trim()}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    Create Meeting
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty State History */}
          <div className="flex-1 flex flex-col items-center justify-center pb-20">
            <div className="w-24 h-24 mb-6 relative">
               {/* Minimal empty box SVG */}
               <svg className="w-full h-full text-gray-200" viewBox="0 0 100 100">
                  <path d="M20 30 L80 30 L80 70 L20 70 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
                  <path d="M20 30 L50 50 L80 30" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
                  <circle cx="50" cy="50" r="15" fill="#F3F4F6"/>
                  <path d="M45 45 L55 55 M55 45 L45 55" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round"/>
               </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">You have no recent uploads!</h3>
          </div>

        </div>

        {/* Floating Action Button (FAB) */}
        <button className="fixed bottom-6 right-6 w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 z-50">
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>
    </AppLayout>
  )
}

