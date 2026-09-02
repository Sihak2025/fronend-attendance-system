import api from "./api";

export const getBuildings = async() => {
    const response = await api.get('/buildings'); 
    return response.data.buildings;
};

export const getBuildingById = async (id) => {
    const response = await api.get(`/buildings/${id}`)
    return response.data
}

export const createBuildings = async(buildingdata) => {
    const response = await api.post('/buildings', buildingdata);
    return response.data;
}

export const updateBuildings = async(id, buildingdata) => {
    const response = await api.put(`/buildings/${id}`, buildingdata);
    return response.data;
}

export const deleteBuildings = async(id) => {
    const response = await api.delete(`/buildings/${id}`);
    return response.data;
}