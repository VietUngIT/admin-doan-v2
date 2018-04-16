/*
 *
 * CateMarketInfo actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_CATE_NEWS_MK_ACTION,
  GET_LIST_CATE_NEWS_MK_ACTION_SUCCESS,
  ADD_CATE_NEWS_MK_ACTION,
  ADD_CATE_NEWS_MK_ACTION_SUCCESS,
  DEL_CATE_NEWS_MK_ACTION,
  DEL_CATE_NEWS_MK_ACTION_SUCCESS,
} from './constants';
export function getListCateNewsMK() {
  return {
    type: GET_LIST_CATE_NEWS_MK_ACTION,
  };
}
export function getListCateNewsMKSuccess(cateMK) {
  return {
    type: GET_LIST_CATE_NEWS_MK_ACTION_SUCCESS,
    cateMK,
  };
}
export function delCateNewsMK(id) {
  return {
    type: DEL_CATE_NEWS_MK_ACTION,
    id,
  };
}
export function delCateNewsMKSuccess(id) {
  return {
    type: DEL_CATE_NEWS_MK_ACTION_SUCCESS,
    id,
  };
}

export function addCateNewsMK(nameCate) {
  return {
    type: ADD_CATE_NEWS_MK_ACTION,
    nameCate,
  };
}
export function addCateNewsMKSuccess(cate) {
  return {
    type: ADD_CATE_NEWS_MK_ACTION_SUCCESS,
    cate,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
