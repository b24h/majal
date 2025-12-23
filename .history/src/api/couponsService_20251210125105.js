1️⃣ authService.js
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/auth";

export const login = (credentials) => axios.post(`${API_BASE}/login`, credentials);
export const register = (data) => axios.post(`${API_BASE}/register`, data);
export const logout = () => axios.post(`${API_BASE}/logout`);
export const getProfile = () => axios.get(`${API_BASE}/me`);

2️⃣ categoriesService.js
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/categories";

export const getCategories = () => axios.get(API_BASE);
export const getCategory = (id) => axios.get(`${API_BASE}/${id}`);
export const createCategory = (data) => axios.post(API_BASE, data);
export const updateCategory = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteCategory = (id) => axios.delete(`${API_BASE}/${id}`);

3️⃣ cooperativesService.js
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/cooperatives";

export const getCooperatives = () => axios.get(API_BASE);
export const getCooperative = (id) => axios.get(`${API_BASE}/${id}`);
export const createCooperative = (data) => axios.post(API_BASE, data);
export const updateCooperative = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteCooperative = (id) => axios.delete(`${API_BASE}/${id}`);

4️⃣ couponsService.js
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/coupons";

export const getCoupons = () => axios.get(API_BASE);
export const getCoupon = (id) => axios.get(`${API_BASE}/${id}`);
export const createCoupon = (data) => axios.post(API_BASE, data);
export const updateCoupon = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteCoupon = (id) => axios.delete(`${API_BASE}/${id}`);

5️⃣ discountsService.js
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/discounts";

export const getDiscounts = () => axios.get(API_BASE);
export const getDiscount = (id) => axios.get(`${API_BASE}/${id}`);
export const createDiscount = (data) => axios.post(API_BASE, data);
export const updateDiscount = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteDiscount = (id) => axios.delete(`${API_BASE}/${id}`);

6️⃣ ordersService.js
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/orders";

export const getOrders = () => axios.get(API_BASE);
export const getOrder = (id) => axios.get(`${API_BASE}/${id}`);
export const createOrder = (data) => axios.post(API_BASE, data);
export const updateOrder = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteOrder = (id) => axios.delete(`${API_BASE}/${id}`);

7️⃣ packsService.js
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/packs";

export const getPacks = () => axios.get(API_BASE);
export const getPack = (id) => axios.get(`${API_BASE}/${id}`);
export const createPack = (data) => axios.post(API_BASE, data);
export const updatePack = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deletePack = (id) => axios.delete(`${API_BASE}/${id}`);

8️⃣ productsService.js
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL + "/products";

export const getProducts = () => axios.get(API_BASE);
export const getProduct = (id) => axios.get(`${API_BASE}/${id}`);
export const createProduct = (data) => axios.post(API_BASE, data);
export const updateProduct = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_BASE}/${id}`);