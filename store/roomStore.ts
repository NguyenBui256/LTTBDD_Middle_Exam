import { useState } from 'react';

export type RoomStatus = 'Còn trống' | 'Đã thuê';

export interface Room {
  id: string;
  name: string;
  price: number;
  status: RoomStatus;
  tenantName?: string;
  tenantPhone?: string;
  ownerPhone: string;
  description: string;
  images: string[];
}

const initialRooms: Room[] = [
  {
    id: 'P101',
    name: 'Phòng 101',
    price: 1500000,
    status: 'Còn trống',
    ownerPhone: '0912345678',
    description: 'Phòng rộng rãi, thoáng mát, có ban công riêng. Phù hợp cho 2 người ở.',
    images: ['https://picsum.photos/id/1/400/300', 'https://picsum.photos/id/10/400/300']
  },
  {
    id: 'P102',
    name: 'Phòng 102',
    price: 3500000,
    status: 'Đã thuê',
    tenantName: 'Nguyễn Văn A',
    tenantPhone: '0987654321',
    ownerPhone: '0912345678',
    description: 'Phòng full nội thất, điều hòa, tủ lạnh, máy giặt. Gần chợ và bến xe buýt.',
    images: ['https://picsum.photos/id/20/400/300']
  },
  {
    id: 'P201',
    name: 'Phòng 201',
    price: 5500000,
    status: 'Còn trống',
    ownerPhone: '0912345678',
    description: 'Căn hộ mini cao cấp, nội thất sang trọng. An ninh 24/7.',
    images: ['https://picsum.photos/id/30/400/300', 'https://picsum.photos/id/40/400/300']
  },
];

export const useRoomStore = () => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);

  const addRoom = (room: Room) => setRooms(prev => [...prev, room]);

  const updateRoom = (room: Room) => {
    setRooms(prev => prev.map(r => (r.id === room.id ? room : r)));
  };

  const deleteRoom = (id: string) => {
    setRooms(prev => prev.filter(r => r.id !== id));
  };

  return { rooms, addRoom, updateRoom, deleteRoom };
};

// Singleton-ish for simplicity in this demo
let sharedRooms: Room[] = initialRooms;
let listeners: Array<(rooms: Room[]) => void> = [];

export const getRooms = () => sharedRooms;
export const subscribe = (listener: (rooms: Room[]) => void) => {
  listeners.push(listener);
  return () => { listeners = listeners.filter(l => l !== listener); };
};

export const addRoom = (room: Room) => {
  sharedRooms = [...sharedRooms, room];
  listeners.forEach(l => l(sharedRooms));
};

export const updateRoom = (room: Room) => {
  sharedRooms = sharedRooms.map(r => r.id === room.id ? room : r);
  listeners.forEach(l => l(sharedRooms));
};

export const deleteRoom = (id: string) => {
  sharedRooms = sharedRooms.filter(r => r.id !== id);
  listeners.forEach(l => l(sharedRooms));
};
