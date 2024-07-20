export interface ErrorResponse {
  response: {
    data: {
      data: unknown;
      message: string;
      code: number;
    };
  };
}

export const getErrorMessage = (error) => {
  const data: ErrorResponse = error;
  return data?.response?.data?.message || "An unexpected error occurred";
};

export const localStorageGet = (key: string) => {
  return JSON.parse(localStorage.getItem(key));
};

export const localStorageSet = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const localStorageRemove = (key: string) => {
  localStorage.removeItem(key);
};
