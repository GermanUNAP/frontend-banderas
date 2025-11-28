import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi, countriesApi, favoritesApi } from './api';
import { Country, Favorite, LoginData, RegisterData } from '@/types';

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginData) => authApi.login(data),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
  });
};

export const useSearchCountries = (query: string, enabled = false) => {
  return useQuery({
    queryKey: ['countries', query],
    queryFn: () => countriesApi.search(query),
    enabled: enabled && query.length > 0,
  });
};

export const useFavorites = () => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: favoritesApi.getAll,
    enabled: typeof window !== 'undefined' && !!sessionStorage.getItem('token'),
  });
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (country: Omit<Favorite, 'id'>) => favoritesApi.add(country),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => favoritesApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};