// src/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // This is important for handling cookies if needed
});

// Add request interceptor to include JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: (data: { email: string; password: string }) => api.post("/auth/login", data),
  register: (data: { firstName: string; lastName: string; email: string; password: string }) =>
    api.post("/auth/register", data),
};

export const opportunities = {
  getAll: () => api.get("/opportunities"),
  getOne: (id: number) => api.get(`/opportunities/${id}`),
  create: (data: any) => api.post("/opportunities", data),
  update: (id: number, data: any) => api.patch(`/opportunities/${id}`, data),
  delete: (id: number) => api.delete(`/opportunities/${id}`),
};

export default api;
