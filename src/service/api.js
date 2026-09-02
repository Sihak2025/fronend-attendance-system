/** @format */

import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Token ផុតកំណត់ ឬ invalid → clear session ទាំង token និង role
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login?expired=1';
      }
    }

    if (status === 403) {
      console.warn(
        'Forbidden:',
        error.response?.data?.message ||
          "You don't have permission to do this.",
      );
    }

    return Promise.reject(error);
  },
);

export const logout = async () => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
};

export default api;
