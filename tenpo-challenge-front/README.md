# 🚀 Tenpo Challenge - Frontend

Aplicación web moderna de gestión de Pokémon con autenticación de usuarios, construida con React 19, TypeScript y Feature-Sliced Design (FSD).

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.14-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.16-38B2AC?logo=tailwind-css)

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Arquitectura](#-arquitectura)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías Principales](#-tecnologías-principales)
- [Scripts Disponibles](#-scripts-disponibles)
- [Funcionalidades](#-funcionalidades)
- [Documentación Adicional](#-documentación-adicional)

## ✨ Características

- 🎨 **UI Moderna**: Interfaz responsive con Tailwind CSS v4
- 🔐 **Autenticación Segura**: Sistema de login con JWT y refresh tokens
- ♾️ **Infinite Scroll**: Lista virtualizada de Pokémon con carga infinita
- ⚡ **Alto Rendimiento**: Virtualización de listas con TanStack Virtual
- 📱 **Responsive Design**: Adaptado para móviles, tablets y desktop
- 🏗️ **Arquitectura FSD**: Código organizado y escalable
- 🔄 **Estado Global**: Gestión eficiente con Zustand y React Query
- 🎯 **TypeScript**: Tipado estático para mayor seguridad

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**: v18.0.0 o superior ([Descargar](https://nodejs.org/))
- **npm**: v9.0.0 o superior (incluido con Node.js)
- **Backend API**: El servidor backend debe estar corriendo (ver [documentación del backend](../tenpo-challenge-back/README.md))

Verifica las instalaciones:

```bash
node --version  # Debe mostrar v18.0.0 o superior
npm --version   # Debe mostrar v9.0.0 o superior
```

## 📦 Instalación

### 1. Clonar el repositorio (si no lo has hecho)

```bash
git clone <url-del-repositorio>
cd tenpo-challenge/tenpo-challenge-front
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias definidas en `package.json`.

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto frontend:

```bash
# En tenpo-challenge-front/
cp .env.example .env  # Si existe un ejemplo
# O crea el archivo manualmente
```

Contenido del archivo `.env`:

```properties
# URL del API Backend
VITE_API_URL=http://localhost:3000/api
```

**Nota**: Asegúrate de que la URL coincida con donde esté corriendo tu backend.

### Configuración del Backend

**Importante**: El frontend necesita que el backend esté corriendo. Asegúrate de:

1. El backend está ejecutándose en `http://localhost:3000`
2. La base de datos está configurada y las migraciones aplicadas
3. El endpoint `/api` está disponible

## 🚀 Ejecución

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

Características del modo desarrollo:

- ⚡ Hot Module Replacement (HMR) instantáneo
- 🔍 React Query Devtools habilitado
- 🐛 Source maps para debugging
- 🔄 Auto-reload al guardar cambios

### Modo Producción

#### 1. Compilar el proyecto

```bash
npm run build
```

Esto generará una carpeta `dist/` con los archivos optimizados.

#### 2. Preview de producción

```bash
npm run preview
```

Sirve el build de producción en **http://localhost:4173**

## 🏗️ Arquitectura

Este proyecto utiliza **Feature-Sliced Design (FSD)**, una metodología de arquitectura frontend que organiza el código en capas y segmentos:

### Capas (de menor a mayor abstracción)

```
📁 src/
├── 📂 app/          # 🔧 Configuración global, providers, estilos
├── 📂 processes/    # 🔄 Procesos de negocio complejos
├── 📂 pages/        # 📄 Páginas/rutas de la aplicación
├── 📂 widgets/      # 🧩 Componentes compuestos (layouts)
├── 📂 features/     # ⚡ Funcionalidades de negocio
├── 📂 entities/     # 🗃️ Entidades del dominio
└── 📂 shared/       # 🔗 Código compartido (UI, utils, API)
```

### Segmentos dentro de cada capa

```
feature-name/
├── api/     # Peticiones HTTP
├── model/   # Lógica de negocio, hooks, stores
├── lib/     # Utilidades específicas
└── ui/      # Componentes de presentación
```

**Regla de dependencias**: Las capas superiores pueden importar de las inferiores, pero no al revés.

## 📁 Estructura del Proyecto

```
tenpo-challenge-front/
├── src/
│   ├── app/                    # Configuración de la app
│   │   ├── App.tsx            # Componente raíz
│   │   ├── providers/         # React Query, Router
│   │   └── styles/            # Estilos globales
│   │
│   ├── processes/             # Procesos de autenticación
│   │   └── auth/
│   │       ├── session-guard/   # Guards de rutas
│   │       └── session-init/    # Inicialización de sesión
│   │
│   ├── pages/                 # Páginas
│   │   ├── dashboard/         # Dashboard principal
│   │   └── login/             # Página de login
│   │
│   ├── widgets/               # Widgets complejos
│   │   ├── main-layout/       # Layout principal
│   │   └── navbar/            # Barra de navegación
│   │
│   ├── features/              # Features de negocio
│   │   ├── auth/
│   │   │   ├── by-credentials/  # Login
│   │   │   └── logout/          # Logout
│   │   └── pokemon/
│   │       └── get-pokemon-list/ # Lista de Pokémon
│   │
│   ├── entities/              # Entidades
│   │   ├── pokemon/           # Entidad Pokemon
│   │   └── user/              # Entidad User + Auth Store
│   │
│   └── shared/                # Código compartido
│       ├── api/               # Cliente HTTP (Axios)
│       ├── lib/               # Utilidades
│       ├── types/             # Tipos compartidos
│       └── ui/                # Componentes UI reutilizables
│
├── public/                    # Assets estáticos
├── .env                       # Variables de entorno
├── package.json               # Dependencias
├── vite.config.ts            # Configuración de Vite
└── tsconfig.json             # Configuración de TypeScript
```

## 🔧 Tecnologías Principales

### Framework y Lenguaje

- **React 19.1.1**: Framework de UI con React Compiler
- **TypeScript 5.9.3**: Tipado estático

### Build Tools

- **Vite (Rolldown) 7.1.14**: Build tool ultra-rápido basado en Rust
- **Tailwind CSS 4.1.16**: Framework CSS utilitario

### Estado y Datos

- **TanStack Query 5.90.5**: Gestión de estado asíncrono y caché
- **Zustand 5.0.8**: Estado global ligero

### Enrutamiento

- **React Router 7.9.5**: Enrutamiento con lazy loading

### Formularios

- **React Hook Form 7.66.0**: Gestión de formularios performante

### HTTP

- **Axios 1.13.1**: Cliente HTTP con interceptores

### UI y Estilos

- **Lucide React**: Iconos modernos
- **class-variance-authority**: Variantes de componentes
- **TanStack Virtual**: Virtualización de listas

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo (puerto 5173)

# Producción
npm run build        # Compila para producción (TypeScript + Vite)
npm run preview      # Preview del build de producción

# Calidad de Código
npm run lint         # Ejecuta ESLint
```

## 🎮 Funcionalidades

### 🔐 Autenticación

#### Login

- **Ruta**: `/login`
- **Credenciales de prueba**:
  - Email: `test@test.com`
  - Password: `password123`
- **Flujo**:
  1. Usuario ingresa credenciales
  2. POST `/auth/login`
  3. Recibe access token y datos de usuario
  4. Guarda en memoria (Zustand store)
  5. Redirige a dashboard

#### Sesión Persistente

- **Refresh automático**: Al cargar la app, intenta refrescar el token
- **Tokens**:
  - Access Token: En memoria (corta duración)
  - Refresh Token: httpOnly cookie (larga duración)
- **Renovación automática**: Si una petición falla con 401, intenta refresh

#### Logout

- Limpia el estado de autenticación
- Invalida cookies en el backend
- Redirige a `/login`

### 📱 Dashboard de Pokémon

#### Lista Virtualizada

- **Carga inicial**: 20 Pokémon
- **Infinite Scroll**: Carga automática al hacer scroll
- **Virtualización**: Solo renderiza elementos visibles (optimización)

#### Tarjetas de Pokémon

- **Nombre**: Capitalizado con color según tipo
- **Tipo**: Badge con icono SVG personalizado
- **Imagen**: Sprite oficial del Pokémon
- **Animaciones**: Hover effect suave

#### Tipos de Pokémon Soportados

18 tipos con colores e iconos únicos:

- 🌿 Grass, 🔥 Fire, 💧 Water, 🐛 Bug, ⚡ Electric
- 🧚 Fairy, 👻 Ghost, 🥊 Fighting, ✈️ Flying, etc.

### 🎨 Interfaz

#### Responsive Design

- **Móvil**: Menú hamburguesa, cards adaptadas
- **Tablet**: Layout optimizado
- **Desktop**: Navegación horizontal completa

#### Navegación

- **Navbar sticky**: Siempre visible al hacer scroll
- **Backdrop blur**: Efecto de vidrio esmerilado
- **Menú móvil**: Animado y accesible

## 🔄 Flujos de Usuario

### Usuario Nuevo (No Autenticado)

```
1. Accede a la app → Redirige a /login
2. Ingresa credenciales
3. Submit → API valida
4. Éxito → Guarda token y redirige a /
5. Ve dashboard con lista de Pokémon
```

### Usuario con Sesión Activa

```
1. Accede a la app
2. App intenta refresh automático
3. Éxito → Restaura sesión
4. Accede directamente a /
5. Ve dashboard
```

### Token Expirado Durante Uso

```
1. Usuario en dashboard
2. Hace petición al API
3. Access token expirado → 401
4. Interceptor intenta refresh
5. Éxito → Actualiza token y reintenta
6. Usuario no nota interrupción (seamless)
```

## 🛡️ Seguridad

### Tokens

- ✅ **Access Token**: Solo en memoria (no localStorage)
- ✅ **Refresh Token**: httpOnly cookie (no accesible por JavaScript)
- ✅ **Renovación automática**: Sin intervención del usuario
- ✅ **Logout automático**: Si refresh falla

### Headers HTTP

```
Authorization: Bearer <access-token>
withCredentials: true  // Para cookies
```

### Protección de Rutas

- **ProtectedRoute**: Solo usuarios autenticados
- **PublicRoute**: Solo usuarios no autenticados
- **Guards**: Verifican estado antes de renderizar

## 🚦 Solución de Problemas

### El frontend no se conecta al backend

**Verificar**:

1. Backend está corriendo en `http://localhost:3000`
2. Variable `VITE_API_URL` en `.env` es correcta
3. CORS está configurado en el backend

```bash
# Reinicia el frontend después de cambiar .env
npm run dev
```

### Error de CORS

El backend debe tener configurado:

```typescript
// Backend
app.enableCors({
  origin: "http://localhost:5173",
  credentials: true,
});
```

### Error "Cannot find module"

```bash
# Limpia e instala de nuevo
rm -rf node_modules package-lock.json
npm install
```

### Puerto 5173 ya está en uso

```bash
# Mata el proceso
kill -9 $(lsof -t -i:5173)
# O usa otro puerto
npm run dev -- --port 5174
```

## 📚 Documentación Adicional

- **[React 19 Docs](https://react.dev/)**: Documentación oficial de React
- **[TanStack Query](https://tanstack.com/query)**: Gestión de estado asíncrono
- **[Vite](https://vite.dev/)**: Build tool

## 🤝 Contribuir

Para contribuir al proyecto:

1. Crea una feature siguiendo la estructura FSD
2. Mantén la separación de responsabilidades
3. Usa TypeScript con tipado estricto
4. Sigue las convenciones de naming
5. Documenta cambios significativos

## 📝 Convenciones de Código

### Naming

- **Componentes**: PascalCase (`PokemonCard.tsx`)
- **Hooks**: camelCase con `use` (`useLoginMutation.ts`)
- **Stores**: camelCase con `.store.ts` (`auth.store.ts`)
- **Tipos**: PascalCase (`LoginCredentials`)

### Imports

```typescript
// 1. Externos
import { useState } from "react";
// 2. Alias
import { Button } from "@shared/ui/Button";
// 3. Relativos
import { useLocalHook } from "./useLocalHook";
```

## 📄 Licencia

Este proyecto es parte del Tenpo Challenge.

## 👨‍💻 Autor

Desarrollado como parte del desafío técnico de Tenpo.

---

**¿Problemas?** Abre un issue o contacta al equipo de desarrollo.
