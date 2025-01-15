import axios from "axios";

// const BASE_URL = "https://swapi.dev/api/";
const BASE_URL = "http://localhost:8000/";

export const getCharacters = async () => {
  const { data } = await axios.get(`${BASE_URL}people/1`);
  return data;
};

export const loginUser = async (body: { email: string; password: string }) => {
  const { data } = await axios.post(`${BASE_URL}orbit/api/login`, body);
  return data;
};

export const signUpUser = async (body: { name: string; email: string; password: string }) => {
  const { data } = await axios.post(`${BASE_URL}orbit/api/signup`, body);
  return data;
};

export const recoverAccount = async (body: { email: string }) => {
  const { data } = await axios.post(`${BASE_URL}orbit/api/recover`, body);
  return data;
};
