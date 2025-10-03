import express from 'express'
import Url from '../../db/url.js'

const router = express.Router()

router.get('/:urlId', async (req, res) => {
  const url = await Url.findOne({ urlId: req.params.urlId })
  if (url) {
    updateClicks(urlId)
    res.redirect(url.origUrl)
  } else {
    res.status(404).json('Not found')
  }
})

const updateClicks = async (urlId) => {
  try {
    await Url.updateOne(
      { urlId: req.params.urlId },
      { $inc: { clicks: 1 } }
    )
  } catch (err) {
    console.log(err)
    res.status(500).json('Server Error')
  }
}

export default router
