import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { difficulties } from '../data/categories';

const DifficultyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Difficulty</Text>
      <Text style={styles.subtitle}>Affects time per email</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {difficulties.map(d => (
          <TouchableOpacity
            key={d.id}
            style={[styles.card, { borderColor: d.color }]}
            onPress={() => navigation.navigate('Category', { difficulty: d.id })}
            activeOpacity={0.85}>
            <Text style={styles.icon}>{d.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{d.name}</Text>
              <Text style={styles.desc}>{d.description}</Text>
            </View>
            <Text style={[styles.arrow, { color: d.color }]}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 24 },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 6,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 2,
  },
  icon: { fontSize: 36, marginRight: 16 },
  name: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  desc: { color: '#94a3b8', fontSize: 13, marginTop: 3 },
  arrow: { fontSize: 32, fontWeight: 'bold' },
});

export default DifficultyScreen;