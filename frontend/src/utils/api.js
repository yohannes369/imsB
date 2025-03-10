// src/utils/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer YOUR_VALID_JWT_TOKEN`, // Replace with real token
  },
});
