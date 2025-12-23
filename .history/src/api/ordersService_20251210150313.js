import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/Order";

export const  = () => axios.get(API_BASE);
export const  = (id) => axios.get(`${API_BASE}/${id}`);
export const  = (data) => axios.post(API_BASE, data);
export const  = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const  = (id) => axios.delete(`${API_BASE}/${id}`);

const ordersService = {
  getOrders: () => axios.get(API_BASE),
  getOrder: (id) => axios.get(`${API_BASE}/${id}`),
  createOrder: (data) => axios.post(API_BASE, data),
  updateOrder: (id, data) => axios.put(`${API_BASE}/${id}`, data),
  deleteOrder: (id) => axios.delete(`${API_BASE}/${id}`)
};

export default ordersService;