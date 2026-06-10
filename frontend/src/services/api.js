import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api/v1",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.assign("/");
    }

    return Promise.reject(error);
  }
);

export default API;
