



```text
turnos-medicos/
├── src/
│   ├── controllers/
│   │   ├── especialidades.controller.ts
│   │   ├── profesionales.controller.ts
│   │   └── general.controller.ts
│   ├── data/
│   │   ├── especialidades.json
│   │   └── profesionales.json
│   ├── routes/
│   │   ├── especialidades.routes.ts
│   │   └── profesionales.routes.ts
│   ├── index.ts
│   └── resources.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
└── pacientes-turnos.md
```









{
  "diasAtencion": [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes"
  ],
  "horarioInicio": "08:00",
  "horarioFin": "18:00",
  "duracionTurnoMinutos": 30
}
```

---

# Especialidades

## GET `/especialidades`

Obtiene todas las especialidades disponibles.

**Parámetros:** ninguno.

**Respuesta — 200**

```json
[
  {
    "id": 1,
    "nombre": "Cardiología",
    "activa": true
  }
]
```

**Error — 500**

```json
{
  "mensaje": "No se pudieron obtener las especialidades"
}
```

## GET `/especialidades/:id`

Obtiene una especialidad mediante su identificador.

### Parámetro de ruta

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| `id` | integer | Sí | Identificador positivo de la especialidad |

**Respuesta — 200**

```json
{
  "id": 1,
  "nombre": "Cardiología",
  "activa": true
}
```

**Errores**

- `400` — El ID no es un entero positivo.
- `404` — La especialidad no existe.

Ejemplo:

```json
{
  "mensaje": "Especialidad no encontrada"
}
```

## POST `/especialidades`

Crea una nueva especialidad.

### Body JSON

```json
{
  "nombre": "Cardiología",
  "activa": true
}
```

`nombre` es obligatorio. `activa` es opcional y, si se omite, toma el valor `true`.

**Respuesta — 201**

```json
{
  "id": 21,
  "nombre": "Cardiología",
  "activa": true
}
```

**Errores**

- `400` — Nombre ausente, vacío o de tipo incorrecto.
- `400` — `activa` no es boolean.

## PUT `/especialidades/:id`

Actualiza uno o más campos de una especialidad.

### Body JSON

```json
{
  "nombre": "Cardiología",
  "activa": false
}
```

Debe enviarse al menos uno de los campos.

**Respuestas**

- `200` — Actualización correcta.
- `400` — ID o datos inválidos.
- `404` — Especialidad inexistente.

**Respuesta — 200**

```json
{
  "mensaje": "Especialidad actualizada correctamente",
  "especialidad": {
    "id": 1,
    "nombre": "Cardiología",
    "activa": false
  }
}
```

## DELETE `/especialidades/:id`

Elimina una especialidad.

**Respuestas**

- `200` — Eliminación correcta.
- `400` — ID inválido.
- `404` — Especialidad inexistente.

---

# Profesionales

## GET `/profesionales`

Obtiene todos los profesionales.

**Respuesta — 200**

```json
[
  {
    "id": 1,
    "nombre": "Dr. Carlos Gutiérrez",
    "especialidad": "Cardiología",
    "activa": true
  }
]
```

## GET `/profesionales/:id`

Obtiene un profesional por ID.

### Parámetro de ruta

| Parámetro | Tipo | Obligatorio |
|---|---|---:|
| `id` | integer | Sí |

**Respuestas**

- `200` — Profesional encontrado.
- `400` — ID inválido.
- `404` — Profesional inexistente.

## POST `/profesionales`

Crea un profesional.

### Body JSON

```json
{
  "nombre": "Dra. Ana López",
  "especialidad": "Dermatología",
  "activa": true
}
```

También puede utilizarse `especialidadId` en lugar de `especialidad`.

**Respuestas**

- `201` — Profesional creado.
- `400` — Datos obligatorios o tipos inválidos.

## PUT `/profesionales/:id`

Actualiza uno o más campos.

### Body JSON

```json
{
  "nombre": "Dra. Ana López",
  "especialidad": "Dermatología",
  "activa": false
}
```

**Respuestas**

- `200` — Actualización correcta.
- `400` — Datos inválidos.
- `404` — Profesional inexistente.

## DELETE `/profesionales/:id`

Elimina un profesional.

**Respuestas**

- `200` — Eliminación correcta.
- `400` — ID inválido.
- `404` — Profesional inexistente.

---

# Rutas inexistentes

Cualquier ruta no definida devuelve `404`.

Ejemplo:

```http
GET /ruta-inexistente
```

Respuesta:

```json
{
  "mensaje": "La ruta /ruta-inexistente no existe"
}
```



# Códigos HTTP utilizados

| Código | Significado |
|---:|---|
| `200` | Operación exitosa |
| `201` | Recurso creado |
| `400` | Datos de entrada inválidos |
| `404` | Recurso o ruta no encontrada |
| `500` | Error interno del servidor |

## Pruebas sugeridas en Postman

Con `baseUrl` configurada:

```text
GET    {{baseUrl}}/
GET    {{baseUrl}}/agenda
GET    {{baseUrl}}/especialidades
GET    {{baseUrl}}/especialidades/1
POST   {{baseUrl}}/especialidades
GET    {{baseUrl}}/profesionales
GET    {{baseUrl}}/profesionales/1
POST   {{baseUrl}}/profesionales
```

Pruebas de error:

```text
GET {{baseUrl}}/especialidades/abc
GET {{baseUrl}}/especialidades/9999
GET {{baseUrl}}/ruta-inexistente
```


