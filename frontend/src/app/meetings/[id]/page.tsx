'use client'

import { useQuery } from '@tanstack/react-query'
import { 
  fetchMeetingById, 
  fetchMeetingTranscript, 
  fetchMeetingSummary, 
  fetchMeetingActionItems,
  API_BASE_URL
} from '@/lib/api'
import { Sidebar } from '@/components/layout/sidebar'
import { TopNavbar } from '@/components/layout/top-navbar'
import { format } from 'date-fns'
import { Clock, Calendar, CheckCircle2, Circle, Play, Pause, Search } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function MeetingDetail({ params }: { params: { id: string } }) {
  const meetingId = params.id

  const { data: meeting, isLoading: isMeetingLoading } = useQuery({
    queryKey: ['meeting', meetingId],
    queryFn: () => fetchMeetingById(meetingId)
  })

  const { data: transcript, isLoading: isTranscriptLoading } = useQuery({
    queryKey: ['transcript', meetingId],
    queryFn: () => fetchMeetingTranscript(meetingId)
  })

  const { data: summary, isLoading: isSummaryLoading } = useQuery({
    queryKey: ['summary', meetingId],
    queryFn: () => fetchMeetingSummary(meetingId)
  })

  const { data: actionItems, isLoading: isActionItemsLoading } = useQuery({
    queryKey: ['actionItems', meetingId],
    queryFn: () => fetchMeetingActionItems(meetingId)
  })

  const formatTimestamp = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 md:ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopNavbar />
        
        <main className="flex-1 flex overflow-hidden">
          {/* LEFT PANEL: Media Player & Transcript */}
          <div className="flex-1 border-r flex flex-col min-w-0 bg-white">
            {/* Header */}
            <div className="p-4 border-b flex-shrink-0">
              {isMeetingLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ) : (
                <>
                  <h1 className="text-xl font-semibold text-gray-900 truncate">
                    {meeting?.title}
                  </h1>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {meeting?.date && format(new Date(meeting.date), 'MMMM d, yyyy')}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {meeting?.duration_seconds ? Math.round(meeting.duration_seconds / 60) : 0} min
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Media Player (Mock) */}
            <div className="bg-gray-900 aspect-video flex-shrink-0 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <div className="z-10 text-white text-center">
                <p className="text-sm font-medium mb-4 text-gray-300">Audio Preview</p>
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors">
                  <Play className="w-8 h-8 ml-1" />
                </div>
              </div>

              {/* Progress Bar (Mock) */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white font-medium">0:00</span>
                  <div className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer">
                    <div className="w-1/3 h-full bg-indigo-500 rounded-full relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
                    </div>
                  </div>
                  <span className="text-xs text-white font-medium">
                    {meeting?.duration_seconds ? formatTimestamp(meeting.duration_seconds) : "0:00"}
                  </span>
                </div>
              </div>
            </div>

            {/* Transcript Area */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="p-3 border-b flex-shrink-0 bg-gray-50/50">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search transcript..." 
                    className="pl-9 h-8 bg-white text-sm"
                  />
                </div>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                {isTranscriptLoading ? (
                  <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex gap-4">
                        <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-5/6" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : transcript && transcript.length > 0 ? (
                  <div className="space-y-6">
                    {transcript.map((segment) => (
                      <div key={segment.id} className="flex gap-4 group">
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-medium">
                            {segment.speaker.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-semibold text-sm text-gray-900">{segment.speaker}</span>
                            <span className="text-xs text-gray-400 font-medium group-hover:text-indigo-600 transition-colors cursor-pointer">
                              {formatTimestamp(segment.start_time)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed group-hover:bg-indigo-50/50 -mx-2 px-2 py-1 rounded transition-colors">
                            {segment.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 py-12">
                    <p>No transcript available.</p>
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>

          {/* RIGHT PANEL: Insights (Summary & Action Items) */}
          <div className="w-[360px] flex-shrink-0 bg-gray-50 flex flex-col hidden lg:flex">
            <Tabs defaultValue="summary" className="flex-1 flex flex-col">
              <div className="px-4 pt-4 border-b bg-white">
                <TabsList className="w-full bg-gray-100/50 p-1">
                  <TabsTrigger value="summary" className="flex-1 text-xs">Summary</TabsTrigger>
                  <TabsTrigger value="action-items" className="flex-1 text-xs">
                    Action Items
                    {actionItems && actionItems.length > 0 && (
                      <Badge variant="secondary" className="ml-2 bg-indigo-100 text-indigo-700 px-1 py-0 text-[10px]">
                        {actionItems.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="flex-1">
                <TabsContent value="summary" className="m-0 p-5 space-y-6">
                  {isSummaryLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-20 w-full" />
                    </div>
                  ) : summary ? (
                    <>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Overview</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {summary.overview}
                        </p>
                      </div>
                      
                      <Separator />
                      
                      {summary.shorthand_bullet_points && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Key Points</h3>
                          <ul className="space-y-2">
                            {summary.shorthand_bullet_points.map((point, idx) => (
                              <li key={idx} className="flex gap-2 text-sm text-gray-600">
                                <span className="text-indigo-500 mt-0.5">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <p className="text-sm">Summary is generating...</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="action-items" className="m-0 p-5">
                  {isActionItemsLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : actionItems && actionItems.length > 0 ? (
                    <div className="space-y-3">
                      {actionItems.map((item) => (
                        <div key={item.id} className="flex gap-3 items-start p-3 bg-white border rounded-lg shadow-sm hover:border-indigo-200 transition-colors cursor-pointer group">
                          {item.is_completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0 group-hover:text-indigo-400" />
                          )}
                          <div className="flex-1">
                            <p className={`text-sm ${item.is_completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                              {item.description}
                            </p>
                            {item.owner_id && (
                              <div className="flex items-center gap-1.5 mt-2">
                                <Avatar className="w-4 h-4">
                                  <AvatarFallback className="bg-indigo-100 text-indigo-700 text-[8px]">U</AvatarFallback>
                                </Avatar>
                                <span className="text-[10px] font-medium text-gray-500 uppercase">Owner</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <p className="text-sm">No action items identified.</p>
                    </div>
                  )}
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
