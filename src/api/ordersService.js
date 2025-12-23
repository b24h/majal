import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/Order";

const ordersService = {
  getOrders: () => axios.get(API_BASE),
  getOrder: (id) => axios.get(`${API_BASE}/${id}`),
  createOrder: (data) => axios.post(API_BASE, data),
  updateOrder: (id, data) => axios.put(`${API_BASE}/${id}`, data),
  deleteOrder: (id) => axios.delete(`${API_BASE}/${id}`)
};

export default ordersService;