import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';

export default function ScanResult() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isBlocked = params.status === 'blocked';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isBlocked ? Colors.danger : Colors.success }]}>
      <View style={styles.content}>
        <Ionicons name={isBlocked ? "close-circle" : "checkmark-circle"} size={100} color="white" />
        <Text style={styles.title}>{isBlocked ? "SAIL DENIED" : "SAIL ALLOWED"}</Text>
        <View style={styles.card}>
            <Text style={styles.label}>Boat: <Text style={styles.value}>{params.boatName}</Text></Text>
            <Text style={styles.label}>ID: <Text style={styles.value}>#{params.boatId}</Text></Text>
            <Text style={styles.label}>Trips: <Text style={styles.value}>{params.sailCount}/3</Text></Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => router.back()}>
            <Text style={styles.btnText}>Scan Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 30, fontWeight: 'bold', color: 'white', marginTop: 20, marginBottom: 40 },
  card: { backgroundColor: 'white', padding: 30, borderRadius: 20, width: '100%', marginBottom: 40 },
  label: { fontSize: 18, marginBottom: 10, color: '#666' },
  value: { fontWeight: 'bold', color: '#000' },
  btn: { backgroundColor: 'white', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  btnText: { fontSize: 18, fontWeight: 'bold' },
});