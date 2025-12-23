import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/Discount";

export const  = () => axios.get(API_BASE);
export const  = (id) => axios.get(`${API_BASE}/${id}`);
export const  = (data) => axios.post(API_BASE, data);
export const updateDiscount = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteDiscount = (id) => axios.delete(`${API_BASE}/${id}`);


const discountsService = {
  getDiscounts: () => axios.get(API_BASE),
  getDiscount: (id) => axios.get(`${API_BASE}/${id}`),
  createCoupon: (data) => axios.post(API_BASE, data),
  updateCoupon: (id, data) => axios.put(`${API_BASE}/${id}`, data),
  deleteCoupon: (id) => axios.delete(`${API_BASE}/${id}`)
};

export default discountsService;