import { ToastAndroid } from 'react-native'
import Immutable from 'immutable';
import { createReducer } from 'utils';

import * as Action from '../constants/ActionTypes';
import * as STATUS from '../constants/Status';

const initState = Immutable.fromJS({
  userData: null,
  hasAlter: false
});

export default createReducer(initState, {
  [Action.UPDATE_USER_DATA]: (state, action) => {
    return state.setIn('userData', action.data);
  },

  [STATUS.ALTER_PASSWORD_SUCCESS]: (state) => {
    ToastAndroid.show('修改密码成功', ToastAndroid.LONG)
    return state.set('hasAlter', true);
  },

  [STATUS.ALTER_PASSWORD_FAILURE]: (state) => {
    ToastAndroid.show('修改密码失败', ToastAndroid.LONG)
    return state;
  }
});
