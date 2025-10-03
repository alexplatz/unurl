import express from 'express'
// import bodyParser from 'body-parser'
import connectDB from '../db/utils.js'
import urlsRouter from './routes/urls.js'
import indexRouter from './routes/index.js'

const app = express()

connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', indexRouter)
app.use('/api', urlsRouter)

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
