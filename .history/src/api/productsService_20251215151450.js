import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/Product";

const productsService = {
  getProducts: () => axios.get(API_BASE),
  getProduct: (id) => axios.get(`${API_BASE}/${id}`),
  createProduct: (data) => axios.post(API_BASE, data),
  updateProduct: (id, data) => axios.put(`${API_BASE}/${id}`, data),
  deleteProduct: (id) => axios.delete(`${API_BASE}/${id}`)
};

export default productsService;