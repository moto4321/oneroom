const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const jwt = require('express-jwt') // not used
const cookieParser = require('cookie-parser')
const { verifiedToken } = require('../middlewares/authMiddleware')
const puppeteer = require('puppeteer')

router.get("/", verifiedToken, (req, res) => {
  res.json(req.user)
})

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
        grade: null
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
        }, process.env.JWT_SECRET)

        res.json({
          token: accessToken,
          username: user.username,
          id: user.id
        })
      }
    })
  }
})

router.post("/zigbang/login", (req, res) => {
  const { email, password } = req.body
  // 직방로그인
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`https://accounts.kakao.com/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fencode_state%3Dtrue%26response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Faccount.zigbang.com%252Fv2%252Foauth%252Fcallback%26state%3D%257B%2522provider%2522%253A%2522kakao%2522%252C%2522zigbang_client_id%2522%253A%2522zigbang%2522%252C%2522redirect_url%2522%253A%2522https%253A%252F%252Fwww.zigbang.com%252Foauth%252Fcallback%2522%257D%26client_id%3D63934eee1ea969c5b8e3bb402eecb944`)
  await page.evaluate((id, pw) => {
    document.querySelector('input[name="id]').value = id
    document.querySelector('input[name="password"]').value = pw
  }, email, password)
  
  // 로그인 버튼 클릭
  await page.click('.submit')

  // 로그인 화면이 전환될 때까지 .5초간 기다려라 => 이게 필요한가?
  await page.waitFor(500)

  // 내가 북마크한 정보들 크롤링

  // 홈으로 redirect
})

module.exports = router