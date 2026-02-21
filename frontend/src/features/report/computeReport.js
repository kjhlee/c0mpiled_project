/**
 * Computes comprehensive report metrics from a list of attempts.
 * 
 * @param {Array<Object>} attempts - Array of normalized Attempt objects
 * @returns {Object} ReportMetrics with summary, byTopic, radarData, barData, and weakestTopics
 */

// Difficulty weights
const DIFFICULTY_WEIGHTS = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

// Tier thresholds
const TIER_THRESHOLDS = {
  "Interview Ready": 0.85,
  "Advanced": 0.70,
  "Intermediate": 0.55,
  "Developing": 0.40,
  "Beginner": 0,
};

/**
 * Clamps a value between min and max
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Computes weighted accuracy score
 * @param {Array<Object>} attempts
 * @returns {number}
 */
function computeWeightedScore(attempts) {
  if (attempts.length === 0) return 0;

  let totalWeight = 0;
  let correctWeight = 0;

  for (const attempt of attempts) {
    const weight = DIFFICULTY_WEIGHTS[attempt.difficulty];
    totalWeight += weight;
    if (attempt.correct) {
      correctWeight += weight;
    }
  }

  return totalWeight > 0 ? Math.round((correctWeight / totalWeight) * 100) : 0;
}

/**
 * Computes topic-weighted score
 * @param {Array<Object>} topicAttempts
 * @returns {number}
 */
function computeTopicWeightedScore(topicAttempts) {
  return computeWeightedScore(topicAttempts);
}

/**
 * Computes speed score (0..1) based on average time
 * Target: 180 seconds (3 minutes) per question
 * @param {number} avgTimeSec
 * @returns {number}
 */
function computeSpeedScore(avgTimeSec) {
  return clamp(1 - avgTimeSec / 180, 0, 1);
}

/**
 * Computes radar score for a topic
 * @param {Array<Object>} topicAttempts
 * @returns {number}
 */
function computeRadarScore(topicAttempts) {
  if (topicAttempts.length === 0) return 0;

  const topicWeightedScore = computeTopicWeightedScore(topicAttempts);
  const avgTimeSec = topicAttempts.reduce((sum, a) => sum + a.timeSpentSec, 0) / topicAttempts.length;
  const speedScore = computeSpeedScore(avgTimeSec);

  // 75% accuracy, 25% speed
  return Math.round(0.75 * topicWeightedScore + 0.25 * speedScore * 100);
}

/**
 * Determines tier based on composite score
 * @param {number} composite
 * @returns {string}
 */
function computeTier(composite) {
  if (composite >= TIER_THRESHOLDS["Interview Ready"]) return "Interview Ready";
  if (composite >= TIER_THRESHOLDS["Advanced"]) return "Advanced";
  if (composite >= TIER_THRESHOLDS["Intermediate"]) return "Intermediate";
  if (composite >= TIER_THRESHOLDS["Developing"]) return "Developing";
  return "Beginner";
}

/**
 * @param {Array<Object>} attempts
 * @returns {Object}
 */
export function computeReport(attempts) {
  if (attempts.length === 0) {
    return {
      summary: {
        n: 0,
        accuracyPct: 0,
        avgTimeSec: 0,
        difficultyMix: { Easy: 0, Medium: 0, Hard: 0 },
        weightedScore: 0,
        tier: "Beginner",
      },
      byTopic: [],
      radarData: [],
      barData: [],
      weakestTopics: [],
    };
  }

  const n = attempts.length;

  // Compute summary metrics
  const correctCount = attempts.filter((a) => a.correct).length;
  const accuracyPct = Math.round((correctCount / n) * 100);
  const avgTimeSec = attempts.reduce((sum, a) => sum + a.timeSpentSec, 0) / n;
  const weightedScore = computeWeightedScore(attempts);

  // Difficulty mix
  const difficultyMix = {
    Easy: attempts.filter((a) => a.difficulty === "Easy").length,
    Medium: attempts.filter((a) => a.difficulty === "Medium").length,
    Hard: attempts.filter((a) => a.difficulty === "Hard").length,
  };

  // Compute tier
  const acc = weightedScore / 100;
  const speedScore = computeSpeedScore(avgTimeSec);
  const hardRate = difficultyMix.Hard / n;
  const composite = 0.65 * acc + 0.25 * speedScore + 0.10 * hardRate;
  const tier = computeTier(composite);

  // Group by topic
  const topicMap = new Map();
  for (const attempt of attempts) {
    const topic = attempt.topic;
    if (!topicMap.has(topic)) {
      topicMap.set(topic, []);
    }
    topicMap.get(topic).push(attempt);
  }

  // Compute byTopic metrics
  const byTopic = Array.from(topicMap.entries()).map(([topic, topicAttempts]) => {
    const topicCorrect = topicAttempts.filter((a) => a.correct).length;
    const topicAccuracyPct = Math.round((topicCorrect / topicAttempts.length) * 100);
    const topicAvgTimeSec = topicAttempts.reduce((sum, a) => sum + a.timeSpentSec, 0) / topicAttempts.length;
    const topicWeightedScore = computeTopicWeightedScore(topicAttempts);

    return {
      topic,
      attempts: topicAttempts.length,
      accuracyPct: topicAccuracyPct,
      avgTimeSec: topicAvgTimeSec,
      weightedScore: topicWeightedScore,
    };
  });

  // Compute radar data
  const radarData = byTopic.map((topicData) => ({
    skill: topicData.topic,
    score: computeRadarScore(topicMap.get(topicData.topic)),
  }));

  // Compute bar data (difficulty mix for visualization)
  const barData = [
    { label: "Easy", value: difficultyMix.Easy },
    { label: "Medium", value: difficultyMix.Medium },
    { label: "Hard", value: difficultyMix.Hard },
  ];

  // Find weakest topics (2 topics with lowest accuracy)
  const sortedTopics = [...byTopic].sort((a, b) => a.accuracyPct - b.accuracyPct);
  const weakestTopics = sortedTopics.slice(0, 2).map((t) => t.topic);

  return {
    summary: {
      n,
      accuracyPct,
      avgTimeSec: Math.round(avgTimeSec * 10) / 10, // Round to 1 decimal
      difficultyMix,
      weightedScore,
      tier,
    },
    byTopic,
    radarData,
    barData,
    weakestTopics,
  };
}
