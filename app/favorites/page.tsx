'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faArrowLeft, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useFavorites, useRemoveFavorite } from '@/lib/queries';
import toast from 'react-hot-toast';

export default function Favorites() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data: favorites = [], isLoading, error } = useFavorites();
  const removeFavoriteMutation = useRemoveFavorite();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    setIsAuthenticated(true);
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Verificando autenticación...</p>
      </div>
    );
  }

  const removeFavorite = async (id: string) => {
    try {
      await removeFavoriteMutation.mutateAsync(id);
      toast.success('Eliminado de favoritos');
    } catch (err) {
      toast.error('Error al eliminar de favoritos');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6">
          <CardContent className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Cargando tus favoritos...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{backgroundImage: 'url("https://www.state.gov/wp-content/uploads/2021/07/Covid_World_regions-base-update-07212021-01.png")', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faHeart} className="text-2xl text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900">Mis Favoritos</h1>
              <Badge variant="secondary">{favorites.length}</Badge>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Volver al Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>Error al cargar favoritos</AlertDescription>
            </Alert>
          )}

          {favorites.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-6xl mb-4">
                  <FontAwesomeIcon icon={faGlobe} className="text-gray-400" />
                </div>
                <CardTitle className="mb-2">Aún no tienes favoritos</CardTitle>
                <CardDescription className="mb-4">
                  Comienza explorando países y agrégalos a tus favoritos
                </CardDescription>
                <Link href="/dashboard">
                  <Button>Explorar Países</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((favorite) => (
                <Card key={favorite.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img
                      className="w-full h-full object-cover"
                      src={favorite.flag}
                      alt={`Bandera de ${favorite.country_name || 'país'}`}
                    />
                  </div>
                  <CardContent className="p-4">
                    <h2 className="text-xl font-bold ">{favorite.country_name || 'Nombre no disponible'}</h2>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Capital:</span> {favorite.capital}</p>
                      <p><span className="font-medium">Población:</span> {favorite.population.toLocaleString()}</p>
                      <p><span className="font-medium">Región:</span> {favorite.region}</p>
                    </div>
                    <Separator className="my-3" />
                    <Button
                      onClick={() => removeFavorite(favorite.id)}
                      variant="destructive"
                      className="w-full"
                      size="sm"
                      disabled={removeFavoriteMutation.isPending}
                    >
                      Eliminar de Favoritos
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}