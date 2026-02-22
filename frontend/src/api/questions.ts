import type { TechPath } from "../pages/PathSelect";
import type { QuestionDifficulty, SessionQuestion } from "../data/sessionQuestions";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

/** Backend QuestionModel shape */
export type QuestionModelDto = {
  id: string;
  question: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  concepts: string[] | null;
  hint1: string | null;
  hint2: string | null;
  hint3: string | null;
};

/** Maps frontend path (from path select) to backend RoleType. */
export function techPathToRole(path: TechPath): string {
  switch (path) {
    case "software_engineering":
      return "SWE";
    case "cloud_computing":
      return "CLOUD";
    case "machine_learning":
      return "ML";
    default:
      return "SWE";
  }
}

function mapDifficulty(d: QuestionModelDto["difficulty"]): QuestionDifficulty {
  switch (d) {
    case "EASY":
      return "Easy";
    case "MEDIUM":
      return "Medium";
    case "HARD":
      return "Hard";
    default:
      return "Medium";
  }
}

/** Backend "question" is "Title: description". Split on first ": " to get title and statement. */
function parseQuestionText(full: string): { title: string; statement: string } {
  const idx = full.indexOf(": ");
  if (idx === -1) return { title: full, statement: "" };
  return {
    title: full.slice(0, idx).trim(),
    statement: full.slice(idx + 2).trim(),
  };
}

const DEFAULT_STARTER_CODE = `# Your solution here
def solution():
    pass
`;

function mapQuestionToSession(dto: QuestionModelDto): SessionQuestion {
  const { title, statement } = parseQuestionText(dto.question ?? "");
  const hints = [dto.hint1, dto.hint2, dto.hint3].filter(Boolean) as string[];
  const examples = hints.length
    ? [{ title: "Hints", body: hints.join("\n\n") }]
    : [];

  return {
    id: dto.id ?? "",
    title: title || "Question",
    difficulty: mapDifficulty(dto.difficulty ?? "MEDIUM"),
    statement: statement || "",
    examples,
    starterCode: DEFAULT_STARTER_CODE,
    language: "python",
  };
}

/** Fetches questions for the given career path from the backend. */
export async function fetchQuestionsByPath(path: TechPath): Promise<SessionQuestion[]> {
  const role = techPathToRole(path);
  const res = await fetch(`${API_BASE}/questions/by-role/${role}`);
  if (!res.ok) throw new Error(`Failed to load questions: ${res.status}`);
  const dtos: QuestionModelDto[] = await res.json();
  return dtos.map(mapQuestionToSession);
}
