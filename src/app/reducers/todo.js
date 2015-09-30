import Immutable from 'immutable';
import { createReducer } from '../utils';

import * as Action from '../constants/ActionTypes';
import * as STATUS from '../constants/Status';

const initState = Immutable.fromJS({
  foo: 'Hello World!'
});

export default createReducer(initState, {
  [Action.GRAPHQL_ACTION]: (state, action) => {
    return state.mergeDeep(action);
  }
});
