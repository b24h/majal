import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/Coupon";

export const  = () => axios.get(API_BASE);
export const  = (id) => axios.get(`${API_BASE}/${id}`);
export const  = (data) => axios.post(API_BASE, data);
export const updateCoupon = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteCoupon = (id) => axios.delete(`${API_BASE}/${id}`);

const couponsService = {
  getCoupons: () => axios.get(API_BASE),
  getCoupon: (id) => axios.get(`${API_BASE}/${id}`),
  createCoupon: (data) => axios.post(API_BASE, data),
  updateCooperative: (id, data) => axios.put(`${API_BASE}/${id}`, data),
  deleteCooperative: (id) => axios.delete(`${API_BASE}/${id}`)
};

export default couponsService;