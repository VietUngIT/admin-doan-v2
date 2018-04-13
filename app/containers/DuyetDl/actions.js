/*
 *
 * DuyetDl actions
 *
 */

import {
  LOAD_DUYET_DL,
  TOTAL_PAGE,
  DUYET_DL,
  LOAD_DUYET_DL_SUCCESS,
  DUYET_DL_SUCCESS,
  LOAD_DUYET_DL_CONFIRM,
  LOAD_DUYET_DL_NOT_CONFIRM,
  LOAD_DUYET_DL_CANCEL,
  HUY_DUYET_DL_SUCCESS,
  HUY_DUYET_DL,
  DETAIL_DUYET_DL,
  DETAIL_DUYET_DL_SUCCESS,
} from './constants';

export function detail_duyet_dl(id) {
  return {
    type: DETAIL_DUYET_DL,
    id,
    
  };
}
export function detail_duyet_dl_success(data) {
  return {
    type: DETAIL_DUYET_DL_SUCCESS,
    data,
    
  };
}
export function load_duyet_dl(page) {
  return {
    type: LOAD_DUYET_DL,
    page,
    
  };
}
export function load_duyet_dl_confirm(page) {
  return {
    type: LOAD_DUYET_DL_CONFIRM,
    page,
    
  };
}
export function load_duyet_dl_cancel(page) {
  return {
    type: LOAD_DUYET_DL_CANCEL,
    page,
    
  };
}
export function load_duyet_dl_not_confirm(page) {
  return {
    type: LOAD_DUYET_DL_NOT_CONFIRM,
    page,
    
  };
}
export function load_duyet_dl_success(data) {
  return {
    type: LOAD_DUYET_DL_SUCCESS,
    data
  };
}
export function total_page(total) {
  return {
    type: TOTAL_PAGE,
    total
  };
}
export function duyet_dl(id) {
  return {
    type: DUYET_DL,
    id
  };
}
export function duyet_dl_success() {
  return {
    type: DUYET_DL_SUCCESS,
    
  };
}

export function huy_duyet_dl(id) {
  return {
    type: HUY_DUYET_DL,
    id,
  };
}
export function huy_duyet_dl_success() {
  return {
    type: HUY_DUYET_DL_SUCCESS,
    
  };
}