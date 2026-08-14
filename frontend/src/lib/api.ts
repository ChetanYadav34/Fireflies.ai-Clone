export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

import { meetingSummaryDetailed, meetingTranscript } from './meeting-data'

export interface Participant {
  id: number;
  name: string;
  email?: string;
  avatar_url?: string;
}

export interface Meeting {
  id: number;
  title: string;
  date: string;
  duration_seconds: number;
  topics?: string[];
  participants: Participant[];
}

export interface PaginatedMeetings {
  total: number;
  items: Meeting[];
}

const MOCK_MEETING: Meeting = {
  id: 1,
  title: "fireflies test",
  date: new Date().toISOString(),
  duration_seconds: 426,
  participants: [{ id: 1, name: "User" }]
}

export async function fetchMeetings(search?: string): Promise<PaginatedMeetings> {
  const url = new URL(`${API_BASE_URL}/meetings`)
  if (search) {
    url.searchParams.append('search', search)
  }
  
  try {
    const res = await fetch(url.toString())
    if (!res.ok) throw new Error('Failed to fetch')
    return await res.json()
  } catch (err) {
    console.warn("Backend unreachable, falling back to mock data.")
    // Fallback if backend is not running (like on Vercel without backend deployed)
    return {
      total: 1,
      items: [MOCK_MEETING].filter(m => !search || m.title.toLowerCase().includes(search.toLowerCase()))
    }
  }
}

export async function fetchMeetingById(id: string | number): Promise<Meeting> {
  try {
    const res = await fetch(`${API_BASE_URL}/meetings/${id}`)
    if (!res.ok) throw new Error('Failed')
    return await res.json()
  } catch (err) {
    return MOCK_MEETING
  }
}

export async function createMeeting(title: string, duration_seconds: number, date: string): Promise<Meeting> {
  try {
    const res = await fetch(`${API_BASE_URL}/meetings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, duration_seconds, date, participant_ids: [] })
    })
    if (!res.ok) throw new Error('Failed to create')
    return await res.json()
  } catch (err) {
    return { ...MOCK_MEETING, id: Date.now(), title, duration_seconds, date }
  }
}

export async function updateMeeting(id: string | number, title: string): Promise<Meeting> {
  try {
    const res = await fetch(`${API_BASE_URL}/meetings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    if (!res.ok) throw new Error('Failed to update')
    return await res.json()
  } catch (err) {
    return { ...MOCK_MEETING, id: Number(id), title }
  }
}

export async function deleteMeeting(id: string | number): Promise<void> {
  try {
    const res = await fetch(`${API_BASE_URL}/meetings/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed')
  } catch (err) {
    console.log("Deleted mock meeting")
  }
}

export interface TranscriptSegment {
  id: number;
  meeting_id: number;
  speaker_name: string;
  start_time: number;
  end_time: number;
  text: string;
}

export async function fetchMeetingTranscript(id: string | number): Promise<TranscriptSegment[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/meetings/${id}/transcript`)
    if (!res.ok) throw new Error('Failed')
    return await res.json()
  } catch (err) {
    return meetingTranscript.map((t, i) => ({
      id: i,
      meeting_id: 1,
      speaker_name: t.speaker,
      start_time: (t.seconds || 0) * 1000,
      end_time: ((t.seconds || 0) + 10) * 1000,
      text: t.text
    }))
  }
}

export interface Summary {
  id: number;
  meeting_id: number;
  overview_text: string;
  bullet_points?: string[];
}

export async function fetchMeetingSummary(id: string | number): Promise<Summary | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/meetings/${id}/summary`)
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed')
    }
    return await res.json()
  } catch (err) {
    return {
      id: 1,
      meeting_id: 1,
      overview_text: meetingSummaryDetailed[1],
      bullet_points: meetingSummaryDetailed.slice(2).filter(line => line.trim() !== '')
    }
  }
}

export interface ActionItem {
  id: number;
  meeting_id: number;
  task_description: string;
  owner_id?: number;
  is_completed: boolean;
}

export async function fetchMeetingActionItems(id: string | number): Promise<ActionItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/meetings/${id}/action-items`)
    if (!res.ok) throw new Error('Failed')
    return await res.json()
  } catch (err) {
    return [
      { id: 1, meeting_id: 1, task_description: "Review Kickoff Notes", is_completed: false },
      { id: 2, meeting_id: 1, task_description: "Set up Slack Integration", is_completed: true }
    ]
  }
}

export async function updateActionItem(id: string | number, is_completed: boolean): Promise<ActionItem> {
  try {
    const res = await fetch(`${API_BASE_URL}/action-items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_completed })
    })
    if (!res.ok) throw new Error('Failed')
    return await res.json()
  } catch (err) {
    return { id: Number(id), meeting_id: 1, task_description: "Updated Mock Item", is_completed }
  }
}
