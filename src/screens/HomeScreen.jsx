import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getStats, getDailyResult } from '../utils/storage';
import { getTodayKey, getTimeUntilNextChallenge, formatCountdown } from '../utils/dailyChallenge';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [stats, setStats] = useState(null);
  const [dailyDone, setDailyDone] = useState(false);
  const [countdown, setCountdown] = useState('00:00:00');

  useFocusEffect(
    React.useCallback(() => {
      let mounted = true;
      (async () => {
        const s = await getStats();
        const dr = await getDailyResult(getTodayKey());
        if (mounted) {
          setStats(s);
          setDailyDone(!!dr);
        }
      })();
      return () => {
        mounted = false;
      };
    }, []),
  );

  useEffect(() => {
    const tick = () => setCountdown(formatCountdown(getTimeUntilNextChallenge()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const accuracy =
    stats && stats.totalQuestions > 0
      ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100)
      : 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      <View style={styles.logoContainer}>
        <Text style={styles.logoIcon}>🎣</Text>
        <Text style={styles.title}>Spot the Phish</Text>
        <Text style={styles.subtitle}>
          Test your cyber security skills. Can you identify phishing emails?
        </Text>
      </View>

      {/* Daily Challenge Card */}
      <TouchableOpacity
        style={[styles.dailyCard, dailyDone && styles.dailyCardDone]}
        onPress={() => navigation.navigate('DailyChallenge')}
        activeOpacity={0.85}>
        <View style={styles.dailyHeader}>
          <Text style={styles.dailyIcon}>📅</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.dailyTitle}>Daily Challenge</Text>
            <Text style={styles.dailySub}>
              {dailyDone ? 'Completed today ✓' : '5 emails · Same for everyone'}
            </Text>
          </View>
          {dailyDone ? (
            <Text style={styles.dailyCheck}>✓</Text>
          ) : (
            <Text style={styles.dailyArrow}>›</Text>
          )}
        </View>
        <Text style={styles.dailyCountdown}>Next challenge in {countdown}</Text>
      </TouchableOpacity>

      {/* Play Card */}
      <TouchableOpacity
        style={styles.playCard}
        onPress={() => navigation.navigate('Difficulty')}
        activeOpacity={0.85}>
        <Text style={styles.playIcon}>🎮</Text>
        <Text style={styles.playTitle}>Quick Play</Text>
        <Text style={styles.playSub}>Choose difficulty & category</Text>
      </TouchableOpacity>

      {/* Secondary Actions */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.smallCard, styles.half]}
          onPress={() => navigation.navigate('Leaderboard')}
          activeOpacity={0.85}>
          <Text style={styles.smallIcon}>🏆</Text>
          <Text style={styles.smallTitle}>Leaderboard</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      {stats && (
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Your Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.gamesPlayed}</Text>
              <Text style={styles.statLabel}>Games</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{accuracy}%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalCorrect}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.rulesCard}>
        <Text style={styles.rulesTitle}>How to Play</Text>
        <Text style={styles.ruleText}>• Read each email carefully</Text>
        <Text style={styles.ruleText}>• Decide PHISHING or LEGITIMATE</Text>
        <Text style={styles.ruleText}>• Beat the timer for bonus points</Text>
        <Text style={styles.ruleText}>• Tap red flags to learn (in review)</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { padding: 24, paddingBottom: 40 },
  logoContainer: { alignItems: 'center', marginBottom: 24, marginTop: 8 },
  logoIcon: { fontSize: 64, marginBottom: 4 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20,
  },
  dailyCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  dailyCardDone: { borderColor: '#22c55e' },
  dailyHeader: { flexDirection: 'row', alignItems: 'center' },
  dailyIcon: { fontSize: 32, marginRight: 12 },
  dailyTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  dailySub: { color: '#94a3b8', fontSize: 13, marginTop: 2 },
  dailyCheck: { color: '#22c55e', fontSize: 26, fontWeight: 'bold' },
  dailyArrow: { color: '#94a3b8', fontSize: 30 },
  dailyCountdown: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'right',
  },
  playCard: {
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  playIcon: { fontSize: 40, marginBottom: 4 },
  playTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  playSub: { color: '#dbeafe', fontSize: 13, marginTop: 4 },
  row: { flexDirection: 'row', marginBottom: 16 },
  half: { flex: 1 },
  smallCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  smallIcon: { fontSize: 28, marginBottom: 6 },
  smallTitle: { color: '#fff', fontSize: 14, fontWeight: '600' },
  statsCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  statsTitle: {
    color: '#38bdf8',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statValue: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  statLabel: { color: '#94a3b8', fontSize: 12, marginTop: 2 },
  rulesCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  rulesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#38bdf8',
    marginBottom: 10,
  },
  ruleText: {
    color: '#cbd5e1',
    fontSize: 13,
    marginBottom: 6,
    lineHeight: 20,
  },
});

export default HomeScreen;