# API Contract

## Base URL
`/api/v1`

## Common Error Responses
- **400 Bad Request**: Validation error
- **404 Not Found**: Resource not found
- **500 Internal Server Error**

---

## 1. Meetings Endpoints

### 1.1 List Meetings
**GET** `/meetings`

**Query Parameters:**
- `search` (string): Search in title or topics.
- `start_date` (datetime): Filter meetings on or after this date.
- `end_date` (datetime): Filter meetings on or before this date.
- `participant_id` (int): Filter by a specific participant.
- `limit` (int, default=50)
- `offset` (int, default=0)

**Response Schema (200 OK):**
```json
{
  "total": 10,
  "items": [
    {
      "id": 1,
      "title": "Q3 Planning",
      "date": "2026-08-10T10:00:00Z",
      "duration_seconds": 3600,
      "topics": ["planning", "engineering"],
      "participants": [
        {"id": 1, "name": "Alice", "avatar_url": "..."}
      ]
    }
  ]
}
```

### 1.2 Get, Create, Update, Delete Meetings
- **GET** `/meetings/{meeting_id}`: Returns meeting details, summary, action items, participants, and topics.
- **POST** `/meetings`: Create a meeting.
- **PUT** `/meetings/{meeting_id}`: Update metadata (title, participants, topics).
- **DELETE** `/meetings/{meeting_id}`: Delete meeting.

---

## 2. Transcripts Endpoints

### 2.1 Get Meeting Transcript
**GET** `/meetings/{meeting_id}/transcript`

**Response (200 OK)**: Array of transcript segments.

### 2.2 Add Transcript Segment
**POST** `/meetings/{meeting_id}/transcript`

**Request Schema:**
```json
{
  "speaker_name": "Alice",
  "speaker_id": 1,
  "text": "Hello world",
  "start_time": 0,
  "end_time": 2000
}
```

### 2.3 Update Transcript Segment
**PUT** `/transcript-segments/{segment_id}`

**Request Schema:** Fields to update (text, speaker_name, etc).

### 2.4 Delete Transcript Segment
**DELETE** `/transcript-segments/{segment_id}`

---

## 3. Summary Endpoints

### 3.1 Get Meeting Summary
**GET** `/meetings/{meeting_id}/summary`

### 3.2 Create or Update Summary
**PUT** `/meetings/{meeting_id}/summary`

**Request Schema:**
```json
{
  "overview_text": "Meeting overview...",
  "bullet_points": ["Point 1", "Point 2"]
}
```

### 3.3 Delete Summary
**DELETE** `/meetings/{meeting_id}/summary`

---

## 4. Action Items Endpoints

### 4.1 Create Action Item
**POST** `/meetings/{meeting_id}/action-items`

**Request Schema:**
```json
{
  "task_description": "Send email",
  "owner_id": 2
}
```

### 4.2 Update Action Item
**PUT** `/action-items/{action_item_id}`

**Request Schema:**
```json
{
  "task_description": "Send email now",
  "is_completed": true,
  "owner_id": 2
}
```

### 4.3 Delete Action Item
**DELETE** `/action-items/{action_item_id}`
