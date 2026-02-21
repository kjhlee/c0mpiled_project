/**
 * Normalizes a raw attempt from the backend to a standardized Attempt format.
 * 
 * @param {Object} raw - Raw attempt object from backend API (matching QuestionModel.java structure)
 * @returns {Object} Normalized Attempt object
 */

/**
 * @typedef {Object} RawAttempt
 * @property {string} id
 * @property {string} [question]
 * @property {"EASY"|"MEDIUM"|"HARD"|"Easy"|"Medium"|"Hard"} [difficulty]
 * @property {string[]} [concepts]
 * @property {string} [hint1]
 * @property {boolean} [hint1Used]
 * @property {string} [hint2]
 * @property {boolean} [hint2Used]
 * @property {string} [hint3]
 * @property {boolean} [hint3Used]
 * @property {string|number} [time]
 * @property {boolean} [correct]
 * @property {boolean} [correctness]
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

  // Normalize correctness
  const correct = raw.correct ?? raw.correctness ?? false;

  // Normalize time to seconds
  let timeSpentSec = 0;
  if (raw.time !== undefined && raw.time !== null) {
    const timeValue = typeof raw.time === "string" ? parseFloat(raw.time) : raw.time;
    // If time > 1000, assume milliseconds, convert to seconds
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
