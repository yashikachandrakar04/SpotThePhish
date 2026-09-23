import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { saveHighScore, updateStats, saveDailyResult } from '../utils/storage';
import { getTodayKey } from '../utils/dailyChallenge';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    score,
    correctCount,
    totalQuestions,
    answers,
    emails,
    difficulty,
    category,
    mode,
  } = route.params;

  const [flagModal, setFlagModal] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [saved, setSaved] = useState(false);

  const percentage = Math.round((correctCount / totalQuestions) * 100);

  let rating = 'Beginner';
  let ratingEmoji = '🔰';
  let ratingColor = '#f59e0b';

  if (percentage >= 90) {
    rating = 'Cyber Guardian';
    ratingEmoji = '🛡️';
    ratingColor = '#22c55e';
  } else if (percentage >= 70) {
    rating = 'Security Pro';
    ratingEmoji = '⭐';
    ratingColor = '#38bdf8';
  } else if (percentage >= 50) {
    rating = 'Alert User';
    ratingEmoji = '👍';
    ratingColor = '#a78bfa';
  }

  useEffect(() => {
    (async () => {
      if (saved) return;
      await updateStats({ correct: correctCount, total: totalQuestions });
      await saveHighScore({
        score,
        correct: correctCount,
        total: totalQuestions,
        difficulty,
        category,
        mode: mode || 'quick',
        date: new Date().toISOString(),
      });
      if (mode === 'daily') {
        await saveDailyResult({
          dateKey: getTodayKey(),
          score,
          correctCount,
          totalQuestions,
        });
      }
      setSaved(true);
    })();
  }, [saved, score, correctCount, totalQuestions, difficulty, category, mode]);

  const getEmailById = id => emails.find(e => e.id === id);

  const toggleExpand = id => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => (prev === id ? null : id));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.emoji}>{ratingEmoji}</Text>
      <Text style={[styles.rating, { color: ratingColor }]}>{rating}</Text>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>
          {mode === 'daily' ? 'Daily Challenge Score' : 'Final Score'}
        </Text>
        <Text style={styles.scoreValue}>{score}</Text>
        <Text style={styles.accuracy}>
          {correctCount} / {totalQuestions} correct ({percentage}%)
        </Text>
      </View>

      <Text style={styles.reviewTitle}>Review Answers</Text>
      <Text style={styles.reviewHint}>
        Tap a card to expand. Tap highlighted text in the email body to see why
        it's a red flag.
      </Text>

      {answers.map((answer, index) => {
        const email = getEmailById(answer.emailId);
        if (!email) return null;
        const isOpen = expanded === email.id;
        return (
          <View
            key={email.id}
            style={[
              styles.reviewCard,
              { borderLeftColor: answer.correct ? '#22c55e' : '#ef4444' },
            ]}
          >
            <TouchableOpacity
              onPress={() => toggleExpand(email.id)}
              activeOpacity={0.8}
            >
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewIndex}>#{index + 1}</Text>
                <Text style={styles.reviewStatus}>
                  {answer.correct ? '✅ Correct' : '❌ Wrong'}
                </Text>
                <Text style={styles.expandIcon}>{isOpen ? '▲' : '▼'}</Text>
              </View>
              <Text style={styles.reviewSubject} numberOfLines={isOpen ? 5 : 1}>
                {email.subject}
              </Text>
              <Text style={styles.reviewMeta}>
                Actual: {email.isPhishing ? 'Phishing' : 'Legitimate'} | You
                said: {answer.userSaid ? 'Phishing' : 'Legitimate'}
              </Text>
            </TouchableOpacity>

            {isOpen && (
              <View style={{ marginTop: 12 }}>
                <Text style={styles.reviewExplanation}>
                  {email.explanation}
                </Text>

                {email.redFlags && email.redFlags.length > 0 && (
                  <View style={styles.redFlagsContainer}>
                    <Text style={styles.redFlagsTitle}>
                      🚩 Red Flags (tap to learn):
                    </Text>
                    {email.redFlags.map((flag, i) => (
                      <TouchableOpacity
                        key={i}
                        style={styles.flagRow}
                        onPress={() => setFlagModal(flag)}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.flagText} numberOfLines={1}>
                          • {flag.text}
                        </Text>
                        <Text style={styles.flagArrow}>›</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>
        );
      })}

      <TouchableOpacity
        style={styles.playAgainButton}
        onPress={() =>
          navigation.replace('Game', {
            difficulty: difficulty || 'medium',
            category: category || 'all',
            mode: mode || 'quick',
          })
        }
      >
        <Text style={styles.playAgainText}>PLAY AGAIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Leaderboard')}
      >
        <Text style={styles.secondaryText}>VIEW LEADERBOARD</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.secondaryText}>BACK TO HOME</Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={!!flagModal}
        animationType="fade"
        onRequestClose={() => setFlagModal(null)}
      >
        <TouchableOpacity
          style={styles.modalBg}
          activeOpacity={1}
          onPress={() => setFlagModal(null)}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>🚩 Red Flag</Text>
            <Text style={styles.modalText}>"{flagModal?.text}"</Text>
            <Text style={styles.modalReason}>{flagModal?.reason}</Text>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setFlagModal(null)}
            >
              <Text style={styles.modalCloseText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  contentContainer: { padding: 20, paddingBottom: 40 },
  emoji: { fontSize: 64, textAlign: 'center', marginTop: 20 },
  rating: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scoreCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreLabel: { color: '#94a3b8', fontSize: 14, letterSpacing: 1 },
  scoreValue: {
    color: '#38bdf8',
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  accuracy: { color: '#cbd5e1', fontSize: 16 },
  reviewTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  reviewHint: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 14,
    lineHeight: 18,
  },
  reviewCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  reviewIndex: { color: '#64748b', fontWeight: 'bold' },
  reviewStatus: {
    fontWeight: 'bold',
    color: '#e2e8f0',
    flex: 1,
    textAlign: 'right',
    marginRight: 8,
  },
  expandIcon: { color: '#64748b', fontSize: 12 },
  reviewSubject: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  reviewMeta: { color: '#94a3b8', fontSize: 13, marginBottom: 4 },
  reviewExplanation: {
    color: '#cbd5e1',
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  redFlagsContainer: {
    marginTop: 8,
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 10,
  },
  redFlagsTitle: {
    color: '#f59e0b',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  flagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
  },
  flagText: {
    color: '#fca5a5',
    fontSize: 12,
    flex: 1,
    lineHeight: 18,
  },
  flagArrow: { color: '#fca5a5', fontSize: 20, marginLeft: 8 },
  playAgainButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  playAgainText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  secondaryButton: {
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  secondaryText: {
    color: '#94a3b8',
    fontWeight: '600',
    fontSize: 14,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalTitle: {
    color: '#f87171',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalText: {
    color: '#fff',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  modalReason: { color: '#cbd5e1', fontSize: 14, lineHeight: 20 },
  modalClose: {
    marginTop: 20,
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseText: { color: '#fff', fontWeight: 'bold' },
});

export default ResultScreen;
