import api from "./api";

export const getRooms = async () => {
    const response = await api.get('/rooms');
    return response.data.rooms;
}

export const getRoomById = async (id) => {
    const response = await api.get(`/rooms/${id}`);
    return response.data; 
}

export const createRoom = async (roomdata) => {
    const response = await api.post('/rooms', roomdata);
    return response.data;
}

export const updateRooms = async (id, roomdata) => {
    const response = await api.put(`/rooms/${id}`, roomdata);
    return response.data;
}

export const deleteRoom = async(id) => {
    const response = await api.delete(`/rooms/${id}`);
    return response.data;
}