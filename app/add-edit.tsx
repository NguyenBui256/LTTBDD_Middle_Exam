import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Switch,
    Alert,
    Image,
    FlatList
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { getRooms, addRoom, updateRoom, Room } from '../store/roomStore';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Linking from 'expo-linking';

export default function AddEditScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const editingRoom = id ? getRooms().find(r => r.id === id) : null;

    const [roomId, setRoomId] = useState(editingRoom?.id ?? '');
    const [name, setName] = useState(editingRoom?.name ?? '');
    const [price, setPrice] = useState(editingRoom?.price.toString() ?? '');
    const [isRented, setIsRented] = useState(editingRoom?.status === 'Đã thuê');
    const [tenantName, setTenantName] = useState(editingRoom?.tenantName ?? '');
    const [tenantPhone, setTenantPhone] = useState(editingRoom?.tenantPhone ?? '');
    const [ownerPhone, setOwnerPhone] = useState(editingRoom?.ownerPhone ?? '');
    const [description, setDescription] = useState(editingRoom?.description ?? '');
    const [images, setImages] = useState<string[]>(editingRoom?.images ?? []);

    const handleCallTenant = () => {
        if (tenantPhone.trim()) {
            Linking.openURL(`tel:${tenantPhone}`);
        } else {
            Alert.alert('Thông báo', 'Không có số điện thoại người thuê');
        }
    };

    const pickImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            quality: 0.8,
        });

        if (!result.canceled) {
            const newImages = result.assets.map(asset => asset.uri);
            setImages([...images, ...newImages]);
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const handleSave = () => {
        if (!roomId.trim() || !name.trim() || !price.trim() || !ownerPhone.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin bắt buộc');
            return;
        }

        if (isRented && (!tenantName.trim() || !tenantPhone.trim())) {
            Alert.alert('Lỗi', 'Vui lòng nhập thông tin người thuê');
            return;
        }

        const room: Room = {
            id: roomId,
            name,
            price: parseFloat(price) || 0,
            status: isRented ? 'Đã thuê' : 'Còn trống',
            tenantName: isRented ? tenantName : undefined,
            tenantPhone: isRented ? tenantPhone : undefined,
            ownerPhone,
            description,
            images,
        };

        if (editingRoom) {
            updateRoom(room);
            router.back();
        } else {
            if (getRooms().some(r => r.id === roomId)) {
                Alert.alert('Lỗi', 'Mã phòng đã tồn tại');
                return;
            }
            addRoom(room);
            router.back();
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: editingRoom ? 'Sửa phòng trọ' : 'Thêm phòng trọ',
                    headerStyle: { backgroundColor: '#2D3436' },
                    headerTintColor: 'white',
                    headerShadowVisible: false,
                }}
            />

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mã phòng *</Text>
                        <TextInput
                            style={[styles.input, editingRoom && styles.disabledInput]}
                            value={roomId}
                            onChangeText={setRoomId}
                            editable={!editingRoom}
                            placeholder="Ví dụ: P101"
                            autoCapitalize="characters"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Tên phòng *</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Ví dụ: Phòng 101"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Giá thuê (VND) *</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={setPrice}
                            keyboardType="numeric"
                            placeholder="Ví dụ: 1500000"
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Chi tiết & Liên hệ</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Số điện thoại chủ nhà *</Text>
                        <TextInput
                            style={styles.input}
                            value={ownerPhone}
                            onChangeText={setOwnerPhone}
                            keyboardType="phone-pad"
                            placeholder="Nhập SĐT để khách gọi"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mô tả phòng</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Nhập mô tả chi tiết về phòng..."
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitle}>Hình ảnh phòng</Text>
                        <Text style={styles.imageCount}>{images.length}/10</Text>
                    </View>
                    <Text style={styles.imageTip}>Nên tải lên ít nhất 3 ảnh để phòng dễ cho thuê hơn.</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
                        {images.map((uri, index) => (
                            <View key={index} style={styles.imageWrapper}>
                                <Image source={{ uri }} style={styles.imagePreview} />
                                <TouchableOpacity style={styles.removeImgBtn} onPress={() => removeImage(index)}>
                                    <Ionicons name="close-circle" size={24} color="#FF7675" />
                                </TouchableOpacity>
                            </View>
                        ))}
                        {images.length < 10 && (
                            <TouchableOpacity style={styles.addImageBtn} onPress={pickImages}>
                                <Ionicons name="camera-outline" size={32} color="#0984E3" />
                                <Text style={styles.addImageText}>Thêm ảnh</Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <View style={styles.switchGroup}>
                        <View>
                            <Text style={styles.label}>Trạng thái thuê</Text>
                            <Text style={styles.switchSub}>{isRented ? 'Đã có người thuê' : 'Đang còn trống'}</Text>
                        </View>
                        <Switch
                            value={isRented}
                            onValueChange={setIsRented}
                            trackColor={{ false: '#DFE6E9', true: '#0984E3' }}
                            thumbColor="white"
                        />
                    </View>

                    {isRented && (
                        <View style={styles.tenantContainer}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Tên người thuê *</Text>
                                <TextInput
                                    style={styles.input}
                                    value={tenantName}
                                    onChangeText={setTenantName}
                                    placeholder="Ví dụ: Nguyễn Văn A"
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Số điện thoại người thuê *</Text>
                                <TextInput
                                    style={styles.input}
                                    value={tenantPhone}
                                    onChangeText={setTenantPhone}
                                    keyboardType="phone-pad"
                                    placeholder="Ví dụ: 0987654321"
                                />
                            </View>

                            <TouchableOpacity style={styles.callTenantBtn} onPress={handleCallTenant}>
                                <Ionicons name="call" size={20} color="white" />
                                <Text style={styles.callTenantBtnText}>Gọi cho người thuê</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveBtnText}>Lưu thông tin</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}