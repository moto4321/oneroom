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
      PostId: PostId,
      UserId: req.user.id
    })

    res.json("success")
  }

})

router.delete("/:id", async (req, res) => {
  const id = req.params.id // comment id

  await Comments.destroy({
    where : {
      id : id
    }
  })

  res.json("Comments deleted")
})

module.exports = router