var history = require('./ChatHistory')
let ChatModel = require('./model/chatModel')

exports.init = (express) => {
  var routerAPI = express.Router()

  routerAPI.get('/chats',async (req, res)=>{
    let query = ChatModel.find({},null,{limit: 10})
    let queryRes = await query.exec()
    res.json(queryRes)
  })

  routerAPI.get('/chats/:chatId',async(req,res) => {
    try {
      let query = ChatModel.findById(req.params.chatId, (err,chat)=>{
        // if (err) {console.error(err)}
      })
      var queryRes = await query.exec()
    } catch (e) {
      queryRes = null
    }
    res.json(queryRes || [])
  })
  return routerAPI;
}
