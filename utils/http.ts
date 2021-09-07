import axios from 'axios';

const http = axios.create({
  baseURL: "http://localhost:8000/v1",
});

http.interceptors.request.use(
  async (config: any) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

export default http;
