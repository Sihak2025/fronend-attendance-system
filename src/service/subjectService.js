import api from "./api";

export const getSubjects = async() => {
    const response = await api.get('/subjects');
    return response.data.subjects;
}

export const getSubjectbyId = async (id) => {
    const response = await api.get(`/subjects/${id}`);
    return response.data;
}

export const createSubject = async(subjectdata) => {
    const response = await api.post('/subjects', subjectdata);
    return response.data;
}

export const updateSubject = async(id, subjectdata) => {
    const response = await api.put(`/subjects/${id}`, subjectdata);
    return response.data;
}

export const deleteSubject = async (id) => {
    const response = await api.delete(`/subjects/${id}`);
    return response.data;
}