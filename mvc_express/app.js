import express, { json } from 'express' // require -> commonjs
import { createMoviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
import { MovieModel } from './models/mysql/movie.js'

// import movies from './movies.json' // <- This is invalid in ESM
// import movies from './movies.json' assert { type: 'json' }
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))
// Recommended way
// import { createRequire } from 'node:module'
// const require = createRequire(import.meta.url)
// const movies = require('./movies.json')
// const movies = readJSON('./movies.json')

export const createApp = ({ movieModel }) => {
  const app = express()

  // Middlewares
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  // Routes
  app.get('/', (req, res) => {
    res.json({ message: 'Hello world 🐷' })
  })

  app.use('/movies', createMoviesRouter({ movieModel: MovieModel }))

  const PORT = process.env.PORT ?? 3000

  app.listen(PORT, () =>
    console.log(`server listening on port http://localhost:${PORT}`)
  )
}
