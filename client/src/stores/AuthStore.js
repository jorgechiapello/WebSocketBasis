import { createStore,applyMiddleware,compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import authSaga from '../sagas/authSaga'
import authReducer from '../reducers/authReducer'

const initialState = {loggedIn: false};

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

const authStore = createStore(
  authReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)


sagaMiddleware.run(authSaga)
export default authStore
