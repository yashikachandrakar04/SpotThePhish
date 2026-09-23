import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Timer = ({ duration, onTimeUp, isPaused, resetKey }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, resetKey]);

  useEffect(() => {
    if (isPaused) return;
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, isPaused]);

  const percentage = (timeLeft / duration) * 100;
  const barColor = percentage > 50 ? '#22c55e' : percentage > 25 ? '#f59e0b' : '#ef4444';

  return (
    <View style={styles.container}>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${percentage}%`, backgroundColor: barColor }]} />
      </View>
      <Text style={styles.timerText}>{timeLeft}s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  barBackground: {
    flex: 1,
    height: 10,
    backgroundColor: '#1e293b',
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 12,
  },
  barFill: { height: '100%', borderRadius: 5 },
  timerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    minWidth: 45,
    textAlign: 'right',
  },
});

export default Timer;