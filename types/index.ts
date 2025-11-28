export interface Country {
  name: string;
  flag: string;
  capital: string;
  population: number;
  region: string;
}

export interface Favorite {
  id: string;
  country_name: string;
  flag: string;
  capital: string;
  population: number;
  region: string;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export interface ApiError {
  message: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}