import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Room } from '../store/roomStore';

interface Props {
    room: Room;
    onPress: () => void;
    onLongPress: () => void;
}

export const RoomCard: React.FC<Props> = ({ room, onPress, onLongPress }) => {
    const isAvailable = room.status === 'Còn trống';

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleCall = () => {
        Linking.openURL(`tel:${room.ownerPhone}`);
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.8}
        >
            {room.images && room.images.length > 0 && (
                <Image
                    source={{ uri: room.images[0] }}
                    style={styles.mainImage}
                />
            )}

            <View style={styles.cardContent}>
                <View style={styles.header}>
                    <Text style={styles.name}>{room.name}</Text>
                    <View style={[styles.badge, { backgroundColor: isAvailable ? '#2ECC71' : '#E74C3C' }]}>
                        <Text style={styles.badgeText}>{room.status}</Text>
                    </View>
                </View>

                <View style={styles.priceRow}>
                    <Text style={styles.price}>{formatPrice(room.price)}</Text>
                </View>

                {room.status === 'Đã thuê' && (
                    <View style={styles.tenantSection}>
                        <View style={styles.divider} />
                        <View style={styles.tenantHeader}>
                            <Ionicons name="person-circle-outline" size={18} color="#636E72" />
                            <Text style={styles.tenantLabel}>Thông tin người thuê</Text>
                        </View>
                        <Text style={styles.detailText}>Tên: {room.tenantName}</Text>
                        <Text style={styles.detailText}>SĐT: {room.tenantPhone}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        marginVertical: 6,
        marginHorizontal: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    mainImage: {
        width: '100%',
        height: 120,
        backgroundColor: '#F1F2F6',
    },
    cardContent: {
        padding: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2D3436',
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0984E3',
    },
    tenantSection: {
        marginTop: 10,
        backgroundColor: '#F9FAFB',
        padding: 8,
        borderRadius: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#EBEEF1',
        marginBottom: 6,
    },
    tenantHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    tenantLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#636E72',
        marginLeft: 6,
        textTransform: 'uppercase',
    },
    detailText: {
        fontSize: 12,
        color: '#2D3436',
    },
});
