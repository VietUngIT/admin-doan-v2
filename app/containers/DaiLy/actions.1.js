/*
 *
 * DaiLy actions
 *
 */

import {
  LOAD_DAILY,
  TOTAL_DAILY,
  LOAD_DAILY_SUCCESS,
  ADD_DAILY,
  ADD_DAILY_SUCCESS,
  UPDATE_DAILY,
  UPDATE_DAILY_SUCCESS,
  DEL_DAILY,
  DEL_DAILY_SUCCESS,
  LOAD_MANAGER_SUCCESS,
  LOAD_MANAGER
} from './constants';

export function load_DL(page) {
  return {
    type: LOAD_DAILY,
    page,
  };
}
export function load_manager() {
  return {
    type: LOAD_MANAGER,
  };
}
export function load_manager_success(manager) {
  return {
    type: LOAD_MANAGER_SUCCESS,
    manager,
  };
}
export function total_DL(total) {
  return {
    type: TOTAL_DAILY,
    total,
  };
}
export function load_DL_Success(data) {
  return {
    type: LOAD_DAILY_SUCCESS,
    data,
  };
}
export function update_DL(na,p,a,f,nn) {
  return {
    type: UPDATE_DAILY,
    na,
    p,
    a,
    f,
    nn,
  };
}
export function update_DL_Success() {
  return {
    type: UPDATE_DAILY_SUCCESS,
  };
}
export function add_DL(na,p,a,f,nn) {
  return {
    type: ADD_DAILY,
    na,
    p,
    a,
    f,
    nn,
  };
}
export function add_DL_Success() {
  return {
    type: ADD_DAILY_SUCCESS,
  };
}
export function del_DL(nn) {
  return {
    type: DEL_DAILY,   
    nn,
  };
}
export function del_DL_Success(nn) {
  return {
    type: DEL_DAILY_SUCCESS,
    nn,
  };
}