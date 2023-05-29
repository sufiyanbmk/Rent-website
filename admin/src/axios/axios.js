import axios from 'axios';

export default axios.create({
  baseURL: 'http://api.rentit.fun/api',
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

export const axiosPrivate = axios.create({
  baseURL: 'http://api.rentit.fun/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
