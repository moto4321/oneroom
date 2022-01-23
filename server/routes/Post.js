const express = require('express')
const router = express.Router()
const { Posts } = require('../models')

// 미들웨어 삽입
router.post("/", async (req, res) => {
  // const { title, description } = req.body
  console.log(req.headers)
  console.log(req.body)

  // if (!title) {
  //   return res.json({ error: "title is required" })
  // } else if (! description) {
  //   return res.json({ error: "Description is required" })
  // } else {
  //   // 정상 로직
  //   await Posts.create({
  //     title: title,
  //     description: description,
  //     // UserId: 
  //   })
  //   res.redirect("/")
  // }
})

// middleware validate token 추가
router.get("/", async (req, res) => {
  const listOfPosts = Posts.findAll()
})

module.exports = router