import { Sweet } from '../types';

const API_URL = 'http://localhost:5000/api/sweets';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
};

export const sweetService = {
  getSweets: async (): Promise<Sweet[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch sweets');
    return await response.json();
  },

  addSweet: async (sweetData: Omit<Sweet, 'id'>): Promise<Sweet> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(sweetData)
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to add sweet');
    }
    return await response.json();
  },
  
  updateSweet: async (updatedSweet: Sweet): Promise<Sweet> => {
    const response = await fetch(`${API_URL}/${updatedSweet.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedSweet)
    });
     if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update sweet');
    }
    return await response.json();
  },

  deleteSweet: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete sweet');
    }
  },
};
