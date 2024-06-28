export interface IHttpResponse<T> {
    statusCode: number;
    body: T | string;
  }

  export interface IHttpRequest<B> {
    params?: any;
    header?: any;
    body?: B;
  }
  