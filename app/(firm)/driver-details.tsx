import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DriverProfile() {
    const router = useRouter();
    const params = useLocalSearchParams(); // Gets data passed from previous screen

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Driver Profile</Text>
            </View>

            <View style={styles.profileCard}>
                <View style={styles.avatarLarge}>
                    <Ionicons name="person" size={50} color="#4F46E5" />
                </View>
                <Text style={styles.name}>{params.name}</Text>
                <Text style={styles.designation}>Licensed Raft Guide</Text>

                {/* Status Badge */}
                <View style={[styles.statusBadge, { backgroundColor: params.status === 'Active' ? '#D1FAE5' : '#FEE2E2' }]}>
                    <Text style={{ color: params.status === 'Active' ? 'green' : 'red', fontWeight: 'bold' }}>
                        {params.status}
                    </Text>
                </View>

                {/* Info Grid */}
                <View style={styles.infoSection}>
                    <View style={styles.row}>
                        <Text style={styles.label}>License No</Text>
                        <Text style={styles.value}>{params.license}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Text style={styles.label}>Phone Number</Text>
                        <Text style={styles.value}>{params.phone}</Text>
                    </View>
                    <View style={styles.divider} />
                    
                    {/* CURRENT BOAT ASSOCIATION */}
                    <View style={styles.row}>
                        <Text style={styles.label}>Current Assignment</Text>
                        {params.currentBoat ? (
                            <View style={styles.boatChip}>
                                <Ionicons name="boat" size={16} color="#006064" />
                                <Text style={styles.boatText}>{params.currentBoat}</Text>
                            </View>
                        ) : (
                            <Text style={{ color: '#999', fontStyle: 'italic' }}>Not assigned to any boat</Text>
                        )}
                    </View>
                </View>

                {/* Actions */}
                <TouchableOpacity 
                    style={styles.qrButton}
                    onPress={() => router.push({
                        pathname: '/(firm)/generate-qr',
                        params: { 
                            id: params.id, 
                            name: params.name, 
                            type: 'driver',
                            details: params.license 
                        }
                    })}
                >
                    <Ionicons name="qr-code" size={20} color="white" />
                    <Text style={styles.btnText}>Generate ID Card</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#4F46E5' }, // Indigo Background
    header: { padding: 20, flexDirection: 'row', alignItems: 'center' },
    backBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8, marginRight: 16 },
    headerTitle: { fontSize: 20, color: 'white', fontWeight: 'bold' },

    profileCard: { flex: 1, backgroundColor: '#F9FAFB', marginTop: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, alignItems: 'center' },
    avatarLarge: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E0E7FF', justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 4, borderColor: 'white', shadowColor: '#000', shadowOpacity: 0.1, elevation: 5 },
    
    name: { fontSize: 24, fontWeight: 'bold', color: '#1F2937' },
    designation: { fontSize: 14, color: '#6B7280', marginBottom: 12 },
    statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 24 },
    
    infoSection: { width: '100%', backgroundColor: 'white', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2, marginBottom: 24 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
    label: { fontSize: 14, color: '#6B7280' },
    value: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
    divider: { height: 1, backgroundColor: '#F3F4F6' },

    boatChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E0F7FA', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, gap: 6 },
    boatText: { color: '#006064', fontWeight: 'bold' },

    qrButton: { flexDirection: 'row', width: '100%', backgroundColor: '#4F46E5', padding: 16, borderRadius: 16, justifyContent: 'center', alignItems: 'center', gap: 8 },
    btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});