# Explorador de Países

Aplicación frontend para buscar países y gestionar favoritos con autenticación de usuarios.

## Repositorios

- **Frontend**: https://github.com/GermanUNAP/frontend-banderas
- **Backend**: https://github.com/GermanUNAP/backend-banderas

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn
- MySQL (para la base de datos del backend)

## Instalación y Ejecución

### Backend
El proyecto incluye el backend en la carpeta `../backend`. Para configurarlo:

1. Configurar la base de datos MySQL (ver README del backend)
2. Instalar dependencias del backend:
   ```bash
   cd ../backend
   npm install
   ```
3. Configurar variables de entorno en `../backend/.env`
4. Iniciar el backend:
   ```bash
   npm start
   ```
   El backend se ejecutará en `http://localhost:3001`

### Frontend
1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar variables de entorno:
   ```bash
   cp .env.example .env.local
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

### Credenciales de Prueba
- Email: usuario@example.com
- Password: password

## Funcionalidades

### Autenticación
- Registro de nuevos usuarios
- Inicio de sesión con JWT
- Protección de rutas autenticadas

### Búsqueda de Países
- Búsqueda en tiempo real con debounce
- Datos obtenidos de REST Countries API
- Información: nombre, bandera, capital, población, región

### Gestión de Favoritos
- Agregar países a favoritos desde el dashboard
- Ver lista de favoritos en página dedicada
- Eliminar países de favoritos
- Datos persistidos en base de datos MySQL

## Tecnologías

### Frontend
- **Next.js 16** (React 19, TypeScript): Framework para React con App Router, SSR y TypeScript
- **Tailwind CSS 4**: Framework de CSS utility-first para estilos
- **shadcn/ui**: Componentes UI reutilizables y accesibles
- **TanStack Query**: Gestión de estado y caching para consultas API
- **Axios**: Cliente HTTP para peticiones al backend
- **React Hook Form + Zod**: Validación de formularios con schemas TypeScript
- **FontAwesome**: Biblioteca de iconos

### Backend
- **Node.js + Express**: Servidor web con middleware y rutas API
- **MySQL**: Base de datos relacional para usuarios y favoritos
- **JWT Authentication**: Autenticación stateless con tokens JSON Web Token
- **REST Countries API**: API externa para obtener datos de países

### Autenticación JWT
La aplicación utiliza JWT para mantener sesiones de usuario. Los tokens se almacenan en sessionStorage del navegador y se incluyen automáticamente en las cabeceras de las peticiones API autenticadas.

## Estructura del Proyecto

```
frontend/
├── app/                    # Páginas de Next.js (App Router)
│   ├── dashboard/page.tsx  # Dashboard principal
│   ├── favorites/page.tsx  # Gestión de favoritos
│   ├── login/page.tsx      # Inicio de sesión
│   ├── register/page.tsx   # Registro de usuarios
│   └── layout.tsx          # Layout global
├── components/ui/          # Componentes reutilizables (shadcn/ui)
├── lib/                    # Utilidades y lógica de negocio
│   ├── api.ts              # Funciones de API
│   ├── queries.ts          # Hooks de TanStack Query
│   ├── providers.tsx       # Proveedores de React Query
│   └── utils.ts            # Utilidades generales
├── types/                  # Interfaces TypeScript
└── public/                 # Archivos estáticos

backend/
├── server.js               # Servidor Express principal
├── jwt.js                  # Utilidades JWT
└── package.json            # Dependencias del backend
```

## Endpoints de API

- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/countries/search?query=...` - Búsqueda de países
- `GET /api/favorites` - Obtener favoritos del usuario
- `POST /api/favorites` - Agregar favorito
- `DELETE /api/favorites/:id` - Eliminar favorito

