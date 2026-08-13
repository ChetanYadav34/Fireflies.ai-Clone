# Tech Stack Document

## 1. Technology Selection

**Frontend:**
*   **Framework**: Next.js (App Router Locked)
*   **Language**: TypeScript
*   **Styling & UI Components**: Tailwind CSS + shadcn/ui (Locked)
*   **State Management/Data Fetching**: TanStack Query (React Query) (Locked)

**Backend:**
*   **Framework**: FastAPI (Python)
*   **Language**: Python 3.9+
*   **Data Validation/Serialization**: Pydantic

**Database:**
*   **Engine**: SQLite
*   **ORM**: SQLAlchemy
*   **Migrations**: Alembic (Optional, if needed for complex schema updates during dev).

**Explicit Exclusions:**
*   MongoDB, PostgreSQL, Firebase, Supabase, Prisma are STRICTLY FORBIDDEN per assignment requirements.

## 2. Justification

*   **Next.js (App Router)**: The industry standard for production React applications. The App Router provides advanced routing, Server Components, and optimized performance.
*   **Tailwind CSS + shadcn/ui**: Tailwind enables rapid UI development, while shadcn/ui provides highly accessible, customizable, and beautifully designed components that match the clean, modern aesthetic required for a Fireflies clone.
*   **TanStack Query**: The best-in-class solution for fetching, caching, and synchronizing server state in React applications.
*   **FastAPI**: Exceptionally fast, modern Python web framework.
*   **SQLite & SQLAlchemy**: Required by the assignment, perfect for local development and maintaining a simple relational structure without external dependencies.

## 3. Alternatives Considered

*   **Frontend**: Pages router was considered but App Router is locked in for a modern architecture. CSS Modules were considered but Tailwind + shadcn/ui offers much faster high-fidelity UI creation.
*   **Backend**: Django was an allowed option, but FastAPI is preferred for pure API development.

## 4. Folder Structure

```text
/scaler-fireflies-clone
│
├── frontend/                  # Next.js Application
│   ├── app/                   # App router pages
│   ├── components/            # Reusable UI (shadcn) and Feature components
│   │   ├── ui/                # shadcn components
│   │   └── features/
│   ├── lib/                   # Utility functions, API clients
│   ├── types/                 # TypeScript interfaces
│   ├── public/                # Static assets, mock audio files
│   └── package.json
│
├── backend/                   # FastAPI Application
│   ├── app/
│   │   ├── main.py            # Application entry point
│   │   ├── api/               # API Routers
│   │   ├── core/              # Config, DB connection
│   │   ├── models/            # SQLAlchemy ORM models
│   │   ├── schemas/           # Pydantic validation schemas
│   │   └── services/          # Business logic / DB CRUD
│   ├── data/                  # SQLite database file (.db)
│   ├── requirements.txt       # Python dependencies
│   └── run.py                 # Dev server script
│
└── docs/                      # Planning & Architecture documentation
```

## 5. Dependency List (Proposed)

**Frontend (`package.json`)**:
*   `next`, `react`, `react-dom`
*   `typescript`, `@types/react`, `@types/node`
*   `tailwindcss`, `postcss`, `autoprefixer`
*   `lucide-react` (for UI icons)
*   `@tanstack/react-query`
*   shadcn/ui dependencies (e.g., `radix-ui`, `class-variance-authority`, `clsx`, `tailwind-merge`)
*   `date-fns` (for timestamp formatting)

**Backend (`requirements.txt`)**:
*   `fastapi`, `uvicorn[standard]`
*   `sqlalchemy`, `pydantic`
*   `python-multipart`

## 6. Development Workflow

1.  **Environment Setup**: Install Node.js and Python. Create a Python virtual environment (`venv`).
2.  **Database Seeding**: Run a Python script (`seed.py`) to populate the SQLite database with **5 realistic meetings**. This will include complex transcripts, varied participants, summaries, and action items with ownership to ensure all edge cases (empty states, heavy scrolling) can be tested.
3.  **Backend Dev**: Start FastAPI server (`uvicorn main:app --reload`).
4.  **Frontend Dev**: Start Next.js dev server (`npm run dev`). Build UI using shadcn components.
5.  **Integration**: Sync media player with transcript data using TanStack Query.
6.  **Build & Deploy**: Test production builds locally before deploying.
