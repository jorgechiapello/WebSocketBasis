var mongoose = require('mongoose')
const Schema = mongoose.Schema

// Database
mongoose.connect('mongodb://localhost:27017/MongoChatDesk', { useNewUrlParser: true })

console.log('iniciado el MongoDB');

module.exports = mongoose.model("Chat", new Schema({
  id: Schema.Types.ObjectId,
  name:String,
  unRead:Boolean,
  messages:Array,
  date:Date
}))
