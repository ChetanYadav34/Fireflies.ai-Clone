'use client'

import { useState } from 'react'
import { X, Link as LinkIcon, Calendar, Mail, Lock, Globe, Star, Video, CheckCircle2, ChevronDown, Check, Layers, Info } from 'lucide-react'
import { useModals } from '../layout/modal-context'

function ModalWrapper({ isOpen, onClose, title, children, width = "max-w-md" }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${width} flex flex-col overflow-hidden animate-in zoom-in-95 duration-200`}>
        {title && (
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="font-semibold text-gray-900 text-lg">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors bg-white hover:bg-gray-100 p-1 rounded-md"><X className="w-5 h-5"/></button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export function GlobalModals() {
  const { 
    captureOpen, setCaptureOpen, 
    feedbackOpen, setFeedbackOpen, 
    settingsOpen, setSettingsOpen, 
    assistantOpen, setAssistantOpen 
  } = useModals()

  const [activeSkills, setActiveSkills] = useState<Record<string, boolean>>({
    'Tasks': true,
    'Daily Brief': true,
    'Meeting Prep': false
  })

  const toggleSkill = (skill: string) => {
    setActiveSkills(prev => ({ ...prev, [skill]: !prev[skill] }))
  }

  const [inviteEmail, setInviteEmail] = useState('')
  const [captureSuccess, setCaptureSuccess] = useState(false)
  const [autoJoin, setAutoJoin] = useState(true)

  const handleCaptureSubmit = () => {
    setCaptureOpen(false)
    setCaptureSuccess(true)
  }

  return (
    <>
      {/* 1. Capture Meeting Modal */}
      <ModalWrapper isOpen={captureOpen} onClose={() => setCaptureOpen(false)} title="Add to live meeting">
        <div className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Name your meeting</label>
            <input type="text" placeholder="Design Sync" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Meeting link</label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="https://zoom.us/j/..." className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">Connect your Zoom account for better integration.</div>
            <button className="bg-white border border-gray-200 shadow-sm text-gray-700 hover:bg-gray-50 px-3 py-1.5 rounded-md text-sm font-medium">Connect</button>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Meeting language</label>
            <div className="relative cursor-pointer">
              <div className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm flex justify-between items-center">
                <span>English (Global)</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button onClick={() => setCaptureOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
          <button onClick={handleCaptureSubmit} className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm transition-colors">Start Capturing</button>
        </div>
      </ModalWrapper>

      {/* 2. Success Modal */}
      <ModalWrapper isOpen={captureSuccess} onClose={() => setCaptureSuccess(false)}>
        <div className="p-8 flex flex-col items-center text-center relative">
          <button onClick={() => setCaptureSuccess(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"><X className="w-5 h-5"/></button>
          <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Fireflies assistant has been invited</h2>
          <p className="text-gray-500 text-sm mb-8">The bot will join your meeting shortly.</p>
          
          <button onClick={() => setCaptureSuccess(false)} className="w-full flex items-center justify-center gap-2 border border-gray-200 shadow-sm rounded-xl py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors mb-4">
            <Video className="w-5 h-5 text-blue-500" />
            Open meeting
          </button>
          
          <div className="bg-gray-50 text-gray-500 text-xs p-3 rounded-lg flex gap-2 text-left w-full">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            The bot needs to stay in the meeting for at least 3 minutes to process the transcript.
          </div>
        </div>
      </ModalWrapper>

      {/* 3. Manage Assistant Modal */}
      <ModalWrapper isOpen={assistantOpen} onClose={() => setAssistantOpen(false)} title="Manage Personal Assistant">
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-6">Configure the AI skills your assistant runs automatically.</p>
          <div className="space-y-4">
            {['Tasks', 'Daily Brief', 'Meeting Prep'].map((skill, i) => (
              <div key={skill} className="flex items-center justify-between border border-gray-100 rounded-xl p-4 bg-white hover:border-gray-200 transition-colors shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-green-50 text-green-500' : i === 1 ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-orange-500'}`}>
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 flex items-center gap-2">
                      {skill}
                      {i === 0 && <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded uppercase">Free</span>}
                    </div>
                    <div className="text-xs text-primary font-medium hover:underline cursor-pointer">View Details</div>
                  </div>
                </div>
                <button 
                  onClick={() => toggleSkill(skill)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${activeSkills[skill] ? 'bg-primary' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${activeSkills[skill] ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
          <a href="#" className="text-sm text-primary font-medium hover:underline">Team Settings</a>
          <button onClick={() => setAssistantOpen(false)} className="px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm">Save Changes</button>
        </div>
      </ModalWrapper>

      {/* 4. Feedback Modal */}
      <ModalWrapper isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} title="Share Feedback">
        <div className="p-6 space-y-6">
          <p className="text-sm text-gray-600">We'd love to hear your thoughts! <a href="#" className="text-primary hover:underline">Chat with our team</a> instead?</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Type</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none bg-white">
                <option>Suggestion</option>
                <option>Bug Report</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none bg-white">
                <option>Transcription</option>
                <option>UI/UX</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center gap-2 py-2">
            {[1, 2, 3, 4, 5].map(star => (
              <Star key={star} className="w-8 h-8 text-gray-200 hover:text-yellow-400 cursor-pointer transition-colors" fill="currentColor" />
            ))}
          </div>

          <textarea 
            placeholder="Share anything you would like to tell us..." 
            className="w-full border-none bg-gray-50 rounded-lg p-4 text-sm min-h-[120px] outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button onClick={() => setFeedbackOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
          <button onClick={() => setFeedbackOpen(false)} className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm">Submit</button>
        </div>
      </ModalWrapper>

      {/* 5. Meeting Settings Modal */}
      <ModalWrapper isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} title="Meeting Settings" width="max-w-lg">
        <div className="p-0">
          <div className="divide-y divide-gray-100">
            <div className="p-6 flex items-center justify-between hover:bg-gray-50/50">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 flex items-center gap-2">Auto-join calendar meetings</div>
                  <div className="text-sm text-gray-500 mt-1">Join all calendar events with a web-conferencing link</div>
                </div>
              </div>
              <button 
                onClick={() => setAutoJoin(!autoJoin)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full shrink-0 transition-colors ${autoJoin ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${autoJoin ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <div className="p-6 flex items-center justify-between hover:bg-gray-50/50">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Email recaps to participants</div>
                  <select className="mt-2 text-sm border border-gray-300 rounded-md px-2 py-1 outline-none bg-white">
                    <option>Only me</option>
                    <option>Everyone</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 flex items-center justify-between hover:bg-gray-50/50">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Meeting privacy</div>
                  <select className="mt-2 text-sm border border-gray-300 rounded-md px-2 py-1 outline-none bg-white">
                    <option>Private</option>
                    <option>Team</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button onClick={() => setSettingsOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg">Cancel</button>
          <button onClick={() => setSettingsOpen(false)} className="px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm">Save</button>
        </div>
      </ModalWrapper>
    </>
  )
}

