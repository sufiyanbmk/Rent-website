import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.rentit.fun/api',
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

export const axiosPrivate = axios.create({
  baseURL: 'https://api.rentit.fun/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
