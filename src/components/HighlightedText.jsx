import React from 'react';
import { Text, StyleSheet } from 'react-native';

/**
 * Splits a string and highlights occurrences of any red-flag snippet.
 * Each red flag is tappable and reports its reason.
 */
const HighlightedText = ({ text, redFlags, onFlagPress, baseStyle }) => {
  if (!redFlags || redFlags.length === 0) {
    return <Text style={baseStyle}>{text}</Text>;
  }

  // Build a regex matching any of the red flag texts (escaped)
  const escaped = redFlags
    .map(r => r.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length); // longest first

  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(pattern);

  return (
    <Text style={baseStyle}>
      {parts.map((part, idx) => {
        const matchedFlag = redFlags.find(
          r => r.text.toLowerCase() === part.toLowerCase(),
        );
        if (matchedFlag) {
          return (
            <Text
              key={idx}
              style={styles.flag}
              onPress={() => onFlagPress(matchedFlag)}>
              {part}
            </Text>
          );
        }
        return <Text key={idx}>{part}</Text>;
      })}
    </Text>
  );
};

const styles = StyleSheet.create({
  flag: {
    color: '#fca5a5',
    fontWeight: '700',
    backgroundColor: 'rgba(239, 68, 68, 0.22)',
    textDecorationLine: 'underline',
  },
});

export default HighlightedText;