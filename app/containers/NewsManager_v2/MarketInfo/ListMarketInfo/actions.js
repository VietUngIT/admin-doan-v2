/*
 *
 * ListMarketInfo actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_MK_ACTION,
  GET_LIST_MK_ACTION_SUCCESS,
  GET_LIST_CATE_MK_ACTION,
  GET_LIST_CATE_MK_ACTION_SUCCESS,
  DELETE_NEWS_MK_ACTION,
  DELETE_NEWS_MK_ACTION_SUCCESS,
  ADD_NEWS_MK_ACTION,
  ADD_NEWS_MK_ACTION_SUCCESS,
  ADD_NEWS_MK_NOT_DATA_ACTION_SUCCESS,
} from './constants';

export function addNewsMK(idCateLink,title,author,image,source,tags,idcate,content) {
  return {
    type: ADD_NEWS_MK_ACTION,
    idCateLink,
    title,
    author,
    image,
    source,
    tags,
    idcate,
    content,
  };
}
export function addNewsMKSuccess(news,error) {
  return {
    type: ADD_NEWS_MK_ACTION_SUCCESS,
    news,
    error,
  };
}
export function addNewsNotDataMKSuccess(error) {
  return {
    type: ADD_NEWS_MK_NOT_DATA_ACTION_SUCCESS,
    error,
  };
}
export function deleteNewsMK(id) {
  return {
    type: DELETE_NEWS_MK_ACTION,
    id,
  };
}
export function deleteNewsMKSuccess(id) {
  return {
    type: DELETE_NEWS_MK_ACTION_SUCCESS,
    id,
  };
}
export function getListCateNewsMK() {
  return {
    type: GET_LIST_CATE_MK_ACTION,
  };
}
export function getListCateNewsMKSuccess(categoryNews) {
  return {
    type: GET_LIST_CATE_MK_ACTION_SUCCESS,
    categoryNews,
  };
}
export function getListNewsMK(idcate,page) {
  return {
    type: GET_LIST_MK_ACTION,
    idcate,
    page,
  };
}
export function getListNewsMKSuccess(listNews,total) {
  return {
    type: GET_LIST_MK_ACTION_SUCCESS,
    listNews,
    total,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
