# Product Requirements Document (PRD)

## 1. Product Overview
The product is a functional clone of the Fireflies.ai meeting-assistant web application. Users can browse a library of meetings, view interactive transcripts synced with media playback, read AI-generated summaries and action items, and search across their transcript library.

## 2. Goals
- Replicate the core Fireflies.ai user experience (UI, layout, interactions).
- Provide a seamless interactive transcript experience with synchronized media playback.
- Allow users to manage meeting data (CRUD operations) efficiently.
- Deliver a complete, deployable full-stack application.

## 3. Success Criteria
- **Functional**: All Must-Have features work seamlessly.
- **Usability**: Transcript feels responsive (clicking a line seeks audio, audio playing highlights line).
- **Aesthetic**: High visual fidelity to Fireflies.ai, built with Tailwind + shadcn/ui.
- **Data**: Seed data is robust (5 realistic meetings) ensuring all UI states can be tested.

## 4. User Personas
- **The Professional / Manager**: Needs to quickly review past meetings and find assigned action items.

## 5. Functional Requirements
### 5.1 Dashboard (Meetings Library)
- List all past meetings.
- Search meetings by title or topics; filter by date range or participant.
- Empty State: If no meetings exist, show an illustration with an "Upload Meeting" CTA. If search yields no results, show "No matching meetings found" with a "Clear Filters" CTA.

### 5.2 Meeting Detail View
- Interactive Transcript: Click to seek; playback auto-scrolls/highlights.
- Summary Panel: AI summary, action items (with ownership fields), and topics.
- Empty States:
  - No transcript: Show "Transcript processing..." or "Upload transcript" CTA.
  - No action items: Show "No action items identified" with an "Add Action Item" button.
  - No summary: Show "Summary generation pending" placeholder.

### 5.3 Meeting Management (CRUD)
- Create/Edit/Delete meetings, transcript segments, summaries, and action items.

## 6. Non-Functional Requirements
- **Performance**: Virtualized list for long transcripts if needed.
- **Persistence**: SQLite database.

## 7. User Flows
- **Reviewing**: Login -> Dashboard -> Search -> Detail View -> Read summary -> Click transcript -> Exit.
- **Adding**: Upload Meeting -> Fill details -> Submit -> Detail page.

## 8. Acceptance Criteria
- Dashboard search filters in real-time.
- Transcript timestamp clicks sync perfectly with audio.
- Audio playback automatically highlights the correct transcript line.

## 9. Scope
- Frontend UI mirroring Fireflies.ai (Next.js App Router, Tailwind, shadcn/ui).
- Backend API (FastAPI) and SQLite DB.
- 5 realistic seeded meetings.

## 10. Out of Scope
- Real speech-to-text, real-time bots, real auth (mocked logged-in user).
