📌 README - Backend

🚀 Escuela - Backend

Este es el backend de la aplicación de gestión de alumnos. Proporciona endpoints para la autenticación y CRUD de alumnos.

🛠 Tecnologías utilizadas

Node.js

Express.js

PostgreSQL

JWT para autenticación

📂 Instalación y ejecución

1️⃣ Clonar el repositorio

git clone https://github.com/antonella-carmona/Prueba-t-cnica.git

2️⃣ Instalar dependencias

cd backend
npm install

3️⃣ Configurar variables de entorno

Crear un archivo .env en la raíz con los siguientes valores:

PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=tu_base_de_datos
DB_PORT=5432
JWT_SECRET=tu_secreto_jwt

4️⃣ Ejecutar el servidor

npm run dev

📌 Endpoints principales

🔑 Autenticación

POST /login - Iniciar sesión y obtener JWT

POST /register - Registrar un nuevo usuario

🎓 Alumnos

GET /alumnos - Obtener todos los alumnos

POST /alumnos - Crear un alumno

PUT /alumnos/:id - Actualizar un alumno

DELETE /alumnos/:id - Eliminar un alumno

🔗 Conexión con el frontend

El backend debe estar corriendo para que el frontend pueda consumir los endpoints.