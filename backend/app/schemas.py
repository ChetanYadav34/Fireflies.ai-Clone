from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime

class ParticipantBase(BaseModel):
    name: str
    email: Optional[str] = None
    avatar_url: Optional[str] = None

class ParticipantCreate(ParticipantBase):
    pass

class Participant(ParticipantBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class ActionItemBase(BaseModel):
    task_description: str
    is_completed: bool = False
    owner_id: Optional[int] = None

class ActionItemCreate(ActionItemBase):
    pass

class ActionItemUpdate(BaseModel):
    task_description: Optional[str] = None
    is_completed: Optional[bool] = None
    owner_id: Optional[int] = None

class ActionItem(ActionItemBase):
    id: int
    meeting_id: int
    owner: Optional[Participant] = None
    model_config = ConfigDict(from_attributes=True)

class TranscriptSegmentBase(BaseModel):
    speaker_id: Optional[int] = None
    speaker_name: str
    text: str
    start_time: int
    end_time: int

class TranscriptSegmentCreate(TranscriptSegmentBase):
    pass

class TranscriptSegmentUpdate(BaseModel):
    speaker_id: Optional[int] = None
    speaker_name: Optional[str] = None
    text: Optional[str] = None
    start_time: Optional[int] = None
    end_time: Optional[int] = None

class TranscriptSegment(TranscriptSegmentBase):
    id: int
    meeting_id: int
    model_config = ConfigDict(from_attributes=True)

class SummaryBase(BaseModel):
    overview_text: Optional[str] = None
    bullet_points: Optional[List[str]] = None

class SummaryCreate(SummaryBase):
    pass

class SummaryUpdate(SummaryBase):
    pass

class Summary(SummaryBase):
    id: int
    meeting_id: int
    model_config = ConfigDict(from_attributes=True)

class MeetingBase(BaseModel):
    title: str
    date: datetime
    duration_seconds: int
    media_url: Optional[str] = None
    topics: Optional[List[str]] = None

class MeetingCreate(MeetingBase):
    participant_ids: Optional[List[int]] = []

class MeetingUpdate(BaseModel):
    title: Optional[str] = None
    date: Optional[datetime] = None
    duration_seconds: Optional[int] = None
    media_url: Optional[str] = None
    topics: Optional[List[str]] = None
    participant_ids: Optional[List[int]] = None

class Meeting(MeetingBase):
    id: int
    created_at: datetime
    updated_at: datetime
    participants: List[Participant] = []
    
    model_config = ConfigDict(from_attributes=True)

class MeetingDetail(Meeting):
    summary: Optional[Summary] = None
    action_items: List[ActionItem] = []
    # transcript_segments are usually fetched separately to avoid huge payloads

class PaginatedMeetings(BaseModel):
    total: int
    items: List[Meeting]
