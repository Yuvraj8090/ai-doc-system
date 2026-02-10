import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';

export default function VerificationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const { name, id, type, tripsToday, maxTrips } = params;
  const currentTrips = Number(tripsToday);
  const max = Number(maxTrips);

  // LOGIC: Determine Status Color
  // 0 visited -> Green
  // > 1 visited -> Yellow
  // 1 less than max -> Orange
  // Equals max -> Red
  let statusColor = Colors.success; // Green
  let statusText = "Safe to Allow";
  
  if (currentTrips === 0) {
     statusColor = Colors.success; 
  } else if (currentTrips >= max) {
     statusColor = Colors.danger; // Red
     statusText = "Limit Reached";
  } else if (currentTrips === max - 1) {
     statusColor = '#f97316'; // Orange
     statusText = "Approaching Limit";
  } else if (currentTrips >= 1) {
     statusColor = '#eab308'; // Yellow
     statusText = "Active Today";
  }

  const handleAllow = () => {
    if (type === 'driver') {
      // If Driver Approved -> Go back to Scan QR but for Step 2 (Boat)
      router.push({
        pathname: '/(verifier)/scan-qr',
        params: { step: 'boat', driverId: id }
      });
    } else {
      // If Boat Approved -> Final Success
      // Call your API to record the trip here
      alert("Trip Recorded Successfully!");
      router.dismissAll(); // Go back to dashboard
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { backgroundColor: statusColor }]}>
        <Ionicons name={type === 'driver' ? "person" : "boat"} size={60} color="white" />
        <Text style={styles.headerTitle}>{type === 'driver' ? "DRIVER INFO" : "BOAT INFO"}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.label}>Name/Owner:</Text>
                <Text style={styles.value}>{name}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Unique ID:</Text>
                <Text style={styles.value}>#{id}</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.row}>
                <Text style={styles.label}>Trips Today:</Text>
                <Text style={[styles.value, { color: statusColor }]}>{currentTrips} / {max}</Text>
            </View>
            <Text style={[styles.statusTag, { color: statusColor }]}>{statusText}</Text>
        </View>

        <View style={styles.actionContainer}>
            <TouchableOpacity 
                style={[styles.btn, styles.denyBtn]} 
                onPress={() => router.back()}
            >
                <Ionicons name="close-circle" size={24} color="white" />
                <Text style={styles.btnText}>DENY</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.btn, { backgroundColor: Colors.success }]} 
                onPress={handleAllow}
            >
                <Ionicons name="checkmark-circle" size={24} color="white" />
                <Text style={styles.btnText}>ALLOW</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  header: { alignItems: 'center', padding: 40, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 10, textTransform: 'uppercase' },
  content: { flex: 1, padding: 20, marginTop: -30 },
  card: { backgroundColor: 'white', padding: 25, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, marginBottom: 30 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  label: { fontSize: 16, color: '#666' },
  value: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
  statusTag: { textAlign: 'center', fontWeight: 'bold', marginTop: 10, fontSize: 16 },
  actionContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 15 },
  btn: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 18, borderRadius: 16 },
  denyBtn: { backgroundColor: Colors.danger },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
});