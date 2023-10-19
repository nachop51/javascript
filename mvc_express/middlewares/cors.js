import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'https://my-app.com',
  'https://my-other-app.com'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, cb) => {
    if (!origin || acceptedOrigins.includes(origin)) {
      return cb(null, true)
    }

    cb(new Error('Origin not allowed'))
  }
})
