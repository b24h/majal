import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/coupons";

export const getCoupons = () => axios.get(API_BASE);
export const getCoupon = (id) => axios.get(`${API_BASE}/${id}`);
export const createCoupon = (data) => axios.post(API_BASE, data);
export const updateCoupon = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteCoupon = (id) => axios.delete(`${API_BASE}/${id}`);
