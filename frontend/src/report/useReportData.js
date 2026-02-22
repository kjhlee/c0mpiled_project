/**
 * Custom hook to fetch report data from backend API.
 * Falls back to mock data if fetch fails.
 * 
 * Uses GET /questions/report endpoint from QuestionController.
 * Backend returns: { role: RoleType, solutions: SolutionModel[] }
 */

import { useState, useEffect } from "react";
import { normalizeAttempt } from "./normalizeAttempt";
import { mockAttempts } from "./mockAttempts";

const API_ENDPOINT = "/questions/report";

/**
 * @returns {Object} { attempts, loading, error, usingDemoData }
 */
export function useReportData() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingDemoData, setUsingDemoData] = useState(false);

  useEffect(() => {
    async function fetchReportData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch report from backend: GET /questions/report
        const reportResponse = await fetch(API_ENDPOINT);

        if (!reportResponse.ok) {
          throw new Error(`HTTP error! status: ${reportResponse.status}`);
        }

        const reportData = await reportResponse.json();

        // Backend returns: { role: RoleType, solutions: SolutionModel[] }
        if (!reportData.solutions || !Array.isArray(reportData.solutions)) {
          throw new Error("Invalid response format: expected { role: string, solutions: [...] }");
        }

        // Solutions need to be combined with question data
        // Fetch questions to get difficulty, concepts, etc.
        // Use role from backend response, or fallback to sessionStorage
        const role = reportData.role || (() => {
          const selectedPath = sessionStorage.getItem("selectedPath") || "software_engineering";
          const roleMap = {
            software_engineering: "SWE",
            cloud_computing: "CLOUD",
            machine_learning: "ML",
          };
          return roleMap[selectedPath] || "SWE";
        })();

        const questionsResponse = await fetch(`/questions/by-role/${role}`);
        if (!questionsResponse.ok) {
          throw new Error(`Failed to fetch questions: ${questionsResponse.status}`);
        }
        const questions = await questionsResponse.json();

        // Create a map of question ID to question data
        const questionMap = new Map();
        questions.forEach((q) => {
          questionMap.set(q.id, q);
        });

        // Combine solutions with question data to create attempts
        const attempts = reportData.solutions.map((solution) => {
          const question = questionMap.get(solution.id);
          if (!question) {
            // If question not found, use solution data only
            return {
              ...solution,
              difficulty: null,
              concepts: null,
            };
          }
          // Merge solution and question data
          return {
            ...question,
            ...solution, // Solution fields override question fields (time, correct, etc.)
          };
        });

        const normalized = attempts.map(normalizeAttempt);
        setAttempts(normalized);
        setUsingDemoData(false);
      } catch (err) {
        console.warn("Failed to fetch report data, using mock data:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setAttempts(mockAttempts);
        setUsingDemoData(true);
      } finally {
        setLoading(false);
      }
    }

    fetchReportData();
  }, []);

  return {
    attempts,
    loading,
    error,
    usingDemoData,
  };
}