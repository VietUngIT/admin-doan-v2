/*
 *
 * Even actions
 *
 */

import {
  GET_EVEN,
  ADD_EVEN,
  DEL_EVEN,
  ACTIVE_EVEN,
  GET_EVEN_SUCCESS,
  ADD_EVEN_SUCCESS,
  DEL_EVEN_SUCCESS,
  ACTIVE_EVEN_SUCCESS,
  GET_ACTIVE,
 
} from './constants';

export function getEven() {
  return {
    type: GET_EVEN,
  };
}
export function getEvenSuccess(data) {
  return {
    type: GET_EVEN_SUCCESS,
    data,
  };
}
export function addEven(gid,un,b) {
  return {
    type: ADD_EVEN,
    gid,
    un,
    b
  };
}
export function addEvenSuccess(data) {
  return {
    type: ADD_EVEN_SUCCESS,
    data,
  };
}
export function delEven(id) {
  return {
    type: DEL_EVEN,
    id,
  };
}
export function delEvenSuccess(data) {
  return {
    type: DEL_EVEN_SUCCESS,
    data,
  };
}
export function activeEven(t) {
  return {
    type: ACTIVE_EVEN,
    t,
  };
}
export function activeEvenSuccess(data) {
  return {
    type: ACTIVE_EVEN_SUCCESS,
    data,
  };
}
export function getActive(ac) {
  return {
    type: GET_ACTIVE,
    ac,
  };
}
