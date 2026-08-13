'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchMeetings } from '@/lib/api'
import { Sidebar } from '@/components/layout/sidebar'
import { TopNavbar } from '@/components/layout/top-navbar'
import { format } from 'date-fns'
import { Video, Calendar, Clock, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['meetings'],
    queryFn: () => fetchMeetings()
  })

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 md:ml-[260px] flex flex-col min-h-screen">
        <TopNavbar />
        
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Notebook</h1>
                <p className="text-sm text-gray-500 mt-1">View and manage your meeting recordings</p>
              </div>
            </div>

            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="shadow-sm">
                    <CardHeader className="p-4 space-y-2">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-3 w-1/3" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <Skeleton className="h-[100px] w-full rounded-md" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {isError && (
              <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-100 flex flex-col items-center justify-center text-center h-48">
                <p className="font-medium">Failed to load meetings.</p>
                <p className="text-sm mt-1">Please ensure the backend is running.</p>
              </div>
            )}

            {!isLoading && !isError && data?.items.length === 0 && (
              <div className="bg-white border rounded-xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Video className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No meetings yet</h3>
                <p className="text-gray-500 mt-2 max-w-sm">
                  Record your first meeting to see the transcript, summary, and action items here.
                </p>
              </div>
            )}

            {!isLoading && !isError && data?.items && data.items.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.items.map((meeting) => (
                  <Card key={meeting.id} className="shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                    <CardHeader className="p-4 pb-3">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                          {meeting.title}
                        </h3>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {format(new Date(meeting.date), 'MMM d, yyyy')}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {Math.round(meeting.duration_seconds / 60)} min
                        </div>
                      </div>
                    </CardHeader>
                    
                    {meeting.topics && meeting.topics.length > 0 && (
                      <CardContent className="p-4 pt-0">
                        <div className="flex flex-wrap gap-1.5">
                          {meeting.topics.slice(0, 3).map((topic, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-gray-100 text-gray-700 font-normal hover:bg-gray-200">
                              {topic}
                            </Badge>
                          ))}
                          {meeting.topics.length > 3 && (
                            <Badge variant="secondary" className="bg-gray-50 text-gray-500 font-normal">
                              +{meeting.topics.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    )}
                    
                    <CardFooter className="p-4 border-t bg-gray-50/50 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {meeting.participants.slice(0, 4).map((p) => (
                          <Avatar key={p.id} className="w-6 h-6 border-2 border-white">
                            <AvatarImage src={p.avatar_url} />
                            <AvatarFallback className="text-[10px] bg-indigo-100 text-indigo-700">
                              {p.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="text-xs font-medium text-indigo-600 group-hover:underline">
                        View details
                      </span>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
