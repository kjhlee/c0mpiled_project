/**
 * Mock attempt data for fallback when backend API is unavailable.
 * Provides 5 attempts across multiple topics with varied difficulties, times, and correctness.
 */

export const mockAttempts = [
  {
    id: "q1",
    topic: "ARRAYS",
    difficulty: "Easy",
    correct: true,
    timeSpentSec: 45,
  },
  {
    id: "q2",
    topic: "TWO_POINTERS",
    difficulty: "Medium",
    correct: true,
    timeSpentSec: 120,
  },
  {
    id: "q3",
    topic: "DYNAMIC_PROGRAMMING",
    difficulty: "Hard",
    correct: false,
    timeSpentSec: 300,
  },
  {
    id: "q4",
    topic: "ARRAYS",
    difficulty: "Medium",
    correct: true,
    timeSpentSec: 95,
  },
  {
    id: "q5",
    topic: "BINARY_SEARCH",
    difficulty: "Hard",
    correct: true,
    timeSpentSec: 180,
  },
];
