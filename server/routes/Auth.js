const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const jwt = require('express-jwt') // not used
const cookieParser = require('cookie-parser')
const { verifiedToken } = require('../middlewares/authMiddleware')
const puppeteer = require('puppeteer')

const zigbangUrl = 'https://www.zigbang.com/'
const zigbangKakaoUrl = 'https://account.zigbang.com/login'
const itemList = []

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

router.post("/zigbang/login", async (req, res) => {
  const { email, password } = req.body
  // 직방 카카오로그인만 현재 구현
  console.log(email, password)

  //
  puppeteer.launch({
    headless: false
  }).then(async browser => {
    const page = await browser.newPage();
    // 직방 카카오 로그인 전 페이지
    await page.goto(zigbangKakaoUrl)
    // 페이지가 전부 로드된 후 작업실행
    // 카카오 로그인 버튼 클릭
    await page.click('#kakao_로그인 > div.css-901oao.r-1b277g5.r-143r1dj.r-ubezar')
    // 페이지가 전부 로드된 후 작업실행
    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    if (page.url() === 'https://account.zigbang.com/v2/oauth/login?provider=kakao') {
      await page.goto(zigbangUrl)
      await page.waitForNavigation({ waitUntil: 'networkidle0' })
      console.log(page.url())
      await page.click('.i_account')
      await page.waitForNavigation({ waitUntil: 'networkidle0' })
      console.log(page.url())
      await page.click('#kakao_로그인')
      await page.waitForSelector('#id_email_2')
      console.log('aaa', page.url())
      // 이메일 패스워드 input값 입력
      await page.type( "#id_email_2", email);
      await page.type( "#id_password_3", password);
      // 로그인 버튼 클릭
      await page.click('.submit')
    } else {
      // 이메일 패스워드 input값 입력
      await page.type( "#id_email_2", email);
      await page.type( "#id_password_3", password);
      // // 로그인 버튼 클릭
      await page.click('.submit')
    }

    page.waitForNavigation()

    await page.waitForTimeout(30000)
    await page.goto(`https://www.zigbang.com/item/zzim`)

    // 내가 북마크한 정보들 크롤링
    const selector = 'body > div.wrap > div.container > div > div.content.left-content > div > div.zzim-list'
    await page.waitForSelector(selector)
    const data = await page.$eval(selector, (elem) => elem.textContent)

    console.log(data)
  })
})

module.exports = router