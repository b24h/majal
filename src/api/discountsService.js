import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/Discount";

const discountsService = {
  getDiscounts: () => axios.get(API_BASE),
  getDiscount: (id) => axios.get(`${API_BASE}/${id}`),
  createDiscount: (data) => axios.post(API_BASE, data),
  updateDiscount: (id, data) => axios.put(`${API_BASE}/${id}`, data),
  deleteDiscount: (id) => axios.delete(`${API_BASE}/${id}`)
};

export default discountsService;