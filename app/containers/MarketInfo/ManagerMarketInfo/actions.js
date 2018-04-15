/*
 *
 * ManagerMarketInfo actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_CATE_NEWS_MK_ACTION,
  GET_LIST_CATE_NEWS_MK_ACTION_SUCCESS,
  NAME_GET_SUB_CATE_MK_BY_CATE_ACTION,
  ADD_CATE_NEWS_MK_ACTION,
  ADD_CATE_NEWS_MK_ACTION_SUCCESS,
  DEL_CATE_NEWS_MK_ACTION,
  DEL_CATE_NEWS_MK_ACTION_SUCCESS,
  EDIT_CATE_NEWS_MK_ACTION,
  EDIT_CATE_NEWS_MK_ACTION_SUCCESS,
} from './constants';

export function editCateNewsMK(id,name) {
  return {
    type: EDIT_CATE_NEWS_MK_ACTION,
    id,
    name,
  };
}
export function editCateNewsMKSuccess(data) {
  return {
    type: EDIT_CATE_NEWS_MK_ACTION_SUCCESS,
    data,
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
export function getNameCateMK(name) {
  return {
    type: NAME_GET_SUB_CATE_MK_BY_CATE_ACTION,
    name,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
