import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Colors = {
    primary: '#06BBCC',
    white: '#FFFFFF',
    background: '#F3F4F6',
    dark: '#1F2937'
};

export default function Dashboard() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Himalayan Rafting</Text>
                    <Text style={styles.subtitle}>Manager Dashboard</Text>
                </View>
                <TouchableOpacity onPress={() => router.replace('/(auth)/login')} style={styles.logoutBtn}>
                    <Ionicons name="log-out-outline" size={24} color="#EF4444" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                
                {/* 1. MANAGE BOATS CARD */}
                <TouchableOpacity 
                    style={styles.card} 
                    onPress={() => router.push('/(firm)/boats')}
                    activeOpacity={0.8}
                >
                    <View style={[styles.iconBox, { backgroundColor: '#E0F2F1' }]}>
                        <Ionicons name="boat" size={40} color={Colors.primary} />
                    </View>
                    <View style={styles.cardText}>
                        <Text style={styles.cardTitle}>Manage Boats</Text>
                        <Text style={styles.cardDesc}>View fleet status, track trips, generate gate passes.</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
                </TouchableOpacity>

                {/* 2. MANAGE DRIVERS CARD */}
                <TouchableOpacity 
                    style={styles.card} 
                    onPress={() => router.push('/(firm)/drivers')}
                    activeOpacity={0.8}
                >
                    <View style={[styles.iconBox, { backgroundColor: '#E0E7FF' }]}>
                        <Ionicons name="people" size={40} color="#4F46E5" />
                    </View>
                    <View style={styles.cardText}>
                        <Text style={styles.cardTitle}>Manage Drivers</Text>
                        <Text style={styles.cardDesc}>Search drivers, view profiles, check assigned boats.</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
                </TouchableOpacity>

                {/* Summary Stats (Optional) */}
                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Total Boats</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>24</Text>
                        <Text style={styles.statLabel}>Active Drivers</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 24, backgroundColor: Colors.white },
    title: { fontSize: 22, fontWeight: 'bold', color: Colors.dark },
    subtitle: { color: '#6B7280' },
    logoutBtn: { padding: 8, backgroundColor: '#FEF2F2', borderRadius: 8 },
    content: { padding: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.dark, marginBottom: 16 },
    
    card: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, padding: 20, borderRadius: 16, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
    iconBox: { width: 60, height: 60, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    cardText: { flex: 1 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.dark },
    cardDesc: { fontSize: 13, color: '#6B7280', marginTop: 4 },

    statsRow: { flexDirection: 'row', gap: 16, marginTop: 10 },
    statBox: { flex: 1, backgroundColor: Colors.white, padding: 16, borderRadius: 12, alignItems: 'center' },
    statNumber: { fontSize: 24, fontWeight: 'bold', color: Colors.primary },
    statLabel: { fontSize: 12, color: '#6B7280' }
});