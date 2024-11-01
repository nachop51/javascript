import express from 'express'

const app = express()
app.use(express.json())

const servicesAddress = [
  'http://localhost:4000/events',
  'http://localhost:4001/events',
  'http://localhost:4002/events',
  'http://localhost:4003/events'
]

function fetchEvents({ content }) {
  servicesAddress.forEach(url => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    }).catch(err => err)
  })
}

const events = []

app.post('/events', (req, res) => {
  const event = req.body

  console.log('Received Event:', req.body.type)

  events.push(event)

  fetchEvents({ content: req.body })

  res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
  res.send(events)
})

app.listen(3000, () => {
  console.log('app runing on http://localhost:3000')
})
