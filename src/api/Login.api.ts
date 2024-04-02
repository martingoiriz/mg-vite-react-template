import axios from "axios";

const BASE_URL = "https://swapi.dev/api/";

export const getCharacters = async () => {
  const { data } = await axios.get(`${BASE_URL}people/1`);
  return data;
};
