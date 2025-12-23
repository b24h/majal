import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/Product";

export const  = () => axios.get(API_BASE);
export const  = (id) => axios.get(`${API_BASE}/${id}`);
export const createProduct = (data) => axios.post(API_BASE, data);
export const updateProduct = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_BASE}/${id}`);


const categoriesService = {
  getProducts: () => axios.get(API_BASE),
  getCategory: (id) => axios.get(`${API_BASE}/${id}`),
  createCategory: (data) => axios.post(API_BASE, data),
  updateCategory: (id, data) => axios.put(`${API_BASE}/${id}`, data),
  deleteCategory: (id) => axios.delete(`${API_BASE}/${id}`)
};

export default categoriesService;
