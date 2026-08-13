# Implementation Roadmap

## Overview
This roadmap outlines the execution plan for building the Fireflies.ai clone. It is broken down into sequential milestones.

## Phase Order & Milestones

### Milestone 1: Project Setup & Foundation (Est. 3 Hours)
- Initialize Next.js project (App Router) with Tailwind CSS and shadcn/ui.
- Initialize FastAPI project.
- Set up SQLite database and SQLAlchemy models (including updated schema with action item owners and topics JSON).
- Create robust seed script generating **5 realistic meetings**. This must include varied participants, long/short transcripts, empty states (e.g., a meeting with no action items), and full summaries to properly test the UI.

### Milestone 2: Core API Development (Est. 4 Hours)
- Implement `GET /meetings` with search/filter parameters (date, participant).
- Implement Meeting CRUD, Summary CRUD, and Transcript segment CRUD.
- Implement Action Items CRUD (including `owner_id`).
- Test all endpoints via Swagger UI (`/docs`).

### Milestone 3: Dashboard & Navigation UI (Est. 4 Hours)
- Build the Sidebar and Top Navbar.
- Develop the Meetings Library using TanStack Query.
- Implement empty states (No meetings, No search results).
- Apply high-fidelity styling (Tailwind + shadcn).

### Milestone 4: Meeting Detail View & Media Player (Est. 6 Hours)
- Build Left (Player/Transcript) and Right (Summary Panel) layout.
- Integrate HTML5 player.
- Fetch and display AI Summary and Action Items.
- Implement empty states for missing summaries or action items.

### Milestone 5: The Interactive Transcript (Est. 5 Hours)
- Render transcript segments.
- Implement two-way sync: Click-to-seek and Playback-highlighting.
- Implement "Search within transcript".

### Milestone 6: Polish, Testing, & Deployment (Est. 2 Hours)
- Final UI sweep.
- Ensure error handling (API failures) is gracefully handled.
- Deploy Backend and Frontend.

## Risks & Mitigation
- **Risk:** Audio-Transcript sync lag causing a poor UX.
  - *Mitigation:* Throttle/debounce the `timeupdate` event listener in React.
- **Risk:** SQLite lock issues.
  - *Mitigation:* `connect_args={"check_same_thread": False}`.

## Testing Strategy
- **Manual End-to-End**: Test all 5 seeded meetings, checking empty states, long transcripts, and CRUD operations.

## Deployment Plan
- Push code to GitHub.
- Deploy Backend to Render (with persistent disk for SQLite).
- Deploy Frontend to Vercel (Next.js App Router compatible).
