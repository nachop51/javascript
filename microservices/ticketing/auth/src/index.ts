import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found'
import cookieSession from 'cookie-session'

const app = express()
// make express aware that it's behind a proxy of ingress-nginx
app.set('trust proxy', true)
app.use(express.json())
app.use(
  cookieSession({
    signed: false,
    secure: true,
    httpOnly: true
  })
)

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

if (!process.env.JWT_KEY) {
  throw new Error('JWT_KEY must be defined')
}

let attempts = 0

while (attempts < 5) {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('Connected to MongoDB')
    break
  } catch (err) {
    attempts++
    console.error(err)
    await new Promise(resolve => setTimeout(resolve, 5000))
  }
}

app.listen(3000, () => {
  console.log('app running on http://localhost:3000')
})
