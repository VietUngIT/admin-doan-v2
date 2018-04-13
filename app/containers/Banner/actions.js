/*
 *
 * Banner actions
 *
 */

import {
  LOAD_ALL_BANNER,
  LOAD_ALL_BANNER_SUCCESS,
  ADD_BANNER,
  ADD_BANNER_SUCCESS,
  DEL_BANNER,
  EDIT_BANNER,
  DEL_BANNER_SUCCESS,
  EDIT_BANNER_SUCCESS,
  CREATE_CHANGE_IMAGE,
  _IMAGE,
} from './constants';
export function _img(img) {
  return {
    type: _IMAGE,
    img
  };
}
export function load_all_banner() {
  return {
    type: LOAD_ALL_BANNER,
  };
}
export function load_all_banner_success(data) {
  return {
    type: LOAD_ALL_BANNER_SUCCESS,
    data,
  };
}
export function changeImage(file,fileName,url) {
  return {
    type: CREATE_CHANGE_IMAGE,
    file,
    fileName,
    url,
  };
}
export function add_banner(u) {
  return {
    type: ADD_BANNER,
    u
  };
}
export function add_banner_success() {
  return {
    type: ADD_BANNER_SUCCESS,
    
  };
}
export function del_banner(id) {
  return {
    type: DEL_BANNER,
    id,
  };
}
export function del_banner_success(id) {
  return {
    type: DEL_BANNER_SUCCESS,
    id,
  };
}
export function edit_banner(id,status,u) {
  return {
    type: EDIT_BANNER,
    id,
    status,
    u
  };
}
export function edit_banner_success() {
  return {
    type: EDIT_BANNER_SUCCESS,
    
  };
}