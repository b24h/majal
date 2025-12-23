import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/Discount";

export const getDiscounts = () => axios.get(API_BASE);
export const getDiscount = (id) => axios.get(`${API_BASE}/${id}`);
export const createDiscount = (data) => axios.post(API_BASE, data);
export const updateDiscount = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteDiscount = (id) => axios.delete(`${API_BASE}/${id}`);
