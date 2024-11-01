import express from 'express'
import { randomBytes } from 'crypto'
import e from 'cors'

const app = express()
app.use(express.json())
app.use(e())

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex')

  const { title } = req.body

  posts[id] = {
    id,
    title
  }

  await fetch('http://localhost:3000/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'PostCreated',
      data: {
        id,
        title
      }
    })
  })

  return res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
  console.log('Received Event:', req.body.type)

  return res.send({ status: 'OK' })
})

app.listen(4000, () => {
  console.log('app runing on http://localhost:4000')
})
