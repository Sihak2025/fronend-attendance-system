import api from "./api";

export const getdashboardAdmin = async() => {
    const response = await api.get('/dashboardAdmin');
    return response.data;
}