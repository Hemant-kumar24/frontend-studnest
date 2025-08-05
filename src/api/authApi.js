// src/api/authApi.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // change as needed
});

// User
export const registerUser = (data) => API.post('/user/register', data);
export const loginUser = (data) => API.post('/user/login', data);

// Admin
export const registerAdmin = (data) => API.post('/admin/register', data);
export const loginAdmin = (data) => API.post('/admin/login', data);
