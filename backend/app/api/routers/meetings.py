from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from typing import List, Optional
from datetime import datetime

from app.database import get_db
from app import models, schemas

router = APIRouter(
    prefix="/meetings",
    tags=["Meetings"]
)

@router.get("", response_model=schemas.PaginatedMeetings)
def list_meetings(
    search: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    participant_id: Optional[int] = None,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    query = db.query(models.Meeting)
    
    if search:
        # Search in title (SQLite JSON search is complex, so we will stick to title for simple search)
        query = query.filter(models.Meeting.title.ilike(f"%{search}%"))
        
    if start_date:
        query = query.filter(models.Meeting.date >= start_date)
        
    if end_date:
        query = query.filter(models.Meeting.date <= end_date)
        
    if participant_id:
        query = query.join(models.Meeting.participants).filter(models.Participant.id == participant_id)
        
    # Order by recency
    query = query.order_by(models.Meeting.date.desc())
    
    total = query.count()
    items = query.offset(offset).limit(limit).all()
    
    return {"total": total, "items": items}

@router.get("/{meeting_id}", response_model=schemas.MeetingDetail)
def get_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    return meeting

@router.post("", response_model=schemas.Meeting, status_code=201)
def create_meeting(meeting_in: schemas.MeetingCreate, db: Session = Depends(get_db)):
    db_meeting = models.Meeting(
        title=meeting_in.title,
        date=meeting_in.date,
        duration_seconds=meeting_in.duration_seconds,
        media_url=meeting_in.media_url,
        topics=meeting_in.topics
    )
    
    if meeting_in.participant_ids:
        participants = db.query(models.Participant).filter(models.Participant.id.in_(meeting_in.participant_ids)).all()
        db_meeting.participants = participants
        
    db.add(db_meeting)
    db.commit()
    db.refresh(db_meeting)
    return db_meeting

@router.put("/{meeting_id}", response_model=schemas.Meeting)
def update_meeting(meeting_id: int, meeting_in: schemas.MeetingUpdate, db: Session = Depends(get_db)):
    db_meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not db_meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
        
    update_data = meeting_in.model_dump(exclude_unset=True)
    
    if "participant_ids" in update_data:
        participant_ids = update_data.pop("participant_ids")
        if participant_ids is not None:
            participants = db.query(models.Participant).filter(models.Participant.id.in_(participant_ids)).all()
            db_meeting.participants = participants
            
    for key, value in update_data.items():
        setattr(db_meeting, key, value)
        
    db.commit()
    db.refresh(db_meeting)
    return db_meeting

@router.delete("/{meeting_id}", status_code=204)
def delete_meeting(meeting_id: int, db: Session = Depends(get_db)):
    db_meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not db_meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
        
    db.delete(db_meeting)
    db.commit()
    return None
