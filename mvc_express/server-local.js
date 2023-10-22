import { createApp } from './app.js'
import { MovieModel } from './models/local-fs/movie.js'

createApp({ movieModel: MovieModel })
