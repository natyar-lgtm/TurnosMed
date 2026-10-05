import fs from 'fs'
import path from 'path'

export interface Especialidad {
  id: number
  nombre: string
  activa: boolean
}

export interface Profesional {
  id: number
  nombre: string
  especialidad: string
  activa: boolean
}

export interface Turno {
  id: number
  paciente: string
  profesionalId: number
  fecha: string
  hora: string
}

const rutaEspecialidades = path.resolve('src', 'data', 'especialidades.json')
const rutaProfesionales = path.resolve('src', 'data', 'profesionales.json')

const especialidadesJson = JSON.parse(fs.readFileSync(rutaEspecialidades, 'utf-8'))
const profesionalesJson = JSON.parse(fs.readFileSync(rutaProfesionales, 'utf-8'))

// Se normalizan los nombres de los IDs para que la API trabaje internamente con "id".
export const arrayEspecialidades: Especialidad[] = especialidadesJson.map((item: any) => ({
  id: item.especialidadId,
  nombre: item.nombreEspecialidad,
  activa: item.activa,
}))

export const arrayProfesionales: Profesional[] = profesionalesJson.map((item: any) => ({
  id: item.profesionalId,
  nombre: item.nombre,
  especialidad: item.especialidad,
  activa: item.activa,
}))

export const arrayTurnos: Turno[] = []
