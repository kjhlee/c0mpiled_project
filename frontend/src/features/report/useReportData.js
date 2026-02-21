/**
 * Custom hook to fetch report data from backend API.
 * Falls back to mock data if fetch fails.
 * 
 * Mount this page at /report and ensure frontend can reach GET /api/report (proxy or base URL).
 */

import { useState, useEffect } from "react";
import { normalizeAttempt } from "./normalizeAttempt";
import { mockAttempts } from "./mockAttempts";

const API_ENDPOINT = "/api/report";

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

        const response = await fetch(API_ENDPOINT);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Expect { attempts: rawAttempts[] }
        if (data.attempts && Array.isArray(data.attempts)) {
          const normalized = data.attempts.map(normalizeAttempt);
          setAttempts(normalized);
          setUsingDemoData(false);
        } else {
          throw new Error("Invalid response format: expected { attempts: [...] }");
        }
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
