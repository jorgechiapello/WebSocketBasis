var history = require('./ChatHistory')

exports.init = function (express) {
  var routerAPI = express.Router()

  routerAPI.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' })
  })

  routerAPI.get('/rooms/:roomId',function (req,res) {
    console.log(req.params);
    res.json({message: history[req.params.roomId]})
  })
  return routerAPI;
}
