import Axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

const axios: AxiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

axios.interceptors.request.use((request: InternalAxiosRequestConfig) => {
  if (request.method !== 'put' && request.method !== 'patch') return request;

  request.url = request.url?.includes('?') 
    ? `${request.url}&_method=${request.method}` 
    : `${request.url}?_method=${request.method}`;
  
  request.method = 'post';
  return request;
});

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axios;