import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

// MOCK DATA: History of today's scans
const SCAN_HISTORY = [
  { id: '1', boat: 'Ganga Rider 4', time: '10:45 AM', status: 'Blocked', reason: 'Limit Exceeded' },
  { id: '2', boat: 'Ganga Rider 2', time: '10:30 AM', status: 'Allowed', reason: 'Trip 2/3' },
  { id: '3', boat: 'Himalaya 01',   time: '09:15 AM', status: 'Allowed', reason: 'Trip 1/3' },
  { id: '4', boat: 'Rapid Fire X',  time: '08:50 AM', status: 'Allowed', reason: 'Trip 1/3' },
];

export default function VerificationHistory() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Today's Activity</Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total Scans: 4 | <Text style={{color:Colors.danger}}>Blocked: 1</Text></Text>
      </View>

      <FlatList
        data={SCAN_HISTORY}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            {/* Icon */}
            <View style={[styles.iconBox, item.status === 'Blocked' ? styles.bgRed : styles.bgGreen]}>
              <Ionicons 
                name={item.status === 'Blocked' ? "hand-left" : "checkmark"} 
                size={20} 
                color="white" 
              />
            </View>
            
            {/* Info */}
            <View style={styles.info}>
              <Text style={styles.boatName}>{item.boat}</Text>
              <Text style={styles.reason}>{item.reason}</Text>
            </View>

            {/* Time & Status */}
            <View style={styles.meta}>
              <Text style={styles.time}>{item.time}</Text>
              <Text style={[styles.statusText, item.status === 'Blocked' ? styles.textRed : styles.textGreen]}>
                {item.status.toUpperCase()}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backBtn: { marginRight: 16 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  summary: {
    padding: 12,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  summaryText: { color: '#666', fontWeight: '600' },
  list: { padding: 16 },
  logItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  bgRed: { backgroundColor: Colors.danger },
  bgGreen: { backgroundColor: Colors.success },
  info: { flex: 1 },
  boatName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  reason: { fontSize: 13, color: '#888', marginTop: 2 },
  meta: { alignItems: 'flex-end' },
  time: { fontSize: 12, color: '#999', marginBottom: 4 },
  statusText: { fontSize: 12, fontWeight: 'bold' },
  textRed: { color: Colors.danger },
  textGreen: { color: Colors.success },
});