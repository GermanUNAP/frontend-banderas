# Explorador de Países

Una aplicación fullstack para buscar países y gestionar favoritos con autenticación de usuarios.

## Tecnologías Utilizadas

### Frontend
- **Next.js 16** (React 19, TypeScript) - Framework principal para el frontend
- **Tailwind CSS 4** - Framework de estilos CSS
- **shadcn/ui** - Biblioteca de componentes UI (Button, Card, Input, Dialog, DropdownMenu, etc.)
- **TanStack Query** - Manejo de estado y queries para datos asíncronos
- **Axios** - Cliente HTTP para solicitudes API
- **React Hook Form + Zod** - Validación de formularios
- **FontAwesome** - Biblioteca de iconos
- **React Hot Toast** - Notificaciones al usuario
- **Lucide React** - Iconos adicionales

### Backend
- **Node.js + Express** - Servidor web con autenticación JWT
- **MySQL** - Base de datos para usuarios y favoritos
- **REST Countries API** - Fuente de datos de países

### Usuario de Prueba
Para facilitar las pruebas, puedes usar las siguientes credenciales:
- Email: usuario@example.com
- Password: password

## Inicialización del Proyecto

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Configuración del Backend
1. Asegúrate de que el backend esté ejecutándose en `http://localhost:3001` (consulta el README del backend para instrucciones detalladas).

### Configuración del Frontend
1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Copiar el archivo de ejemplo de variables de entorno:
   ```bash
   cp .env.example .env.local
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Cómo Funciona la Aplicación

### Flujo General
La aplicación permite a los usuarios autenticarse, buscar países del mundo y guardar sus favoritos en una base de datos personal.

### Autenticación de Usuarios
1. **Registro**: Los usuarios crean una cuenta en `/register` proporcionando nombre, email y contraseña.
2. **Inicio de Sesión**: En `/login`, los usuarios se autentican con email y contraseña.
3. **JWT Tokens**: Se utiliza autenticación JWT para proteger las rutas y mantener la sesión del usuario.
4. **Protección de Rutas**: Las rutas protegidas (`/dashboard`, `/favorites`) requieren autenticación.
5. **Logout**: Los usuarios pueden cerrar sesión desde el menú del perfil.

### Búsqueda de Países
1. En el dashboard (`/dashboard`), hay un campo de búsqueda con debounce (800ms) para optimizar las consultas.
2. Al escribir, se realiza una consulta a la API REST Countries a través del backend.
3. Los resultados se muestran en tarjetas que incluyen: nombre, bandera, capital, población y región.
4. Si no se encuentra el país, se muestra una notificación de error.

### Gestión de Favoritos
1. **Agregar Favoritos**: Desde el dashboard, los usuarios pueden agregar países a favoritos con un clic.
2. **Ver Favoritos**: En `/favorites`, se muestran todos los países favoritos del usuario en un grid responsivo.
3. **Eliminar Favoritos**: Los usuarios pueden remover países de sus favoritos.
4. **Persistencia**: Los favoritos se almacenan en la base de datos MySQL y se asocian al usuario autenticado.

### Componentes y Arquitectura
- **Páginas Principales**:
  - `/` - Página de inicio con enlaces a login/registro
  - `/login` - Formulario de inicio de sesión
  - `/register` - Formulario de registro
  - `/dashboard` - Búsqueda de países y gestión de favoritos
  - `/favorites` - Visualización y eliminación de favoritos

- **Componentes UI**: Utiliza shadcn/ui para componentes consistentes y accesibles (botones, tarjetas, inputs, diálogos, etc.).

- **Manejo de Estado**: TanStack Query para caching, sincronización y manejo eficiente de las consultas API.

- **API Layer**:
  - `lib/api.ts` - Funciones para interactuar con el backend (auth, countries, favorites)
  - `lib/queries.ts` - Hooks de TanStack Query para las operaciones CRUD
  - `types/index.ts` - Interfaces TypeScript para tipado fuerte

### Documentación de la API
La documentación completa de la API REST está disponible en http://localhost:3001/api-docs usando Swagger UI.

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

