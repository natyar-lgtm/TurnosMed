import { type Request, type Response } from 'express'
import { arrayProfesionales, type Profesional } from '../resources.js'

export const obtenerProfesionales = async (_req: Request, res: Response) => {
  let status = 200

  try {
    if (!Array.isArray(arrayProfesionales)) {
      status = 500
      throw new Error('No se pudieron obtener los profesionales')
    }

    return res.status(status).json(arrayProfesionales)
  } catch (error) {
    status = status === 200 ? 500 : status
    return res.status(status).json({ mensaje: error instanceof Error ? error.message : 'Error interno del servidor' })
  }
}

export const obtenerProfesionalPorId = async (req: Request, res: Response) => {
  let status = 200

  try {
    const id = Number(req.params.id)

    if (!req.params.id || !Number.isInteger(id) || id <= 0) {
      status = 400
      throw new Error('El ID del profesional debe ser un número entero positivo')
    }

    const profesional = arrayProfesionales.find((item) => item.id === id)

    if (!profesional) {
      status = 404
      throw new Error('Profesional no encontrado')
    }

    return res.status(status).json(profesional)
  } catch (error) {
    return res.status(status).json({ mensaje: error instanceof Error ? error.message : 'Error interno del servidor' })
  }
}

export const crearProfesional = async (req: Request, res: Response) => {
  let status = 201

  try {
    const { nombre, especialidad, especialidadId, activa } = req.body

    if (!req.body || nombre === undefined || nombre === null || nombre === '') {
      status = 400
      throw new Error('El nombre del profesional es obligatorio')
    }

    if (typeof nombre !== 'string' || !nombre.trim()) {
      status = 400
      throw new Error('El nombre del profesional debe ser un texto no vacío')
    }

    if (especialidad === undefined && especialidadId === undefined) {
      status = 400
      throw new Error('La especialidad o especialidadId es obligatoria')
    }

    if (especialidad !== undefined && typeof especialidad !== 'string') {
      status = 400
      throw new Error('La especialidad debe ser de tipo string')
    }

    if (especialidadId !== undefined && (!Number.isInteger(Number(especialidadId)) || Number(especialidadId) <= 0)) {
      status = 400
      throw new Error('especialidadId debe ser un número entero positivo')
    }

    if (activa !== undefined && typeof activa !== 'boolean') {
      status = 400
      throw new Error('El campo activa debe ser de tipo boolean')
    }

    const especialidadFinal = especialidad ?? `Especialidad ${Number(especialidadId)}`
    const nuevoId = arrayProfesionales.length > 0
      ? Math.max(...arrayProfesionales.map((item) => item.id)) + 1
      : 1

    const nuevoProfesional: Profesional = {
      id: nuevoId,
      nombre: nombre.trim(),
      especialidad: especialidadFinal.trim(),
      activa: activa ?? true,
    }

    arrayProfesionales.push(nuevoProfesional)

    return res.status(status).json(nuevoProfesional)
  } catch (error) {
    return res.status(status).json({ mensaje: error instanceof Error ? error.message : 'Error interno del servidor' })
  }
}

export const actualizarProfesional = async (req: Request, res: Response) => {
  let status = 200

  try {
    const id = Number(req.params.id)

    if (!req.params.id || !Number.isInteger(id) || id <= 0) {
      status = 400
      throw new Error('El ID del profesional debe ser un número entero positivo')
    }

    const profesional = arrayProfesionales.find((item) => item.id === id)

    if (!profesional) {
      status = 404
      throw new Error('Profesional no encontrado')
    }

    const { nombre, especialidad, activa } = req.body

    if (nombre === undefined && especialidad === undefined && activa === undefined) {
      status = 400
      throw new Error('Debe enviar al menos un campo para actualizar')
    }

    if (nombre !== undefined && (typeof nombre !== 'string' || !nombre.trim())) {
      status = 400
      throw new Error('El nombre debe ser un texto no vacío')
    }

    if (especialidad !== undefined && (typeof especialidad !== 'string' || !especialidad.trim())) {
      status = 400
      throw new Error('La especialidad debe ser un texto no vacío')
    }

    if (activa !== undefined && typeof activa !== 'boolean') {
      status = 400
      throw new Error('El campo activa debe ser de tipo boolean')
    }

    if (nombre !== undefined) profesional.nombre = nombre.trim()
    if (especialidad !== undefined) profesional.especialidad = especialidad.trim()
    if (activa !== undefined) profesional.activa = activa

    return res.status(status).json({
      mensaje: 'Profesional actualizado correctamente',
      profesional,
    })
  } catch (error) {
    return res.status(status).json({ mensaje: error instanceof Error ? error.message : 'Error interno del servidor' })
  }
}

export const eliminarProfesional = async (req: Request, res: Response) => {
  let status = 200

  try {
    const id = Number(req.params.id)

    if (!req.params.id || !Number.isInteger(id) || id <= 0) {
      status = 400
      throw new Error('El ID del profesional debe ser un número entero positivo')
    }

    const index = arrayProfesionales.findIndex((item) => item.id === id)

    if (index === -1) {
      status = 404
      throw new Error('Profesional no encontrado')
    }

    const [eliminado] = arrayProfesionales.splice(index, 1)

    return res.status(status).json({
      mensaje: 'Profesional eliminado correctamente',
      profesional: eliminado,
    })
  } catch (error) {
    return res.status(status).json({ mensaje: error instanceof Error ? error.message : 'Error interno del servidor' })
  }
}
