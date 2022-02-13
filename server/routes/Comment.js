const express = require('express')
const router = express.Router()
const { Posts, Comments } = require('../models')
const { verifiedToken } = require('../middlewares/authMiddleware')

router.post("/", verifiedToken, async (req, res) => {
  const { newComment, PostId } = req.body
  // console.log(req.body)
  if (!newComment) {
    res.json({ error: 'Comment is required' })
  } else {
    await Comments.create({
      comment: newComment,
      PostId: PostId
    })

    res.json("success")
  }

})

module.exports = router