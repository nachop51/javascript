import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'moviesdb'
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

// connection.query('SELECT * FROM movies').then(([rows, fields]) => {

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerGenre = genre.toLowerCase()
      const [[{ id }]] = await connection.query('SELECT id, name FROM genre WHERE LOWER(name) = ?', [lowerGenre])

      const [genreMovies] = await connection.query(`
        SELECT BIN_TO_UUID(m.id) id, m.title, m.year, m.duration, m.poster, m.rate FROM movie_genres mg
        JOIN movie m ON m.id = mg.movie_id
        WHERE genre_id = ?
      `, [id])

      return genreMovies
    }

    const [movies] = await connection.query('SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie')

    return movies
  }

  static async getById ({ id }) {
    const [movie] = await connection.query(`
      SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate
      FROM movie
      WHERE id = UUID_TO_BIN(?)
      `, [id])

    return movie
  }

  static async create (input) {
    const {
      title,
      year,
      director,
      duration,
      poster,
      rate,
      genre
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(`
        INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)
      `, [uuid, title, year, director, duration, poster, rate])
    } catch (err) {
      console.log(err)
      return null
    }

    const [movies] = await connection.query('SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?)', [uuid])

    return movies[0]
  }

  static async delete ({ id }) {
    const [result] = await connection.query('DELETE FROM movie WHERE id = UUID_TO_BIN(?)', [id])

    return result.affectedRows > 0
  }

  static async update ({ id, input }) {
    const {
      title,
      year,
      director,
      duration,
      poster,
      rate,
      genre
    } = input

    const [result] = await connection.query(`
      UPDATE movie SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ? WHERE id = UUID_TO_BIN(?)
    `, [title, year, director, duration, poster, rate, id])

    if (result.affectedRows === 0) return null

    const [movies] = await connection.query('SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?)', [id])

    return movies[0]
  }
}
