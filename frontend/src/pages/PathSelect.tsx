import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PathSelect.module.css";

export type TechPath =
  | "software_engineering"
  | "cloud_computing"
  | "machine_learning";

type PathOption = {
  id: TechPath;
  title: string;
  subtitle: string;
  bullets: string[];
  iconClass: string;
};

const PATHS: PathOption[] = [
  {
    id: "software_engineering",
    title: "Software Engineering",
    subtitle: "DSA + practical engineering fundamentals",
    bullets: ["Arrays/Hashmaps", "Graphs/BFS/DFS", "Complexity tradeoffs"],
    iconClass: styles.iconSe,
  },
  {
    id: "cloud_computing",
    title: "Cloud Computing",
    subtitle: "Cloud services + infrastructure",
    bullets: ["AWS/GCP/Azure", "Serverless", "Containers"],
    iconClass: styles.iconCloud,
  },
  {
    id: "machine_learning",
    title: "Machine Learning",
    subtitle: "ML concepts + applied reasoning",
    bullets: ["Metrics", "Bias/variance", "Evaluation"],
    iconClass: styles.iconMl,
  },
];

const PATH_ICONS: Record<TechPath, React.ReactNode> = {
  software_engineering: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  ),
  cloud_computing: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
  machine_learning: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" />
    </svg>
  ),
};

function labelPath(p: TechPath) {
  return p.replaceAll("_", " ");
}

export default function PathSelect() {
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState<TechPath | null>(null);

  function start() {
    if (!selected) return;
    sessionStorage.setItem("selectedPath", selected);
    navigate("/session");
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Adaptive Career Coding Coach</h1>
          <p className={styles.subtitle}>
            Pick a career path. We’ll generate 5 questions and track engagement
            and understanding in real time.
          </p>
        </header>

        <div className={styles.grid}>
          {PATHS.map((p) => {
            const isSelected = selected === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(p.id)}
                className={`${styles.card} ${isSelected ? styles.cardSelected : ""}`}
              >
                <div className={`${styles.iconWrap} ${p.iconClass}`}>
                  {PATH_ICONS[p.id]}
                </div>
                <div className={styles.cardHeader}>
                  <div>
                    <div className={styles.cardTitleRow}>
                      <h2 className={styles.cardTitle}>{p.title}</h2>
                      {isSelected && <span className={styles.badge}>Selected</span>}
                    </div>
                    <p className={styles.cardSubtitle}>{p.subtitle}</p>
                  </div>
                  <div className={styles.radio} aria-hidden="true" />
                </div>
                <ul className={styles.bullets}>
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        <footer className={styles.footer}>
          <div className={styles.selectedLabel}>
            Selected: <span className={styles.selectedValue}>{selected ? labelPath(selected) : "none"}</span>
          </div>
          <button
            type="button"
            disabled={!selected}
            onClick={start}
            className={`${styles.cta} ${selected ? styles.ctaEnabled : styles.ctaDisabled}`}
          >
            Start Session
          </button>
        </footer>
      </div>
    </div>
  );
}
