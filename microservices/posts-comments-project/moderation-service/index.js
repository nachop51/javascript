import e from 'express'

const app = e()
app.use(e.json())

app.post('/events', async (req, res) => {
  const { type, data } = req.body

  console.log('Received Event:', type)

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved'

    console.log('Comment Moderated:', status)

    await fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'CommentModerated',
        data: {
          id: data.id,
          content: data.content,
          postId: data.postId,
          status
        }
      })
    })

    return res.send({ status: 'OK' })
  }

  return res.send({ status: 'OK' })
})

app.listen(4003, () => {
  console.log('moderation service runing on http://localhost:4003')
})
