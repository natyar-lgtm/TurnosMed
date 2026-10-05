# TurnosMed - Actividad 3

Refactorización de la API RESTful aplicando Controllers y separación de responsabilidades.

## Estructura

- `controllers/`: lógica de los controladores por entidad y controller general.
- `routes/`: definición de rutas y conexión con controllers.
- `resources.ts`: tipos y datos en memoria normalizados desde los JSON.
- `data/`: datos iniciales de especialidades y profesionales.

## Ejecución

```bash
npm install
npm run dev
```

La API queda disponible en `http://localhost:3000`.

## Endpoints

### Especialidades
- GET `/especialidades`
- GET `/especialidades/:id`
- POST `/especialidades`
- PUT `/especialidades/:id`
- DELETE `/especialidades/:id`

### Profesionales
- GET `/profesionales`
- GET `/profesionales/:id`
- POST `/profesionales`
- PUT `/profesionales/:id`
- DELETE `/profesionales/:id`

### General
- GET `/`
- GET `/agenda`
- Cualquier ruta no contemplada devuelve `404`.

## Validaciones para Postman

### Ejemplos de errores

- `GET /especialidades/abc` -> `400`
- `GET /especialidades/9999` -> `404`
- `POST /especialidades` sin `nombre` -> `400`
- `POST /especialidades` con `nombre` numérico -> `400`
- `PUT /especialidades/9999` -> `404`
- `DELETE /profesionales/9999` -> `404`
- `GET /ruta-inexistente` -> `404`

Todos los controllers son `async`, utilizan `try/catch`, una variable `status`, validaciones previas, `throw new Error(...)` y `return res.status(status).json(...)`.
