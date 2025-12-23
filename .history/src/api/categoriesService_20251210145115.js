import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL + "/Category";

const categoriesService = {
  getAll: () => axios.get(API_BASE),
  getOne: (id) => axios.get(`${API_BASE}/${id}`),
  create: (data) => axios.post(API_BASE, data),
  update: (id, data) => axios.put(`${API_BASE}/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE}/${id}`),
};

export default categoriesService;
