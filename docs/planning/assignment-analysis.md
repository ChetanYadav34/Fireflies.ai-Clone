# Assignment Analysis

## Functional Requirements
- **Meetings Library / Dashboard**: 
  - View a list of past meetings showing title, date, duration, and participants.
  - Search and filter meetings by title, date, or participant.
  - Sort meetings by recency.
  - Navbar with profile and settings placeholders.
- **Meeting / Transcript Detail View**:
  - Display an interactive transcript with speaker labels and timestamps.
  - Include a media player area with a seek bar (audio/video can be placeholders or sample files).
  - Clicking a transcript line must seek the player to the corresponding timestamp, and playing the media must highlight the current transcript line.
  - Ability to search within the transcript and highlight matches.
- **AI Summary & Notes**:
  - Show AI-generated meeting summary.
  - Extract and display action items / tasks from the meeting.
  - Display key topics / outline / chapters.
  - Note: Summaries can be seeded, mocked, or LLM-generated from transcript text.
- **Meeting Management (CRUD)**:
  - Create a meeting (uploading/pasting transcript or via form).
  - Edit meeting metadata (title, participants).
  - Delete a meeting.
  - Add, edit, and complete action items.
- **Fireflies Experience (UI/UX)**:
  - Application must closely resemble Fireflies's design and user experience.
  - Replicate navigation, layout (library + detail view), transcript/summary panels, forms, modals, search, filters, notifications/toasts, and settings placeholders.
- **Mocked / Placeholder Sections**:
  - Real-time bot joining live calls.
  - Actual speech-to-text transcription.
  - Integrations (Zoom, Google Meet, calendar, CRM).
  - Team / sharing & collaboration.
  - Real user authentication (assume default logged-in user).
- **Bonus (Optional)**:
  - Comments / highlights / soundbites on transcript segments.
  - Export transcript or summary (PDF / Markdown / TXT).
  - Global search across all meetings.
  - Tags / topics and filtering by them.
  - LLM-powered "ask a question about this meeting" chat.
  - Dark mode.

## Technical Requirements
- **Frontend**: Next.js (TypeScript).
- **Backend**: Python with FastAPI (preferred over Django per Tech Stack phase instructions).
- **Database**: SQLite. Custom schema design is required.
- **Data Persistence**: All meetings, transcripts, summaries, and action items must persist.
- **Sample Data**: The database must be seeded with several meetings containing full transcripts, summaries, and action items so the app is immediately usable.
- **No Banned Tech**: Cannot use MongoDB, PostgreSQL, Firebase, Supabase, or Prisma.

## Deliverables
- **Source Code**: Public GitHub repository containing `frontend/` and `backend/` directories.
- **Documentation**: A README file containing setup instructions, tech stack used, architecture overview, database schema, API overview, and any assumptions made.
- **Demo**: A hosted, working link (e.g., Vercel for frontend, Render/Railway for backend).

## Evaluation Criteria
- **Functionality**: All core features must work correctly (especially interactive transcript and summary views).
- **UI/UX**: Visual similarity to the original Fireflies.ai app's design and UX patterns.
- **Database Design**: Well-structured schema with proper relationships.
- **Backend / API Design**: Clean, sensible API design and architecture.
- **Code Quality**: Clean, readable, well-organized code.
- **Code Modularity**: Proper separation of concerns, reusable components.
- **Code Understanding**: Ability to explain code decisions during the evaluation interview.

## Hidden Expectations
- The evaluator will check if the user interface genuinely feels like a "modern Fireflies workspace". This means high attention to detail on CSS, typography, layout, spacing, and micro-interactions.
- Even though real transcription is out of scope, the *feel* of interacting with a transcript must be highly polished (scrolling sync, accurate timestamp seeking).
- Given the 24-hour estimated effort, prioritizing the "Must Have" features with high-quality UI over half-baked "Bonus" features is critical.
- "Original Work" rule means we cannot just copy an existing template; it needs to be built from scratch, utilizing AI tools appropriately but understanding the code.
- Since it's a "Clone", any deviation from the Fireflies UI should be minimal or justified.

## Risks
- **Scope Creep**: Getting bogged down in implementing actual AI summaries or speech-to-text instead of focusing on the core UI/UX and CRUD requirements.
- **Syncing Audio/Transcript**: Implementing the two-way binding between the media player's current time and the active transcript line can be tricky and lead to performance issues if not debounced/optimized properly.
- **UI Fidelity**: Failing to accurately replicate the Fireflies.ai UI due to lack of reference materials or CSS skills.
- **Time Management**: The 24-hour estimate implies a tight schedule for a full-stack Next.js + FastAPI application with a custom SQLite database and deployment.

## Assumptions
- We will assume a single-user system (default logged-in user) since actual authentication is a placeholder.
- We will mock the media player with a dummy audio file and use seeded transcript JSONs that map exactly to the timestamps in the audio file.
- The user will accept a visually accurate, functionally complete clone without the complex backend processing typical of the real Fireflies (e.g., no Celery/Redis for background processing, just synchronous API calls or mocked data).
