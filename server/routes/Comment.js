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

  // const comment = await Comments.findOne({
  //   where : {
  //     id: id
  //   }
  // })

  // const postId = comment.PostId

  await Comments.destroy({
    where : {
      id : id
    }
  })

  // const comments = await Comments.findAll({
  //   where : {
  //     PostId: postId
  //   }
  // })

  // res.json(comments)

  res.json("Comments deleted")
})

module.exports = router