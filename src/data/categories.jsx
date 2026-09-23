export const categories = [
  { id: 'all', name: 'All Categories', icon: '🌐', color: '#38bdf8' },
  { id: 'banking', name: 'Banking', icon: '🏦', color: '#22c55e' },
  { id: 'social', name: 'Social Media', icon: '💬', color: '#a78bfa' },
  { id: 'work', name: 'Work & Corporate', icon: '💼', color: '#f59e0b' },
  { id: 'shopping', name: 'Shopping', icon: '🛒', color: '#ec4899' },
  { id: 'tech', name: 'Tech Companies', icon: '💻', color: '#06b6d4' },
  { id: 'delivery', name: 'Delivery', icon: '📦', color: '#fb923c' },
  { id: 'government', name: 'Government', icon: '🏛️', color: '#94a3b8' },
  { id: 'crypto', name: 'Crypto', icon: '₿', color: '#eab308' },
];

export const difficulties = [
  {
    id: 'easy',
    name: 'Easy',
    description: '20 seconds per email',
    seconds: 20,
    icon: '🟢',
    color: '#22c55e',
  },
  {
    id: 'medium',
    name: 'Medium',
    description: '15 seconds per email',
    seconds: 15,
    icon: '🟡',
    color: '#f59e0b',
  },
  {
    id: 'hard',
    name: 'Hard',
    description: '8 seconds per email',
    seconds: 8,
    icon: '🔴',
    color: '#ef4444',
  },
  {
    id: 'mixed',
    name: 'Mixed',
    description: 'Random emails, 12 seconds',
    seconds: 12,
    icon: '🎲',
    color: '#38bdf8',
  },
];

export const getDifficultySeconds = (id) => {
  const d = difficulties.find(x => x.id === id);
  return d ? d.seconds : 15;
};