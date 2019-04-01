var history = require('./ChatHistory')
let ChatModel = require('./model/chatModel')

exports.init = (express) => {
  var routerAPI = express.Router()

  routerAPI.get('/chats',async (req, res)=>{
    let query = ChatModel.aggregate(
      [{ $project:
        {
          _id:1,
          name:1,
          unRead:1,
          client:1,
          date:1,
          lastMessage:
          {
            $arrayElemAt: ["$messages",-1  ]
          }
        }
      }]
    ).sort( { date: -1 } ).limit(15)
    let queryRes = await query.exec()
    res.json(queryRes)
  })

  routerAPI.get('/chats/:chatId',async(req,res) => {
    try {
      let query = ChatModel.findById(req.params.chatId, (err,chat)=>{
        // if (err) {console.error(err)}
      })
      var queryRes = await query.exec()
      res.json(queryRes || [])
    } catch (e) {
      res.status(500).send( {message: "Error al recuperar mensajes"} )
    }
  })
  return routerAPI;
}
