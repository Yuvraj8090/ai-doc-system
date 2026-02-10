import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Colors = {
    primary: '#06BBCC',
    white: '#FFFFFF',
    background: '#F0F9FA', // Light cyan tint
    dark: '#1F2937',
    gray: '#6B7280',
    border: '#E5E7EB'
};

export default function BoatDetails() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Data handling
    const isRepair = params.status === 'Repair';
    const sails = Number(params.sailsToday);
    const maxSails = 3;

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Boat Details</Text>
                <TouchableOpacity style={styles.editBtn}>
                    <Ionicons name="pencil" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* 1. Main Profile Card */}
                <View style={styles.mainCard}>
                    <View style={styles.imagePlaceholder}>
                        <Ionicons name="boat" size={60} color={Colors.primary} />
                    </View>
                    <Text style={styles.boatName}>{params.name}</Text>
                    <Text style={styles.boatId}>ID: #{params.id}</Text>

                    {/* Status Indicator */}
                    <View style={[styles.statusPill, { backgroundColor: isRepair ? '#FEF2F2' : '#ECFDF5' }]}>
                        <Ionicons 
                            name={isRepair ? "construct" : "checkmark-circle"} 
                            size={16} 
                            color={isRepair ? '#EF4444' : '#10B981'} 
                        />
                        <Text style={[styles.statusText, { color: isRepair ? '#EF4444' : '#059669' }]}>
                            {params.status}
                        </Text>
                    </View>
                </View>

                {/* 2. Stats Grid */}
                <View style={styles.statsGrid}>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Capacity</Text>
                        <Text style={styles.statValue}>{params.capacity}</Text>
                        <Text style={styles.statUnit}>People</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Trips Today</Text>
                        <Text style={[styles.statValue, { color: sails >= 3 ? '#EF4444' : Colors.dark }]}>
                            {sails}/{maxSails}
                        </Text>
                        <Text style={styles.statUnit}>Completed</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Owner</Text>
                        <Text style={styles.statValue} numberOfLines={1} style={{fontSize: 14}}>{params.owner}</Text>
                    </View>
                </View>

                {/* 3. Action Buttons */}
                <View style={styles.actionSection}>
                    <Text style={styles.sectionTitle}>Actions</Text>
                    
                    {/* Generate Pass Button */}
                    <TouchableOpacity 
                        style={[styles.actionBtn, styles.primaryBtn, (isRepair || sails >= 3) && styles.disabledBtn]} 
                        disabled={isRepair || sails >= 3}
                        onPress={() => router.push({
                            pathname: '/(firm)/generate-qr',
                            params: { 
                                id: params.id, 
                                name: params.name, 
                                type: 'boat'
                            }
                        })}
                    >
                        <Ionicons name="qr-code" size={24} color="white" />
                        <View style={{ marginLeft: 12 }}>
                            <Text style={styles.btnTitle}>Generate Gate Pass</Text>
                            <Text style={styles.btnSub}>Create QR for River Entry</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Report Issue Button */}
                    <TouchableOpacity style={[styles.actionBtn, styles.secondaryBtn]}>
                        <Ionicons name="alert-circle" size={24} color={Colors.dark} />
                        <View style={{ marginLeft: 12 }}>
                            <Text style={[styles.btnTitle, { color: Colors.dark }]}>Report Maintenance</Text>
                            <Text style={styles.btnSub}>Mark boat as under repair</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.primary },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
    backBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8 },
    editBtn: { padding: 8 },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },

    scrollContent: { flexGrow: 1, backgroundColor: '#F9FAFB', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24 },
    
    // Main Card
    mainCard: { alignItems: 'center', marginBottom: 24 },
    imagePlaceholder: { width: 100, height: 100, borderRadius: 20, backgroundColor: '#E0F7FA', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
    boatName: { fontSize: 22, fontWeight: 'bold', color: Colors.dark },
    boatId: { fontSize: 14, color: Colors.gray, marginTop: 4 },
    statusPill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 12, gap: 6 },
    statusText: { fontWeight: 'bold', fontSize: 14 },

    // Stats Grid
    statsGrid: { flexDirection: 'row', gap: 12, marginBottom: 30 },
    statBox: { flex: 1, backgroundColor: Colors.white, padding: 16, borderRadius: 16, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, elevation: 1 },
    statLabel: { fontSize: 12, color: Colors.gray, marginBottom: 4 },
    statValue: { fontSize: 18, fontWeight: 'bold', color: Colors.dark },
    statUnit: { fontSize: 10, color: Colors.gray },

    // Actions
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.dark, marginBottom: 12 },
    actionSection: { marginBottom: 20 },
    actionBtn: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
    primaryBtn: { backgroundColor: Colors.primary },
    secondaryBtn: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border },
    disabledBtn: { backgroundColor: Colors.gray, opacity: 0.7 },
    
    btnTitle: { fontSize: 16, fontWeight: 'bold', color: 'white' },
    btnSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
});