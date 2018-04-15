/*
 *
 * Login actions
 *
 */

import {
  DEFAULT_ACTION,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_PHONE,
  CHANGE_PHONE,
  CHANGE_PASSWORD,
  CHANGE_REMEMBER,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function loginPhone(phone,password) {
  return {
    type: LOGIN_PHONE,
    phone,
    password,
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

export function changePhone(phone) {
  return {
    type: CHANGE_PHONE,
    phone,
  };
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}
export function changeRemember(remember) {
  return {
    type: CHANGE_REMEMBER,
    remember,
  };
}
