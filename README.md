PetConnect API
Sistema profesional de gestión de adopciones con arquitectura de capas, diseñado para ser escalable, seguro y fácil de testear.

Características Técnicas
Arquitectura: Pattern Repository + DAO + Services.

Stack: Node.js, Express, MongoDB, Docker.

Seguridad: Encriptación con BCrypt y autenticación mediante JWT.

Documentación: Swagger UI disponible en /api/docs.

Instalación Rápida
Con Docker : docker-compose up --build

Local
npm install

Configurar .env con tu MONGO_URL.
npm run dev

Endpoints de Testing (Mocks)
Diseñados para poblar la base de datos rápidamente:

GET /api/mocks/mockingusers - Genera 50 usuarios aleatorios.

GET /api/mocks/mockingpets - Genera 10 mascotas aleatorias.

POST /api/mocks/generateData - Inserta masivamente el volumen de datos solicitado en el body.

Testing
Ejecución de pruebas unitarias e integrales: npm test