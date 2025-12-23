import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL + "/Cooperative";

export const getCooperatives = () => axios.get(API_BASE);
export const getCooperative = (id) => axios.get(`${API_BASE}/${id}`);
export const createCooperative = (data) => axios.post(API_BASE, data);
export const updateCooperative = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteCooperative = (id) => axios.delete(`${API_BASE}/${id}`);


const categoriesService = {
  getCategories: () => axios.get(API_BASE),
  getCategory: (id) => axios.get(`${API_BASE}/${id}`),
  createCategory: (data) => axios.post(API_BASE, data),
  updateCategory: (id, data) => axios.put(`${API_BASE}/${id}`, data),
  deleteCategory: (id) => axios.delete(`${API_BASE}/${id}`)
};

export default categoriesService;