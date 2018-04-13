/*
 *
 * GittCode actions
 *
 */

import {
  LOAD_GITT,
  GEN_GITT,
  LOAD_GITT_SUCCESS,
  GEN_GITT_SUCCESS,
  COUNT_GITT_GTT,
  COUNT_GITT_GCD,
  COUNT_GITT_GHV,
  COUNT_GITT_GTT_SUCCESS,
  COUNT_GITT_GCD_SUCCESS,
  COUNT_GITT_GHV_SUCCESS,
  SEARCH_NN,
  SEARCH_NN_SUCCESS,
  SEARCH,
  SEARCH_SUCCESS,
  DEL,
  DEL_SUCCESS,
  SEARCH_CODE,
  SEARCH_CODE_SUCCESS,
} from './constants';

export function searchCode(code) {
  return {
    type: SEARCH_CODE,
    code,
  };
}
export function searchCodeSuccess(data) {
  return {
    type: SEARCH_CODE_SUCCESS,
    data,
  };
}
export function del(id) {
  return {
    type: DEL,
    id,
  };
}
export function del_success(id) {
  return {
    type: DEL_SUCCESS,
    id
  };
}
export function search(date,c,t,ad,v,nn) {
  return {
    type: SEARCH,
    date,
    c,
    t,
    ad,
    v,
    nn
  };
}
export function searchSuccess(data) {
  return {
    type: SEARCH_SUCCESS,
    data
  };
}
export function loadGitt() {
  return {
    type: LOAD_GITT,
  };
}

export function loadGittSuccess(data) {
  return {
    type: LOAD_GITT_SUCCESS,
    data
  };
}
export function genGitt(t,a,st,et,c,v) {
  return {
    type: GEN_GITT,
    t,
    a,
    st,
    et,
    c,
    v
  };
}
export function genGittSuccess(data) {
  return {
    type: GEN_GITT_SUCCESS,
    data
  };
}
export function countGittGTT() {
  return {
    type: COUNT_GITT_GTT,
    
  };
}
export function countGittGTTSuccess(data) {
  return {
    type: COUNT_GITT_GTT_SUCCESS,
    data,
  };
}
export function countGittGCD() {
  return {
    type: COUNT_GITT_GCD,
    
  };
}
export function countGittGCDSuccess(data) {
  return {
    type: COUNT_GITT_GCD_SUCCESS,
    data,
  };
}
export function countGittGHV() {
  return {
    type: COUNT_GITT_GHV,
    
  };
}
export function countGittGHVSuccess(data) {
  return {
    type: COUNT_GITT_GHV_SUCCESS,
    data,
  };
}
export function searchNN(un) {
  return {
    type: SEARCH_NN,
    un
  };
}
export function searchNNSuccess(data) {
  return {
    type: SEARCH_NN_SUCCESS,
    data
  };
}