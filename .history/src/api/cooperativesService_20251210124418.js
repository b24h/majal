import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL + "/cooperatives";

export const getCooperatives = () => axios