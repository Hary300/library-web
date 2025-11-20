import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://be-library-api-xh3x6c5iiq-et.a.run.app/api',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  // pastikan config.headers ada
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export default instance;
