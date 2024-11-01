import e from 'express'
import cors from 'cors'

const app = e()
app.use(e.json())
app.use(cors())

const posts = {}

const handleEvent = ({ type, data }) => {
  if (type === 'PostCreated') {
    const { id, title } = data

    posts[id] = { id, title, comments: [] }
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data

    const post = posts[postId]
    post.comments.push({ id, content, status })
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data

    const post = posts[postId]
    const comment = post.comments.find(comment => {
      return comment.id === id
    })

    comment.status = status
    comment.content = content
  }
}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body

  console.log('Received Event:', type)

  handleEvent({ type, data })

  console.log({ posts })

  res.send({ status: 'OK' })
})

app.listen(4002, async () => {
  console.log('query service runing on http://localhost:4002')

  const res = await fetch('http://localhost:3000/events')

  const data = await res.json()

  console.log({ data })

  for (let event of data) {
    console.log('Processing event:', event.type)

    const { type, data } = event

    handleEvent({ type, data })
  }
})
