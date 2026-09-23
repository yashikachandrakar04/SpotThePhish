import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { categories } from '../data/categories';
import { getFilteredEmails } from '../data/emails';

const CategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { difficulty } = route.params;

  const handlePick = (categoryId) => {
    const pool = getFilteredEmails(categoryId, difficulty);
    if (pool.length === 0) return;
    navigation.navigate('Game', { difficulty, category: categoryId, mode: 'quick' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Category</Text>
      <Text style={styles.subtitle}>Pick a topic to focus on</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {categories.map(cat => {
          const count = getFilteredEmails(cat.id, difficulty).length;
          const disabled = count === 0;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.card,
                { borderLeftColor: cat.color },
                disabled && { opacity: 0.35 },
              ]}
              onPress={() => handlePick(cat.id)}
              disabled={disabled}
              activeOpacity={0.85}>
              <Text style={styles.icon}>{cat.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{cat.name}</Text>
                <Text style={styles.desc}>{count} email{count !== 1 ? 's' : ''}</Text>
              </View>
              <Text style={[styles.arrow, { color: cat.color }]}>›</Text>
            </TouchableOpacity>
          );
        })}
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
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 5,
  },
  icon: { fontSize: 28, marginRight: 14 },
  name: { color: '#fff', fontSize: 16, fontWeight: '600' },
  desc: { color: '#94a3b8', fontSize: 12, marginTop: 2 },
  arrow: { fontSize: 28, fontWeight: 'bold' },
});

export default CategoryScreen;