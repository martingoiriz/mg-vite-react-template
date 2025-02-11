import axios from "axios";
import { localStorageRemove } from "Utils";

// const BASE_URL = "https://swapi.dev/api/";
const BASE_URL = "http://localhost:8000/orbit/api/";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorageRemove("userData");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
