import * as dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import express from 'express'

import { ClientOptions, OpenAI } from 'openai'
import { ImageGenerateParams } from 'openai/resources'

const client_options: ClientOptions = {
  apiKey: process.env.OPENAI_KEY,
}

const openai = new OpenAI(client_options)


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.send('Hello world')
})

app.post('/dream', async (req, res) => {
  try {
    const prompt = req.body.prompt

    const image_params: ImageGenerateParams = {
      prompt: prompt,
      n: 1,
      size: '1024x1024'
    }

    const aiResponse = await openai.images.generate(image_params)

    const image = aiResponse.data[0].url

    res.send({ image })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: error?.response.data.error.message || 'Something went wrong' })
  }
})

app.listen(8080, () => console.log('Server running on port 8080'))
