import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/Product";
import productsService from './../../.history/src/api/productsService_20251210145140';

export const  = () => axios.get(API_BASE);
export const  = (id) => axios.get(`${API_BASE}/${id}`);
export const  = (data) => axios.post(API_BASE, data);
export const  = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const  = (id) => axios.delete(`${API_BASE}/${id}`);


const productsService = {
  getProducts: () => axios.get(API_BASE),
  getProduct: (id) => axios.get(`${API_BASE}/${id}`),
  createProduct: (data) => axios.post(API_BASE, data),
  updateProduct: (id, data) => axios.put(`${API_BASE}/${id}`, data),
  deleteProduct: (id) => axios.delete(`${API_BASE}/${id}`)
};

export default products;
