/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import md5 from 'blueimp-md5';

import {
  LOGIN_EMAIL,
  LOGOUT_EMAIL,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  REMEMBER_ME,
  NO_REMEMBER_ME,
} from './constants';

const initialState = fromJS({
  email: false,
  password: false,
  otp : false,
  loginSuccess: false,
  err: false,
  user: false,
  onLogOutFb: false,
  isLogedin: false,
  isLogOut: false,
  isRemember : false,
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_EMAIL:
      return state
        .set('err',false)
        .set('loginSuccess',false)
        .set('password',action.password)
        .set('email',action.email)
        .set('otp',action.otp)
    case LOGOUT_EMAIL:
      return state
        .set('isLogOut',true)
        .set('password',false)
        .set('email',false)
    case LOGIN_SUCCESS:
      return state
        .set('loginSuccess',true)
        .set('password',false)
        .set('email',false)
        .set('user',action.user)
        .set('err',false)
    case REMEMBER_ME:
      return state
        .set('isRemember',true);
    case NO_REMEMBER_ME:
      return state
        .set('isRemember',false);
    case LOGIN_ERROR:
      return state
        .set('err',action.error);
    case CHANGE_EMAIL:
      return state
        .set('email',action.email)
    case CHANGE_PASSWORD:
      return state
        .set('password',(action.password));

    default:
      return state;
  }
}

export default loginPageReducer;
