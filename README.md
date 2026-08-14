# Fireflies.ai Clone - Meeting Notes & Transcription Platform

A fullstack clone of the Fireflies.ai meeting-assistant web application. This project faithfully replicates the design, user experience, and core post-meeting workflows of the original application, providing an immersive, productivity-focused workspace for managing meetings, transcripts, and AI-generated summaries.

- **Dashboard**: Central hub for managing meetings, uploading recordings, and reviewing transcripts.
- **Meeting Details Page**: Displays transcript, summary, participants, and action items.

## 🧭 Navigation & UI Guide
- **Authentication**: This app currently does not support real Google/SSO login. To access the dashboard, simply click **"Continue with Email"** and provide *any* email and password. It will mock the authentication and let you right in.
- **Dead Ends / Placeholders**: Some buttons (like mobile app download, or upgrading) are purely visual placeholders to match the real Fireflies UI and will show a "Coming Soon" toast message when clicked.
- **Global Search**: You can use the top navigation bar's search input to filter meetings in your dashboard.
- **Meeting Management**: Once in a meeting, you can edit the title, add/remove participants, and create or check off Action Items.

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

## Navigation Guide & Features

To help you explore the application during evaluation, here is a quick guide to its features and navigation:

*   **Login / Authentication**: The application does *not* support direct Google Login (OAuth is mocked). To enter the dashboard, simply type **any random email and password** on the login/signup screen and click submit. You will be instantly redirected to the dashboard.
*   **Meeting Management (CRUD)**:
    *   **Create**: Navigate to the "Uploads" page via the sidebar. Click "Create Mock Meeting" to generate a new meeting entry.
    *   **Edit**: Click on any meeting in your dashboard to view its details. Click the meeting title at the top of the page (next to `#My Meetings`) to inline-edit and rename it.
    *   **Delete**: From the main dashboard, click the trash can icon on a meeting row to delete it.
*   **Interactive Transcript**: On the meeting detail page, click any timestamp in the transcript to jump the audio player to that exact moment.
*   **Action Items**: In the "Notes" section of the meeting detail view, you can check off action items to mark them as completed.

## Assumptions Made
*   Real speech-to-text was explicitly out of scope, so audio controls are tethered to pre-seeded transcripts.
*   The UI prioritizes "feel and aesthetics" of Fireflies.ai.
*   Authentication is bypassed/mocked via local storage for ease of evaluation.
