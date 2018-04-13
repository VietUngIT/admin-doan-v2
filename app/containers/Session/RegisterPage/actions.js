/*
 *
 * RegisterPage actions
 *
 */

import {
  CHANGE_FIRST_NAME,
  CHANGE_LAST_NAME,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  REGISTER_EMAIL,
  REGISTER_EMAIL_SUCCESS,
  CHANGE_NAME,
} from './constants';

export function changeName(name) {
  return {
    type: CHANGE_NAME,
    name,
  };
}
export function changeFirstName(first_name) {
  return {
    type: CHANGE_FIRST_NAME,
    first_name,
  };
}
export function changeLastName(last_name) {
  return {
    type: CHANGE_LAST_NAME,
    last_name,
  };
}
export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email
  };
}
export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password
  };
}
export function registerEmail() {
  return {
    type: REGISTER_EMAIL,
  };
}
export function registerEmailSuccess(user_info) {
  return {
    type: REGISTER_EMAIL_SUCCESS,
    user_info,
  };
}
