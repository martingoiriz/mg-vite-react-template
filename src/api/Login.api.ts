import axios from "axios";
import { localStorageRemove } from "utils";

// const BASE_URL = "https://swapi.dev/api/";
const BASE_URL = "http://localhost:8000/orbit/api/";

const api = axios.create({
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

export const getCharacters = async () => {
  const { data } = await api.get("people/1");
  return data;
};

export const loginUser = async (body: { email: string; password: string }) => {
  const { data } = await api.post("login", body);
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post("logout");
  return data;
};

export const signUpUser = async (body: {
  name: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const { data } = await api.post("signup", body);
  return data;
};

export const recoverAccount = async (body: { email: string }) => {
  const { data } = await api.get("reset-password", {
    params: {
      email: body.email,
    },
  });
  return data;
};

export const resetPassword = async (body: { email: string; password: string; token: string }) => {
  const { data } = await api.post("reset-password", body);
  return data;
};

export const random = async () => {
  const { data } = await api.get("random/abcd");
  return data;
};
