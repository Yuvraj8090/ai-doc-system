import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dummy Data with assigned boats
const DRIVERS = [
    { id: 'D01', name: 'Ramesh Kumar', license: 'UK07-202201', phone: '9876543210', status: 'Active', currentBoat: 'Ganga Rider 1' },
    { id: 'D02', name: 'Suresh Singh', license: 'UK07-202305', phone: '9123456789', status: 'Active', currentBoat: 'Yamuna Express' },
    { id: 'D03', name: 'Amit Verma', license: 'UK07-PENDING', phone: '8899776655', status: 'Pending', currentBoat: null },
    { id: 'D04', name: 'Rahul Sharma', license: 'UK07-202199', phone: '7766554433', status: 'Blocked', currentBoat: null },
];

export default function ManageDrivers() {
    const router = useRouter();
    const [search, setSearch] = useState('');

    // Filter Logic
    const filteredDrivers = DRIVERS.filter(d => 
        d.name.toLowerCase().includes(search.toLowerCase()) || 
        d.license.toLowerCase().includes(search.toLowerCase()) ||
        d.phone.includes(search)
    );

    const renderItem = ({ item }: { item: typeof DRIVERS[0] }) => (
        <TouchableOpacity 
            style={styles.card} 
            onPress={() => router.push({
                pathname: '/(firm)/driver-details',
                params: { ...item } // Pass all driver data to profile
            })}
        >
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.license}>Lic: {item.license}</Text>
                <Text style={styles.phone}>📞 {item.phone}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <View style={[styles.badge, { backgroundColor: item.status === 'Active' ? '#D1FAE5' : '#FEE2E2' }]}>
                    <Text style={{ color: item.status === 'Active' ? 'green' : 'red', fontSize: 10, fontWeight: 'bold' }}>
                        {item.status}
                    </Text>
                </View>
                {/* Show assigned boat icon if active */}
                {item.currentBoat && (
                    <View style={styles.boatTag}>
                        <Ionicons name="boat" size={12} color="#06BBCC" />
                        <Text style={styles.boatName}>{item.currentBoat}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>Drivers Directory</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#9CA3AF" />
                <TextInput 
                    style={styles.searchInput} 
                    placeholder="Search Name, License, Phone..." 
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <FlatList 
                data={filteredDrivers}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFB' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: 'white' },
    title: { fontSize: 18, fontWeight: 'bold' },
    
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', margin: 20, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
    searchInput: { marginLeft: 10, flex: 1, fontSize: 16 },

    list: { paddingHorizontal: 20 },
    card: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 16, borderRadius: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, elevation: 1 },
    avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E0E7FF', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    avatarText: { fontSize: 20, fontWeight: 'bold', color: '#4F46E5' },
    info: { flex: 1 },
    name: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
    license: { fontSize: 12, color: '#6B7280', marginTop: 2 },
    phone: { fontSize: 12, color: '#6B7280', marginTop: 2 },
    
    badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 6 },
    boatTag: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#E0F7FA', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    boatName: { fontSize: 10, color: '#006064', fontWeight: '600' }
});