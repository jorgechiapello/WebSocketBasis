import { combineReducers } from 'redux'
import panelReducer from './panelReducer'

const mainReducer = combineReducers({
  panel:panelReducer
})

export default mainReducer
