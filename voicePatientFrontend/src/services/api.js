import axios from "axios";

const API_BASE_URL = "http://192.168.73.1:8000"; // backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default api;
