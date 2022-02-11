const express = require('express')
const router = express.Router()
const { Posts, Comments } = require('../models')
const { validateToken } = require('../middlewares/authMiddleware')

router.post("/", validateToken, async (req, res) => {
  const { comment } = req.body
  
  if (!comment) {
    res.json({ error: 'Comment is required' })
  } else {
    await Comments.create({
      comment: comment,
      PostId: 
    })

    res.json("success")
  }

})

module.exports = router