import express from 'express'
import especialidadesRouter from './routes/especialidades.routes.js'
import profesionalesRouter from './routes/profesionales.routes.js'
import { bienvenida, obtenerAgenda, rutaNoEncontrada } from './controllers/general.controller.js'

const app = express()
const PORT = Number(process.env.PORT) || 3000

app.use(express.json())

app.get('/', bienvenida)
app.use('/especialidades', especialidadesRouter)
app.use('/profesionales', profesionalesRouter)
app.get('/agenda', obtenerAgenda)

// Middleware para rutas inexistentes: debe ubicarse después de todas las rutas válidas.
app.use(rutaNoEncontrada)

app.listen(PORT, () => {
  console.log(`Servidor de API ejecutándose en http://localhost:${PORT}`)
})
