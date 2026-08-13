from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app import models, schemas

# Nested router for meeting-specific action items
meeting_action_items_router = APIRouter(
    prefix="/meetings/{meeting_id}/action-items",
    tags=["Action Items"]
)

# Top-level router for direct action item operations
action_items_router = APIRouter(
    prefix="/action-items",
    tags=["Action Items"]
)

@meeting_action_items_router.post("", response_model=schemas.ActionItem, status_code=201)
def create_action_item(meeting_id: int, action_item_in: schemas.ActionItemCreate, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
        
    db_item = models.ActionItem(
        **action_item_in.model_dump(),
        meeting_id=meeting_id
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@action_items_router.put("/{action_item_id}", response_model=schemas.ActionItem)
def update_action_item(action_item_id: int, action_item_in: schemas.ActionItemUpdate, db: Session = Depends(get_db)):
    db_item = db.query(models.ActionItem).filter(models.ActionItem.id == action_item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Action item not found")
        
    update_data = action_item_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_item, key, value)
        
    db.commit()
    db.refresh(db_item)
    return db_item

@action_items_router.delete("/{action_item_id}", status_code=204)
def delete_action_item(action_item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.ActionItem).filter(models.ActionItem.id == action_item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Action item not found")
        
    db.delete(db_item)
    db.commit()
    return None
