import express from 'express'
// import bodyParser from 'body-parser'
import connectDB from '../db/utils.js'
import { getUrlById, postUrl } from './routes.js'

const app = express()

connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/:urlId', getUrlById)
app.post('/', postUrl)

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
