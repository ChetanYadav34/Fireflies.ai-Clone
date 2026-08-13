import asyncio
from datetime import datetime, timedelta
from app.database import engine, SessionLocal, Base
from app import models

def seed_db():
    print("Recreating database tables...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    
    try:
        print("Seeding Participants...")
        p1 = models.Participant(name="Alice Smith", email="alice@example.com", avatar_url="https://i.pravatar.cc/150?u=alice")
        p2 = models.Participant(name="Bob Johnson", email="bob@example.com", avatar_url="https://i.pravatar.cc/150?u=bob")
        p3 = models.Participant(name="Charlie Davis", email="charlie@example.com", avatar_url="https://i.pravatar.cc/150?u=charlie")
        db.add_all([p1, p2, p3])
        db.commit()

        print("Seeding Meetings...")
        now = datetime.utcnow()
        
        # Meeting 1: Full transcript, summary, action items
        m1 = models.Meeting(
            title="Q3 Product Roadmap Sync",
            date=now - timedelta(days=2),
            duration_seconds=1800,
            topics=["Roadmap", "Q3", "Product"],
            participants=[p1, p2]
        )
        
        # Meeting 2: Short meeting, no action items (Empty State)
        m2 = models.Meeting(
            title="Quick Sync: Design System",
            date=now - timedelta(days=5),
            duration_seconds=600,
            topics=["Design", "UI"],
            participants=[p1, p3]
        )
        
        # Meeting 3: Long meeting
        m3 = models.Meeting(
            title="Engineering All Hands",
            date=now - timedelta(days=10),
            duration_seconds=3600,
            topics=["Engineering", "Updates"],
            participants=[p1, p2, p3]
        )
        
        # Meeting 4: Missing summary (Empty State)
        m4 = models.Meeting(
            title="1:1 Bob & Alice",
            date=now - timedelta(days=15),
            duration_seconds=1800,
            topics=["1:1", "Feedback"],
            participants=[p1, p2]
        )

        # Meeting 5: Completely empty transcript & everything (Empty State)
        m5 = models.Meeting(
            title="Placeholder: Budget Review",
            date=now - timedelta(days=1),
            duration_seconds=2700,
            topics=["Budget"],
            participants=[p2, p3]
        )
        
        db.add_all([m1, m2, m3, m4, m5])
        db.commit()

        print("Seeding Summaries & Action Items...")
        s1 = models.Summary(
            meeting_id=m1.id, 
            overview_text="Discussed the major features for Q3 including the new dashboard and improved search capabilities.",
            bullet_points=["Dashboard v2 launch", "ElasticSearch migration", "Hiring plans"]
        )
        s2 = models.Summary(
            meeting_id=m2.id,
            overview_text="Brief check-in on the design system progress. Everything is on track.",
            bullet_points=["Colors locked", "Typography locked"]
        )
        db.add_all([s1, s2])

        a1 = models.ActionItem(meeting_id=m1.id, owner_id=p1.id, task_description="Draft PRD for Dashboard v2", is_completed=False)
        a2 = models.ActionItem(meeting_id=m1.id, owner_id=p2.id, task_description="Review ElasticSearch docs", is_completed=True)
        db.add_all([a1, a2])
        
        print("Seeding Transcripts...")
        t1 = models.TranscriptSegment(meeting_id=m1.id, speaker_id=p1.id, speaker_name=p1.name, text="Hi everyone, let's look at the Q3 roadmap.", start_time=0, end_time=3000)
        t2 = models.TranscriptSegment(meeting_id=m1.id, speaker_id=p2.id, speaker_name=p2.name, text="Sounds good. I think the dashboard is the priority.", start_time=3100, end_time=6000)
        db.add_all([t1, t2])

        db.commit()
        print("Database seeded successfully!")

    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
