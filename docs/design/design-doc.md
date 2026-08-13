# Design Document

## 1. System Overview
The Fireflies Clone is a web-based application comprising a React (Next.js) frontend and a Python (FastAPI) backend. The system allows users to view and manage meeting transcripts, summaries, and action items. Data is persisted in a local SQLite database accessed via the backend API.

## 2. Architecture Diagram
```mermaid
graph TD
    Client[Web Browser (Next.js App Router)]
    API[FastAPI Backend]
    DB[(SQLite Database)]
    
    Client -- HTTP GET/POST/PUT/DELETE --> API
    API -- SQL Queries / ORM --> DB
    DB -- Result Sets --> API
    API -- JSON Responses --> Client
```

## 3. Frontend Architecture
- **Framework**: Next.js (App Router Locked).
- **Language**: TypeScript for type safety.
- **Styling & UI**: Tailwind CSS combined with shadcn/ui (Locked). This ensures a highly polished, accessible, and consistent design system mimicking Fireflies.ai.
- **Empty States**: The UI will define clear empty states for all views (e.g., Dashboard with zero meetings, Meeting with no action items, or search yielding no results). These will feature appropriate illustrations/icons and primary call-to-action buttons (like "Upload your first meeting").
- **Component Structure**:
  - `components/ui/`: shadcn/ui components (Buttons, Cards, Dialogs).
  - `components/features/`: Complex, stateful components (TranscriptViewer, SummaryPanel, MeetingList).
  - `app/`: App router definitions (e.g., `app/page.tsx`, `app/meetings/[id]/page.tsx`).

## 4. Backend Architecture
- **Framework**: FastAPI (Python). Chosen for high performance and automatic OpenAPI documentation.
- **Language**: Python 3.9+.
- **Structure**:
  - `main.py`: Entry point.
  - `api/routers/`: Route handlers (meetings, transcripts, summaries, action_items).
  - `core/`: Config, database setup.
  - `models/`: SQLAlchemy ORM models.
  - `schemas/`: Pydantic models.
  - `services/`: Business logic.

## 5. Data Flow
**Example: Viewing a Meeting Transcript**
1. User navigates to `/meetings/123`.
2. Next.js Server Components / Client Components mount.
3. TanStack Query sends a GET request to `/api/v1/meetings/123` and `/api/v1/meetings/123/transcript`.
4. FastAPI router receives the request, queries SQLite via SQLAlchemy.
5. Service layer maps ORM models to Pydantic schemas and serializes to JSON.
6. React state is updated via TanStack Query, rendering the TranscriptViewer.

## 6. State Management Strategy
- **Server State**: TanStack Query (React Query) (Locked) for fetching, caching, and synchronizing asynchronous data from the FastAPI backend. It handles loading, error, and empty states robustly.
- **Client/Local State**: React `useState` and `useRef` for component-level state (media player control, modal visibility).
- **Global UI State**: React Context API if needed for light global state (e.g., Theme/Dark mode).

## 7. API Design
The API follows RESTful principles.
- **Base URL**: `/api/v1`
- **Resources**:
  - `/meetings`
  - `/meetings/{id}/transcript` (includes CRUD operations for segments)
  - `/meetings/{id}/summary` (includes CRUD operations for summaries)
  - `/action-items`
- Utilizes Pydantic for strict input validation.

## 8. Security Considerations
- **CORS**: FastAPI will configure CORS middleware.
- **Input Validation**: Pydantic models strictly validate incoming payloads.
- **Database**: Parameterized queries via SQLAlchemy prevent SQL injection.

## 9. Error Handling Strategy
- **Backend**: Centralized exception handlers returning standard HTTP codes (400, 404, 500) with JSON details.
- **Frontend**: TanStack Query handles API error states. Display user-friendly Toast notifications (via shadcn/ui toast component) for actionable errors.

## 10. Deployment Architecture
- **Frontend**: Deployed on Vercel.
- **Backend**: Deployed on Render/Railway.
- **Database**: Single SQLite file (`app.db`) stored on the backend instance (requires persistent disk configuration).
