/**
 * 登陆中间件
 *
 */
import * as STATUS from '../constants/Status';

export default store => next => action => {
  // 对于失败的请求，且需要登录的
  // if (!action.passMiddleware && action.status === 'failure') {
  //   switch (RES_CODE[action.code]) {
  //   case STATUS.NEED_LOGIN:
  //     action.type = 'LOGIN_MODAL_OPEN';
  //     break;
  //   default:
  //     break;
  //   }
  // }

  next(action);
};
