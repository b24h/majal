import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/Order";

export const getOrders = () => axios.get(API_BASE);
export const getOrder = (id) => axios.get(`${API_BASE}/${id}`);
export const createOrder = (data) => axios.post(API_BASE, data);
export const updateOrder = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteOrder = (id) => axios.delete(`${API_BASE}/${id}`);
