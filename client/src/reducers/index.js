import { combineReducers } from 'redux'
import chatPanelReducer from './chatPanelReducer'
import authReducer from './authReducer'

const mainReducer = combineReducers({
  panel:chatPanelReducer,
  authentication:authReducer
})

export default mainReducer
