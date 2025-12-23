import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/Pack";


const ordersService = {
  getPacks: () => axios.get(API_BASE),
  getPack: (id) => axios.get(`${API_BASE}/${id}`),
  createPack: (data) => axios.post(API_BASE, data),
  updatePack: (id, data) => axios.put(`${API_BASE}/${id}`, data),
  deletePack: (id) => axios.delete(`${API_BASE}/${id}`)
};

export default ordersService;