/*
 *
 * Messege actions
 *
 */

import {
  GET_ALL_MESS,
  GET_ALL_MESS_SUCCESS,
  SEND_ALL_MESS,
  SEND_ALL_MESS_SUCCESS,
  DEL_MESS,
  DEL_MESS_SUCCESS,
  SEND_SOME_MESS,
  SEND_SOME_MESS_SUCCESS,
  SUGGEST_USER_BY_NN,
  SUGGEST_USER_BY_NN_SUCCESS,
} from './constants';

export function suggest_user_by_nickname(key) {
  return {
    type: SUGGEST_USER_BY_NN,
    key,
  };
}
export function suggest_user_by_nickname_success(data) {
  return {
    type: SUGGEST_USER_BY_NN_SUCCESS,
    data,
  };
}

export function get_all_mess() {
  return {
    type: GET_ALL_MESS,
  };
}
export function get_all_mess_success(data) {
  return {
    type: GET_ALL_MESS_SUCCESS,
    data,
  };
}
export function send_all_mess(tt,mes) {
  return {
    type: SEND_ALL_MESS,
    tt,
    mes,
  };
}
export function send_all_mess_suceess(data) {
  return {
    type: SEND_ALL_MESS_SUCCESS,
    data,
  };
}
export function del_mess(id) {
  return {
    type: DEL_MESS,
    id,
  };
}
export function del_mess_suceess(id) {
  return {
    type: DEL_MESS_SUCCESS,
    id
  };
}
export function send_some_mess(lu,tt,mgs) {
  return {
    type: SEND_SOME_MESS,
    lu,
    tt,
    mgs,
  };
}
export function send_some_mess_success(data) {
  return {
    type: SEND_SOME_MESS_SUCCESS,
    data
  };
}