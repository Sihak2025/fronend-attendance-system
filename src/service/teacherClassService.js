/** @format */

import api from './api';

export const getMyClasses = async () => {
  const response = await api.get('/teacher/classes');
  return response.data.teacher_classes || response.data;
};

export const getTeacherClassById = async (id) => {
  const response = await api.get(`/teacherClasses/${id}`);
  return response.data;
};

export const createTeacherClass = async (teacherClassdata) => {
  const response = await api.post('/teacherClasses', teacherClassdata);
  return response.data;
};

export const updateTeacherClass = async (id, teacherClassdata) => {
  const response = await api.put(`/teacherClasses/${id}`, teacherClassdata);
  return response.data;
};

export const deleteTeacherClass = async (id) => {
  const response = await api.delete(`/teacherClasses/${id}`);
  return response.data;
};
