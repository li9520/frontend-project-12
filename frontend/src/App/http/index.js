import axios from 'axios';

export const API_URL = '/api/v1';

const $api = axios.create({
  withCredentials: true, /* к каждому запросу куки цепляются автоматичнски */
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const copyConfig = config;
  copyConfig.headers.Authorization = `Bearer ${token}`;
  return copyConfig;
});

export default $api;
