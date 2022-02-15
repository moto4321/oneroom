const jwt = require('jsonwebtoken')

const verifiedToken = (req, res, next) => {
  const accessToken = req.header("accessToken")

  if (!accessToken) {
    return res.json({
      error: "User is not logged in"
    })
  } else {
    // 정상 로직
    try {
      const validToken = jwt.verify(accessToken, "secret")
      req.user = validToken
      if (validToken) {
        next()
      }
    } catch (err) {
      res.json({error: err})
    }
  }
}


module.exports = { verifiedToken }