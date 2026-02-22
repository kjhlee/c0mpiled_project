# c0mpiled — Adaptive Career Coding Coach

A web application that lets users choose a career path (e.g. Software Engineering, Machine Learning) and practice coding questions in a LeetCode-style interface: problem description on the left, code editor on the right, with per-question timers and a submit-to-unlock-next flow.

## Features

- **Career path selection** — Choose from Software Engineering, Cloud Computing, or Machine Learning. Each path is described with topic bullets (e.g. DSA, cloud services, ML concepts).
- **Coding session** — After selecting a path, users enter a session with multiple questions. Each question shows:
  - Problem title, difficulty (Easy / Medium / Hard), statement, and examples.
  - A full code editor (Monaco) with syntax highlighting and starter code.
- **Per-question timer** — Elapsed time is tracked separately for each question and shown in the session header.
- **Submit to advance** — The “Next” button is disabled until the current question is submitted, encouraging users to submit before moving on.
- **Run & Submit** — Placeholder actions for “Run Code” and “Submit” (ready to be wired to a backend for execution/grading).

## Tech Stack

| Layer    | Technologies |
|----------|--------------|
| Frontend | React 19, TypeScript, Vite 7, React Router 7, Monaco Editor |
| Backend  | Java 21, Spring Boot 4 (Web MVC, Actuator) |

The UI is styled with CSS modules (no Tailwind). The frontend currently uses mock question data; the backend can later serve questions and handle code execution.

## Project Structure

```
c0mpiled_project/
├── frontend/                 # Vite + React app
│   ├── src/
│   │   ├── pages/            # PathSelect, Session
│   │   ├── data/             # Mock session questions
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── backend/
│   └── demo/                 # Spring Boot app
│       ├── src/main/java/com/example/demo/
│       └── pom.xml
└── README.md
```

## Getting Started

### Prerequisites

- **Frontend:** Node.js (v18+ recommended), npm
- **Backend:** Java 21, Maven

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite prints).

- **Build:** `npm run build`
- **Preview production build:** `npm run preview`
- **Lint:** `npm run lint`

### Backend

```bash
cd backend/demo
./mvnw spring-boot:run
```

The Spring Boot app runs with the default port (e.g. 8080). No API endpoints are implemented yet; the frontend works with mock data.

## Routes

| Path      | Description |
|-----------|-------------|
| `/`       | Career path selection (landing). |
| `/session`| Coding session: questions + editor. Requires a path to be selected (stored in `sessionStorage`); otherwise redirects to `/`. |

## Possible Next Steps

- Backend API for questions (by career path) and for code submission/execution.
- User accounts and persistence of progress.
- Real “Run” and “Submit” behavior (e.g. run tests, judge solution).
- Docker setup for frontend and backend (as noted in the original project notes).

## License

See repository or project settings.
