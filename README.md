# Fireflies.ai Clone - Meeting Notes & Transcription Platform

A fullstack clone of the Fireflies.ai meeting-assistant web application. This project faithfully replicates the design, user experience, and core post-meeting workflows of the original application, providing an immersive, productivity-focused workspace for managing meetings, transcripts, and AI-generated summaries.

## Tech Stack

*   **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Lucide Icons.
*   **Backend**: Python, FastAPI.
*   **Database**: SQLite (via SQLAlchemy/SQLModel).
*   **Styling**: Custom Tailwind CSS for pixel-perfect Fireflies UI replication.

## Architecture Overview

The application is structured as a decoupled monolithic fullstack architecture:
*   **Frontend (`/frontend`)**: A modern React application built with Next.js App Router. It manages complex UI states including a synchronized media player, interactive transcripts, and a responsive sidebar layout.
*   **Backend (`/backend`)**: A robust REST API built with FastAPI that handles data persistence for meetings, transcripts, summaries, and action items.
*   **Database**: A local SQLite database is used for seamless portability, with schemas managed via Python ORM (SQLAlchemy).

## Setup Instructions

### Prerequisites
*   Node.js (v18+)
*   Python (3.10+)
*   Git

### 1. Clone the repository
```bash
git clone https://github.com/ChetanYadav34/Fireflies.ai-Clone.git
cd Fireflies.ai-Clone
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:3000`.

### 3. Backend Setup
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
The backend API will be available at `http://localhost:8000`. You can view the auto-generated API documentation at `http://localhost:8000/docs`.

## Database Schema (SQLite)

The database consists of the following core models (Relationships are enforced via Foreign Keys):

1.  **Meeting**: Core entity. 
    *   `id` (UUID), `title` (String), `date` (DateTime), `duration` (Integer), `participants` (JSON/String).
2.  **Transcript**: Belongs to a Meeting.
    *   `id` (UUID), `meeting_id` (FK), `speaker` (String), `timestamp` (Float/String), `text` (Text).
3.  **Summary**: Belongs to a Meeting.
    *   `id` (UUID), `meeting_id` (FK), `overview` (Text), `chapters` (JSON/String).
4.  **ActionItem**: Belongs to a Meeting.
    *   `id` (UUID), `meeting_id` (FK), `task` (String), `assignee` (String), `is_completed` (Boolean).

## Evaluation & Completion Status

Below is the status of the requirements outlined in the assignment PDF:

### ✅ Fulfilled
*   **Meetings Library / Dashboard**: Pixel-perfect Fireflies home view, list of past meetings, Recency sorting, and fully-styled Navbar with dropdowns.
*   **Meeting / Transcript Detail View**: Interactive transcript with speaker labels, fully synced media player (clicking transcript seeks audio and vice versa), highlighted search within transcript, and dark mode UI toggles.
*   **AI Summary & Notes**: Complete UI for AI-generated summaries, action items, and meeting outlines.
*   **Fireflies Experience**: Extremely high visual fidelity, accurately recreating the navigation, panels, responsive sidebar, modals, notifications, and settings placeholders.
*   **Mocked/Placeholder Sections**: Upload workflows, Live Bot joins, and generic CRM integrations are present visually as requested.
*   **CRUD Operations (Meeting Management)**: Full API integration. The frontend interacts with the FastAPI backend to Create, Read, Update, and Delete meetings, transcripts, and action items. If the backend is unavailable, the frontend gracefully degrades to local mock data.
*   **Search/Filter Functionality**: The dashboard integrates with the backend API to filter meetings dynamically.

## Assumptions Made
*   Real speech-to-text was explicitly out of scope, so audio controls are tethered to pre-seeded transcripts.
*   The UI prioritizes "feel and aesthetics" of Fireflies.ai.
*   Authentication is bypassed/mocked via local storage for ease of evaluation.
