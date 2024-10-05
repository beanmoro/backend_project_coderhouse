# Backend E-commerce - Proyecto Final Coderhouse

Este proyecto es el backend de un e-commerce desarrollado como parte del curso de Backend de Coderhouse. El backend gestiona la funcionalidad de productos, carritos de compra y usuarios, utilizando Node.js, Express y MongoDB.

## Descripción

El backend implementa una serie de APIs que permiten a los usuarios administrar su cuenta, explorar productos, gestionar un carrito de compra y realizar pedidos. Los administradores y usuarios premium tienen permisos especiales para gestionar los productos y usuarios en la plataforma. Además, se utiliza autenticación basada en JWT.

La aplicación también ofrece la posibilidad de generar productos falsos para pruebas y cuenta con una documentación de la API accesible a través de Swagger.

### Funcionalidades:

- **Gestión de productos:**
  - Los administradores y usuarios premium pueden crear, actualizar y eliminar productos.
  - Los usuarios pueden ver todos los productos y obtener los detalles de un producto específico.
- **Gestión de usuarios:**

  - Los usuarios pueden registrarse, iniciar sesión y cerrar sesión.
  - Un administrador puede eliminar usuarios inactivos y cambiar el rol de los usuarios a premium.
  - Los usuarios pueden restablecer su contraseña mediante un correo de recuperación.
  - Los usuarios y usuarios premium pueden subir documentos personales (perfil, imagen del producto y documentos).

- **Carrito de compras:**

  - Los usuarios y usuarios premium pueden agregar productos a su carrito, actualizar la cantidad de productos, eliminar productos específicos o vaciar todo el carrito.
  - Los usuarios pueden realizar la compra de los productos en su carrito.

- **Autenticación:**
  - Se utiliza JWT para la autenticación de usuarios.
  - Los usuarios pueden autenticarse usando credenciales locales o mediante GitHub.
- **Mocking de productos:**

  - Los administradores pueden generar hasta 100 productos falsos para pruebas.

- **Documentación de la API:**
  - La API está documentada utilizando Swagger, lo que permite a los usuarios explorar y probar los endpoints desde `/api-docs`.

## Tecnologías utilizadas

- **Node.js** y **Express** como entorno y framework de servidor.
- **MongoDB** como base de datos NoSQL.
- **Mongoose** para modelado de datos y manejo de la base de datos.
- **Mongoose Paginate V2** para la paginación de productos.
- **bcrypt** para el hash de contraseñas.
- **JWT** (JSON Web Tokens) para la autenticación de usuarios.
- **Passport**, **Passport JWT**, **Passport Local** y **Passport GitHub** para la autenticación.
- **Express Session** para gestionar sesiones.
- **Cookie Parser** para el manejo de cookies.
- **CORS** para permitir peticiones desde diferentes dominios.
- **Multer** para el manejo de archivos.
- **Nodemailer** para el envío de correos electrónicos.
- **Swagger JSdoc** y **Swagger UI Express** para la documentación de la API.
- **Twilio** para la integración de servicios de mensajería.
- **UUID** para la generación de identificadores únicos.
- **Winston** como logger para registrar eventos y errores.
- **dotenv** para la gestión de variables de entorno.

### Dependencias de desarrollo

- **Nodemon** para la recarga automática en desarrollo.
- **Mocha** y **Chai** para las pruebas.
- **Supertest** para la prueba de endpoints.
- **Faker JS** para la generación de datos falsos en pruebas.

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/beanmoro/backend_project_coderhouse
```

2. Navega al directorio del proyecto

```bash
cd proyecto-ecommerce
```

3. Instala las dependencias

```bash
npm install
```

4. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=tu_secreto_para_jwt
```

5. Inicia el servidor en modo desarrollo:

```bash
npm run dev
```

6. Inicia el servidor en modo producción:

```bash
npm run start
```

## Endpoints

### Carts (/api/carts)

- `POST /`: Crear un carrito (requiere autenticación de administrador)
- `POST /:cid/product/:pid`: Agregar un producto al carrito (requiere autenticación de usuario/premium)
- `PUT /:cid/product/:pid`: Actualizar la cantidad de un producto en el carrito (requiere autenticación de usuario/premium)
- `DELETE /:cid/product/:pid`: Eliminar un producto del carrito (requiere autenticación de usuario/premium)
- `GET /:cid`: Obtener el carrito por su ID (requiere autenticación de usuario/premium)
- `DELETE /:cid`: Eliminar todos los productos del carrito (requiere autenticación de usuario/premium)
- `GET /:cid/purchase`: Procesar la compra del carrito (requiere autenticación de usuario/premium)

### Products (/api/products)

- `GET /`: Obtener todos los productos
- `GET /:pid`: Obtener un producto por su ID
- `POST /`: Crear un nuevo producto (requiere autenticación de administrador/premium)
- `PUT /:pid`: Actualizar un producto (requiere autenticación de administrador/premium)
- `DELETE /:pid`: Eliminar un producto (requiere autenticación de administrador/premium)

### Session (/api/session)

- `POST /register`: Registrar un nuevo usuario
- `POST /login`: Iniciar sesión
- `GET /current`: Obtener los detalles del usuario autenticado (requiere autenticación JWT)
- `GET /auth/github`: Iniciar sesión con GitHub
- `GET /logout`: Cerrar sesión

### Users (/api/users)

- `GET /`: Obtener todos los usuarios
- `DELETE /`: Eliminar usuarios inactivos (requiere autenticación de administrador)

### User (/api/user)

- `POST /email/reset-password`: Enviar correo para restablecer la contraseña
- `POST /reset-password`: Restablecer la contraseña
- `GET /premium/:uid`: Cambiar el rol de un usuario a premium
- `POST /:uid/documents`: Subir documentos de un usuario (requiere autenticación de usuario/premium)

### Other (/api/other)

- `GET /mockingproducts`: Generar 100 productos falsos para pruebas (requiere autenticación de administrador)

### API Docs (/api-docs)

- `GET /api-docs`: Documentación de la API generada con Swagger

## Scripts disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo utilizando **nodemon**.
- `npm run start`: Inicia el servidor en modo producción.

## Autor

Desarrollado por **Benjamín Moraga R.** como parte del bootcamp de Backend en **Coderhouse**.
