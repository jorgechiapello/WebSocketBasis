const jwt = require('express-jwt')
const secret = { secret: process.env.SECRET || 'example' }
module.exports = {
  myLogger:function (req, res, next) {
    next();
  },
  requestTime: function (req, res, next) {
    req.requestTime = Date.now();
    next();
  },
  checkJWT:jwt(secret,"HS256"),
}
