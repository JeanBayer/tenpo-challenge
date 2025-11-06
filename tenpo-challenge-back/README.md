# 🚀 Tenpo Challenge - Backend

API REST desarrollada con NestJS, PostgreSQL y Prisma para la gestión de Pokémon con autenticación JWT.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Base de Datos](#base-de-datos)

## 📝 Descripción

Este proyecto es una API REST que proporciona:

- 🔐 Sistema de autenticación con JWT (Access Token + Refresh Token)
- 🎮 CRUD de Pokémon con paginación
- 🗄️ Base de datos PostgreSQL con Prisma ORM
- 🐳 Dockerización completa del proyecto
- 🌱 Sistema de seeds para datos iniciales

## 🛠️ Tecnologías

- **Framework**: NestJS 11
- **Base de Datos**: PostgreSQL 16.2
- **ORM**: Prisma 6.18
- **Autenticación**: JWT (@nestjs/jwt)
- **Validación**: class-validator, class-transformer, zod
- **Seguridad**: bcrypt para hash de contraseñas
- **Contenedores**: Docker & Docker Compose

## ✅ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior) - [Descargar](https://nodejs.org/)
- **npm** (v9 o superior) - Viene con Node.js
- **Docker** y **Docker Compose** - [Descargar](https://www.docker.com/products/docker-desktop)

Verifica las instalaciones:

```bash
node --version
npm --version
docker --version
docker-compose --version
```

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd tenpo-challenge/tenpo-challenge-back
```

### 2. Instalar dependencias

```bash
npm install
```

## ⚙️ Configuración

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (`tenpo-challenge-back/`) con las siguientes variables:

```env
# Puerto del servidor
PORT=3000

# Conexión a la base de datos (para desarrollo local sin Docker)
DATABASE_URL="postgresql://postgres:123456@localhost:5432/tenpo?schema=public"

# Secret para JWT (cambia esto por un valor seguro en producción)
JWT_SECRET=tu_secret_super_seguro_aqui_cambialo

# URL del frontend (para CORS)
FRONTEND_URL=http://localhost:5173

# Entorno
NODE_ENV=development
```

> **⚠️ Importante**: El `JWT_SECRET` debe ser una cadena aleatoria y segura. Puedes generar una con:
>
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

### 2. Configuración de Docker

El proyecto ya incluye la configuración de Docker. El archivo `docker-compose.yml` levanta:

- **PostgreSQL** en el puerto `5432`
- **Aplicación NestJS** en el puerto `3000`

## 🚀 Ejecución del Proyecto

### Opción 1: Con Docker (Recomendado)

#### Primera vez:

```bash
docker-compose up --build
```

Esto hará:

1. ✅ Construir las imágenes de Docker
2. ✅ Levantar PostgreSQL
3. ✅ Esperar a que la BD esté lista
4. ✅ Generar el cliente de Prisma
5. ✅ Ejecutar las migraciones
6. ✅ Iniciar la aplicación en modo desarrollo

#### Ejecuciones posteriores:

```bash
docker-compose up
```

La aplicación estará disponible en: **http://localhost:3000**

#### Detener los contenedores:

```bash
docker-compose down
```

### Opción 2: Desarrollo Local (sin Docker)

Si prefieres ejecutar la aplicación sin Docker:

#### 1. Levantar PostgreSQL con Docker:

```bash
docker-compose up tenpo-db -d
```

#### 2. Generar Prisma Client y ejecutar migraciones:

```bash
npm run generate
npm run migrate
```

#### 3. Ejecutar seed (opcional - carga datos iniciales):

```bash
# Hacer una petición POST al endpoint de seed
curl -X POST http://localhost:3000/api/seed
```

#### 4. Iniciar el servidor en modo desarrollo:

```bash
npm run start:dev
```

## 📜 Scripts Disponibles

| Script                 | Descripción                                  |
| ---------------------- | -------------------------------------------- |
| `npm run start`        | Inicia la aplicación en modo producción      |
| `npm run start:dev`    | Inicia en modo desarrollo con hot-reload     |
| `npm run start:debug`  | Inicia en modo debug                         |
| `npm run build`        | Compila el proyecto para producción          |
| `npm run generate`     | Genera el cliente de Prisma                  |
| `npm run migrate`      | Ejecuta las migraciones de Prisma            |
| `npm run docker:start` | Ejecuta generate + migrate (usado en Docker) |
| `npm run lint`         | Ejecuta ESLint y corrige problemas           |
| `npm run format`       | Formatea el código con Prettier              |
| `npm test`             | Ejecuta los tests                            |
| `npm run test:watch`   | Ejecuta tests en modo watch                  |
| `npm run test:cov`     | Genera reporte de cobertura                  |

## 📁 Estructura del Proyecto

```
tenpo-challenge-back/
├── src/
│   ├── auth/              # Módulo de autenticación
│   │   ├── dto/           # DTOs para login y refresh token
│   │   ├── guards/        # Guard de autenticación JWT
│   │   └── interfaces/    # Interfaces de JWT payload
│   ├── pokemon/           # Módulo de Pokémon
│   │   └── dto/           # DTOs para queries y responses
│   ├── seed/              # Módulo para cargar datos iniciales
│   │   └── data/          # JSON con datos de seed
│   ├── shared/            # Módulo compartido
│   │   └── dto/           # DTOs compartidos (paginación)
│   ├── config/            # Configuración y validación de envs
│   ├── app.module.ts      # Módulo principal
│   └── main.ts            # Punto de entrada
├── prisma/
│   ├── schema.prisma      # Esquema de la base de datos
│   └── migrations/        # Migraciones de Prisma
├── generated/
│   └── prisma/            # Cliente de Prisma generado
├── docker-compose.yml     # Configuración de Docker
├── dockerfile             # Imagen Docker de la app
└── .env                   # Variables de entorno (crear)
```

## 🔌 API Endpoints

### Autenticación

#### POST `/api/auth/login`

Inicia sesión.

**Body:**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "user": { ... },
  "accessToken": "..."
}
```

#### POST `/api/auth/refresh`

Refresca el access token usando el refresh token.

**Response:**

```json
{
  "accessToken": "..."
}
```

#### POST `/api/auth/logout`

Cierra la sesión del usuario.

### Pokémon

#### GET `/pokemon`

Lista pokémon con paginación.

**Query Parameters:**

- `offset` (opcional, default: 0)
- `limit` (opcional, default: 10)

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Pikachu",
      "type": "electric",
      "imageUrl": "https://..."
    }
  ],
  "paginated": {
    "count": 2588,
    "limit": 10,
    "offset": 0
  }
}
```

### Seed

#### POST `/seed`

Carga datos iniciales (usuarios y pokémon).

> **📌 Nota**: Este endpoint solo debe ejecutarse una vez para cargar los datos iniciales.

## 🗄️ Base de Datos

### Modelos

#### User

- `id`: UUID (PK)
- `email`: String (único)
- `name`: String
- `password`: String (hasheado con bcrypt)
- `createdAt`: DateTime
- `updatedAt`: DateTime

#### Pokemon

- `id`: BigInt (PK)
- `name`: String (único)
- `type`: String
- `imageUrl`: String
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Migraciones

Las migraciones se ejecutan automáticamente con Docker. Para ejecutarlas manualmente:

```bash
npm run migrate
```

Para crear una nueva migración después de modificar el schema:

```bash
npx prisma migrate dev --name nombre_de_la_migracion
```

### Prisma Studio

Para explorar la base de datos visualmente:

```bash
npx prisma studio
```

Esto abrirá una interfaz web en `http://localhost:5555`

## 🔧 Troubleshooting

### El contenedor no inicia

```bash
# Elimina los contenedores y volúmenes
docker-compose down -v

# Reconstruye e inicia
docker-compose up --build
```

### Error de conexión a la base de datos

- Verifica que PostgreSQL esté corriendo: `docker ps`
- Verifica la `DATABASE_URL` en `.env`
- Asegúrate de que el puerto 5432 no esté ocupado

### Error de Prisma Client

```bash
# Regenera el cliente
npm run generate
```

### Puerto 3000 ya en uso

Cambia el puerto en `.env` o detén la aplicación que está usando el puerto 3000.

## 👨‍💻 Desarrollo

### Agregar una nueva migración

```bash
# 1. Modifica prisma/schema.prisma
# 2. Crea la migración
npx prisma migrate dev --name descripcion_del_cambio
# 3. Genera el cliente
npm run generate
```

---

**¡Listo!** 🎉 Ahora tienes el backend funcionando. Para el frontend, consulta el README en `tenpo-challenge-front/`.
