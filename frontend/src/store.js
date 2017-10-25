import { applyMiddleware, createStore, compose } from 'redux'
import { autoRehydrate, persistStore } from 'redux-persist'
import { createLogger } from 'redux-logger'
import rootReducers from './rootReducer'
// Redux middleware that allows to pass functions to dispatch methods.
import thunk from 'redux-thunk'
// Redux middleware that allows to pass promises within the dispatch object.
import promiseMiddleware from 'redux-promise-middleware'
// Enables optimistic updates and dispatches pendling, fulfilled and rejected actions.
const middlewares = [promiseMiddleware(), thunk]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger())
}

const store = createStore(
  rootReducers,
  {},
  compose(applyMiddleware(...middlewares), autoRehydrate())
)

persistStore(store)

export default store
