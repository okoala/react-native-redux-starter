import { createReducer } from '../utils'

import * as Action from '../constants/ActionTypes'
import * as STATUS from '../constants/Status'

const initState = {
  foo: 'Hello World!'
}

export default createReducer(initState, {
  [Action.GRAPHQL_ACTION]: (state, action) => {
    return Object.assgin(state, action);
  }
})
