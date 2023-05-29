import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://api.rentit.fun/api',
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

const accessToken = localStorage.getItem('access_token');
instance.defaults.headers.Authorization = `Bearer ${accessToken}`;

export default instance;
