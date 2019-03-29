const newMessage = (message,name,replyMessage,userId = null,userRol) => ({
  unRead:true,
  message:message,
  name:name,
  date:Date.now(),
  userId:userId,
  userRol:userRol,
  replyMessage:replyMessage
})

module.exports = newMessage
