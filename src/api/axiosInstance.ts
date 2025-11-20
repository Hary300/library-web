import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://be-library-api-xh3x6c5iiq-et.a.run.app/api',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  // Pastikan headers ada
  config.headers = config.headers || {};

  // Axios v1+ (headers = AxiosHeaders) → gunakan .set()
  if (typeof config.headers.set === 'function') {
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
  } else {
    // Fallback untuk object biasa
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
});

export default instance;
