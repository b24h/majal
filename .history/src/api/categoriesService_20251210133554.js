import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL + "/Category";

export default const categoriesService = {
    getCategories
}



export const getCategorories = () => axios.get(API_BASE);
export const getCategory = (id) => axios.get(`${API_BASE}/${id}`);
export const createCategory = (data) => axios.post(API_BASE, data);
export const updateCategory = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteCategory = (id) => axios.delete('${API_BASE}/${id}');