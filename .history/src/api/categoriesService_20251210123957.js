import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL + "/categories";

export const getCategorories = () => axios.get(API_BASE);
export const getCategory = (id) => axios.get(`${API_BASE}/${id}`);
export const createCategory (data) => axios.post(API_BASE, data);
export const update