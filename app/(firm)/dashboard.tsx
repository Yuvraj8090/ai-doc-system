import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Colors } from '../../constants/Colors';

// FIX: Import SafeAreaView from this special library to handle the Notch properly
import { SafeAreaView } from 'react-native-safe-area-context';

const DUMMY_BOATS = [
  { id: '101', name: 'Ganga Rider 1', capacity: 6, sails: 0, status: 'Active' },
  { id: '102', name: 'Ganga Rider 2', capacity: 8, sails: 1, status: 'Active' },
  { id: '103', name: 'Ganga Rider 3', capacity: 6, sails: 2, status: 'Active' },
  { id: '104', name: 'Ganga Rider 4', capacity: 8, sails: 3, status: 'Active' },
  { id: '105', name: 'Ganga Rider 5', capacity: 6, sails: 0, status: 'Repair' },
];

export default function Dashboard() {
  const router = useRouter();
  
  const getStatusColor = (sails: number, status: string) => {
    if (status !== 'Active') return '#95a5a6';
    if (sails >= 3) return Colors.danger;
    if (sails === 2) return Colors.secondary;
    if (sails === 1) return '#f1c40f';
    return Colors.white;
  };

  const handleBoatPress = (boat: any) => {
    if (boat.sails >= 3) {
      alert('🚫 This boat has completed 3 trips. Sail not allowed.');
      return;
    }
    if (boat.status !== 'Active') {
      alert('⚠️ This boat is under repair.');
      return;
    }
    router.push({
      pathname: '/(firm)/generate-qr',
      params: { boatId: boat.id, boatName: boat.name }
    });
  };

  const renderBoatCard = ({ item }: { item: any }) => {
    const cardColor = getStatusColor(item.sails, item.status);
    const isDarkBg = item.sails >= 2;

    return (
      <TouchableOpacity 
        style={[styles.card, { backgroundColor: cardColor, borderColor: item.sails === 0 ? '#ddd' : cardColor }]}
        onPress={() => handleBoatPress(item)}
        activeOpacity={0.8}
      >
        <View style={styles.cardHeader}>
          <Text style={[styles.boatId, { color: isDarkBg ? '#fff' : '#333' }]}>#{item.id}</Text>
          {item.sails >= 3 && <Ionicons name="lock-closed" size={16} color="#fff" />}
        </View>
        <Text style={[styles.boatName, { color: isDarkBg ? '#fff' : '#333' }]}>{item.name}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.pill}>
            <Ionicons name="people" size={12} color="#555" />
            <Text style={styles.pillText}>{item.capacity}</Text>
          </View>
          <View style={[styles.pill, { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
            <Text style={[styles.pillText, { fontWeight: 'bold' }]}>
              {item.sails}/3 Trips
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    // SafeAreaView automatically adds padding for the Notch
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar hidden={true} /> 
      
      {/* 1. TOP HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.firmName}>Himalayan Rafting Co.</Text>
          <View style={styles.statusBadge}>
            <View style={styles.dot} />
            <Text style={styles.statusText}>License Valid: Dec 2026</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={() => router.replace('/(auth)/login')}>
           <Ionicons name="log-out-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* 2. STATS SUMMARY */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Total Boats</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: Colors.success }]}>4</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: Colors.danger }]}>1</Text>
          <Text style={styles.statLabel}>Blocked</Text>
        </View>
      </View>

      {/* 3. BOAT GRID */}
      <Text style={styles.sectionTitle}>Select Boat to Sail</Text>
      <FlatList
        data={DUMMY_BOATS}
        renderItem={renderBoatCard}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    // We remove the manual marginTop because SafeAreaView handles it now
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  firmName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '600',
  },
  profileButton: {
    padding: 8,
    backgroundColor: '#F0F4FF',
    borderRadius: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  statBox: {
    backgroundColor: '#fff',
    width: '30%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 8,
  },
  gridList: {
    padding: 12,
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 16,
    height: 140,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boatId: {
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  boatName: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pillText: {
    fontSize: 12,
    marginLeft: 4,
    color: '#333',
  },
});