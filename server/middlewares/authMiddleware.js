const jsonwebtoken = require('jsonwebtoken')

const verifiedToken = (req, res, next) => {
  const accessToken = req.header("")

  if (!accessToken) {
    return res.json({
      error: "User is not logged in"
    })
  } else {
    // 정상 로직
    
  }
}