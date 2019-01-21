import { combineReducers } from 'redux'
import chatPanelReducer from './chatPanelReducer'

const mainReducer = combineReducers({
  panel:chatPanelReducer
})

export default mainReducer
