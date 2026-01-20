import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';

export default function ScanResult() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Parse params (ensure they are strings)
  const isBlocked = params.status === 'blocked';
  const boatName = params.boatName || 'Unknown Boat';
  const boatId = params.boatId || '---';
  const sailCount = params.sailCount || '0';

  return (
    <SafeAreaView style={[styles.container, isBlocked ? styles.bgBlocked : styles.bgAllowed]}>
      
      <View style={styles.content}>
        {/* BIG STATUS ICON */}
        <View style={styles.iconCircle}>
          <Ionicons 
            name={isBlocked ? "close" : "checkmark"} 
            size={80} 
            color={isBlocked ? Colors.danger : Colors.success} 
          />
        </View>

        {/* STATUS TEXT */}
        <Text style={styles.statusTitle}>
          {isBlocked ? "SAIL DENIED" : "SAIL ALLOWED"}
        </Text>
        <Text style={styles.statusSub}>
          {isBlocked 
            ? "Daily limit exceeded for this boat." 
            : "Verification Successful. Safe to sail."}
        </Text>

        {/* DETAILS CARD */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Boat Name</Text>
            <Text style={styles.value}>{boatName}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Boat ID</Text>
            <Text style={styles.value}>#{boatId}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Trips Today</Text>
            <Text style={[styles.value, isBlocked ? styles.textRed : styles.textGreen]}>
              {sailCount}/3 Completed
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        </View>
      </View>

      {/* FOOTER BUTTONS */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.btnPrimary} 
          onPress={() => router.replace('/(verifier)/scan-qr')}
        >
          <Text style={[styles.btnText, isBlocked ? styles.textRed : styles.textGreen]}>
            Scan Next Boat
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnSecondary} 
          onPress={() => router.push('/(verifier)/history')}
        >
          <Text style={styles.btnTextSecondary}>View History Log</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgAllowed: { backgroundColor: Colors.success }, // Green Background
  bgBlocked: { backgroundColor: Colors.danger },  // Red Background
  
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  statusTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: 'white',
    letterSpacing: 1,
    marginBottom: 8,
  },
  statusSub: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 40,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 4,
  },
  label: { fontSize: 14, color: '#888' },
  value: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  textRed: { color: Colors.danger },
  textGreen: { color: Colors.success },
  
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  btnPrimary: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnSecondary: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: { fontSize: 18, fontWeight: 'bold' },
  btnTextSecondary: { fontSize: 16, fontWeight: '600', color: 'white' },
});