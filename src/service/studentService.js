/** @format */

import api from './api';

export const getStudents = async () => {
  const response = await api.get('/students');
  return response.data.students;
};

export const getStudentById = async (id) => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

export const createStudent = async (studentdata) => {
  const formData = new FormData();

  for (const key in studentdata) {
    const value = studentdata[key];

    if (key === 'image') {
      if (value instanceof File) {
        formData.append('image', value);
      }
    } else {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    }
  }
  const response = await api.post('/students', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateStudent = async (id, studentdata) => {
  const formData = new FormData();

  for (const key in studentdata) {
    const value = studentdata[key];

    if (key === 'image') {
      if (value instanceof File) {
        formData.append('image', value);
      }
    } else {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    }
  }
  formData.append('_method', 'PUT');
  const response = await api.post(`/students/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
};
