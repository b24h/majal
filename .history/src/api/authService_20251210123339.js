import axios from "axios";

const API_Base = import.meta.env.VITE_API_URL + "/auth";

export const login = (credentials) => axios.post(`$(API_BASE)/login`, credentials)