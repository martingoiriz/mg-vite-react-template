export interface ErrorResponse {
  response: {
    data: {
      data: unknown;
      message: string;
      code: number;
    };
  };
}
