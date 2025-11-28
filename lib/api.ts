import axios from 'axios';
import { Country, Favorite, AuthResponse, LoginData, RegisterData, User } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },
};

export const countriesApi = {
  search: async (query: string): Promise<Country[]> => {
    const response = await api.get<{ success: boolean; countries: Country[] }>(`/countries/search?query=${encodeURIComponent(query)}`);
    return response.data.countries;
  },
};

export const favoritesApi = {
  getAll: async (): Promise<Favorite[]> => {
    const response = await api.get<Favorite[]>('/favorites');
    return response.data;
  },

  add: async (country: Omit<Favorite, 'id'>): Promise<Favorite> => {
    const response = await api.post<Favorite>('/favorites', country);
    return response.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/favorites/${id}`);
  },
};

export const decodeJWT = (token: string): User | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
};