/*
 *
 * MarketInfoDetail actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_MK_ACTION,
  GET_LIST_MK_ACTION_SUCCESS,
  ID_NEWS_MK_ACTION,
  EDIT_NEWS_MK_ACTION,
  GET_LIST_CATE_MK_ACTION,
  GET_LIST_CATE_MK_ACTION_SUCCESS,
  DELETE_NEWS_MK_ACTION,
  DELETE_NEWS_MK_ACTION_SUCCESS,
  CHANGE_TITLE_MK_ACTION,
  CHANGE_AUTHOR_MK_ACTION,
  CHANGE_SOURCE_MK_ACTION,
  CHANGE_ID_CATE_MK_ACTION,
  CHANGE_CONTENT_MK_ACTION,
  CHANGE_IMAGE_MK_ACTION,
  EDIT_IMAGE_NEWS_MK_ACTION,
  EDIT_IMAGE_NEWS_MK_ACTION_SUCCESS,
  EDIT_TAGS_NEWS_MK_ACTION,
  EDIT_TAGS_NEWS_MK_ACTION_SUCCESS,
  SUBMIT_EDIT_NEWS_MK_ACTION,
  SUBMIT_EDIT_NEWS_MK_ACTION_SUCCESS,
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

export function submitEditNewsMK(id,idcate) {
  return {
    type: SUBMIT_EDIT_NEWS_MK_ACTION,
    id,
    idcate,
  };
}
export function submitEditNewsMKSuccess(news) {
  return {
    type: SUBMIT_EDIT_NEWS_MK_ACTION_SUCCESS,
    news,
  };
}

export function edittagsNewsMK(id,tags) {
  return {
    type: EDIT_TAGS_NEWS_MK_ACTION,
    id,
    tags,
  };
}
export function edittagsNewsMKSuccess(news) {
  return {
    type: EDIT_TAGS_NEWS_MK_ACTION_SUCCESS,
    news,
  };
}

export function changeImageNewsMK(image) {
  return {
    type: CHANGE_IMAGE_MK_ACTION,
    image,
  };
}
export function editImageNewsMK(id) {
  return {
    type: EDIT_IMAGE_NEWS_MK_ACTION,
    id,
  };
}
export function editImageNewsSuccessMK(news) {
  return {
    type: EDIT_IMAGE_NEWS_MK_ACTION_SUCCESS,
    news,
  };
}

export function changeContentNewsMK(content) {
  return {
    type: CHANGE_CONTENT_MK_ACTION,
    content,
  };
}

export function changeIdCateNewsMK(id) {
  return {
    type: CHANGE_ID_CATE_MK_ACTION,
    id,
  };
}

export function changeSourceNewsMK(source) {
  return {
    type: CHANGE_SOURCE_MK_ACTION,
    source,
  };
}

export function changeAuthorNewsMK(author) {
  return {
    type: CHANGE_AUTHOR_MK_ACTION,
    author,
  };
}

export function changeTitleNewsMK(title) {
  return {
    type: CHANGE_TITLE_MK_ACTION,
    title,
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
export function editNewsMK(title,author,source,idcate,content) {
  return {
    type: EDIT_NEWS_MK_ACTION,
    title,
    author,
    source,
    idcate,
    content
  };
}

export function setIdNewsMK(id) {
  return {
    type: ID_NEWS_MK_ACTION,
    id,
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
