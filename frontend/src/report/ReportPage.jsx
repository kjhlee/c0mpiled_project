/**
 * Report Page Component
 * 
 * Mount this page at /report and ensure frontend can reach:
 * - GET /questions/report (returns { role, solutions })
 * - GET /questions/by-role/{role} (returns questions for combining with solutions)
 * 
 * Displays comprehensive analytics and visualization of user's LeetCode attempt performance.
 */

import React from "react";
import { useReportData } from "./useReportData";
import { computeReport } from "./computeReport";

// Import recharts (will use table fallback if not available)
import {
  RadarChart,
  BarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function ReportPage() {
  const { attempts, loading, error, usingDemoData } = useReportData();
  const metrics = computeReport(attempts);

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Loading report data...</p>
      </div>
    );
  }

  if (error && !usingDemoData) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        <p>Error loading report: {error}</p>
      </div>
    );
  }

  const hasRecharts = RadarChart && BarChart;

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Performance Report</h1>
        {usingDemoData && (
          <span
            style={{
              padding: "0.25rem 0.75rem",
              backgroundColor: "#ffd700",
              color: "#000",
              borderRadius: "4px",
              fontSize: "0.875rem",
              fontWeight: "bold",
            }}
          >
            Demo data
          </span>
        )}
      </div>

      {/* Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard label="Weighted Score" value={`${metrics.summary.weightedScore}%`} />
        <StatCard label="Accuracy" value={`${metrics.summary.accuracyPct}%`} />
        <StatCard label="Avg Time" value={`${metrics.summary.avgTimeSec.toFixed(1)}s`} />
        <StatCard label="Tier" value={metrics.summary.tier} highlight />
      </div>

      {/* Difficulty Mix Chips */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Difficulty Mix</h2>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <DifficultyChip label="Easy" count={metrics.summary.difficultyMix.Easy} color="#4caf50" />
          <DifficultyChip label="Medium" count={metrics.summary.difficultyMix.Medium} color="#ff9800" />
          <DifficultyChip label="Hard" count={metrics.summary.difficultyMix.Hard} color="#f44336" />
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Skill Radar</h2>
        {hasRecharts ? (
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={metrics.radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        ) : (
          <TableFallback
            title="Skill Scores"
            data={metrics.radarData}
            columns={[
              { key: "skill", label: "Skill" },
              { key: "score", label: "Score", format: (v) => `${v}%` },
            ]}
          />
        )}
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Difficulty Distribution</h2>
        {hasRecharts ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metrics.barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <TableFallback
            title="Difficulty Distribution"
            data={metrics.barData}
            columns={[
              { key: "label", label: "Difficulty" },
              { key: "value", label: "Count" },
            ]}
          />
        )}
      </div>

      {/* By Topic Table */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Performance by Topic</h2>
        <TableFallback
          title="Topic Performance"
          data={metrics.byTopic}
          columns={[
            { key: "topic", label: "Topic" },
            { key: "attempts", label: "Attempts" },
            { key: "accuracyPct", label: "Accuracy", format: (v) => `${v}%` },
            { key: "avgTimeSec", label: "Avg Time", format: (v) => `${v.toFixed(1)}s` },
            { key: "weightedScore", label: "Weighted Score", format: (v) => `${v}%` },
          ]}
        />
      </div>

      {/* Weakest Topics */}
      {metrics.weakestTopics.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>Areas for Improvement</h2>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {metrics.weakestTopics.map((topic) => (
              <span
                key={topic}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#ffebee",
                  color: "#c62828",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations Section */}
      <div style={{ marginBottom: "2rem", padding: "1.5rem", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h2 style={{ marginBottom: "1rem" }}>Recommendations</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <strong>Role:</strong> <span style={{ textTransform: "uppercase" }}>{metrics.role}</span>
          </div>
          {metrics.weakConcepts && metrics.weakConcepts.length > 0 && (
            <div>
              <strong>Weak Concepts:</strong>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                {metrics.weakConcepts.map((concept) => (
                  <span
                    key={concept}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "#fff3cd",
                      color: "#856404",
                      borderRadius: "4px",
                      fontSize: "0.875rem",
                      fontWeight: "bold",
                    }}
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          )}
          {metrics.suggestedDifficulty && (
            <div>
              <strong>Suggested Difficulty:</strong>{" "}
              <span
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: metrics.suggestedDifficulty === "HARD" ? "#f44336" : metrics.suggestedDifficulty === "MEDIUM" ? "#ff9800" : "#4caf50",
                  color: "white",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {metrics.suggestedDifficulty}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, highlight = false }) {
  return (
    <div
      style={{
        padding: "1.5rem",
        backgroundColor: highlight ? "#e3f2fd" : "#f5f5f5",
        borderRadius: "8px",
        border: highlight ? "2px solid #2196f3" : "1px solid #ddd",
      }}
    >
      <div style={{ fontSize: "0.875rem", color: "#666", marginBottom: "0.5rem" }}>{label}</div>
      <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: highlight ? "#2196f3" : "#333" }}>
        {value}
      </div>
    </div>
  );
}

function DifficultyChip({ label, count, color }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 1rem",
        backgroundColor: color,
        color: "white",
        borderRadius: "20px",
        fontSize: "0.875rem",
        fontWeight: "bold",
      }}
    >
      <span>{label}</span>
      <span style={{ backgroundColor: "rgba(255,255,255,0.3)", padding: "0.125rem 0.5rem", borderRadius: "10px" }}>
        {count}
      </span>
    </div>
  );
}

function TableFallback({ title, data, columns }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  padding: "0.75rem",
                  textAlign: "left",
                  borderBottom: "2px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
              {columns.map((col) => (
                <td key={col.key} style={{ padding: "0.75rem" }}>
                  {col.format ? col.format(row[col.key]) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}