/*
 *
 * LoginPage actions
 *
 */

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

export function rememberMe() {
  return {
    type: REMEMBER_ME,
  };
}
export function noRememberMe() {
  return {
    type: NO_REMEMBER_ME,
  };
}
export function loginEmail(email,password,otp) {
  return {
    type: LOGIN_EMAIL,
    email,
    password,
    otp,
  };
}
export function logOutEmail() {
  return {
    type: LOGOUT_EMAIL,

  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}
export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}
