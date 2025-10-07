import dotenv from 'dotenv'
import { nanoid } from 'nanoid'
import Url from '../db/url.js'
import { validateUrl } from '../utils/utils.js'

dotenv.config({ path: '../../.env' })

export const getUrlById = async (req, res) => {
  const urlId = req.params.urlId
  const url = await Url.findOne({ urlId })

  if (url) {
    updateClicks(res, urlId)
    // restore this with frontend
    // res.redirect(url.origUrl)
    res.status(200).json(url)
  } else {
    res.status(404).json('Not found')
  }
}

const updateClicks = async (res, urlId) => {
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
  const { origUrl, urlId } = req.body

  if (validateUrl(origUrl)) {
    let url = await Url.findOne({ origUrl })
    url ?
      res.json(url) :
      createShortUrl(res, origUrl, urlId)
  } else {
    res.status(400).json('Invalid Original Url')
  }
}

const createShortUrl = async (res, origUrl, reqUrlId) => {
  const doc = await Url.findOne({ urlId: reqUrlId })

  if (!doc) {
    const urlId = reqUrlId ? reqUrlId : nanoid()
    const base = process.env.BASE
    const shortUrl = `${base}/${urlId}`
    const url = new Url({
      origUrl,
      shortUrl,
      urlId,
      date: new Date()
    })

    try {
      await url.save()
      res.status(200).json(url)
    } catch (err) {
      console.log(err)
      res.status(500).json('Server Error')
    }
  } else if (doc != origUrl) {
    res.status(400).json('Provided shortUrl taken')
  } else {
    res.json(doc)
  }
}

