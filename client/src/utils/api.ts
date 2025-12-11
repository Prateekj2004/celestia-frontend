import axios from "axios";

export const api = axios.create({
  baseURL: "https://celestia-backend-q1s2.onrender.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// Auto insert JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
