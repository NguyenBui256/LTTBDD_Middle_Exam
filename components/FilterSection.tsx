import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface Props {
    filterStatus: string;
    onStatusChange: (value: string) => void;
    statusData: any[];
    sortBy: string;
    onSortChange: (value: string) => void;
    sortData: any[];
    minPrice: string;
    onMinPriceChange: (text: string) => void;
    maxPrice: string;
    onMaxPriceChange: (text: string) => void;
}

export const FilterSection: React.FC<Props> = ({
    filterStatus,
    onStatusChange,
    statusData,
    sortBy,
    onSortChange,
    sortData,
    minPrice,
    onMinPriceChange,
    maxPrice,
    onMaxPriceChange
}) => {
    return (
        <View style={styles.filterSection}>
            <View style={styles.dropdownRow}>
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>Trạng thái</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={statusData}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Chọn"
                        value={filterStatus}
                        onChange={item => onStatusChange(item.value)}
                    />
                </View>

                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>Sắp xếp</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={sortData}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Chọn"
                        value={sortBy}
                        onChange={item => onSortChange(item.value)}
                    />
                </View>
            </View>

            <View style={styles.priceFilterContainer}>
                <Text style={styles.label}>Khoảng giá (VND)</Text>
                <View style={styles.priceInputRow}>
                    <TextInput
                        style={styles.priceInput}
                        placeholder="Từ"
                        value={minPrice}
                        onChangeText={onMinPriceChange}
                        keyboardType="numeric"
                    />
                    <View style={styles.priceDivider} />
                    <TextInput
                        style={styles.priceInput}
                        placeholder="Đến"
                        value={maxPrice}
                        onChangeText={onMaxPriceChange}
                        keyboardType="numeric"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
});
