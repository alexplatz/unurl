import express from 'express'
import { nanoid } from 'nanoid'
import Url from '../../db/url.js'
import { validateUrl } from '../../utils/utils.js'
import dotenv from 'dotenv'

dotenv.config({ path: '../config/.env' })

const router = express.Router()

router.post('/short', async ({ origUrl }, res) => {
  // const { origUrl } = req.body

  if (validateUrl(origUrl)) {
    let url = await Url.findOne({ origUrl })
    url ? res.json(url) : createShortUrl(origUrl)
  } else {
    res.status(400).json('Invalid Original Url')
  }
})

const createShortUrl = async (origUrl) => {
  const urlId = nanoid()
  const base = process.env.BASE
  const shortUrl = `${base}/urlId}`
  const url = new Url({
    origUrl,
    shortUrl,
    urlId,
    date: new Date()
  })

  try {
    await url.save()
    res.json(url)
  } catch (err) {
    console.log(err)
    res.status(500).json('Server Error')
  }
}

export default router
