import axios from 'axios';

const API = axios.create({
  baseURL: 'https://nomads-jewelry-shopping-website-back.vercel.app/api',
  headers: {
    'Content-Type': 'application/json', 
  }
});

axios.defaults.withCredentials = true;


API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('user')); 
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`; 
  }
  return req;
});

export default API;
