import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import type { TechPath } from "./PathSelect";
import {
  MOCK_SESSION_QUESTIONS,
  type QuestionDifficulty,
} from "../data/sessionQuestions";
import styles from "./Session.module.css";

function formatElapsed(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function difficultyClass(d: QuestionDifficulty): string {
  switch (d) {
    case "Easy":
      return styles.difficultyEasy;
    case "Medium":
      return styles.difficultyMedium;
    case "Hard":
      return styles.difficultyHard;
    default:
      return styles.difficultyMedium;
  }
}

const TimerIcon = () => (
  <svg
    className={styles.timerIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M8 5v14l11-7z" />
  </svg>
);

const SubmitIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default function Session() {
  const navigate = useNavigate();
  const selectedPath = sessionStorage.getItem("selectedPath") as TechPath | null;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [code, setCode] = useState<string>("");
  const questions = MOCK_SESSION_QUESTIONS;

  // Per-question elapsed seconds (only the current question's timer runs)
  const [elapsedByQuestion, setElapsedByQuestion] = useState<number[]>(() =>
    new Array(MOCK_SESSION_QUESTIONS.length).fill(0)
  );
  const [submittedIndices, setSubmittedIndices] = useState<Set<number>>(new Set());

  const currentQuestion = questions[questionIndex] ?? questions[0];
  const currentElapsed = elapsedByQuestion[questionIndex] ?? 0;
  const canGoNext = submittedIndices.has(questionIndex);
  const isLastQuestion = questionIndex === questions.length - 1;

  // Timer: only the current question's elapsed time increments every second
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedByQuestion((prev) => {
        const next = [...prev];
        next[questionIndex] = (next[questionIndex] ?? 0) + 1;
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [questionIndex]);

  // Reset editor to starter code when switching question
  useEffect(() => {
    if (currentQuestion) setCode(currentQuestion.starterCode);
  }, [currentQuestion?.id]);

  const goPrev = useCallback(() => {
    setQuestionIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    if (!canGoNext || isLastQuestion) return;
    setQuestionIndex((i) => Math.min(questions.length - 1, i + 1));
  }, [canGoNext, isLastQuestion, questions.length]);

  const handleSubmit = useCallback(() => {
    console.log("Submit", { questionId: currentQuestion?.id, code });
    setSubmittedIndices((prev) => new Set(prev).add(questionIndex));
    alert("Submission received! You can now go to the next question.");
  }, [currentQuestion?.id, questionIndex, code]);

  const handleRun = useCallback(() => {
    console.log("Run", { questionId: currentQuestion?.id, code });
    alert("Run code (Demo — no execution yet.)");
  }, [currentQuestion?.id, code]);

  useEffect(() => {
    if (!selectedPath) navigate("/", { replace: true });
  }, [selectedPath, navigate]);

  if (!selectedPath) return null;

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link to="/" className={styles.problemListLink}>
            <ChevronLeft />
            Problem List
          </Link>
          <div className={styles.navArrows}>
            <button type="button" onClick={goPrev} disabled={questionIndex === 0} aria-label="Previous problem">
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={isLastQuestion || !canGoNext}
              aria-label="Next problem"
              title={!canGoNext ? "Submit the current question to unlock the next one" : undefined}
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className={styles.navCenter}>
          <button type="button" onClick={handleRun} className={styles.runBtn}>
            <PlayIcon />
            Run Code
          </button>
          <button type="button" onClick={handleSubmit} className={styles.submitBtn}>
            <SubmitIcon />
            Submit
          </button>
        </div>

        <div className={styles.navRight}>
          <div className={styles.timer} title="Time on this question">
            <TimerIcon />
            <span>{formatElapsed(currentElapsed)}</span>
          </div>
          <Link to="/" className={styles.backBtn}>
            Change Path
          </Link>
        </div>
      </nav>

      <div className={styles.main}>
        <aside className={styles.leftPanel}>
          <div className={styles.tabs}>
            <button type="button" className={`${styles.tab} ${styles.tabActive}`}>
              Description
            </button>
          </div>
          <div className={styles.contentScroll}>
            {currentQuestion && (
              <>
                <div className={styles.titleRow}>
                  <h1 className={styles.problemTitle}>
                    {currentQuestion.id}. {currentQuestion.title}
                  </h1>
                  <span className={`${styles.difficulty} ${difficultyClass(currentQuestion.difficulty)}`}>
                    {currentQuestion.difficulty}
                  </span>
                </div>
                <p className={styles.statement}>{currentQuestion.statement}</p>
                {currentQuestion.examples.map((ex) => (
                  <div key={ex.title} className={styles.example}>
                    <div className={styles.exampleTitle}>{ex.title}</div>
                    <pre className={styles.exampleBody}>{ex.body}</pre>
                  </div>
                ))}
              </>
            )}
          </div>
        </aside>

        <section className={styles.rightPanel}>
          <div className={styles.codeHeader}>
            <span className={styles.codeLabel}>
              <span aria-hidden>&lt;/&gt;</span> Code
            </span>
            <select className={styles.languageSelect} defaultValue="python" aria-label="Language">
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>
          <div className={styles.editorWrap}>
            <Editor
              height="100%"
              defaultLanguage={currentQuestion?.language ?? "python"}
              value={code}
              onChange={(value) => setCode(value ?? "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                padding: { top: 12 },
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
