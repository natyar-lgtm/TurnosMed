
---

 Modelado de datos

.Entidad Paciente

Los datos mínimos e indispensables para identificar y contactar a un paciente son:

- `id`: identificador interno único.
- `dni`: documento de identidad. Es un dato clave para identificar al paciente y debería ser único.
- `nombre`: nombre del paciente.
- `apellido`: apellido del paciente.
- `fechaNacimiento`: fecha de nacimiento.
- `telefono`: teléfono de contacto.
- `email`: correo electrónico de contacto.

### Interfaz TypeScript propuesta

```typescript
export interface Paciente {
  id: number
  dni: string
  nombre: string
  apellido: string
  fechaNacimiento: string
  telefono: string
  email: string
}
```

La fecha se propone en formato ISO `YYYY-MM-DD`, por ejemplo:

```json
{
  "fechaNacimiento": "1985-07-20"
}
```

El DNI se mantiene como `string` para evitar problemas con formatos que puedan contener ceros iniciales.

---

 Entidad Turno

Un turno debe permitir saber:

- qué paciente tiene la cita;
- qué profesional realizará la atención;
- cuándo será la atención;
- cuál es el estado de la reserva.

Como el proyecto ya trabaja con profesionales mediante `id`, el turno debe relacionarse mediante identificadores en lugar de duplicar sus datos.

### Interfaz TypeScript propuesta

```typescript
export interface Turno {
  id: number
  pacienteId: number
  profesionalId: number
  fecha: string
  hora: string
  estado: 'pendiente' | 'confirmado' | 'cancelado' | 'atendido'
}
```

### Ejemplo de Turno

```json
{
  "id": 1,
  "pacienteId": 1,
  "profesionalId": 3,
  "fecha": "2026-10-10",
  "hora": "10:30",
  "estado": "confirmado"
}
```

---



 Datos requeridos para asignar un turno

Para crear un turno se consideran obligatorios:

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| `pacienteId` | number | Sí | ID del paciente |
| `profesionalId` | number | Sí | ID del profesional |
| `fecha` | string | Sí | Fecha de atención |
| `hora` | string | Sí | Hora de atención |
| `estado` | string | No | Estado inicial del turno |

Cuando no se envía `estado`, se puede establecer por defecto:

```text
pendiente
```

Antes de confirmar un turno deberían validarse el paciente y el profesional, además de comprobar que la fecha y hora sean válidas.

---



Obtiene el listado de pacientes.

**Respuesta — 200**

```json
[
  {
    "id": 1,
    "dni": "30123456",
    "nombre": "María",
    "apellido": "Gómez",
    "fechaNacimiento": "1985-07-20",
    "telefono": "2954123456",
    "email": "maria.gomez@email.com"
  }
]
```

### GET `/pacientes/:id`

Obtiene un paciente específico.

**Parámetro de ruta:**

```text
id
```

**Respuestas:**

- `200` — Paciente encontrado.
- `400` — ID inválido.
- `404` — Paciente no encontrado.

### POST `/pacientes`

Registra un nuevo paciente.

**Body JSON:**

```json
{
  "dni": "30123456",
  "nombre": "María",
  "apellido": "Gómez",
  "fechaNacimiento": "1985-07-20",
  "telefono": "2954123456",
  "email": "maria.gomez@email.com"
}
```

**Respuesta — 201**

```json
{
  "id": 1,
  "dni": "30123456",
  "nombre": "María",
  "apellido": "Gómez",
  "fechaNacimiento": "1985-07-20",
  "telefono": "2954123456",
  "email": "maria.gomez@email.com"
}
```



Turnos

### GET `/turnos`

Obtiene los turnos registrados.

**Respuesta — 200**

```json
[
  {
    "id": 1,
    "pacienteId": 1,
    "profesionalId": 3,
    "fecha": "2026-10-10",
    "hora": "10:30",
    "estado": "confirmado"
  }
]
```

### GET `/turnos/:id`

Obtiene un turno específico.

**Respuestas:**

- `200` — Turno encontrado.
- `400` — ID inválido.
- `404` — Turno inexistente.

### POST `/turnos`

Asigna un nuevo turno.

**Body JSON:**

```json
{
  "pacienteId": 1,
  "profesionalId": 3,
  "fecha": "2026-10-10",
  "hora": "10:30",
  "estado": "pendiente"
}
```


**Respuesta — 201**

```json
{
  "id": 1,
  "pacienteId": 1,
  "profesionalId": 3,
  "fecha": "2026-10-10",
  "hora": "10:30",
  "estado": "pendiente"
}
```



Actualiza un turno.

**Respuesta:**

- `200` — Turno actualizado.
- `400` — Datos inválidos.
- `404` — Turno inexistente.
- `409` — Conflicto de horario.

### DELETE `/turnos/:id`

Cancela o elimina un turno.

**Respuesta:**

- `200` — Operación correcta.
- `400` — ID inválido.
- `404` — Turno inexistente.

---



```text
routes/
    ↓
controllers/
    ↓
domain / resources
    ↓
data
```

### Routes

Definen los métodos HTTP y los paths:

```typescript
router.get('/', obtenerPacientes)
router.get('/:id', obtenerPacientePorId)
router.post('/', crearPaciente)
router.put('/:id', actualizarPaciente)
router.delete('/:id', eliminarPaciente)
```

### Controllers

Reciben `Request` y `Response`, validan los datos de entrada y construyen las respuestas HTTP.

### Entidades / interfaces

Definen la estructura de los datos del dominio:

```typescript
export interface Paciente {
  id: number
  dni: string
  nombre: string
  apellido: string
  fechaNacimiento: string
  telefono: string
  email: string
}
```

```typescript
export interface Turno {
  id: number
  pacienteId: number
  profesionalId: number
  fecha: string
  hora: string
  estado: 'pendiente' | 'confirmado' | 'cancelado' | 'atendido'
}
```

---

# 8. Resumen de endpoints propuestos

| Método | Endpoint | Función |
|---|---|---|
| GET | `/pacientes` | Listar pacientes |
| GET | `/pacientes/:id` | Obtener paciente |
| POST | `/pacientes` | Crear paciente |
| PUT | `/pacientes/:id` | Actualizar paciente |
| DELETE | `/pacientes/:id` | Eliminar paciente |
| GET | `/turnos` | Listar turnos |
| GET | `/turnos/:id` | Obtener turno |
| POST | `/turnos` | Asignar turno |
| PUT | `/turnos/:id` | Actualizar turno |
| DELETE | `/turnos/:id` | Eliminar/cancelar turno |

