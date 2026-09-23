import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFilteredEmails, shuffleEmails } from '../data/emails';
import { getDifficultySeconds } from '../data/categories';
import { getDailyEmails } from '../utils/dailyChallenge';
import EmailCard from '../components/EmailCard';
import Timer from '../components/Timer';

const POINTS_PER_CORRECT = 100;
const BONUS_PER_SECOND = 10;

const GameScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { difficulty = 'medium', category = 'all', mode = 'quick' } = route.params || {};

  const duration = getDifficultySeconds(difficulty);

  // Build the email list once
  const [gameEmails] = useState(() => {
    if (mode === 'daily') return getDailyEmails();
    const pool = getFilteredEmails(category, difficulty);
    const usable = pool.length > 0 ? pool : getFilteredEmails('all', 'mixed');
    return shuffleEmails(usable).slice(0, 10);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [paused, setPaused] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [flagModal, setFlagModal] = useState(null);
  const [feedback, setFeedback] = useState(null); // { correct, message }

  const currentEmail = gameEmails[currentIndex];

  const handleAnswer = useCallback(
    (userSaidPhishing, remainingTime = timeLeft) => {
      if (paused) return;
      const isCorrect = userSaidPhishing === currentEmail.isPhishing;
      let pointsEarned = 0;

      if (isCorrect) {
        pointsEarned = POINTS_PER_CORRECT + remainingTime * BONUS_PER_SECOND;
        setScore(prev => prev + pointsEarned);
        setCorrectCount(prev => prev + 1);
      }

      const newAnswer = {
        emailId: currentEmail.id,
        userSaid: userSaidPhishing,
        correct: isCorrect,
        timeLeft: remainingTime,
      };
      const newAnswers = [...answers, newAnswer];
      setAnswers(newAnswers);
      setPaused(true);

      setFeedback({
        correct: isCorrect,
        message: isCorrect
          ? `Correct! +${pointsEarned} points`
          : `Wrong. It was ${currentEmail.isPhishing ? 'PHISHING' : 'LEGITIMATE'}.`,
      });

      setTimeout(() => {
        setFeedback(null);
        setPaused(false);
        if (currentIndex + 1 >= gameEmails.length) {
          navigation.replace('Result', {
            score,
            correctCount,
            totalQuestions: gameEmails.length,
            answers: newAnswers,
            emails: gameEmails,
            difficulty,
            category,
            mode,
          });
        } else {
          setCurrentIndex(prev => prev + 1);
          setTimeLeft(duration);
          setResetKey(prev => prev + 1);
        }
      }, 2000);
    },
    [paused, currentEmail, timeLeft, answers, currentIndex, gameEmails, score, correctCount, navigation, difficulty, category, mode, duration],
  );

  const handleTimeUp = useCallback(() => {
    handleAnswer(false, 0);
  }, [handleAnswer]);

  if (!currentEmail) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 100 }}>
          No emails in this category.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.progressText}>
            Email {currentIndex + 1} / {gameEmails.length}
          </Text>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {mode === 'daily' ? '📅 Daily' : `${difficulty.toUpperCase()}`}
          </Text>
        </View>
      </View>

      <Timer
        duration={duration}
        onTimeUp={handleTimeUp}
        isPaused={paused}
        resetKey={resetKey}
      />

      <EmailCard email={currentEmail} revealFlags={false} />

      {/* Feedback overlay */}
      {feedback && (
        <View style={styles.feedbackOverlay} pointerEvents="none">
          <View
            style={[
              styles.feedbackCard,
              { backgroundColor: feedback.correct ? '#15803d' : '#b91c1c' },
            ]}>
            <Text style={styles.feedbackIcon}>{feedback.correct ? '✅' : '❌'}</Text>
            <Text style={styles.feedbackText}>{feedback.message}</Text>
          </View>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.answerButton, styles.phishingButton]}
          onPress={() => handleAnswer(true)}
          disabled={paused}
          activeOpacity={0.8}>
          <Text style={styles.answerButtonIcon}>⚠️</Text>
          <Text style={styles.answerButtonText}>PHISHING</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.answerButton, styles.legitButton]}
          onPress={() => handleAnswer(false)}
          disabled={paused}
          activeOpacity={0.8}>
          <Text style={styles.answerButtonIcon}>✅</Text>
          <Text style={styles.answerButtonText}>LEGITIMATE</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent
        visible={!!flagModal}
        animationType="fade"
        onRequestClose={() => setFlagModal(null)}>
        <TouchableOpacity
          style={styles.modalBg}
          activeOpacity={1}
          onPress={() => setFlagModal(null)}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>🚩 Red Flag</Text>
            <Text style={styles.modalText}>"{flagModal?.text}"</Text>
            <Text style={styles.modalReason}>{flagModal?.reason}</Text>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setFlagModal(null)}>
              <Text style={styles.modalCloseText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', paddingTop: 16 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  progressText: { color: '#94a3b8', fontSize: 14, fontWeight: '600' },
  scoreText: {
    color: '#38bdf8',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
  },
  badge: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  badgeText: { color: '#94a3b8', fontSize: 11, fontWeight: 'bold' },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 12,
  },
  answerButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  phishingButton: {
    backgroundColor: '#dc2626',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  legitButton: {
    backgroundColor: '#16a34a',
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  answerButtonIcon: { fontSize: 18, marginRight: 8 },
  answerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  feedbackOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  feedbackCard: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  feedbackIcon: { fontSize: 32, marginBottom: 4 },
  feedbackText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
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
  modalTitle: { color: '#f87171', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
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

export default GameScreen;