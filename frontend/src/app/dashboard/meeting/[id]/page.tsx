'use client'

import { useState, useRef, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { AppLayout } from '@/components/layout/app-layout'
import { Play, Pause, Search, Share2, Download, MoreHorizontal, MessageSquare, Bot, Clock, Calendar, Users, List, Sparkles, Mic, ChevronDown, RotateCcw, RotateCw, Star, Edit3, ThumbsUp, ThumbsDown, Maximize, Minimize, CheckSquare, Square } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { fetchMeetingById, fetchMeetingTranscript, fetchMeetingSummary, fetchMeetingActionItems, updateActionItem, updateMeeting, Meeting, TranscriptSegment, Summary, ActionItem } from '@/lib/api'

export default function MeetingRecordPage() {
  const params = useParams()
  const meetingId = params.id as string

  const [meeting, setMeeting] = useState<Meeting | null>(null)
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([])
  const [summary, setSummary] = useState<Summary | null>(null)
  const [actionItems, setActionItems] = useState<ActionItem[]>([])
  const [loading, setLoading] = useState(true)

  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState('')
  const [isSavingTitle, setIsSavingTitle] = useState(false)

  const [activeTab, setActiveTab] = useState<'askfred' | 'transcript'>('transcript')
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  
  const [rating, setRating] = useState(0)
  const [isStarred, setIsStarred] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  const [isEditingParticipants, setIsEditingParticipants] = useState(false)
  const [newParticipant, setNewParticipant] = useState('')
  const [participants, setParticipants] = useState<{id: number, name: string}[]>([])

  const [newActionItem, setNewActionItem] = useState('')

  useEffect(() => {
    if (!meetingId) return;
    async function loadData() {
      try {
        const [m, t, s, a] = await Promise.all([
          fetchMeetingById(meetingId),
          fetchMeetingTranscript(meetingId),
          fetchMeetingSummary(meetingId),
          fetchMeetingActionItems(meetingId)
        ])
        setMeeting(m)
        setEditedTitle(m.title)
        setParticipants(m.participants || [{ id: 1, name: "User" }])
        setTranscript(t)
        setSummary(s)
        setActionItems(a)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [meetingId])

  const handleAddParticipant = () => {
    if (newParticipant.trim()) {
      setParticipants([...participants, { id: Date.now(), name: newParticipant.trim() }])
      setNewParticipant('')
    }
  }

  const handleRemoveParticipant = (id: number) => {
    setParticipants(participants.filter(p => p.id !== id))
  }

  const handleAddActionItem = () => {
    if (newActionItem.trim()) {
      setActionItems([...actionItems, {
        id: Date.now(),
        meeting_id: Number(meetingId),
        task_description: newActionItem.trim(),
        is_completed: false
      }])
      setNewActionItem('')
    }
  }

  const toggleActionItem = async (item: ActionItem) => {
    try {
      const updated = await updateActionItem(item.id, !item.is_completed)
      setActionItems(prev => prev.map(a => a.id === item.id ? updated : a))
    } catch(err) {
      console.error(err)
    }
  }

  const handleSaveTitle = async () => {
    if (!meeting || !editedTitle.trim() || editedTitle === meeting.title) {
      setIsEditingTitle(false)
      return
    }
    setIsSavingTitle(true)
    try {
      const updated = await updateMeeting(meeting.id, editedTitle)
      setMeeting(updated)
      setIsEditingTitle(false)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSavingTitle(false)
    }
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const seekTo = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds
      if (!isPlaying) {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const actualDuration = duration && duration > 1 ? duration : (meeting?.duration_seconds || 426)

  const getActiveBlockIndex = () => {
    for (let i = transcript.length - 1; i >= 0; i--) {
      if (currentTime >= transcript[i].start_time / 1000) {
        return i
      }
    }
    return -1
  }
  const activeBlockIndex = getActiveBlockIndex()

  if (loading) {
    return <AppLayout><div className="flex items-center justify-center h-full w-full">Loading...</div></AppLayout>
  }

  if (!meeting) {
    return <AppLayout><div className="flex items-center justify-center h-full w-full">Meeting not found.</div></AppLayout>
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-white w-full">
        <div className="h-14 border-b border-gray-100 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>#My Meetings</span>
            <span className="text-gray-300">/</span>
            <div className="flex flex-col relative">
              {isEditingTitle ? (
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={editedTitle} 
                    onChange={e => setEditedTitle(e.target.value)}
                    className="font-medium text-gray-900 border border-primary/50 rounded px-2 py-0.5 outline-none focus:ring-1 focus:ring-primary w-48"
                    autoFocus
                    onKeyDown={e => e.key === 'Enter' && handleSaveTitle()}
                  />
                  <button 
                    onClick={handleSaveTitle} 
                    disabled={isSavingTitle}
                    className="text-xs bg-primary text-white px-2 py-1 rounded hover:bg-primary/90 disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => setIsEditingTitle(false)}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditingTitle(true)}>
                  <span className="font-medium text-gray-900 group-hover:text-primary transition-colors">{meeting.title}</span>
                  <Edit3 className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
            </div>
            {!isEditingTitle && <MoreHorizontal className="w-4 h-4 ml-2" />}
          </div>
          <div className="flex items-center gap-3">
            <button className="text-primary font-semibold text-sm hover:underline px-2">Upgrade</button>
            <div className="w-px h-4 bg-gray-200"></div>
            
            {/* Participants UI */}
            <div className="relative">
              <button 
                onClick={() => setIsEditingParticipants(!isEditingParticipants)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Users className="w-4 h-4" />
                {participants.length} {participants.length === 1 ? 'Participant' : 'Participants'}
              </button>
              {isEditingParticipants && (
                <div className="absolute top-full mt-2 right-0 w-64 bg-white border border-gray-200 rounded-lg shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Participants</h4>
                  <div className="space-y-1 mb-3 max-h-32 overflow-y-auto">
                    {participants.map(p => (
                      <div key={p.id} className="flex items-center justify-between group">
                        <span className="text-sm text-gray-700 font-medium">{p.name}</span>
                        <button onClick={() => handleRemoveParticipant(p.id)} className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold">✕</button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newParticipant}
                      onChange={e => setNewParticipant(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAddParticipant()}
                      placeholder="Add participant..." 
                      className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm outline-none focus:border-primary"
                    />
                    <button onClick={handleAddParticipant} className="bg-primary hover:bg-primary/90 text-white px-2 py-1 rounded text-sm font-medium">Add</button>
                  </div>
                </div>
              )}
            </div>

            <button className="flex items-center gap-2 px-4 py-1.5 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className={`${isFullScreen ? 'w-24 shrink-0' : 'flex-1'} flex flex-col overflow-y-auto border-r border-gray-100 transition-all duration-300`}>
            <div className={`sticky top-0 bg-white z-10 p-4 pb-0 flex ${isFullScreen ? 'flex-col gap-2 items-center' : 'justify-center'}`}>
              <div className={`flex ${isFullScreen ? 'flex-col gap-2 w-full' : 'bg-gray-100 p-1 rounded-lg'}`}>
                <button className={`text-sm font-medium rounded-md bg-white shadow-sm text-gray-900 border border-gray-100 ${isFullScreen ? 'py-2 w-full flex justify-center' : 'px-6 py-1.5'}`}>
                  Notes
                </button>
                <button className={`text-sm font-medium rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-50 border border-transparent ${isFullScreen ? 'py-2 w-full flex justify-center' : 'px-6 py-1.5'}`}>
                  AI Skills
                </button>
              </div>
            </div>
            
            {!isFullScreen && (
              <div className="max-w-2xl mx-auto w-full p-8 pt-12 pb-24">
                <div className="flex items-center gap-4 mb-8 text-sm text-primary font-medium">
                  <button className="flex items-center gap-1.5 hover:underline"><Sparkles className="w-4 h-4" /> General Summary</button>
                  <button className="flex items-center gap-1.5 hover:underline"><Sparkles className="w-4 h-4" /> Refine Summary</button>
                  <button className="text-gray-400 hover:text-gray-600 ml-auto"><Edit3 className="w-4 h-4" /></button>
                </div>

                <h2 className="font-bold text-gray-900 text-lg mb-6">Notes</h2>
                
                <div className="space-y-4">
                  {summary ? (
                    <>
                      <p className="text-gray-700 text-[14px] leading-relaxed">{summary.overview_text}</p>
                      {summary.bullet_points && summary.bullet_points.length > 0 && (
                        <div className="mt-4">
                          {summary.bullet_points.map((pt, idx) => (
                            <div key={idx} className="flex gap-3 text-gray-800 text-[14px] leading-relaxed ml-2 font-semibold">
                              <span className="text-gray-400 mt-0.5">•</span>
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-500 italic">No summary available for this meeting.</p>
                  )}
                </div>

                <h3 className="font-bold text-gray-900 text-lg mt-12 mb-4">Action Items</h3>
                <div className="space-y-3">
                  {actionItems.length === 0 && (
                    <p className="text-gray-500 italic text-sm">No action items yet.</p>
                  )}
                  {actionItems.map(item => (
                    <div key={item.id} className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-100 rounded-lg group">
                      <button onClick={() => toggleActionItem(item)} className="mt-0.5 text-primary shrink-0">
                        {item.is_completed ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-gray-400" />}
                      </button>
                      <input 
                        type="text"
                        value={item.task_description}
                        onChange={(e) => setActionItems(prev => prev.map(a => a.id === item.id ? { ...a, task_description: e.target.value } : a))}
                        className={`text-sm flex-1 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-primary outline-none transition-colors ${item.is_completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
                      />
                      <button onClick={() => setActionItems(actionItems.filter(a => a.id !== item.id))} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-lg leading-none">×</span>
                      </button>
                    </div>
                  ))}
                  
                  <div className="flex gap-2 pt-2">
                    <input 
                      type="text" 
                      value={newActionItem}
                      onChange={e => setNewActionItem(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAddActionItem()}
                      placeholder="Add a new action item..." 
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
                    />
                    <button onClick={handleAddActionItem} className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Add
                    </button>
                  </div>
                </div>

                <div className="mt-12 flex items-center justify-center gap-3 bg-gray-50 py-3 rounded-xl border border-gray-100">
                  <span className="text-sm text-gray-500">Did you like the summary?</span>
                  <div className="flex gap-1 text-gray-300">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      onClick={() => setRating(star)}
                      className={`w-5 h-5 cursor-pointer transition-colors hover:text-yellow-400 ${rating >= star ? 'text-yellow-400 fill-current' : ''}`}
                    />
                  ))}
                </div>
                </div>
              </div>
            )}
          </div>

          <div className={`${isFullScreen ? 'flex-1' : 'w-[450px] shrink-0'} flex flex-col bg-white transition-all duration-300`}>
            <div className="flex items-center gap-6 px-6 border-b border-gray-100 shrink-0">
              <button 
                onClick={() => setActiveTab('askfred')}
                className={`py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'askfred' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  AskFred
                </div>
              </button>
              <button 
                onClick={() => setActiveTab('transcript')}
                className={`py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'transcript' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Transcript
              </button>

              <button 
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="ml-auto p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
                title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
              >
                {isFullScreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {activeTab === 'transcript' ? (
                <div className={`p-6 pb-24 mx-auto ${isFullScreen ? 'max-w-4xl' : 'w-full'}`}>
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Find or Replace" 
                      className="w-full bg-gray-50 border border-transparent hover:border-gray-200 rounded-md pl-9 pr-4 py-2 text-sm outline-none focus:bg-white focus:border-primary/30 transition-all"
                    />
                  </div>

                  <div className="space-y-6">
                    {transcript.length === 0 ? (
                      <div className="text-center text-gray-500 italic py-8">No transcript available.</div>
                    ) : (
                      transcript.map((block, idx) => {
                        const isActive = idx === activeBlockIndex
                        const seconds = block.start_time / 1000
                        return (
                          <div key={idx} className={`flex gap-3 group p-3 transition-colors rounded-r-lg ${isActive ? 'bg-indigo-50 border-l-4 border-indigo-500' : 'hover:bg-gray-50 border-l-4 border-transparent'}`}>
                            <div className="w-6 h-6 rounded bg-[#4CAF50] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                              {block.speaker_name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="font-semibold text-gray-900 text-sm">{block.speaker_name}</span>
                                <button 
                                  onClick={() => seekTo(seconds)}
                                  className={`text-xs font-medium hover:underline cursor-pointer ${isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
                                >
                                  {formatTime(seconds)}
                                </button>
                              </div>
                              <p 
                                onClick={() => seekTo(seconds)}
                                className={`text-[14px] leading-relaxed cursor-text transition-colors ${isActive ? 'text-gray-900 font-medium' : 'text-gray-600'}`}
                              >
                                {block.text}
                              </p>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0 text-2xl">
                      💬
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Connect Slack and Gmail</p>
                      <p className="text-xs text-gray-500">get answers with full context.</p>
                    </div>
                    <button className="ml-auto text-primary text-sm font-medium">Connect</button>
                  </div>

                  <div className="mb-6">
                    <Sparkles className="w-6 h-6 text-emerald-400 mb-4" />
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Hi User!</h3>
                    <p className="text-gray-700">Ask anything about this meeting</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {["What features need improvement?", "How to enhance transcript visibility?", "Who will handle the post-review?"].map((q, i) => (
                      <button key={i} className="w-full text-left bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-lg p-3 text-sm text-gray-700 transition-colors">
                        {q}
                      </button>
                    ))}
                  </div>

                  <div className="absolute bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-100">
                    <div className="relative">
                      <input type="text" placeholder="Ask anything. Type / to run AI Skills" className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-4 pr-10 py-3 text-sm outline-none focus:border-primary/30" />
                      <button className="absolute right-2 top-2 w-8 h-8 bg-primary/20 text-primary rounded flex items-center justify-center">
                        ↑
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <audio 
          ref={audioRef}
          src="/meeting-audio.mp3"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={(e) => setDuration((e.target as HTMLAudioElement).duration)}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />

        <div className="h-16 bg-white border-t border-gray-200 shrink-0 flex items-center px-6 relative z-20">
          <div 
            className="absolute top-0 left-0 h-[3px] bg-gray-200 w-full cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const pos = (e.clientX - rect.left) / rect.width
              if (audioRef.current) audioRef.current.currentTime = pos * actualDuration
            }}
          >
            <div 
              className="h-full bg-primary relative group-hover:bg-primary/80 transition-colors"
              style={{ width: `${(currentTime / actualDuration) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm" />
            </div>
          </div>

          <div className="flex-1 flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-900">{formatTime(currentTime)}</span>
            <span className="text-xs text-gray-400">/ {formatTime(actualDuration)}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
          </div>

          <div className="flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <button onClick={() => seekTo(Math.max(0, currentTime - 5))} className="text-gray-500 hover:text-gray-900">
              <RotateCcw className="w-5 h-5" />
            </button>
            <button 
              onClick={togglePlay}
              className="w-10 h-10 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center transition-transform hover:scale-105 shadow-sm"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
            </button>
            <button onClick={() => seekTo(Math.min(actualDuration, currentTime + 15))} className="text-gray-500 hover:text-gray-900">
              <RotateCw className="w-5 h-5" />
            </button>
            <a href="/meeting-audio.mp3" download="Interview recording 2.mp3" className="text-gray-500 hover:text-gray-900 ml-2" title="Download Audio">
              <Download className="w-5 h-5" />
            </a>
          </div>

          <div className="flex-1 flex items-center justify-end gap-5 text-gray-500">
            <button 
              onClick={() => setIsStarred(!isStarred)}
              className={`transition-colors ${isStarred ? 'text-yellow-500' : 'hover:text-gray-900'}`}
            >
              <Star className={`w-5 h-5 ${isStarred ? 'fill-current' : ''}`} />
            </button>
            <button className="hover:text-gray-900 transition-colors"><Edit3 className="w-5 h-5" /></button>
            <button className="hover:text-gray-900 transition-colors"><Share2 className="w-5 h-5" /></button>
            <button 
              onClick={() => {
                setIsLiked(!isLiked)
                if (isDisliked) setIsDisliked(false)
              }}
              className={`transition-colors ${isLiked ? 'text-primary' : 'hover:text-gray-900'}`}
            >
              <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={() => {
                setIsDisliked(!isDisliked)
                if (isLiked) setIsLiked(false)
              }}
              className={`transition-colors ${isDisliked ? 'text-red-500' : 'hover:text-gray-900'}`}
            >
              <ThumbsDown className={`w-5 h-5 ${isDisliked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
