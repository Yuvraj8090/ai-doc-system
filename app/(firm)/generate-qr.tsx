import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // Library we just installed
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';

export default function GenerateQR() {
  const router = useRouter();
  // Get params passed from Dashboard
  const { boatId, boatName } = useLocalSearchParams();

  // Data to embed in the QR Code (As per DPR Section 4.4)
  const qrData = JSON.stringify({
    type: 'boat_sail',
    boat_id: boatId,
    boat_name: boatName,
    timestamp: Date.now(),
    firm_id: 'FIRM_001'
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gate Pass Generation</Text>
      </View>

      <View style={styles.content}>
        {/* Ticket Info Card */}
        <View style={styles.ticketCard}>
          <View style={styles.ticketHeader}>
            <Text style={styles.firmName}>Himalayan Rafting Co.</Text>
            <Text style={styles.date}>{new Date().toDateString()}</Text>
          </View>

          <View style={styles.divider} />

          {/* The QR Code */}
          <View style={styles.qrContainer}>
            <QRCode
              value={qrData}
              size={200}
              color="black"
              backgroundColor="white"
            />
          </View>

          <Text style={styles.instruction}>Show this QR to the Verifier at the river bank.</Text>

          <View style={styles.boatDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Boat Name</Text>
              <Text style={styles.value}>{boatName}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Boat ID</Text>
              <Text style={styles.value}>#{boatId}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Status</Text>
              <Text style={[styles.value, { color: Colors.success }]}>Ready to Sail</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.doneButton} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary, // Blue background for contrast
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  ticketCard: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  ticketHeader: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  firmName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  qrContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  boatDetails: {
    width: '100%',
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#888',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  doneButton: {
    marginTop: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});