import { api } from "../Api";

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
