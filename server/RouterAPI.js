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
    if (req.params.chatId == 5) {
      res.json(   {
        id:5,
        name:'chat5',
        unRead:false,
        messages:[
          {
            id:1,
            unRead:false,
            message:'una consultita',
            handle:'Fulano'
          }
        ],
      },
    )
  }
  
  res.json( history.find( elem =>(elem.id == req.params.chatId) ) )
})
return routerAPI;
}
