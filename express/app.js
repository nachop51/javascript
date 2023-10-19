const express = require('express') // require -> commonjs
const crypto = require('node:crypto')
const movies = require('./movies.json')
const cors = require('cors')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()
app.use(express.json())
app.use(cors({
  origin: (origin, cb) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:1234',
      'https://my-app.com',
      'https://my-other-app.com'
    ]

    if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
      return cb(null, true)
    }

    cb(new Error('Origin not allowed'))
  }
}))
app.disable('x-powered-by')

// Safe methods => GET/HEAD/OPTIONS/TRACE
// Unsafe methods => POST/PUT/PATCH/DELETE

// CORS Pre-flight request
// OPTIONS /movies

app.get('/', (req, res) => {
  res.json({ message: 'Hello world 🐷' })
})

app.get('/movies', (req, res) => {
  // const origin = req.headers.origin

  // if (!ACCEPTED_ORIGINS.includes(origin)) {
  //   return res.status(403).json({ message: 'Origin not allowed' })
  // }

  // Any origin can access this endpoint
  // res.setHeader('Access-Control-Allow-Origin', origin) // <- CORS policy
  const genre = req.query.genre // -> /movies?genre=action

  if (genre) {
    const filteredMovies = movies.filter(movie =>
      movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )

    return res.json(filteredMovies)
  }

  res.json(movies)
})

// dynamic route
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  // const {
  //   title,
  //   genre,
  //   year,
  //   director,
  //   duration,
  //   rate,
  //   poster
  // } = req.body
  // using zod to validate the movie
  const result = validateMovie(req.body)

  if (result.error) {
    // 422 <--> Unprocessable Entity
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  // this is not RESTful, we are saving the movie in memory
  movies.push(newMovie)

  // 201 <--> Resource created
  res.status(201).json(newMovie)
})

// paths are regular expressions
// through the path-to-regexp package
// app.get('/ab+cd/', (req, res) => { // -> abcd, abbcd, abbbbbbcd, ...
//    Implementation ...
// })

// app.get('/ab?cd', (req, res) => { // -> abcd, acd
//    Implementation ...
// })

// app.get('/ab(cd)?e', (req, res) => { // -> abe, abcde
//   Implementation ...
// })

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params

  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

  const result = validatePartialMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updatedMovie

  res.json(updatedMovie)
})

app.delete('/movies/:id', (req, res) => {
  // This doesn't work with CORS ❌
  // because it will first send a pre-flight request
  // app.options('/movies/:id') needs to be implemented
  // const origin = req.headers.origin

  // if (!ACCEPTED_ORIGINS.includes(origin)) {
  //   return res.status(403).json({ message: 'Origin not allowed' })
  // }

  // res.setHeader('Access-Control-Allow-Origin', origin)

  const { id } = req.params

  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

  movies.splice(movieIndex, 1)

  res.status(204).json({ message: 'Movie deleted' })
})

// app.options('/movies/:id', (req, res) => {
//   const origin = req.headers.origin

//   if (!ACCEPTED_ORIGINS.includes(origin)) {
//     return res.status(403).json({ message: 'Origin not allowed' })
//   }

//   res.setHeader('Access-Control-Allow-Origin', origin)
//   res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE')
//   res.send()
// })

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
