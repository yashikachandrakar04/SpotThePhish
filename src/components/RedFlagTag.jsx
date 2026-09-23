import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * An inline tappable span in the email body/text.
 * On press, it reports the reason for the red flag.
 */
const RedFlagTag = ({ text, reason, onPress }) => {
  return (
    <Text>
      <Text
        style={styles.flag}
        onPress={() => onPress({ text, reason })}
        suppressHighlighting={false}>
        {text}
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  flag: {
    color: '#fca5a5',
    fontWeight: '700',
    backgroundColor: 'rgba(239, 68, 68, 0.18)',
    textDecorationLine: 'underline',
  },
});

export default RedFlagTag;