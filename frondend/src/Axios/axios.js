import axios from 'axios';

const token = localStorage.getItem('access_token');
// https://api.rentit.fun/api
// prettier-ignore
const baseURL = process.env.NODE_ENV === 'production' ? '/api' : 'http://13.201.117.19/api';

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    withCredentials: true,
  },
});

export default instance;
