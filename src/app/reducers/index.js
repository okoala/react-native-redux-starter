import { combineReducers } from 'redux'
import user from './user'
import todo from './todo'

export default combineReducers({
  user,
  todo
})
