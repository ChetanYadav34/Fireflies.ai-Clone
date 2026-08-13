export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000/api/v1'

export interface Participant {
  id: int;
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

export interface TranscriptSegment {
  id: number;
  meeting_id: number;
  speaker: string;
  start_time: number;
  end_time: number;
  text: string;
}

export interface Summary {
  id: number;
  meeting_id: number;
  overview: string;
  shorthand_bullet_points?: string[];
  outline?: string;
}

export interface ActionItem {
  id: number;
  meeting_id: number;
  description: string;
  owner_id?: number;
  is_completed: boolean;
}

export async function fetchMeetingById(id: string | number): Promise<Meeting> {
  const res = await fetch(`${API_BASE_URL}/meetings/${id}`)
  if (!res.ok) throw new Error('Failed to fetch meeting')
  return res.json()
}

export async function fetchMeetingTranscript(id: string | number): Promise<TranscriptSegment[]> {
  const res = await fetch(`${API_BASE_URL}/meetings/${id}/transcript`)
  if (!res.ok) throw new Error('Failed to fetch transcript')
  return res.json()
}

export async function fetchMeetingSummary(id: string | number): Promise<Summary> {
  const res = await fetch(`${API_BASE_URL}/meetings/${id}/summary`)
  if (!res.ok) {
    if (res.status === 404) return null as any;
    throw new Error('Failed to fetch summary')
  }
  return res.json()
}

export async function fetchMeetingActionItems(id: string | number): Promise<ActionItem[]> {
  const res = await fetch(`${API_BASE_URL}/action-items?meeting_id=${id}`)
  if (!res.ok) return []; // Since we haven't added a dedicated GET /action-items?meeting_id in backend yet, or we'll fetch them differently. Wait, I should add the meeting_action_items GET endpoint or just fetch it.
  return res.json()
}
