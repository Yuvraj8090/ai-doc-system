import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from "expo-camera"; // Updated import
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  
  // NEW: Track which step of the process we are in
  // If we have 'driverVerified=true' param, we are scanning the boat.
  const params = useLocalSearchParams();
  const step = params.step === 'boat' ? 2 : 1; 

  const router = useRouter();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = ({ data }: any) => {
    setScanned(true);
    setIsCameraOpen(false);
    
    try {
      // In production, you would fetch API data here using the scanned ID
      const scannedData = JSON.parse(data); 

      // Navigate to the verification/decision screen
      router.push({
        pathname: '/(verifier)/result', // We will reuse result.tsx as the "Inspection" screen
        params: {
          id: scannedData.id,
          name: scannedData.name,
          type: step === 1 ? 'driver' : 'boat', // Tell next screen what we scanned
          tripsToday: 1, // Demo data
          maxTrips: 2,   // Demo data
          previousDriverId: params.driverId // Pass driver ID if we are on step 2
        }
      });
      
      setTimeout(() => setScanned(false), 1000);
    } catch (e) {
      Alert.alert("Error", "Invalid QR Code format");
      setScanned(false);
    }
  };

  if (!permission) return <View />;
  if (!permission.granted) return <View style={styles.container}><Text>No Camera Access</Text></View>;

  if (isCameraOpen) {
    return (
      <View style={styles.fullScreenCamera}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.scanOverlay}>
          <Text style={styles.scanText}>
            {step === 1 ? "Scan DRIVER QR Code" : "Scan BOAT QR Code"}
          </Text>
          <View style={[styles.scanBox, { borderColor: step === 1 ? Colors.primary : Colors.warning }]} />
        </View>
        <TouchableOpacity style={styles.closeBtn} onPress={() => setIsCameraOpen(false)}>
           <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello Officer,</Text>
          <Text style={styles.subtitle}>
            {step === 1 ? "Ready to verify new raft" : "Step 2: Verify Boat"}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={[styles.scanButtonCard, step === 2 && { backgroundColor: Colors.warning }]} 
          onPress={() => {
            setScanned(false);
            setIsCameraOpen(true);
          }}
          activeOpacity={0.8}
        >
          <View style={styles.iconCircle}>
            <Ionicons name={step === 1 ? "person-outline" : "boat-outline"} size={60} color="white" />
          </View>
          <Text style={styles.scanBtnText}>
            {step === 1 ? "Scan Driver" : "Scan Boat"}
          </Text>
          <Text style={styles.scanBtnSub}>
            {step === 1 ? "Tap to start verification" : "Tap to complete process"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ... styles remain the same ...
const styles = StyleSheet.create({
    // (Keep your existing styles)
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: { padding: 24, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
    greeting: { fontSize: 22, fontWeight: 'bold', color: '#333' },
    subtitle: { color: '#888', marginTop: 4 },
    content: { flex: 1, padding: 24, justifyContent: 'center' },
    scanButtonCard: { backgroundColor: Colors.primary, borderRadius: 24, padding: 40, alignItems: 'center', elevation: 10 },
    iconCircle: { width: 100, height: 100, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    scanBtnText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
    scanBtnSub: { color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 5 },
    fullScreenCamera: { flex: 1, backgroundColor: 'black' },
    scanOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    scanText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 20, backgroundColor: 'rgba(0,0,0,0.6)', padding: 10, borderRadius: 8 },
    scanBox: { width: 250, height: 250, borderWidth: 2, borderRadius: 20 },
    closeBtn: { position: 'absolute', top: 50, right: 20, padding: 10, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20 },
});