const express = require('express')
const router = express.Router()
const { Posts } = require('../models')
const { verifiedToken } = require('../middlewares/authMiddleware')

// 포스트 생성
router.post("/", verifiedToken, async (req, res) => {
  const { title, description } = req.body
  // console.log(req.user) // { id: 1, iat: 1643025956 }

  if (!title) {
    return res.json({ error: "title is required" })
  } else if (! description) {
    return res.json({ error: "Description is required" })
  } else {
    // 정상 로직
    await Posts.create({
      title: title,
      description: description,
      UserId: req.user.id 
    })
    // res.redirect("/") // 이건 왜 안되지?
    res.json("success")
  }
})

// 랜딩페이지에서 모든 포스트 보여주기
router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll()
  res.json({ listOfPosts: listOfPosts })
})

module.exports = router