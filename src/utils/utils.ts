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
