/*
 *
 * ListNewsEvent actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_NEWS_ACTION,
  GET_LIST_NEWS_ACTION_SUCCESS,
  DELETE_NEWS_ACTION,
  DELETE_NEWS_ACTION_SUCCESS,
  ADD_NEWS_ACTION,
  ADD_NEWS_ACTION_SUCCESS,
  ADD_NEWS_NOT_DATA_ACTION_SUCCESS,
  GET_LIST_CATE_ACTION,
  GET_LIST_CATE_ACTION_SUCCESS,
} from './constants';

export function getListCateNews() {
  return {
    type: GET_LIST_CATE_ACTION,
  };
}
export function getListCateNewsSuccess(categoryNews) {
  return {
    type: GET_LIST_CATE_ACTION_SUCCESS,
    categoryNews,
  };
}
export function addNews(idCateLink,title,shortDesc,author,image,source,tags,idcate,content) {
  return {
    type: ADD_NEWS_ACTION,
    idCateLink,
    title,
    shortDesc,
    author,
    image,
    source,
    tags,
    idcate,
    content,
  };
}
export function addNewsSuccess(news,error) {
  return {
    type: ADD_NEWS_ACTION_SUCCESS,
    news,
    error,
  };
}
export function addNewsNotDataSuccess(error) {
  return {
    type: ADD_NEWS_NOT_DATA_ACTION_SUCCESS,
    error,
  };
}

export function deleteNews(id) {
  return {
    type: DELETE_NEWS_ACTION,
    id,
  };
}
export function deleteNewsSuccess(id) {
  return {
    type: DELETE_NEWS_ACTION_SUCCESS,
    id,
  };
}

export function getListNews(idcate,page) {
  return {
    type: GET_LIST_NEWS_ACTION,
    idcate,
    page,
  };
}
export function getListNewsSuccess(listNews,total) {
  return {
    type: GET_LIST_NEWS_ACTION_SUCCESS,
    listNews,
    total,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
