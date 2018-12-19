var history = require('./ChatHistory')

exports.init = function (express) {
  var routerAPI = express.Router()

  routerAPI.get('/chats', function(req, res) {
    res.json(history)
  })

  routerAPI.get('/chats/:chatId',function (req,res) {
    res.json({message: history[req.params.chatId]})
  })
  return routerAPI;
}
