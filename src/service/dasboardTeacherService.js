/** @format */

import api from './api';

export const getDashboardData = async () => {
  const response = await api.get('/teacher/dashboard');
  return response.data;
};