import api from "./api";

export const getSchedules = async() => {
    const response = await api.get('/schedules');
    return response.data.schedules;
}

export const getScheduleById = async(id) => {
    const response = await api.get(`/schedules/${id}`);
    return response.data;
}

export const createSchedule = async(scheduledata) => {
    const response = await api.post('/schedules', scheduledata);
    return response.data;
}

export const updateSchedule = async(id, scheduledata) => {
    const response = await api.put(`/schedules/${id}`, scheduledata);
    return response.data;
}

export const deleteSchedule = async(id) => {
    const response = await api.delete(`/schedules/${id}`);
    return response.data;
}