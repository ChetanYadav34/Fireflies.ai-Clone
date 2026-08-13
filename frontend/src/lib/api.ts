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
