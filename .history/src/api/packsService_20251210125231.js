import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/packs";

export const getPacks = () => axios.get(API_BASE);
export const getPack = (id) => axios.get(`${API_BASE}/${id}`);
export const createPack = (data) => axios.post(API_BASE, data);
export const updatePack = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deletePack = (id) => axios.delete(`${API_BASE}/${id}`);
