import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  HIGH_SCORES: '@stp_high_scores',
  DAILY_RESULT: '@stp_daily_result',
  STATS: '@stp_stats',
  SETTINGS: '@stp_settings',
};

// ---------- High Scores ----------
export const saveHighScore = async (entry) => {
  try {
    const existing = await getHighScores();
    const updated = [...existing, entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    await AsyncStorage.setItem(KEYS.HIGH_SCORES, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('saveHighScore error', e);
    return [];
  }
};

export const getHighScores = async () => {
  try {
    const raw = await AsyncStorage.getItem(KEYS.HIGH_SCORES);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const clearHighScores = async () => {
  await AsyncStorage.removeItem(KEYS.HIGH_SCORES);
};

// ---------- Daily Challenge ----------
export const saveDailyResult = async (result) => {
  try {
    await AsyncStorage.setItem(KEYS.DAILY_RESULT, JSON.stringify(result));
  } catch (e) {}
};

export const getDailyResult = async (dateKey) => {
  try {
    const raw = await AsyncStorage.getItem(KEYS.DAILY_RESULT);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.dateKey !== dateKey) return null;
    return parsed;
  } catch (e) {
    return null;
  }
};

// ---------- Stats ----------
export const getStats = async () => {
  try {
    const raw = await AsyncStorage.getItem(KEYS.STATS);
    return raw
      ? JSON.parse(raw)
      : { gamesPlayed: 0, totalCorrect: 0, totalQuestions: 0, bestStreak: 0 };
  } catch (e) {
    return { gamesPlayed: 0, totalCorrect: 0, totalQuestions: 0, bestStreak: 0 };
  }
};

export const updateStats = async ({ correct, total }) => {
  try {
    const stats = await getStats();
    stats.gamesPlayed += 1;
    stats.totalCorrect += correct;
    stats.totalQuestions += total;
    await AsyncStorage.setItem(KEYS.STATS, JSON.stringify(stats));
    return stats;
  } catch (e) {
    return null;
  }
};

// ---------- Settings ----------
export const getSettings = async () => {
  try {
    const raw = await AsyncStorage.getItem(KEYS.SETTINGS);
    return raw ? JSON.parse(raw) : { soundEnabled: true, hapticsEnabled: true };
  } catch (e) {
    return { soundEnabled: true, hapticsEnabled: true };
  }
};

export const saveSettings = async (settings) => {
  try {
    await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {}
};