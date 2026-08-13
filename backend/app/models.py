from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime

from .database import Base

class MeetingParticipant(Base):
    __tablename__ = "meeting_participants"
    meeting_id = Column(Integer, ForeignKey("meetings.id"), primary_key=True)
    participant_id = Column(Integer, ForeignKey("participants.id"), primary_key=True)

class Participant(Base):
    __tablename__ = "participants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=True)
    avatar_url = Column(String, nullable=True)

    action_items = relationship("ActionItem", back_populates="owner")
    meetings = relationship("Meeting", secondary="meeting_participants", back_populates="participants")

class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    date = Column(DateTime, nullable=False)
    duration_seconds = Column(Integer, nullable=False)
    media_url = Column(String, nullable=True)
    topics = Column(JSON, nullable=True) # Stored as JSON array of strings
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    participants = relationship("Participant", secondary="meeting_participants", back_populates="meetings")
    transcript_segments = relationship("TranscriptSegment", back_populates="meeting", cascade="all, delete-orphan")
    summary = relationship("Summary", back_populates="meeting", uselist=False, cascade="all, delete-orphan")
    action_items = relationship("ActionItem", back_populates="meeting", cascade="all, delete-orphan")

class TranscriptSegment(Base):
    __tablename__ = "transcript_segments"

    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(Integer, ForeignKey("meetings.id"), index=True)
    speaker_id = Column(Integer, ForeignKey("participants.id"), nullable=True)
    speaker_name = Column(String, nullable=False)
    text = Column(Text, nullable=False)
    start_time = Column(Integer, nullable=False) # milliseconds
    end_time = Column(Integer, nullable=False) # milliseconds

    meeting = relationship("Meeting", back_populates="transcript_segments")

class Summary(Base):
    __tablename__ = "summaries"

    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(Integer, ForeignKey("meetings.id"), unique=True)
    overview_text = Column(Text, nullable=True)
    bullet_points = Column(JSON, nullable=True) # JSON array of strings

    meeting = relationship("Meeting", back_populates="summary")

class ActionItem(Base):
    __tablename__ = "action_items"

    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(Integer, ForeignKey("meetings.id"), index=True)
    owner_id = Column(Integer, ForeignKey("participants.id"), nullable=True)
    task_description = Column(String, nullable=False)
    is_completed = Column(Boolean, default=False)

    meeting = relationship("Meeting", back_populates="action_items")
    owner = relationship("Participant", back_populates="action_items")
