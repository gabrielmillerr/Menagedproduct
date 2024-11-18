export type Response<T> = {
  success: boolean;
  statusCode?: number;
  data?: T;
  error?: string;
};

export class ResponseHandler {
  static success<T>(data: T, statusCode: number = 200): Response<T> {
    return { 
      success: true,
      statusCode,
      data
     };
  }

  static error<T>(message: string, statusCode: number = 400): Response<T> {
    return {
      success: false,
      statusCode,
      error: message
     };
  }
}