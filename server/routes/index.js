const express = require('express');
const path = require('path');

const router = express.Router();

// router.use('/api/sample', require('./sample'))
router.use('/uploads', express.static('uploads'))
const authRouter = require('./Auth')
app.use('/auth', authRouter)
const postRouter = require('./Post')
app.use('/post', postRouter)
const commentRouter = require('./Comment')
app.use('/comment', commentRouter)

module.exports = router;