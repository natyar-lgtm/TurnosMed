import { type Request, type Response } from 'express'

export const bienvenida = async (_req: Request, res: Response) => {
  let status = 200

  try {
    return res.status(status).send('Servidor de Turnos Médicos corriendo correctamente')
  } catch (error) {
    status = 500
    return res.status(status).json({ mensaje: error instanceof Error ? error.message : 'Error interno del servidor' })
  }
}

export const rutaNoEncontrada = async (req: Request, res: Response) => {
  let status = 404

  try {
    throw new Error(`La ruta ${req.originalUrl} no existe`)
  } catch (error) {
    return res.status(status).json({
      mensaje: error instanceof Error ? error.message : 'Ruta no encontrada',
    })
  }
}

export const obtenerAgenda = async (_req: Request, res: Response) => {
  let status = 200

  try {
    const agenda = {
      diasAtencion: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
      horarioInicio: '08:00',
      horarioFin: '18:00',
      duracionTurnoMinutos: 30,
    }

    return res.status(status).json(agenda)
  } catch (error) {
    status = 500
    return res.status(status).json({ mensaje: error instanceof Error ? error.message : 'Error interno del servidor' })
  }
}
