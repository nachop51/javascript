import express from 'express'
import { randomBytes } from 'crypto'
import e from 'cors'

const app = express()
app.use(express.json())
app.use(e())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
  return res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex')

  const { content } = req.body

  const comments = commentsByPostId[req.params.id] || []

  comments.push({
    id: commentId,
    content,
    status: 'pending'
  })

  await fetch('http://event-bus-srv:3000/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'CommentCreated',
      data: {
        id: commentId,
        content,
        status: 'pending',
        postId: req.params.id
      }
    })
  })

  commentsByPostId[req.params.id] = comments

  return res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
  const { type, data } = req.body

  console.log('Received Event:', type)

  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data

    const comments = commentsByPostId[postId]

    const comment = comments.find(comment => {
      return comment.id === id
    })

    if (!comment) {
      return res.status(404).send({ status: 'failed' })
    }

    comment.status = status

    await fetch('http://event-bus-srv:3000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'CommentUpdated',
        data: {
          id,
          status,
          postId,
          content
        }
      })
    })
  }

  return res.send({ status: 'OK' })
})

app.listen(4001, () => {
  console.log('app runing on http://localhost:4001')
})
