import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';

const HISTORY = [
  { id: '1', boat: 'Ganga Rider 4', time: '10:45 AM', status: 'Blocked' },
  { id: '2', boat: 'Ganga Rider 2', time: '10:30 AM', status: 'Allowed' },
];

export default function History() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#333" /></TouchableOpacity>
        <Text style={styles.title}>History</Text>
      </View>
      <FlatList
        data={HISTORY}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.boat}>{item.boat}</Text>
            <Text style={{ color: item.status === 'Blocked' ? Colors.danger : Colors.success, fontWeight: 'bold' }}>{item.status}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { padding: 20, flexDirection: 'row', gap: 20, alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' },
    title: { fontSize: 20, fontWeight: 'bold' },
    row: { padding: 20, borderBottomWidth: 1, borderColor: '#eee', flexDirection: 'row', justifyContent: 'space-between' },
    boat: { fontSize: 16, fontWeight: '600' }
});