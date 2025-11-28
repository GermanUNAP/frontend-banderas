'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{backgroundImage: 'url("https://cdn.mos.cms.futurecdn.net/nZeLBDbrKoAWTBpjwwDsFm.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faGlobe} />
            Explorador de Países
          </CardTitle>
          <CardDescription className="text-lg">
            Descubre, busca y guarda tus países favoritos alrededor del mundo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Link href="/login">
              <Button className="w-full" size="lg">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="w-full" size="lg">
                Crear Cuenta
              </Button>
            </Link>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            ¡Comienza a explorar países hoy!
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
