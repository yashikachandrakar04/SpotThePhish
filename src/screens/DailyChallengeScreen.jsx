import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getTodayKey, getTimeUntilNextChallenge, formatCountdown } from '../utils/dailyChallenge';
import { getDailyResult } from '../utils/storage';

const DailyChallengeScreen = () => {
  const navigation = useNavigation();
  const [result, setResult] = useState(null);
  const [countdown, setCountdown] = useState('00:00:00');

  useEffect(() => {
    (async () => {
      const r = await getDailyResult(getTodayKey());
      setResult(r);
    })();
    const tick = () => setCountdown(formatCountdown(getTimeUntilNextChallenge()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>📅</Text>
      <Text style={styles.title}>Daily Challenge</Text>
      <Text style={styles.date}>{today}</Text>

      {result ? (
        <View style={styles.doneCard}>
          <Text style={styles.doneTitle}>✅ Completed Today</Text>
          <Text style={styles.doneScore}>{result.score} pts</Text>
          <Text style={styles.doneSub}>
            {result.correctCount} / {result.totalQuestions} correct
          </Text>
          <Text style={styles.countdown}>
            New challenge in {countdown}
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>5 emails · Same for everyone</Text>
            <Text style={styles.infoText}>
              Every day at midnight, a fresh set of 5 emails is chosen. Compete with
              other players to see who can spot the phish fastest.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.startBtn}
            onPress={() =>
              navigation.replace('Game', {
                mode: 'daily',
                difficulty: 'medium',
                category: 'all',
              })
            }
            activeOpacity={0.85}>
            <Text style={styles.startBtnText}>START CHALLENGE</Text>
          </TouchableOpacity>

          <Text style={styles.countdown}>Next challenge in {countdown}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 72, marginBottom: 8 },
  title: { color: '#fff', fontSize: 30, fontWeight: 'bold' },
  date: { color: '#94a3b8', fontSize: 14, marginBottom: 32 },
  infoCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    width: '100%',
  },
  infoTitle: {
    color: '#38bdf8',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: { color: '#cbd5e1', fontSize: 14, lineHeight: 22 },
  startBtn: {
    backgroundColor: '#3b82f6',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  startBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  countdown: { color: '#64748b', fontSize: 13, marginTop: 20 },
  doneCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#22c55e',
    width: '100%',
  },
  doneTitle: { color: '#22c55e', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  doneScore: { color: '#38bdf8', fontSize: 42, fontWeight: 'bold' },
  doneSub: { color: '#cbd5e1', fontSize: 15, marginTop: 6 },
});

export default DailyChallengeScreen;