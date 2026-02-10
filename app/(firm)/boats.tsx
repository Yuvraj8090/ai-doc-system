import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define Colors
const Colors = {
    primary: '#06BBCC',
    background: '#F9FAFB',
    white: '#FFFFFF',
    dark: '#1F2937',
    gray: '#9CA3AF',
    danger: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981'
};

// Dummy Boat Data
const BOATS = [
    { id: 'B-101', name: 'Ganga Rider 1', capacity: 6, status: 'Active', sailsToday: 2, owner: 'Ramesh Enterprises' },
    { id: 'B-102', name: 'Ganga Rider 2', capacity: 8, status: 'Active', sailsToday: 0, owner: 'Ramesh Enterprises' },
    { id: 'B-103', name: 'Yamuna Express', capacity: 10, status: 'Repair', sailsToday: 0, owner: 'City Rafting Co.' },
    { id: 'B-104', name: 'Rapid Runner', capacity: 6, status: 'Blocked', sailsToday: 0, owner: 'Unknown' },
];

export default function ManageBoats() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'All' | 'Active' | 'Repair'>('All');

    // Filter Logic
    const filteredBoats = BOATS.filter(b => {
        const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All' || b.status === filter;
        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status: string) => {
        if (status === 'Active') return Colors.success;
        if (status === 'Repair') return Colors.warning;
        return Colors.danger;
    };

    const renderItem = ({ item }: { item: typeof BOATS[0] }) => (
        <TouchableOpacity 
            style={styles.card} 
            onPress={() => router.push({
                pathname: '/(firm)/boat-details',
                params: { ...item } // Pass all data to details screen
            })}
            activeOpacity={0.7}
        >
            {/* Icon Box */}
            <View style={[styles.iconBox, { backgroundColor: item.status === 'Active' ? '#E0F2F1' : '#FEE2E2' }]}>
                <Ionicons name="boat" size={24} color={item.status === 'Active' ? Colors.primary : Colors.danger} />
            </View>

            {/* Info */}
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subText}>ID: #{item.id} • {item.capacity} Seater</Text>
            </View>

            {/* Status & Trips */}
            <View style={{ alignItems: 'flex-end' }}>
                <View style={[styles.badge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                    <Text style={[styles.badgeText, { color: getStatusColor(item.status) }]}>
                        {item.status}
                    </Text>
                </View>
                {item.status === 'Active' && (
                    <Text style={styles.tripsText}>{item.sailsToday}/3 Trips</Text>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={Colors.dark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Fleet Management</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color={Colors.gray} />
                <TextInput 
                    style={styles.input} 
                    placeholder="Search Boat Name or ID..." 
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {/* Filter Chips */}
            <View style={styles.filterRow}>
                {['All', 'Active', 'Repair'].map((f) => (
                    <TouchableOpacity 
                        key={f} 
                        style={[styles.chip, filter === f && styles.activeChip]}
                        onPress={() => setFilter(f as any)}
                    >
                        <Text style={[styles.chipText, filter === f && styles.activeChipText]}>{f}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* List */}
            <FlatList 
                data={filteredBoats}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: Colors.white },
    backBtn: { padding: 8 },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.dark },
    
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, margin: 20, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
    input: { flex: 1, marginLeft: 10, fontSize: 16 },

    filterRow: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16, gap: 10 },
    chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#E5E7EB' },
    activeChip: { backgroundColor: Colors.primary },
    chipText: { color: Colors.gray, fontWeight: '600' },
    activeChipText: { color: Colors.white },

    list: { paddingHorizontal: 20 },
    card: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, padding: 16, borderRadius: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
    iconBox: { width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    info: { flex: 1 },
    name: { fontSize: 16, fontWeight: 'bold', color: Colors.dark },
    subText: { fontSize: 12, color: Colors.gray, marginTop: 4 },
    badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 4 },
    badgeText: { fontSize: 10, fontWeight: 'bold' },
    tripsText: { fontSize: 12, color: Colors.gray }
});