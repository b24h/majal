import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL + "/Cooperative";

export const  = () => axios.get(API_BASE);
export const  = (id) => axios.get(`${API_BASE}/${id}`);
export const  = (data) => axios.post(API_BASE, data);
export const  = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const  = (id) => axios.delete(`${API_BASE}/${id}`);


const categoriesService = {
  getCooperatives: () => axios.get(API_BASE),
  getCooperative: (id) => axios.get(`${API_BASE}/${id}`),
  createCooperative: (data) => axios.post(API_BASE, data),
  updateCooperative: (id, data) => axios.put(`${API_BASE}/${id}`, data),
  deleteCooperative: (id) => axios.delete(`${API_BASE}/${id}`)
};

export default categoriesService;