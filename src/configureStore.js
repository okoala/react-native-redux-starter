import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import apiMiddleware from './middleware/api'
import afterApiMiddleware from './middleware/afterApi'
import rootReducer from './reducers/index'

let createStoreWithMiddleware = compose(
    applyMiddleware(
      thunkMiddleware,
      apiMiddleware,
      afterApiMiddleware
    )
  )(createStore)

export default function configureStore (initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
