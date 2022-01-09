const express = require('express')
const app = express()
const PORT = 5000
const db = require('./models')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

app.use(express.json())
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
}))
app.use(cookieParser())

const authRouter = require('./routes/Auth')
app.use("/auth", authRouter)



// app.listen(PORT, () => {
//     console.log(`app is listening on port ${PORT}`)
// })

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`)
    })
})