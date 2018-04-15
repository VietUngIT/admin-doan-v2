/*
 *
 * NewsDetail actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_NEWS_ACTION,
  GET_LIST_NEWS_ACTION_SUCCESS,
  EDIT_NEWS_ACTION,
  EDIT_NEWS_ACTION_SUCCESS,
  GET_LIST_CATE_ACTION,
  GET_LIST_CATE_ACTION_SUCCESS,
  EDIT_TAGS_NEWS_ACTION,
  EDIT_TAGS_NEWS_ACTION_SUCCESS,
  CHANGE_IMAGE_ACTION,
  EDIT_IMAGE_NEWS_ACTION,
  EDIT_IMAGE_NEWS_ACTION_SUCCESS,
  CHANGE_TITLE_ACTION,
  CHANGE_SHORT_DESC_ACTION,
  CHANGE_AUTHOR_ACTION,
  CHANGE_SOURCE_ACTION,
  CHANGE_ID_CATE_ACTION,
  CHANGE_CONTENT_ACTION,
  DELETE_NEWS_ACTION,
  DELETE_NEWS_ACTION_SUCCESS,
  SUBMIT_EDIT_NEWS_ACTION,
  SUBMIT_EDIT_NEWS_ACTION_SUCCESS,
  ID_NEWS_ACTION,
  ADD_NEWS_ACTION,
  ADD_NEWS_ACTION_SUCCESS,
  ADD_NEWS_NOT_DATA_ACTION_SUCCESS,
} from './constants';

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
export function submitEditNews(id,idcate) {
  return {
    type: SUBMIT_EDIT_NEWS_ACTION,
    id,
    idcate,
  };
}
export function submitEditNewsSuccess(news) {
  return {
    type: SUBMIT_EDIT_NEWS_ACTION_SUCCESS,
    news,
  };
}
export function setIdNews(id) {
  return {
    type: ID_NEWS_ACTION,
    id,
  };
}
export function changeShortDescNews(shortDesc) {
  return {
    type: CHANGE_SHORT_DESC_ACTION,
    shortDesc,
  };
}
export function changeAuThorNews(author) {
  return {
    type: CHANGE_AUTHOR_ACTION,
    author,
  };
}
export function changeSourceNews(source) {
  return {
    type: CHANGE_SOURCE_ACTION,
    source,
  };
}
export function changeIdCateNews(idcate) {
  return {
    type: CHANGE_ID_CATE_ACTION,
    idcate,
  };
}
export function changeContentNews(content) {
  return {
    type: CHANGE_CONTENT_ACTION,
    content,
  };
}
export function changeTitleNews(title) {
  return {
    type: CHANGE_TITLE_ACTION,
    title,
  };
}

export function changeImageNews(image) {
  return {
    type: CHANGE_IMAGE_ACTION,
    image,
  };
}
export function editImageNews(id) {
  return {
    type: EDIT_IMAGE_NEWS_ACTION,
    id,
  };
}
export function editImageNewsSuccess(news) {
  return {
    type: EDIT_IMAGE_NEWS_ACTION_SUCCESS,
    news,
  };
}

export function edittagsNews(id,tags) {
  return {
    type: EDIT_TAGS_NEWS_ACTION,
    id,
    tags,
  };
}
export function edittagsNewsSuccess(news) {
  return {
    type: EDIT_TAGS_NEWS_ACTION_SUCCESS,
    news,
  };
}

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

export function editNews(title,shortDesc,author,source,idcate,content) {
  return {
    type: EDIT_NEWS_ACTION,
    title,
    shortDesc,
    author,
    source,
    idcate,
    content
  };
}
export function editNewsSuccess(data) {
  return {
    type: EDIT_NEWS_ACTION_SUCCESS,
    data,
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
