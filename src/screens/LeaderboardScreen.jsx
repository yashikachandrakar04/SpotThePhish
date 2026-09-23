import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getHighScores, clearHighScores } from '../utils/storage';

const LeaderboardScreen = () => {
  const [scores, setScores] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      let mounted = true;
      (async () => {
        const s = await getHighScores();
        if (mounted) setScores(s);
      })();
      return () => {
        mounted = false;
      };
    }, []),
  );

  const handleClear = () => {
    Alert.alert('Clear Leaderboard', 'Delete all saved scores?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: async () => {
          await clearHighScores();
          setScores([]);
        },
      },
    ]);
  };

  const rankColor = (i) => {
    if (i === 0) return '#fbbf24';
    if (i === 1) return '#cbd5e1';
    if (i === 2) return '#fb923c';
    return '#64748b';
  };

  const rankEmoji = (i) => (i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Leaderboard</Text>
      <Text style={styles.subtitle}>Your top 10 scores</Text>

      {scores.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🎯</Text>
          <Text style={styles.emptyText}>No scores yet</Text>
          <Text style={styles.emptySub}>Play a game to get on the board!</Text>
        </View>
      ) : (
        <FlatList
          data={scores}
          keyExtractor={(_, i) => String(i)}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item, index }) => {
            const date = new Date(item.date);
            const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
            return (
              <View style={styles.row}>
                <Text style={[styles.rank, { color: rankColor(index) }]}>
                  {rankEmoji(index)}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.scoreValue}>{item.score} pts</Text>
                  <Text style={styles.meta}>
                    {item.correct}/{item.total} correct · {item.difficulty} ·{' '}
                    {item.mode === 'daily' ? 'Daily' : item.category} · {dateStr}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}

      {scores.length > 0 && (
        <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
          <Text style={styles.clearBtnText}>Clear Leaderboard</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 24 },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
  },
  empty: { alignItems: 'center', marginTop: 80 },
  emptyIcon: { fontSize: 64, marginBottom: 12 },
  emptyText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  emptySub: { color: '#94a3b8', fontSize: 14, marginTop: 6 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  rank: {
    fontSize: 22,
    fontWeight: 'bold',
    minWidth: 40,
    marginRight: 12,
    textAlign: 'center',
  },
  scoreValue: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  meta: { color: '#94a3b8', fontSize: 12, marginTop: 4 },
  clearBtn: {
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  clearBtnText: { color: '#f87171', fontWeight: '600' },
});

export default LeaderboardScreen;