export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

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

export async function fetchMeetings(search?: string): Promise<PaginatedMeetings> {
  const url = new URL(`${API_BASE_URL}/meetings`)
  if (search) {
    url.searchParams.append('search', search)
  }
  
  const res = await fetch(url.toString())
  if (!res.ok) {
    throw new Error('Failed to fetch meetings')
  }
  return res.json()
}

export async function fetchMeetingById(id: string | number): Promise<Meeting> {
  const res = await fetch(`${API_BASE_URL}/meetings/${id}`)
  if (!res.ok) throw new Error('Failed to fetch meeting')
  return res.json()
}

export async function deleteMeeting(id: string | number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/meetings/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete meeting')
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
  const res = await fetch(`${API_BASE_URL}/meetings/${id}/transcript`)
  if (!res.ok) throw new Error('Failed to fetch transcript')
  return res.json()
}

export interface Summary {
  id: number;
  meeting_id: number;
  overview_text: string;
  bullet_points?: string[];
}

export async function fetchMeetingSummary(id: string | number): Promise<Summary | null> {
  const res = await fetch(`${API_BASE_URL}/meetings/${id}/summary`)
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch summary')
  }
  return res.json()
}

export interface ActionItem {
  id: number;
  meeting_id: number;
  task_description: string;
  owner_id?: number;
  is_completed: boolean;
}

export async function fetchMeetingActionItems(id: string | number): Promise<ActionItem[]> {
  const res = await fetch(`${API_BASE_URL}/meetings/${id}/action-items`)
  if (!res.ok) return []; 
  return res.json()
}

export async function updateActionItem(id: string | number, is_completed: boolean): Promise<ActionItem> {
  const res = await fetch(`${API_BASE_URL}/action-items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ is_completed })
  })
  if (!res.ok) throw new Error('Failed to update action item')
  return res.json()
}
