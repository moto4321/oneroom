const express = require('express')
const app = express()
const PORT = 5000
const db = require('./models')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

app.use(express.json())
app.use(cookieParser())
// app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
}))

const authRouter = require('./routes/Auth')
app.use("/auth", authRouter)

// const postRouter = require('./routes/Post')
// app.use("/post", postRouter)



// app.listen(PORT, () => {
//     console.log(`app is listening on port ${PORT}`)
// })

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`)
    })
})