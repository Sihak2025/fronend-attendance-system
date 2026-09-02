import api from "./api";

export const getTeachers = async() => {
    const response = await api.get('/teachers');
    return response.data.teachers;
}

export const getTeacherById = async (id) => {
    const response = await api.get(`/teachers/${id}`);
    return response.data;
}

export const createTeachers = async(teacherdata) => {
    const response = await api.post('/teachers', teacherdata);
    return response.data;
}

export const updateTeacher = async (id, teacherdata) => {
    const response = await api.put(`/teachers/${id}`, teacherdata);
    return response.data;
}

export const deleteTeacher = async (id) => {
    const response = await api.delete(`/teachers/${id}`);
    return response.data;
}