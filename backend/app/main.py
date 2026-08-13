from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.api.routers import meetings, transcripts, summaries, action_items

# We are not doing full API endpoints per instruction.
# "Do not build API endpoints."
# Just scaffolding the main app structure.

# Create tables if they don't exist
# Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Fireflies Clone API",
    description="API for the Fireflies.ai clone assignment.",
    version="1.0.0"
)

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(meetings.router, prefix="/api/v1")
app.include_router(transcripts.router, prefix="/api/v1")
app.include_router(transcripts.segment_router, prefix="/api/v1")
app.include_router(summaries.router, prefix="/api/v1")
app.include_router(action_items.meeting_action_items_router, prefix="/api/v1")
app.include_router(action_items.action_items_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Fireflies Clone API"}
