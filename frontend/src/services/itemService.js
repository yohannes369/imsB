// src/services/itemService.js
import { api } from '../utils/api';

export const addItem = async (itemData) => {
  const response = await api.post('/api/items/addItem', itemData);
  return response.data;
};
