import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const Colors = {
    primary: '#06BBCC',
    driverPrimary: '#4F46E5', // Indigo color for Drivers
    white: '#FFFFFF',
    background: '#0499A8',
};

export default function GenerateQR() {
    const router = useRouter();
    const params = useLocalSearchParams();
    
    // Check if we are viewing a Driver or a Boat
    const isDriver = params.type === 'driver';
    
    // Dynamic Theme Color
    const themeColor = isDriver ? Colors.driverPrimary : Colors.primary;

    const qrData = JSON.stringify({
        type: isDriver ? 'driver_verify' : 'boat_sail',
        id: params.id,
        name: params.name,
        timestamp: Date.now()
    });

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themeColor }]}>
            {/* Header */}
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.navTitle}>
                    {isDriver ? 'Official ID Card' : 'Gate Pass'}
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                {/* ID CARD / TICKET */}
                <View style={styles.cardContainer}>
                    
                    {/* Header Strip */}
                    <View style={[styles.cardHeader, { backgroundColor: themeColor }]}>
                        <Text style={styles.headerText}>GOVT. APPROVED</Text>
                    </View>

                    <View style={styles.cardBody}>
                        {/* Avatar / Icon */}
                        <View style={styles.avatarContainer}>
                            <Ionicons 
                                name={isDriver ? "person" : "boat"} 
                                size={40} 
                                color={themeColor} 
                            />
                        </View>

                        <Text style={styles.name}>{params.name}</Text>
                        <Text style={styles.idText}>ID: {params.id}</Text>

                        {/* QR Code */}
                        <View style={styles.qrWrapper}>
                            <QRCode value={qrData} size={180} />
                        </View>
                        
                        <Text style={styles.helperText}>
                            {isDriver ? 'Scan to verify Driver' : 'Scan to verify Boat'}
                        </Text>

                        {/* Details Grid */}
                        <View style={styles.detailsBox}>
                            <View style={styles.row}>
                                <Text style={styles.label}>{isDriver ? 'License No' : 'Capacity'}</Text>
                                <Text style={styles.value}>{params.details}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Validity</Text>
                                <Text style={[styles.value, { color: 'green' }]}>Active</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Print/Share Button */}
                <TouchableOpacity style={styles.printBtn} onPress={() => alert('Sent to Printer!')}>
                    <Ionicons name="print-outline" size={20} color="white" />
                    <Text style={styles.printText}>Print / Save Card</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    navBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
    backButton: { padding: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8 },
    navTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
    
    content: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
    
    cardContainer: { width: '100%', maxWidth: 350, backgroundColor: 'white', borderRadius: 20, overflow: 'hidden', elevation: 10 },
    cardHeader: { padding: 10, alignItems: 'center' },
    headerText: { color: 'white', fontWeight: 'bold', fontSize: 12, letterSpacing: 1 },
    
    cardBody: { padding: 24, alignItems: 'center' },
    avatarContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    
    name: { fontSize: 22, fontWeight: 'bold', color: '#333', textAlign: 'center' },
    idText: { fontSize: 14, color: '#888', marginBottom: 20 },
    
    qrWrapper: { padding: 10, borderWidth: 1, borderColor: '#eee', borderRadius: 10, marginBottom: 12 },
    helperText: { fontSize: 12, color: '#999', marginBottom: 20 },
    
    detailsBox: { width: '100%', backgroundColor: '#F9FAFB', padding: 16, borderRadius: 12, gap: 12 },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    label: { fontSize: 14, color: '#666' },
    value: { fontSize: 14, fontWeight: 'bold', color: '#333' },

    printBtn: { flexDirection: 'row', marginTop: 30, backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)', alignItems: 'center', gap: 8 },
    printText: { color: 'white', fontWeight: 'bold' }
});