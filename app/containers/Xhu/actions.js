/*
 *
 * Xhu actions
 *
 */

import {
  LOAD_LIST,
  LOAD_LIST_SUCCESS,
  ADD_XHU,
  ADD_XHU_SUCCESS,
  DEL_XHU,
  DEL_XHU_SUCCESS,
} from './constants';

export function load_list() {
  return {
    type: LOAD_LIST,
    
  };
}
export function load_list_success(data) {
  return {
    type: LOAD_LIST_SUCCESS,
    data
  };
}
export function add_xhu(ne,gn,day,hu100,hu1000,hu10000,x100,x1000,x10000,active) {
  return {
    type: ADD_XHU,
    ne,gn,day,hu100,hu1000,hu10000,x100,x1000,x10000,active
  };
}
export function add_xhu_success() {
  return {
    type: ADD_XHU_SUCCESS,
    
  };
}
export function del_xhu(id) {
  return {
    type: DEL_XHU,
    id
  };
}
export function del_xhu_success(id) {
  return {
    type: DEL_XHU_SUCCESS,
    id
  };
}