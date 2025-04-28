import axios from 'axios';

const API = axios.create({
  baseURL: 'https://budgetsplit-1.onrender.com/api',
//   baseURL: 'http://localhost:3000/api',
  withCredentials: true, 
});

export default API;
