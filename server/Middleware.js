module.exports = {
  myLogger:function (req, res, next) {
    console.log('LOGGED');
    next();
  },
  requestTime: function (req, res, next) {
    req.requestTime = Date.now();
    next();
  }
}
