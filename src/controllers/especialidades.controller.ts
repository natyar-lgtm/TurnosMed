import { type Request, type Response } from 'express'
import { arrayEspecialidades, type Especialidad } from '../resources.js'

export const obtenerEspecialidades = async (_req: Request, res: Response) => {
  let status = 200

  try {
    if (!Array.isArray(arrayEspecialidades)) {
      status = 500
      throw new Error('No se pudieron obtener las especialidades')
    }

    return res.status(status).json(arrayEspecialidades)
  } catch (error) {
    status = status === 200 ? 500 : status
    return res.status(status).json({
      mensaje: error instanceof Error ? error.message : 'Error interno del servidor',
    })
  }
}

export const obtenerEspecialidadPorId = async (req: Request, res: Response) => {
  let status = 200

  try {
    const id = Number(req.params.id)

    if (!req.params.id || !Number.isInteger(id) || id <= 0) {
      status = 400
      throw new Error('El ID de la especialidad debe ser un número entero positivo')
    }

    const especialidad = arrayEspecialidades.find((item) => item.id === id)

    if (!especialidad) {
      status = 404
      throw new Error('Especialidad no encontrada')
    }

    return res.status(status).json(especialidad)
  } catch (error) {
    return res.status(status).json({
      mensaje: error instanceof Error ? error.message : 'Error interno del servidor',
    })
  }
}

export const crearEspecialidad = async (req: Request, res: Response) => {
  let status = 201

  try {
    const { nombre, activa } = req.body

    if (!req.body || nombre === undefined || nombre === null || nombre === '') {
      status = 400
      throw new Error('El nombre de la especialidad es obligatorio')
    }

    if (typeof nombre !== 'string') {
      status = 400
      throw new Error('El nombre de la especialidad debe ser de tipo string')
    }

    if (activa !== undefined && typeof activa !== 'boolean') {
      status = 400
      throw new Error('El campo activa debe ser de tipo boolean')
    }

    const nuevoId = arrayEspecialidades.length > 0
      ? Math.max(...arrayEspecialidades.map((item) => item.id)) + 1
      : 1

    const nuevaEspecialidad: Especialidad = {
      id: nuevoId,
      nombre: nombre.trim(),
      activa: activa ?? true,
    }

    if (!nuevaEspecialidad.nombre) {
      status = 400
      throw new Error('El nombre de la especialidad no puede estar vacío')
    }

    arrayEspecialidades.push(nuevaEspecialidad)

    return res.status(status).json(nuevaEspecialidad)
  } catch (error) {
    return res.status(status).json({
      mensaje: error instanceof Error ? error.message : 'Error interno del servidor',
    })
  }
}

export const actualizarEspecialidad = async (req: Request, res: Response) => {
  let status = 200

  try {
    const id = Number(req.params.id)

    if (!req.params.id || !Number.isInteger(id) || id <= 0) {
      status = 400
      throw new Error('El ID de la especialidad debe ser un número entero positivo')
    }

    const especialidad = arrayEspecialidades.find((item) => item.id === id)

    if (!especialidad) {
      status = 404
      throw new Error('Especialidad no encontrada')
    }

    const { nombre, activa } = req.body

    if (nombre === undefined && activa === undefined) {
      status = 400
      throw new Error('Debe enviar al menos un campo para actualizar')
    }

    if (nombre !== undefined && (typeof nombre !== 'string' || !nombre.trim())) {
      status = 400
      throw new Error('El nombre debe ser un texto no vacío')
    }

    if (activa !== undefined && typeof activa !== 'boolean') {
      status = 400
      throw new Error('El campo activa debe ser de tipo boolean')
    }

    if (nombre !== undefined) especialidad.nombre = nombre.trim()
    if (activa !== undefined) especialidad.activa = activa

    return res.status(status).json({
      mensaje: 'Especialidad actualizada correctamente',
      especialidad,
    })
  } catch (error) {
    return res.status(status).json({
      mensaje: error instanceof Error ? error.message : 'Error interno del servidor',
    })
  }
}

export const eliminarEspecialidad = async (req: Request, res: Response) => {
  let status = 200

  try {
    const id = Number(req.params.id)

    if (!req.params.id || !Number.isInteger(id) || id <= 0) {
      status = 400
      throw new Error('El ID de la especialidad debe ser un número entero positivo')
    }

    const index = arrayEspecialidades.findIndex((item) => item.id === id)

    if (index === -1) {
      status = 404
      throw new Error('Especialidad no encontrada')
    }

    const [eliminada] = arrayEspecialidades.splice(index, 1)

    return res.status(status).json({
      mensaje: 'Especialidad eliminada correctamente',
      especialidad: eliminada,
    })
  } catch (error) {
    return res.status(status).json({
      mensaje: error instanceof Error ? error.message : 'Error interno del servidor',
    })
  }
}
