/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_PHONE,
  CHANGE_PHONE,
  CHANGE_PASSWORD,
  CHANGE_REMEMBER,
} from './constants';

const initialState = fromJS({
  phone: false,
  password: false,
  loginSuccess: false,
  err: false,
  user: false,
  onLogOutFb: false,
  isLogedin: false,
  isLogOut: false,
  isRemember: false,
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOGIN_PHONE:
      return state
        .set('err',false)
        .set('loginSuccess',false)
        .set('password',action.password)
        .set('phone',action.phone)
    case LOGIN_SUCCESS:
      return state
        .set('loginSuccess',true)
        .set('password',false)
        .set('email',false)
        .set('user',action.user)
        .set('err',false)
    case CHANGE_PHONE:
      return state
        .set('phone',action.phone)
    case CHANGE_PASSWORD:
      return state
        .set('password',(action.password));
    case LOGIN_ERROR:
      return state
        .set('err',action.error);
    case CHANGE_REMEMBER:
      return state
        .set('isRemember',action.remember);
    default:
      return state;
  }
}

export default loginReducer;
