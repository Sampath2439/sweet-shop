import { User, Role } from '../types';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:5000/api/auth';

interface DecodedToken extends User {
  exp: number;
}

export const authService = {
  getCurrentUser: (): User | null => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const decoded: DecodedToken = jwtDecode(token);
      // Check if token is expired
      if (Date.now() >= decoded.exp * 1000) {
        localStorage.removeItem('token');
        return null;
      }
      return { id: decoded.id, email: decoded.email, role: decoded.role };
    } catch (error) {
      console.error("Failed to decode token", error);
      return null;
    }
  },

  login: async (email: string, pass: string): Promise<User> => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to log in');
    }

    localStorage.setItem('token', data.token);
    return { id: data.id, email: data.email, role: data.role };
  },

  register: async (email: string, pass:string): Promise<User> => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to register');
    }
    
    localStorage.setItem('token', data.token);
    return { id: data.id, email: data.email, role: data.role };
  },

  logout: (): void => {
    localStorage.removeItem('token');
  },
};