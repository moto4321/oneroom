const express = require('express')
const app = express()
const PORT = 3001
const db = require('./models')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const multer = require('multer')
const dotenv = require('dotenv')

dotenv.config()
app.use(express.json())
app.use(cookieParser())
// app.use(express.urlencoded({ extended: true }))
// app.use(cors({
//   origin: true,
//   credentials: true,
//   methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
// }))
app.use(cors())
// 기타 express 코드
// const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });
// app.post('/up', upload.single('img'), (req, res) => {
//   console.log(req.file); 
// });

// app.use('/uploads', express.static('uploads'));
app.use("/uploads", express.static('uploads'))

const authRouter = require('./routes/Auth')
app.use("/auth", authRouter)

const postRouter = require('./routes/Post')
app.use("/post", postRouter)




// app.listen(PORT, () => {
//     console.log(`app is listening on port ${PORT}`)
// })

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`)
    })
})