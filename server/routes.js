import dotenv from 'dotenv'
import { nanoid } from 'nanoid'
import Url from '../db/url.js'
import { validateUrl } from '../utils/utils.js'

dotenv.config({ path: '../../.env' })

export const getUrlById = async (req, res) => {
  const urlId = req.params.id
  const url = await Url.findOne({ urlId })

  if (url) {
    updateClicks(urlId)
    res.redirect(url.origUrl)
  } else {
    res.status(404).json('Not found')
  }
}

const updateClicks = async (urlId) => {
  try {
    await Url.updateOne(
      { urlId },
      { $inc: { clicks: 1 } }
    )
  } catch (err) {
    console.log(err)
    res.status(500).json('Server Error')
  }
}

export const postUrl = async (req, res) => {
  const origUrl = req.params.origUrl
  if (validateUrl(origUrl)) {
    let url = await Url.findOne({ origUrl })
    url ? res.json(url) : createShortUrl(origUrl)
  } else {
    res.status(400).json('Invalid Original Url')
  }
}

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

