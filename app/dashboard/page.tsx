'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { decodeJWT } from '@/lib/api';
import { useAddFavorite, useSearchCountries } from '@/lib/queries';
import { Country, User } from '@/types';
import { faGlobe, faHeart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasToastedError, setHasToastedError] = useState(false);
  const [hasToastedNoCountries, setHasToastedNoCountries] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
  const user = token ? decodeJWT(token) : null;

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }
    setIsAuthenticated(true);
  }, [router, token]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 800);
    return () => clearTimeout(timer);
  }, [query]);

  const { data: countries = [], isLoading, error } = useSearchCountries(debouncedQuery, debouncedQuery.length > 0);

  useEffect(() => {
    if (error && !hasToastedError) {
      toast.error('Error al buscar países');
      setHasToastedError(true);
    }
  }, [error, hasToastedError]);

  useEffect(() => {
    if (debouncedQuery && !isLoading && countries.length === 0 && !hasToastedNoCountries) {
      toast.error('País no encontrado');
      setHasToastedNoCountries(true);
    }
  }, [debouncedQuery, isLoading, countries.length, hasToastedNoCountries]);

  useEffect(() => {
    setHasToastedError(false);
    setHasToastedNoCountries(false);
  }, [debouncedQuery]);
  const addFavoriteMutation = useAddFavorite();

  const addToFavorites = async (country: Country) => {
    try {
      await addFavoriteMutation.mutateAsync({
        country_name: country.name,
        flag: country.flag,
        capital: country.capital,
        population: country.population,
        region: country.region,
      });
      toast.success('¡Agregado a favoritos!');
    } catch (err: any) {
      if (err.response?.status === 409) {
        toast.error('El país ya está en la lista de favoritos');
      } else {
        toast.error('Error al agregar a favoritos');
      }
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6">
          <CardContent className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Verificando autenticación...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{backgroundImage: 'url("https://www.state.gov/wp-content/uploads/2021/07/Covid_World_regions-base-update-07212021-01.png")', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <header className="bg-white shadow border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faGlobe} className="text-2xl text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Explorador de Países</h1>
            </div>
            <div className="flex space-x-4">
               <Link href="/favorites">
                 <Button variant="outline">
                   <FontAwesomeIcon icon={faHeart} className="mr-2" />
                   Mis Favoritos
                 </Button>
               </Link>
               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <Button variant="ghost">
                     Perfil
                   </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent>
                   <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                   <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                   <DropdownMenuSeparator />
                   <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                     Ver mi JWT
                   </DropdownMenuItem>
                   <DropdownMenuItem onClick={logout}>
                     <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                     Cerrar Sesión
                   </DropdownMenuItem>
                 </DropdownMenuContent>
               </DropdownMenu>
             </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 px-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Buscar Países</CardTitle>
            <CardDescription>
              Ingresa el nombre de un país para descubrir información y agregarlo a tus favoritos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="Buscar países..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <Card key={country.name} className="overflow-hidden">
              <div className="h-32 bg-gray-200 flex items-center justify-center">
                <img
                  className="max-h-full max-w-full object-contain"
                  src={country.flag}
                  alt={`Bandera de ${country.name}`}
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{country.name}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Capital:</span> {country.capital || 'N/A'}</p>
                  <p><span className="font-medium">Población:</span> {country.population.toLocaleString()}</p>
                  <p><span className="font-medium">Región:</span> {country.region}</p>
                </div>
                <Separator className="my-3" />
                <Button
                  onClick={() => addToFavorites(country)}
                  className="w-full"
                  size="sm"
                  disabled={addFavoriteMutation.isPending}
                >
                  <FontAwesomeIcon icon={faHeart} className="mr-2" />
                  Agregar a Favoritos
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white shadow-none">
          <DialogHeader>
            <DialogTitle>Tu JWT Token</DialogTitle>
            <DialogDescription>
              Este es tu token de acceso actual.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-sm break-all">{token}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}