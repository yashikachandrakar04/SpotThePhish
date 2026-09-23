import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import HighlightedText from './HighlightedText';

const EmailCard = ({ email, revealFlags, onFlagPress, flaggedIds }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{email.sender.charAt(0)}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.sender}>{email.sender}</Text>
          <Text style={styles.senderEmail} numberOfLines={1}>
            {email.senderEmail}
          </Text>
        </View>
      </View>

      <View style={styles.subjectContainer}>
        <Text style={styles.subject}>{email.subject}</Text>
      </View>

      <ScrollView
        style={styles.bodyContainer}
        showsVerticalScrollIndicator={false}
      >
        {revealFlags ? (
          <HighlightedText
            text={email.body}
            redFlags={email.redFlags || []}
            onFlagPress={onFlagPress}
            baseStyle={styles.body}
          />
        ) : (
          <Text style={styles.body}>{email.body}</Text>
        )}
      </ScrollView>

      {revealFlags && email.redFlags && email.redFlags.length > 0 && (
        <View style={styles.hintBar}>
          <Text style={styles.hintText}>
            💡 Tap the highlighted parts to learn why they're suspicious
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 20,
    flex: 1,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  headerInfo: { flex: 1 },
  sender: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' },
  senderEmail: { fontSize: 13, color: '#64748b', marginTop: 2 },
  subjectContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8fafc',
  },
  subject: { fontSize: 15, fontWeight: '600', color: '#1e293b' },
  bodyContainer: { paddingHorizontal: 16, paddingTop: 12, flex: 1 },
  body: { fontSize: 14, color: '#334155', lineHeight: 22 },
  hintBar: {
    backgroundColor: '#fef3c7',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#fde68a',
  },
  hintText: { fontSize: 12, color: '#92400e', fontWeight: '600' },
});

export default EmailCard;
