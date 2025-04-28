import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your backend URL
  withCredentials: true, 
});

export default API;
