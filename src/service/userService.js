/** @format */

import api from './api';

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data.users;
};

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
export const updateUser = async (id, userdata) => {
  const response = await api.put(`/users/${id}`, userdata);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
