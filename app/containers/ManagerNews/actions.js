/*
 *
 * ManagerNews actions
 *
 */

import {
  DEFAULT_ACTION,
  ADD_CATE_NEWS_ACTION,
  ADD_CATE_NEWS_ACTION_SUCCESS,
  GET_LIST_CATE_NEWS_ACTION,
  GET_LIST_CATE_NEWS_ACTION_SUCCESS,
  DEL_CATE_NEWS_ACTION,
  DEL_CATE_NEWS_ACTION_SUCCESS,
  EDIT_CATE_NEWS_ACTION,
  EDIT_CATE_NEWS_ACTION_SUCCESS,
  NAME_GET_LIST_NEWS_BY_CATE_ACTION,
} from './constants';

export function getListNewsByCate(name) {
  return {
    type: NAME_GET_LIST_NEWS_BY_CATE_ACTION,
    name,
  };
}

export function editCateNews(id,nameCate) {
  return {
    type: EDIT_CATE_NEWS_ACTION,
    id,
    nameCate,
  };
}
export function editCateNewsSuccess(data) {
  return {
    type: EDIT_CATE_NEWS_ACTION_SUCCESS,
    data,
  };
}

export function delCateNews(id) {
  return {
    type: DEL_CATE_NEWS_ACTION,
    id,
  };
}
export function delCateNewsSuccess(id) {
  return {
    type: DEL_CATE_NEWS_ACTION_SUCCESS,
    id,
  };
}

export function getListCateNews() {
  return {
    type: GET_LIST_CATE_NEWS_ACTION,
  };
}
export function getListCateNewsSuccess(categoryNews) {
  return {
    type: GET_LIST_CATE_NEWS_ACTION_SUCCESS,
    categoryNews,
  };
}

export function addCateNews(categoryNews) {
  return {
    type: ADD_CATE_NEWS_ACTION,
    categoryNews,
  };
}
export function addCateNewsSuccess(addCateNews) {
  return {
    type: ADD_CATE_NEWS_ACTION_SUCCESS,
    addCateNews,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
