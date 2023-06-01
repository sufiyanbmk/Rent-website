import axios from 'axios';

const token = localStorage.getItem('access_token');
const instance = axios.create({
  // baseURL: 'http://localhost:7000/api',
  baseURL: 'https://api.rentit.fun/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    withCredentials: true,
  },
});

export default instance;
