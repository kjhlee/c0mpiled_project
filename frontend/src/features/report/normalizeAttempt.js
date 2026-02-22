/**
 * Normalizes a raw attempt from the backend to a standardized Attempt format.
 * 
 * The backend attempt payload combines fields from both QuestionModel.java and SolutionModel.java:
 * - QuestionModel provides: id, question, difficulty, concepts, hint1, hint2, hint3
 * - SolutionModel provides: id, solution, time, correct, hint1used, hint2used, hint3used
 * 
 * @param {Object} raw - Raw attempt object from backend API (combined QuestionModel + SolutionModel)
 * @returns {Object} Normalized Attempt object
 */

/**
 * @typedef {Object} RawAttempt
 * Combined fields from QuestionModel + SolutionModel
 * @property {string} id
 * @property {string} [question] - From QuestionModel
 * @property {"EASY"|"MEDIUM"|"HARD"|"Easy"|"Medium"|"Hard"} [difficulty] - From QuestionModel
 * @property {string[]} [concepts] - From QuestionModel
 * @property {string} [hint1] - From QuestionModel
 * @property {string} [hint2] - From QuestionModel
 * @property {string} [hint3] - From QuestionModel
 * @property {string} [solution] - From SolutionModel
 * @property {string|number} [time] - From SolutionModel
 * @property {boolean} [correct] - From SolutionModel
 * @property {boolean} [hint1used] - From SolutionModel (lowercase)
 * @property {boolean} [hint2used] - From SolutionModel (lowercase)
 * @property {boolean} [hint3used] - From SolutionModel (lowercase)
 * @property {boolean} [correctness] - Alternative field name for correct
 */

/**
 * @typedef {Object} Attempt
 * @property {string} id
 * @property {string} topic
 * @property {"Easy"|"Medium"|"Hard"} difficulty
 * @property {boolean} correct
 * @property {number} timeSpentSec
 */

/**
 * @param {RawAttempt} raw
 * @returns {Attempt}
 */
export function normalizeAttempt(raw) {
  // Normalize difficulty
  let difficulty = "Easy";
  if (raw.difficulty) {
    const diff = raw.difficulty.toUpperCase();
    if (diff === "EASY") difficulty = "Easy";
    else if (diff === "MEDIUM") difficulty = "Medium";
    else if (diff === "HARD") difficulty = "Hard";
  }

  // Extract topic from concepts array
  let topic = "Unknown";
  if (raw.concepts && Array.isArray(raw.concepts) && raw.concepts.length > 0) {
    topic = raw.concepts[0];
  }

  // Normalize correctness (from SolutionModel)
  // Handle both 'correct' and 'correctness' field names
  const correct = raw.correct ?? raw.correctness ?? false;

  // Normalize time to seconds (from SolutionModel)
  let timeSpentSec = 0;
  if (raw.time !== undefined && raw.time !== null) {
    const timeValue = typeof raw.time === "string" ? parseFloat(raw.time) : raw.time;
    // If time > 1000, assume milliseconds, convert to seconds
    // Otherwise assume already in seconds
    timeSpentSec = timeValue > 1000 ? timeValue / 1000 : timeValue;
  }

  return {
    id: raw.id || "",
    topic,
    difficulty,
    correct,
    timeSpentSec: Math.max(0, timeSpentSec), // Ensure non-negative
  };
}
