/*
 *
 * ListMarketPrice actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_MP_ACTION,
  GET_LIST_MP_ACTION_SUCCESS,
  DEL_LIST_MP_ACTION,
  DEL_LIST_MP_ACTION_SUCCESS,
} from './constants';

export function deleteNewsMP(id) {
  return {
    type: DEL_LIST_MP_ACTION,
    id,
  };
}
export function deleteNewsMPSuccess(id) {
  return {
    type: DEL_LIST_MP_ACTION_SUCCESS,
    id,
  };
}
export function getListMP(id,page) {
  return {
    type: GET_LIST_MP_ACTION,
    id,
    page,
  };
}
export function getListMPSuccess(listNews,total) {
  return {
    type: GET_LIST_MP_ACTION_SUCCESS,
    listNews,
    total,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
