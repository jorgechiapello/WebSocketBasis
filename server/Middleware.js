module.exports = {
  myLogger:function (req, res, next) {
    next();
  },
  requestTime: function (req, res, next) {
    req.requestTime = Date.now();
    next();
  }
}
