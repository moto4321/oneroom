const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const jwt = require('express-jwt') // not used


router.post("/registration", async (req, res) => {
  const { email, password } = req.body
  const existEmail = await Users.findOne({ where: { email: email } })

  if (existEmail) {
    res.json({error: "User email already exist"})
  } else {
    // User table에 정상적인 create
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        email: email,
        password: hash,
      })
      res.json("SUCCESS")
    })

  }

})

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  const user = await Users.findOne({ where: { email: email } })

  // console.log(user.email)
  // console.log(user.password)
  if (!user) {
    res.json({ error: "This email doesn't exist" })
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "Password is wrong"})
      } else {
        const accessToken = jsonwebtoken.sign({
          username: user.username,
          id: user.id
        }, "secret")

        res.cookie('user', accessToken, {
          httpOnly: true
        })
        // console.log(req.cookies)
        res.json({
          token: accessToken,
          username: user.username,
          id: user.id
        })
      }
    })
  }
})

router.get("/logout", async (req, res) => {
  res.clearCookie('user', {
    httpOnly: true,
  })
  res.json({
    hello: "world"
  })
})

// router.use(jwt({ secret: "secret", algorithms: ['HS256'] }));


module.exports = router