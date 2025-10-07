import express from 'express'
import connectDB from '../db/utils.js'
import { getUrlById, postUrl } from './routes.js'

const PORT = process.env.PORT || 3333
const app = express()

connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (_, res) => res.status(200).json("I'm alive!"))
app.get('/:urlId', getUrlById)

app.post('/', postUrl)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
