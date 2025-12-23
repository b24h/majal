import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/Pack";

export const  = () => axios.get(API_BASE);
export const  = (id) => axios.get(`${API_BASE}/${id}`);
export const  = (data) => axios.post(API_BASE, data);
export const updatePack = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deletePack = (id) => axios.delete(`${API_BASE}/${id}`);

const ordersService = {
  getPacks: () => axios.get(API_BASE),
  getPack: (id) => axios.get(`${API_BASE}/${id}`),
  createOrder: (data) => axios.post(API_BASE, data),
  updateOrder: (id, data) => axios.put(`${API_BASE}/${id}`, data),
  deleteOrder: (id) => axios.delete(`${API_BASE}/${id}`)
};

export default ordersService;