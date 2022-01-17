const express = require('express')
const router = express.Router()
const { Posts } = require('../models')

router.post("/", (req, res) => {
  const { title, description } = req.body

  if (!title) {
    return res.json({ error: "title is required" })
  } else if (! description) {
    return res.json({ error: "Description is required" })
  } else {
    // 정상 로직
    Posts.Create()
  }

  res.json({
    
  })
})