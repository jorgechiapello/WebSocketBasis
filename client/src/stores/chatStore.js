import { createStore,applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import mainReducer from '../reducers'

const initialState = {};

const middleware = [thunk]

const store = () =>( createStore(
  mainReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
))

export default store
