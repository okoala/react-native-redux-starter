/**
 * 登陆相关的业务逻辑
 *
 */
import { CALL_API } from '../middleware/api';
import * as Action from '../constants/ActionTypes'
import * as STATUS from '../constants/Status';
import * as API from '../constants/API';

export function test (text) {
  return { type: Action.TEST, text }
}

export function testAsync (text) {
  return dispatch => {
    dispatch(test(text))

    setTimeout(() => {
      dispatch(test(`${text} async`))
    }, 2000)
  }
}

// export function submitAlterPassword (params) {
//   return (dispatch) => dispatch({
//     [CALL_API]: {
//       api: API.API_USER_ALTER_PASSWORD,
//       method: 'POST',
//       types: [STATUS.ALTER_PASSWORD_SUCCESS, STATUS.ALTER_PASSWORD_FAILURE],
//       params: params
//     }
//   });
// }
