import { Router } from 'express'
import {
  actualizarEspecialidad,
  crearEspecialidad,
  eliminarEspecialidad,
  obtenerEspecialidadPorId,
  obtenerEspecialidades,
} from '../controllers/especialidades.controller.js'

const router = Router()

router.get('/', obtenerEspecialidades)
router.get('/:id', obtenerEspecialidadPorId)
router.post('/', crearEspecialidad)
router.put('/:id', actualizarEspecialidad)
router.delete('/:id', eliminarEspecialidad)

export default router
