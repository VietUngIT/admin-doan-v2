/*
 *
 * Notification actions
 *
 */

import {
  GET_ALL_NOTI,
  GET_ALL_NOTI_SUCCESS,
  ADD_NOTI,
  ADD_NOTI_SUCCESS,
  DEL_ALL_NOTI,
  DEL_ALL_NOTI_SUCCESS,
  EDIT_NOTI,
  EDIT_NOTI_SUCCESS,
  DEL_NOTI,
  DEL_NOTI_SUCCESS,
} from './constants';

export function get_all_noti() {
  return {
    type: GET_ALL_NOTI,
  };
}
export function get_all_noti_success(data) {
  return {
    type: GET_ALL_NOTI_SUCCESS,
    data,
  };
}
export function add_noti(b,et) {
  return {
    type: ADD_NOTI,
    b,
    et,
  };
}
export function add_noti_success() {
  return {
    type: ADD_NOTI_SUCCESS,
    
  };
}
export function del_all_noti() {
  return {
    type: DEL_ALL_NOTI,
    
  };
}
export function del_all_noti_success() {
  return {
    type: DEL_ALL_NOTI_SUCCESS,
    
  };
}
export function edit_noti(id,b) {
  return {
    type: EDIT_NOTI,
    id,
    b
  };
}
export function edit_noti_success(data) {
  return {
    type: EDIT_NOTI_SUCCESS,
    data,
  };
}
export function del_noti(id) {
  return {
    type: DEL_NOTI,
    id,
    
  };
}
export function del_noti_success(id) {
  return {
    type: DEL_NOTI_SUCCESS,
    id,
  };
}