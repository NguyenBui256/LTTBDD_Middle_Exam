import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    title: string;
    subtitle: string;
    onAddPress: () => void;
    searchQuery: string;
    onSearchChange: (text: string) => void;
    showFilters: boolean;
    onFilterToggle: () => void;
    children?: React.ReactNode;
}

export const HeaderSection: React.FC<Props> = ({
    title,
    subtitle,
    onAddPress,
    searchQuery,
    onSearchChange,
    showFilters,
    onFilterToggle,
    children
}) => {
    return (
        <View style={styles.header}>
            <View style={styles.headerTop}>
                <View>
                    <Text style={styles.headerSubtitle}>{subtitle}</Text>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <TouchableOpacity style={styles.addBtn} onPress={onAddPress}>
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchSection}>
                <View style={styles.searchContainer}>
                    <View style={styles.searchInputWrapper}>
                        <Ionicons name="search" size={18} color="#636E72" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Tìm theo tên phòng, người thuê..."
                            value={searchQuery}
                            onChangeText={onSearchChange}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.filterToggleBtn, showFilters && styles.filterToggleBtnActive]}
                    onPress={onFilterToggle}
                >
                    <Ionicons name="options-outline" size={22} color={showFilters ? 'white' : '#636E72'} />
                    <Text style={[styles.filterToggleText, showFilters && styles.filterToggleTextActive]}>Bộ lọc</Text>
                </TouchableOpacity>
            </View>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
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
});
