import api from "./api";

const authService = {
  login: async (data) => {
    const response = await api.post("/login", data);
    return response.data;
  },

  register: async (data) => {
    const response = await api.post("/register", data);
    return response.data;
  },

  getUser: async () => {
    const response = await api.get("/user");
    return response.data;
  },
};



export default authService;