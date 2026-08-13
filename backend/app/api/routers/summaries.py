from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas

router = APIRouter(
    prefix="/meetings/{meeting_id}/summary",
    tags=["Summaries"]
)

@router.get("", response_model=schemas.Summary)
def get_summary(meeting_id: int, db: Session = Depends(get_db)):
    summary = db.query(models.Summary).filter(models.Summary.meeting_id == meeting_id).first()
    if not summary:
        raise HTTPException(status_code=404, detail="Summary not found")
    return summary

@router.put("", response_model=schemas.Summary)
def create_or_update_summary(meeting_id: int, summary_in: schemas.SummaryUpdate, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
        
    db_summary = db.query(models.Summary).filter(models.Summary.meeting_id == meeting_id).first()
    
    if db_summary:
        update_data = summary_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_summary, key, value)
    else:
        db_summary = models.Summary(**summary_in.model_dump(), meeting_id=meeting_id)
        db.add(db_summary)
        
    db.commit()
    db.refresh(db_summary)
    return db_summary

@router.delete("", status_code=204)
def delete_summary(meeting_id: int, db: Session = Depends(get_db)):
    db_summary = db.query(models.Summary).filter(models.Summary.meeting_id == meeting_id).first()
    if not db_summary:
        raise HTTPException(status_code=404, detail="Summary not found")
        
    db.delete(db_summary)
    db.commit()
    return None
