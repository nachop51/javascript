const express = require('express') // require -> commonjs
const crypto = require('node:crypto')
const movies = require('./movies.json')
const z = require('zod')
const { validateMovie } = require('./schemas/movies')

const app = express()
app.disable('x-powered-by')

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Hello world 🐷' })
})

app.get('/movies', (req, res) => {
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

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
