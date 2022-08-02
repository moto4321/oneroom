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
    console.log(1)
    // await page.waitForNavigation();
    // 카카오 로그인 버튼 클릭
    console.log(99)
    await page.click('#kakao_로그인 > div.css-901oao.r-1b277g5.r-143r1dj.r-ubezar')
    // 페이지가 전부 로드된 후 작업실행
    console.log(2)
    // await page.waitForNavigation();
    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    if (page.url() === 'https://account.zigbang.com/v2/oauth/login?provider=kakao') {
      await page.goto(zigbangUrl)
    } else {
      // 이메일 패스워드 input값 입력
      await page.type( "#id_email_2", email);
      await page.type( "#id_password_3", password);
      // // 로그인 버튼 클릭
      await page.click('.submit')
    }

    // 내가 북마크한 정보들 크롤링
    await page.goto(`https://www.zigbang.com/item/zzim`)
    const selector = "body > div.wrap > div.container > div > div.content.left-content > div > div.zzim-list > a:nth-child(2) > div > div.i-tit > strong"
    await page.waitForSelector(selector)
    const data = await page.$eval(selector, (elem) => elem.textContent)

    console.log(data)
  })

  //




  // const browser = await puppeteer.launch()
  // const page = await browser.newPage()

  
  // // 페이지가 전부 로드된 후 작업실행
  // console.log(1)
  // await page.waitForNavigation();
  // // 카카오 로그인 버튼 클릭
  // console.log(99)
  // await page.click('#kakao_로그인 > div.css-901oao.r-1b277g5.r-143r1dj.r-ubezar')
  // // 페이지가 전부 로드된 후 작업실행
  // console.log(2)
  // await page.waitForNavigation();
  // // 이메일 패스워드 input값 입력
	// await page.type( "#id_email_2", email);
	// await page.type( "#id_password_3", password);
  // // // 로그인 버튼 클릭
  // await page.click('.submit')
  // // 페이지가 전부 로드된 후 작업실행
  // console.log(3)
  // await page.waitForNavigation();

  // // 내가 북마크한 정보들 크롤링
  // await page.goto(`https://www.zigbang.com/item/zzim`)
  // const selector = "body > div.wrap > div.container > div > div.content.left-content > div > div.zzim-list > a:nth-child(2) > div > div.i-tit > strong"
  // await page.waitForSelector(selector)
  // const data = await page.$eval(selector, (elem) => elem.textContent)

  // console.log(data)
  // if (page.url() === zigbangLoginUrl) {
  //   // 로그인 실패
  // } else {
  //   // 내가 북마크한 정보들 크롤링
  //   await page.goto(`https://www.zigbang.com/item/zzim`)
  //   // body > div.wrap > div.container > div > div.content.left-content > div > div.zzim-list
  //   const selector = "body > div.wrap > div.container > div > div.content.left-content > div > div.zzim-list > a:nth-child(2) > div > div.i-tit > strong"
  //   await page.waitForSelector(selector)

  //   const data = await page.$eval(selector, (elem) => elem.textContent)

  //   console.log(data)

    // 홈으로 redirect
  // }

  


})

module.exports = router