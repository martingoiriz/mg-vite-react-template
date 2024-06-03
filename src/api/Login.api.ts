import axios from "axios";

// const BASE_URL = "https://swapi.dev/api/";
const BASE_URL = "http://localhost:8000/";

export const getCharacters = async () => {
  const { data } = await axios.get(`${BASE_URL}people/1`);
  return data;
};

export const loginUser = async ({ email, password }) => {
  const { data } = await axios.post(`${BASE_URL}orbit/api/login`, {
    email,
    password,
  });
  return data;
};

export const signUpUser = async ({ name, email, password }) => {
  const { data } = await axios.post(`${BASE_URL}orbit/api/signup`, {
    email,
    name,
    password,
  });
  return data;
};
