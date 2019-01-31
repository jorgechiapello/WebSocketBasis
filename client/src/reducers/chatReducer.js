const chatReducer = (state = {}, action) => {
  var newArray, newObject
  switch (action.type) {

    case "PUSH_MESSAGE":
    newArray = state.messages.concat(action.message)
    newObject = Object.assign({}, state)
    newObject.messages = newArray
    newObject.unRead = false
    return newObject

    default:
    return state
  }
}

export default chatReducer
