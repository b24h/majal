import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL + "/cooperatives";

export const getCooperatives = () => axios.get(API_BASE);
export const getCooperative = (id) => axios.get(`${}`)