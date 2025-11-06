# 🚀 Tenpo Challenge - Aplicación Full Stack

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://react.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.18-2D3748?logo=prisma)](https://www.prisma.io/)

Aplicación web full stack moderna para gestión de Pokémon con autenticación segura, desarrollada como parte del desafío técnico de Tenpo.

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Requisitos del Challenge](#-requisitos-del-challenge)
- [Instalación Rápida](#-instalación-rápida)
- [Arquitectura y Diseño](#-arquitectura-y-diseño)
- [Decisiones Técnicas](#-decisiones-técnicas)
- [Mejoras Propuestas](#-mejoras-propuestas)
- [Documentación Completa](#-documentación-completa)

## 📖 Descripción del Proyecto

Este proyecto es una aplicación full stack que implementa:

- **Sistema de autenticación** con JWT (Access Token + Refresh Token)
- **Visualización de datos** de una API pública (PokéAPI con +2500 Pokémon)
- **Lista virtualizada** con scroll infinito y alta performance
- **Arquitectura escalable** con separación de contextos público/privado
- **Diseño responsive** adaptado a móvil, tablet y desktop

El proyecto está dividido en dos aplicaciones independientes:

- **Frontend**: React 19 + TypeScript + Vite (Rolldown)
- **Backend**: NestJS 11 + PostgreSQL + Prisma

## ✨ Características Principales

### 🔐 Autenticación Segura

- ✅ Login con credenciales (email/password)
- ✅ Tokens JWT con renovación automática
- ✅ Access Token en memoria (no localStorage por seguridad)
- ✅ Refresh Token en httpOnly cookies (protegido contra XSS)
- ✅ Logout con limpieza completa de sesión
- ✅ Sesión persistente con auto-refresh al recargar página

### 📱 Interfaz de Usuario

- ✅ Diseño responsive con Tailwind CSS v4
- ✅ Lista virtualizada con 2500+ Pokémon
- ✅ Scroll infinito con carga automática
- ✅ Navegación con guards de rutas (público/privado)
- ✅ Loading states y error handling
- ✅ Animaciones suaves y feedback visual

### ⚡ Performance

- ✅ Virtualización de lista (solo renderiza elementos visibles)
- ✅ Code splitting y lazy loading
- ✅ Caché inteligente con TanStack Query
- ✅ Build optimizado con Vite/Rolldown (Rust-based)
- ✅ Paginación en backend

### 🏗️ Arquitectura

- ✅ Feature-Sliced Design (FSD) en frontend
- ✅ Modular architecture en backend (NestJS)
- ✅ Separación clara de contextos público/privado
- ✅ Escalable para nuevos módulos
- ✅ TypeScript end-to-end

## 🛠️ Stack Tecnológico

### Frontend

| Tecnología           | Versión | Propósito                       |
| -------------------- | ------- | ------------------------------- |
| **React**            | 19.1.1  | Framework UI con React Compiler |
| **TypeScript**       | 5.9.3   | Tipado estático                 |
| **Vite (Rolldown)**  | 7.1.14  | Build tool ultra-rápido (Rust)  |
| **Tailwind CSS**     | 4.1.16  | Estilos utilitarios             |
| **TanStack Query**   | 5.90.5  | Estado asíncrono y caché        |
| **Zustand**          | 5.0.8   | Estado global (auth)            |
| **React Router**     | 7.9.5   | Enrutamiento                    |
| **Axios**            | 1.13.1  | Cliente HTTP                    |
| **TanStack Virtual** | 3.13.12 | Virtualización de listas        |
| **React Hook Form**  | 7.66.0  | Gestión de formularios          |

### Backend

| Tecnología          | Versión | Propósito           |
| ------------------- | ------- | ------------------- |
| **NestJS**          | 11.0.1  | Framework backend   |
| **PostgreSQL**      | 16.2    | Base de datos       |
| **Prisma**          | 6.18.0  | ORM                 |
| **JWT**             | 11.0.1  | Autenticación       |
| **bcrypt**          | 6.0.0   | Hash de contraseñas |
| **class-validator** | 0.14.2  | Validación de DTOs  |
| **Docker**          | -       | Contenedorización   |

## 📝 Requisitos del Challenge

### ✅ Requisitos Implementados

| Requisito                | Estado | Implementación                           |
| ------------------------ | ------ | ---------------------------------------- |
| Login con fake-login     | ✅     | Backend real con JWT + Base de datos     |
| Conectar con API pública | ✅     | PokéAPI (2588 Pokémon) integrada         |
| Lista de 2000+ elementos | ✅     | 2588 Pokémon con virtualización          |
| Botón de logout          | ✅     | Limpia sesión y redirige                 |
| React + TypeScript       | ✅     | React 19 + TS 5.9                        |
| Responsive (web/mobile)  | ✅     | Tailwind CSS responsive                  |
| README documentado       | ✅     | Documentación completa en cada módulo    |
| Token en memoria         | ✅     | Zustand store (no localStorage)          |
| Contexto público/privado | ✅     | Guards + arquitectura FSD                |
| Axios configurado        | ✅     | Interceptores + auto-refresh token       |
| Justificación de lista   | ✅     | Ver sección "Decisiones Técnicas"        |
| Estrategia de logout     | ✅     | Limpieza de store + invalidación cookies |
| Mejora teórica           | ✅     | Ver sección "Mejoras Propuestas"         |

## 🚀 Instalación Rápida

### Requisitos Previos

- **Node.js** v18+ ([Descargar](https://nodejs.org/))
- **Docker** y **Docker Compose** ([Descargar](https://www.docker.com/products/docker-desktop))

### Paso 1: Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd tenpo-challenge
```

### Paso 2: Configurar Backend

```bash
cd tenpo-challenge-back

# Instalar dependencias
npm install

# Crear archivo .env (ver tenpo-challenge-back/README.md para más detalles)
cp .env.example .env
# Edita el archivo .env y configura las variables necesarias

# Iniciar desarrollo (levanta PostgreSQL, ejecuta migraciones y genera Prisma client)
npm run start:dev
```

El backend estará en: **http://localhost:3000**

### Paso 3: Cargar datos iniciales (solo la primera vez)

```bash
# En otra terminal, cargar el seed (usuarios + pokémon)
curl -X POST http://localhost:3000/api/seed
```

### Paso 4: Configurar Frontend

```bash
cd ../tenpo-challenge-front

# Instalar dependencias
npm install

# Crear archivo .env
echo "VITE_API_URL=http://localhost:3000/api" > .env

# Iniciar desarrollo
npm run dev
```

El frontend estará en: **http://localhost:5173**

### Paso 5: Iniciar sesión

**Credenciales de prueba:**

- Email: `test@test.com`
- Password: `123`

## 🏗️ Arquitectura y Diseño

### Contextos Público y Privado

La aplicación implementa una clara separación de contextos:

#### 📖 Contexto Público (No autenticado)

```
/login          → LoginForm
/forgot-password → (Preparado para futura implementación)
```

**Características:**

- Acceso sin autenticación
- Redirige a `/` si ya está autenticado
- Guard: `PublicRoute`

#### 🔒 Contexto Privado (Autenticado)

```
/               → Dashboard (Lista de Pokémon)
/profile        → (Preparado para futura implementación)
/settings       → (Preparado para futura implementación)
```

**Características:**

- Requiere autenticación
- Redirige a `/login` si no está autenticado
- Guard: `ProtectedRoute`
- Incluye Navbar con logout

### Escalabilidad

La arquitectura permite agregar fácilmente nuevos módulos:

```typescript
// Ejemplo: Agregar módulo de cambio de contraseña (público)
// Ubicación: src/features/auth/change-password/

// Ejemplo: Agregar módulo de datos de usuario (privado)
// Ubicación: src/features/user/profile-settings/
```

**Estructura FSD facilita:**

- ✅ Separación de responsabilidades
- ✅ Reutilización de código
- ✅ Testing independiente
- ✅ Code splitting automático

## 🎯 Decisiones Técnicas

### 1. Persistencia de Token

**Decisión: Access Token en memoria (Zustand) + Refresh Token en httpOnly cookie**

**Justificación:**

| Opción            | Pros                 | Contras             | Decisión                  |
| ----------------- | -------------------- | ------------------- | ------------------------- |
| localStorage      | Persiste recargas    | ❌ Vulnerable a XSS | ❌ No usar                |
| sessionStorage    | Mejor que local      | ❌ Vulnerable a XSS | ❌ No usar                |
| Memoria (Zustand) | ✅ Seguro contra XSS | Pierde al recargar  | ✅ **Para Access Token**  |
| httpOnly Cookie   | ✅ Seguro contra XSS | Vulnerable a CSRF\* | ✅ **Para Refresh Token** |

\*CSRF mitigado con SameSite=Strict

**Implementación:**

```typescript
// Access Token: Solo en memoria
const useAuthStore = create<AuthState>((set) => ({
  accessToken: null, // ← Nunca toca localStorage
  // ...
}));

// Refresh Token: httpOnly cookie (backend)
res.cookie("refreshToken", token, {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
});
```

**Flujo de renovación:**

1. Access token expira (corta duración: 15min)
2. Request falla con 401
3. Interceptor detecta y llama `/auth/refresh`
4. Backend valida refresh token (httpOnly cookie)
5. Retorna nuevo access token
6. Se reintenta request original
7. Usuario no nota la renovación ✨

### 2. Visualización de Lista (2000+ elementos)

**Decisión: Virtualización con TanStack Virtual + Infinite Scroll**

**Justificación:**

**Problema:** Renderizar 2588 elementos DOM causa:

- ❌ Lag en scroll
- ❌ Alto consumo de memoria
- ❌ Paint/reflow costoso

**Alternativas evaluadas:**

| Solución                      | Performance      | UX                | Complejidad     | Decisión       |
| ----------------------------- | ---------------- | ----------------- | --------------- | -------------- |
| Render completo               | ❌ Muy malo      | ✅ Simple         | ✅ Baja         | ❌             |
| Paginación clásica            | ✅ Bueno         | ❌ Clics molestos | ✅ Baja         | ❌             |
| Infinite Scroll               | ✅✅ Bueno       | ✅✅ Fluido       | ✅ Media        | ⚠️ Parcial     |
| **Virtualización + Infinite** | ✅✅✅ Excelente | ✅✅ Fluido       | ✅✅ Media-Alta | ✅ **Elegida** |

**Implementación:**

```typescript
<InfiniteVirtualizedList
  count={pokemonList.length}
  estimateSize={180} // Altura estimada de cada item
  overscan={6} // Items fuera de vista pre-renderizados
  hasMore={hasMore}
  onReachEnd={onLoadMore} // Carga más al llegar al final
>
  {(index) => <PokemonCard pokemon={pokemonList[index]} />}
</InfiniteVirtualizedList>
```

**Beneficios:**

- ✅ Solo renderiza ~20 elementos visibles (vs 2588)
- ✅ Scroll fluido a 60 FPS
- ✅ Carga progresiva desde backend (20 por request)
- ✅ Memoria constante (~5MB vs ~200MB)
- ✅ UX superior: scroll continuo sin clics

### 3. Axios y Autenticación

**Configuración de Axios:**

```typescript
// Cliente público (login, refresh)
export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // ← Importante para cookies
});

// Cliente privado (con interceptores)
const privateApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Interceptor: Agregar token a requests
privateApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: Auto-refresh en 401
privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Intentar refresh
      const newToken = await refreshAccessToken();
      if (newToken) {
        // Reintentar request original
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return privateApi.request(error.config);
      }
    }
    return Promise.reject(error);
  }
);
```

### 4. Estrategia de Logout

**Implementación multi-capa:**

```typescript
// 1. Frontend: Limpiar store
useAuthStore.getState().logout(); // → accessToken = null, user = null

// 2. Backend: Invalidar refresh token
await privateApi.post("/auth/logout"); // → Limpia cookie httpOnly

// 3. Frontend: Redirigir
navigate("/login");

// 4. Cleanup: Invalidar caché de React Query
queryClient.clear();
```

**Garantías:**

- ✅ Token de memoria eliminado
- ✅ Cookie del servidor invalidada
- ✅ Caché de queries limpiada
- ✅ Previene fugas de datos en dispositivos compartidos

## 💡 Mejoras Propuestas

### 1. Implementar Redis para Caché de Pokémon en el Backend

**Problema actual:**

Cada vez que un usuario carga la lista de Pokémon, el backend hace una consulta a PostgreSQL. Si múltiples usuarios acceden simultáneamente, esto genera:

- ❌ Múltiples consultas innecesarias a la base de datos
- ❌ Tiempo de respuesta más lento
- ❌ Mayor carga en el servidor de PostgreSQL

**Solución propuesta:**

Implementar **Redis** como capa de caché entre la aplicación y PostgreSQL. Redis guardaría en memoria los resultados de las consultas más frecuentes, permitiendo servir las respuestas directamente desde la caché sin necesidad de consultar la base de datos cada vez.

**Beneficios de usar Redis:**

- ✅ **Velocidad**: Las respuestas serían hasta 10 veces más rápidas (de ~50ms a ~5ms)
- ✅ **Escalabilidad**: Permite soportar miles de usuarios simultáneos sin degradar el rendimiento
- ✅ **Menor carga en la base de datos**: PostgreSQL solo se consultaría una vez, luego se sirve desde caché
- ✅ **Ideal para datos estáticos**: Los Pokémon no cambian frecuentemente, por lo que mantenerlos en caché es perfecto
- ✅ **Fácil implementación**: NestJS tiene soporte nativo para integrar Redis con pocas líneas de código

**Impacto esperado:**

Esta mejora es especialmente efectiva para nuestra aplicación porque los datos de Pokémon son **estáticos** y se consultan constantemente por múltiples usuarios. Redis mantendría estos datos en memoria RAM (mucho más rápida que el disco), reduciendo la carga en PostgreSQL en un 99% y mejorando significativamente la experiencia del usuario con tiempos de respuesta casi instantáneos.

## 📚 Documentación Completa

Cada módulo tiene su propio README detallado:

- **[Frontend README](./tenpo-challenge-front/README.md)**: Guía completa del frontend

  - Instalación y configuración
  - Arquitectura FSD en detalle
  - Componentes y features
  - Troubleshooting

- **[Backend README](./tenpo-challenge-back/README.md)**: Guía completa del backend
  - Setup de base de datos
  - API Endpoints
  - Migraciones con Prisma
  - Docker y desarrollo local

## 🧪 Testing

**Credenciales de prueba:**

```
Email: test@test.com
Password: 123
```

**Flujo de prueba recomendado:**

1. ✅ Login con credenciales
2. ✅ Ver lista de Pokémon cargarse
3. ✅ Hacer scroll infinito (ver carga automática)
4. ✅ Recargar página (sesión persiste)
5. ✅ Hacer logout
6. ✅ Intentar acceder a `/` (redirige a login)

## 🤝 Estructura del Monorepo

```
tenpo-challenge/
├── README.md                    ← Este archivo
├── tenpo-challenge-front/       ← Frontend (React + TS)
│   ├── README.md
│   ├── src/
│   └── package.json
└── tenpo-challenge-back/        ← Backend (NestJS + Prisma)
    ├── README.md
    ├── src/
    ├── prisma/
    └── package.json
```

## 📄 Licencia

Este proyecto fue desarrollado como parte del desafío técnico de Tenpo.

## 👨‍💻 Autor

Desarrollado con ❤️ para el Tenpo Challenge

---

**¿Preguntas o problemas?** Revisa la documentación específica de cada módulo o abre un issue.

**Stack completo:** React 19 + NestJS 11 + PostgreSQL + Prisma + TypeScript + Tailwind + Docker
