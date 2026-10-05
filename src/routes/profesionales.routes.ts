import { Router } from 'express'
import {
  actualizarProfesional,
  crearProfesional,
  eliminarProfesional,
  obtenerProfesionalPorId,
  obtenerProfesionales,
} from '../controllers/profesionales.controller.js'

const router = Router()

router.get('/', obtenerProfesionales)
router.get('/:id', obtenerProfesionalPorId)
router.post('/', crearProfesional)
router.put('/:id', actualizarProfesional)
router.delete('/:id', eliminarProfesional)

export default router
