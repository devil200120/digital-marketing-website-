// src/api/axios.js
import axios from "axios";
import config from "../../config";

const api = axios.create({
  baseURL: config.apiUrl,
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default api;
