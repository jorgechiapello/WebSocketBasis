var history = require('./ChatHistory')

exports.init = function (express) {
  var routerAPI = express.Router()

  routerAPI.get('/chats', function(req, res) {
    res.json(history.map(elem => ({
      id: elem.id,
      name: elem.name,
      messages: []
    }) ))
  })

  routerAPI.get('/chats/:chatId',function (req,res) {
    res.json( history.find( elem =>(elem.id == req.params.chatId) ) )
  })
  return routerAPI;
}
