import { combineReducers } from 'redux'
import messages from './messages'

const chatReducer = combineReducers({
  messages,
})

export default chatReducer
