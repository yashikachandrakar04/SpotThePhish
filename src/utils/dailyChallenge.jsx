import { emails } from '../data/emails';

// Deterministic hash for the day -> pick 5 emails that everyone gets same day
export const getTodayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
};

const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export const getDailyEmails = () => {
  const key = getTodayKey();
  const seedBase = hashString(key);
  const picked = [];
  const used = new Set();
  let seed = seedBase;

  while (picked.length < 5 && used.size < emails.length) {
    seed = (seed * 9301 + 49297) % 233280;
    const idx = seed % emails.length;
    if (!used.has(idx)) {
      used.add(idx);
      picked.push(emails[idx]);
    }
  }
  return picked;
};

export const getTimeUntilNextChallenge = () => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setHours(24, 0, 0, 0);
  return tomorrow - now;
};

export const formatCountdown = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};