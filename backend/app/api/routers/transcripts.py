from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app import models, schemas

# We route these under /meetings/{meeting_id}/transcript
router = APIRouter(
    prefix="/meetings/{meeting_id}/transcript",
    tags=["Transcripts"]
)

# And a separate router for segment-specific operations (PUT, DELETE)
segment_router = APIRouter(
    prefix="/transcript-segments",
    tags=["Transcripts"]
)

@router.get("", response_model=List[schemas.TranscriptSegment])
def get_transcript(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
        
    segments = db.query(models.TranscriptSegment).filter(
        models.TranscriptSegment.meeting_id == meeting_id
    ).order_by(models.TranscriptSegment.start_time.asc()).all()
    
    return segments

@router.post("", response_model=schemas.TranscriptSegment, status_code=201)
def add_transcript_segment(meeting_id: int, segment_in: schemas.TranscriptSegmentCreate, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
        
    db_segment = models.TranscriptSegment(
        **segment_in.model_dump(),
        meeting_id=meeting_id
    )
    db.add(db_segment)
    db.commit()
    db.refresh(db_segment)
    return db_segment

@segment_router.put("/{segment_id}", response_model=schemas.TranscriptSegment)
def update_transcript_segment(segment_id: int, segment_in: schemas.TranscriptSegmentUpdate, db: Session = Depends(get_db)):
    db_segment = db.query(models.TranscriptSegment).filter(models.TranscriptSegment.id == segment_id).first()
    if not db_segment:
        raise HTTPException(status_code=404, detail="Transcript segment not found")
        
    update_data = segment_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_segment, key, value)
        
    db.commit()
    db.refresh(db_segment)
    return db_segment

@segment_router.delete("/{segment_id}", status_code=204)
def delete_transcript_segment(segment_id: int, db: Session = Depends(get_db)):
    db_segment = db.query(models.TranscriptSegment).filter(models.TranscriptSegment.id == segment_id).first()
    if not db_segment:
        raise HTTPException(status_code=404, detail="Transcript segment not found")
        
    db.delete(db_segment)
    db.commit()
    return None
