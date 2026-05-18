# Frontend Angular - Gestión de Productos y Carrito de Compras

Aplicación frontend desarrollada con Angular para consumir una API REST de productos y carrito de compras desarrollada previamente con Django REST Framework.

---

# Descripción del Proyecto

Este proyecto consiste en una aplicación web desarrollada con Angular que permite consumir una API REST utilizando autenticación JWT.

La aplicación permite:

* Registro de usuarios.
* Inicio de sesión.
* Gestión de productos.
* Administración de carrito de compras.
* Integración completa con backend Django REST Framework.
* Navegación dinámica SPA.
* Comunicación segura mediante JWT.

El sistema fue desarrollado aplicando buenas prácticas de desarrollo frontend utilizando Angular, TypeScript, servicios e interceptores.

---

# Tecnologías Utilizadas

* Angular
* TypeScript
* Angular CLI
* HttpClient
* JWT Authentication
* Bootstrap / Angular Material
* Django REST Framework

---

# Características Principales

## Autenticación JWT

* Registro de usuarios.
* Login mediante JWT.
* Logout.
* Protección de rutas privadas.
* Almacenamiento del token en localStorage.
* Interceptor automático para peticiones autenticadas.

## Gestión de Productos

* Listado público de productos.
* Visualización de detalles.
* Creación de productos.
* Edición de productos.
* Eliminación de productos.
* Indicador visual de productos sin stock.

## Carrito de Compras

* Agregar productos al carrito.
* Modificar cantidades.
* Eliminar productos.
* Vaciar carrito.
* Cálculo automático del total.
* Actualización dinámica.

## Navegación

* Navbar dinámica.
* Opciones dependiendo del estado de autenticación.
* Acceso rápido a productos y carrito.

---

# Requisitos Previos

Antes de ejecutar el frontend es necesario:

* Tener instalado Node.js.
* Tener instalado Angular CLI.
* Tener funcionando la API backend Django REST Framework.

---

# Instalación del Proyecto

## 1. Clonar el repositorio

```bash
git clone https://github.com/DannyelAlejandro/cemlad-teaching-angular.git
```

---

## 2. Ingresar al directorio

```bash
cd cemlad-teaching-angular
```

---

## 3. Instalar dependencias

```bash
npm install
```

---

## 4. Ejecutar aplicación Angular

```bash
ng serve
```

La aplicación estará disponible en:

```text
http://localhost:4200
```

---

# Configuración del Backend

El frontend consume la API desarrollada con Django REST Framework.

Repositorio backend:

```text
https://github.com/Daniel-Metal/cemlad-teaching-angular.git
```

El backend debe ejecutarse previamente.

Servidor backend:

```text
http://127.0.0.1:8000
```

---

# Configuración de CORS

Para permitir la comunicación entre Angular y Django es necesario configurar CORS en el backend.

Instalar:

```bash
pip install django-cors-headers
```

Agregar en settings.py:

```python
INSTALLED_APPS = [
    'corsheaders',
]
```

```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
]
```

```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:4200',
]
```

---

# Estructura del Proyecto

```text
src/
│
├── app/
│   ├── core/
│   │   ├── interceptors/
│   │   ├── services/
│   │   └── models/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── products/
│   │   └── cart/
│   │
│   ├── shared/
│   │   └── components/
│   │
│   └── app.routes.ts
│
└── environments/
```

---

# Arquitectura Implementada

El proyecto utiliza una arquitectura modular basada en:

* Componentes.
* Servicios.
* Interceptores.
* Interfaces TypeScript.
* Routing.

Todas las peticiones HTTP son gestionadas desde servicios especializados.

---

# Servicios Implementados

## auth.service.ts

Maneja:

* Login.
* Registro.
* Logout.
* Gestión de JWT.

## product.service.ts

Maneja:

* CRUD de productos.
* Consultas de productos.

## cart.service.ts

Maneja:

* Operaciones del carrito.
* Totales.
* Cantidades.

---

# Interceptor JWT

El sistema implementa un HttpInterceptor para:

* Detectar el token almacenado.
* Inyectar automáticamente el JWT.
* Autorizar peticiones protegidas.

Esto evita repetir código en múltiples componentes.

---

# Endpoints Consumidos

## Autenticación

| Método | Endpoint                 |
| ------ | ------------------------ |
| POST   | /api/auth/register/      |
| POST   | /api/auth/token/         |
| POST   | /api/auth/token/refresh/ |

---

## Productos

| Método | Endpoint            |
| ------ | ------------------- |
| GET    | /api/products/      |
| GET    | /api/products/{id}/ |
| POST   | /api/products/      |
| PUT    | /api/products/{id}/ |
| PATCH  | /api/products/{id}/ |
| DELETE | /api/products/{id}/ |

---

## Carrito

| Método | Endpoint              |
| ------ | --------------------- |
| GET    | /api/cart/            |
| POST   | /api/cart/items/      |
| PATCH  | /api/cart/items/{id}/ |
| DELETE | /api/cart/items/{id}/ |
| DELETE | /api/cart/clear/      |

---

# Ejecución Completa del Stack

## 1. Ejecutar Backend Django

```bash
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000
```

---

## 2. Ejecutar Frontend Angular

```bash
ng serve
```

Frontend:

```text
http://localhost:4200
```

---

# Capturas de Pantalla

## Login

Agregar captura de:

* Pantalla de inicio de sesión.

---

## Registro

Agregar captura de:

* Formulario de registro.

---

## Productos

Agregar captura de:

* Listado de productos.
* Creación de productos.
* Edición de productos.

---

## Carrito

Agregar captura de:

* Carrito funcionando.
* Actualización de cantidades.
* Total general.

---

# Flujo de Autenticación

```text
Login → JWT → localStorage → Interceptor → Petición Protegida → Backend Django
```

---

# Buenas Prácticas Aplicadas

* Uso de interfaces TypeScript.
* Separación de responsabilidades.
* Uso de servicios.
* Interceptor centralizado.
* Arquitectura modular.
* Componentes reutilizables.
* Navegación SPA.

---

# Seguridad

El sistema implementa autenticación JWT para proteger operaciones sensibles.

Las rutas protegidas requieren:

* Login válido.
* Token JWT.
* Autorización mediante interceptor.

---

# Repositorios

## Frontend Angular

```text
https://github.com/Daniel-Metal/cemlad-teaching-angular.git
```

## Backend Django REST Framework

```text
https://github.com/Daniel-Metal/cemlad-teaching-django.git
```

---

# Autor

Daniel Altamirano

---