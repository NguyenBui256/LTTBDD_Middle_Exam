import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { RoomCard } from '../components/RoomCard';
import { HeaderSection } from '../components/HeaderSection';
import { FilterSection } from '../components/FilterSection';
import { getRooms, subscribe, deleteRoom, Room } from '../store/roomStore';
import { Ionicons } from '@expo/vector-icons';

const statusData = [
  { label: 'Tất cả', value: 'Tất cả' },
  { label: 'Còn trống', value: 'Còn trống' },
  { label: 'Đã thuê', value: 'Đã thuê' },
];

const sortData = [
  { label: 'Mặc định', value: 'Mặc định' },
  { label: 'Giá: Thấp đến Cao', value: 'Giá tăng' },
  { label: 'Giá: Cao đến Thấp', value: 'Giá giảm' },
];

export default function HomeScreen() {
  const [rooms, setRooms] = useState<Room[]>(getRooms());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('10000000');
  const [sortBy, setSortBy] = useState('Mặc định');
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = subscribe(setRooms);
    return unsubscribe;
  }, []);

  const filteredRooms = rooms
    .filter(room => {
      const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (room.tenantName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesStatus = filterStatus === 'Tất cả' || room.status === filterStatus;

      const minP = parseFloat(minPrice) || 0;
      const maxP = parseFloat(maxPrice) || Infinity;
      const matchesPrice = room.price >= minP && room.price <= maxP;

      return matchesSearch && matchesStatus && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'Giá tăng') return a.price - b.price;
      if (sortBy === 'Giá giảm') return b.price - a.price;
      return 0;
    });

  const handleDelete = (id: string) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa phòng này?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xóa', style: 'destructive', onPress: () => deleteRoom(id) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <HeaderSection
        title="Danh sách phòng"
        subtitle="Quản lý nhà trọ"
        onAddPress={() => router.push('/add-edit')}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showFilters={showFilters}
        onFilterToggle={() => setShowFilters(!showFilters)}
      >
        {showFilters && (
          <FilterSection
            filterStatus={filterStatus}
            onStatusChange={setFilterStatus}
            statusData={statusData}
            sortBy={sortBy}
            onSortChange={setSortBy}
            sortData={sortData}
            minPrice={minPrice}
            onMinPriceChange={setMinPrice}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
          />
        )}
      </HeaderSection>

      <FlatList
        data={filteredRooms}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <RoomCard
            room={item}
            onPress={() => router.push({ pathname: '/add-edit', params: { id: item.id } })}
            onLongPress={() => handleDelete(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="alert-circle-outline" size={48} color="#BDC3C7" />
            <Text style={styles.emptyText}>Không tìm thấy phòng nào phù hợp</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: '#2D3436',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerSubtitle: {
    color: '#BDC3CB',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 2,
  },
  addBtn: {
    backgroundColor: '#0984E3',
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchContainer: {
    flex: 1,
    marginRight: 10,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#2D3436',
  },
  filterToggleBtn: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 12,
  },
  filterToggleBtnActive: {
    backgroundColor: '#0984E3',
  },
  filterToggleText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#636E72',
  },
  filterToggleTextActive: {
    color: 'white',
  },
  filterSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    marginTop: 4,
  },
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dropdownContainer: {
    width: '48%',
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#BDC3CB',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  dropdown: {
    height: 38,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 13,
    color: '#636E72',
  },
  selectedTextStyle: {
    fontSize: 13,
    color: '#2D3436',
    fontWeight: '500',
  },
  priceFilterContainer: {
    marginTop: 0,
  },
  priceInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceInput: {
    flex: 1,
    height: 38,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 13,
    color: '#2D3436',
  },
  priceDivider: {
    width: 15,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 10,
  },
  listContent: {
    paddingVertical: 10,
    paddingBottom: 40,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#95A5A6',
    fontWeight: '500',
  },
});
