import axios from "axios";

const API_BASE = import.meta.app.env.VITE_API_URL + "/Category";

const categoriesService = {
  getCategories: () => axios.get(API_BASE),
  getCategory: (id) => axios.get(`${API_BASE}/${id}`),
  createCategory: (data) => axios.post(API_BASE, data),
  updateCategory: (id, data) => axios.put(`${API_BASE}/${id}`, data),
  deleteCategory: (id) => axios.delete(`${API_BASE}/${id}`)
};

export default categoriesService;