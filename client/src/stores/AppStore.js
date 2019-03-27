import { createStore,applyMiddleware,compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import mainReducer from '../reducers'
import rootSaga from '../sagas'
import setupSocket from '../sockets'

const initialState = {};

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

const store = createStore(
  mainReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })
  )
)

const socket = setupSocket(store.dispatch)

sagaMiddleware.run(rootSaga,{socket:socket})
export default store
