import { Text } from "Components";

export interface HttpResponse {
  response: {
    data: {
      data?: unknown;
      errors?: string[];
      message: string;
      code: number;
      success: boolean;
    };
  };
}

export const getErrorMessage = (error) => {
  const data: HttpResponse = error;
  const errorList = data?.response?.data?.errors;

  let errorMessage = data?.response?.data?.errors[0];
  let showFullErrors = false;

  if (errorMessage.length > 70) {
    errorMessage = errorMessage?.substring(0, 70) + "...";
  }

  if (errorList.length > 1) {
    showFullErrors = true;
  }

  return (
    <>
      <Text>{errorMessage}</Text>
      {showFullErrors && <Text>see full errors</Text>}
    </>
  );
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
