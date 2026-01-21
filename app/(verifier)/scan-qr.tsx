import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraView } from "expo-camera";
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default function QRScanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false); // New State to control camera
  const router = useRouter();

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    setIsCameraOpen(false); // Close camera after scan
    
    try {
      const boatData = JSON.parse(data);
      const isBlocked = boatData.boat_id === '104'; // Demo Logic

      // Go to Result Screen
      router.push({
        pathname: '/(verifier)/result',
        params: {
          status: isBlocked ? 'blocked' : 'allowed',
          boatName: boatData.boat_name,
          boatId: boatData.boat_id,
          sailCount: isBlocked ? '3' : '2'
        }
      });
      
      // Reset scan state after delay
      setTimeout(() => setScanned(false), 1000);
    } catch (e) {
      Alert.alert("Error", "Invalid QR Code");
      setScanned(false);
    }
  };

  if (hasPermission === null) return <View style={styles.container} />;
  if (hasPermission === false) return <View style={styles.container}><Text>No Camera Access</Text></View>;

  // 1. IF CAMERA IS OPEN, SHOW SCANNER VIEW
  if (isCameraOpen) {
    return (
      <View style={styles.fullScreenCamera}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          style={StyleSheet.absoluteFillObject}
        />
        
        {/* Overlay Frame */}
        <View style={styles.scanOverlay}>
          <Text style={styles.scanText}>Align QR code within frame</Text>
          <View style={styles.scanBox} />
        </View>

        {/* Close Button */}
        <TouchableOpacity style={styles.closeBtn} onPress={() => setIsCameraOpen(false)}>
           <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  // 2. DEFAULT DASHBOARD VIEW (NO CAMERA)
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello Officer,</Text>
          <Text style={styles.subtitle}>Verification Point: Rishikesh</Text>
        </View>
        <TouchableOpacity 
          style={styles.logoutBtn} 
          onPress={() => router.replace('/(auth)/login')}
        >
           <Ionicons name="log-out-outline" size={24} color={Colors.danger} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Big Scan Button */}
        <TouchableOpacity 
          style={styles.scanButtonCard} 
          onPress={() => {
            setScanned(false);
            setIsCameraOpen(true);
          }}
          activeOpacity={0.8}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="qr-code-outline" size={60} color="white" />
          </View>
          <Text style={styles.scanBtnText}>Verify New Boat</Text>
          <Text style={styles.scanBtnSub}>Tap to open scanner</Text>
        </TouchableOpacity>

        {/* History Button */}
        <TouchableOpacity 
          style={styles.historyCard}
          onPress={() => router.push('/(verifier)/history')}
        >
          <View style={styles.historyIcon}>
            <Ionicons name="time-outline" size={30} color={Colors.primary} />
          </View>
          <View>
            <Text style={styles.historyTitle}>View Activity Log</Text>
            <Text style={styles.historySub}>Check today's scans</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#ccc" style={{marginLeft: 'auto'}} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  
  // Dashboard Styles
  header: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  greeting: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  subtitle: { color: '#888', marginTop: 4 },
  logoutBtn: { padding: 8, backgroundColor: '#ffebee', borderRadius: 8 },
  
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  
  scanButtonCard: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 30,
  },
  iconCircle: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  scanBtnText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  scanBtnSub: { color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 5 },

  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  historyIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  historyTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  historySub: { color: '#888', fontSize: 12 },

  // Camera Styles
  fullScreenCamera: { flex: 1, backgroundColor: 'black' },
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 20,
  },
  scanOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanBox: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: Colors.success,
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  scanText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
});