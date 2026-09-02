import api from "./api";

export const getAttendances = async() => {
    const response = await api.get('/attendances');
    return response.data.attendances;
}

export const getAttendanceById = async(id) => {
    const response = await api.get(`/attendances/${id}`);
    return response.data;
}

export const createAttendance = async(attendancedata) => {
    const response = await api.post('/attendances', attendancedata);
    return response.data;
}

export const updateAttendance = async (id, attendancedata) => {
    const response = await api.put(`/attendances/${id}`, attendancedata)
    return response.data;
}

export const deleteAttendance = async (id) => {
    const response = await api.delete(`/attendances/${id}`);
    return response.data;
}