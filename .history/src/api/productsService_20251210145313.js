import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/Product";

export const getProducts = () => axios.get(API_BASE);
export const getProduct = (id) => axios.get(`${API_BASE}/${id}`);
export const createProduct = (data) => axios.post(API_BASE, data);
export const updateProduct = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_BASE}/${id}`);

import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL + "/Category";

const categoriesService = {
  getCategories: () => axios.get(API_BASE),
  getCategory: (id) => axios.get(`${API_BASE}/${id}`),
  createCategory: (data) => axios.post(API_BASE, data),
  updateCategory: (id, data) => axios.put(`${API_BASE}/${id}`, data),
  deleteCategory: (id) => axios.delete(`${API_BASE}/${id}`)
};

export default categoriesService;
