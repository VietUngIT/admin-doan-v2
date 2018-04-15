/*
 *
 * AgriTechDetail actions
 *
 */

import {
  DEFAULT_ACTION,
  ID_NEWS_AGRI_TECH_ACTION,
  GET_LIST_AGRI_TECH_ACTION,
  GET_LIST_AGRI_TECH_ACTION_SUCCESS,
  GET_LIST_SUB_CATE_AGRI_TECH_ACTION,
  GET_LIST_SUB_CATE_AGRI_TECH_ACTION_SUCCESS,
  EDIT_NEWS_AGRI_TECH_ACTION,
  CHANGE_TITLE_AGRI_TECH_ACTION,
  CHANGE_AUTHOR_AGRI_TECH_ACTION,
  CHANGE_ID_SUB_CATE_AGRI_TECH_ACTION,
  CHANGE_CONTENT_AGRI_TECH_ACTION,
  EDIT_TAGS_NEWS_AGRI_TECH_ACTION,
  EDIT_TAGS_NEWS_AGRI_TECH_ACTION_SUCCESS,
  CHANGE_IMAGE_AGRI_TECH_ACTION,
  EDIT_IMAGE_NEWS_AGRI_TECH_ACTION,
  EDIT_IMAGE_NEWS_AGRI_TECH_ACTION_SUCCESS,
  DELETE_NEWS_AGRI_TECH_ACTION,
  DELETE_NEWS_AGRI_TECH_ACTION_SUCCESS,
  SUBMIT_EDIT_NEWS_AGRI_TECH_ACTION,
  SUBMIT_EDIT_NEWS_AGRI_TECH_ACTION_SUCCESS,
  ADD_NEWS_AGRI_TECH_ACTION,
  ADD_NEWS_AGRI_TECH_ACTION_SUCCESS,
  ADD_NEWS_AGRI_TECH_NOT_DATA_ACTION_SUCCESS,
} from './constants';

export function addNewsAgriTech(idSubCateLink,title,author,image,tags,idsubcate,content) {
  return {
    type: ADD_NEWS_AGRI_TECH_ACTION,
    idSubCateLink,
    title,
    author,
    image,
    source,
    tags,
    idsubcate,
    content,
  };
}
export function addNewsAgriTechSuccess(news,error) {
  return {
    type: ADD_NEWS_AGRI_TECH_ACTION_SUCCESS,
    news,
    error,
  };
}
export function addNewsNotDataAgriTechSuccess(error) {
  return {
    type: ADD_NEWS_AGRI_TECH_NOT_DATA_ACTION_SUCCESS,
    error,
  };
}
export function submitEditNews(id,idsubcate) {
  return {
    type: SUBMIT_EDIT_NEWS_AGRI_TECH_ACTION,
    id,
    idsubcate,
  };
}
export function submitEditNewsSuccess(news) {
  return {
    type: SUBMIT_EDIT_NEWS_AGRI_TECH_ACTION_SUCCESS,
    news,
  };
}
export function deleteNews(id) {
  return {
    type: DELETE_NEWS_AGRI_TECH_ACTION,
    id,
  };
}
export function deleteNewsSuccess(id) {
  return {
    type: DELETE_NEWS_AGRI_TECH_ACTION_SUCCESS,
    id,
  };
}
export function changeImageNews(image) {
  return {
    type: CHANGE_IMAGE_AGRI_TECH_ACTION,
    image,
  };
}
export function editImageNews(id) {
  return {
    type: EDIT_IMAGE_NEWS_AGRI_TECH_ACTION,
    id,
  };
}
export function editImageNewsSuccess(news) {
  return {
    type: EDIT_IMAGE_NEWS_AGRI_TECH_ACTION_SUCCESS,
    news,
  };
}
export function edittagsNews(id,tags) {
  return {
    type: EDIT_TAGS_NEWS_AGRI_TECH_ACTION,
    id,
    tags,
  };
}
export function edittagsNewsSuccess(news) {
  return {
    type: EDIT_TAGS_NEWS_AGRI_TECH_ACTION_SUCCESS,
    news,
  };
}
export function changeContentNews(content) {
  return {
    type: CHANGE_CONTENT_AGRI_TECH_ACTION,
    content,
  };
}
export function changeIdSubCateNews(id) {
  return {
    type: CHANGE_ID_SUB_CATE_AGRI_TECH_ACTION,
    id,
  };
}
export function changeAuthorNews(author) {
  return {
    type: CHANGE_AUTHOR_AGRI_TECH_ACTION,
    author,
  };
}
export function changeTitleNews(title) {
  return {
    type: CHANGE_TITLE_AGRI_TECH_ACTION,
    title,
  };
}
export function editNewsAgriTech(title,author,idsubcate,content) {
  return {
    type: EDIT_NEWS_AGRI_TECH_ACTION,
    title,
    author,
    idsubcate,
    content
  };
}
export function getListSubCateAgriTech(id) {
  return {
    type: GET_LIST_SUB_CATE_AGRI_TECH_ACTION,
    id,
  };
}
export function getListSubCateAgriTechSuccess(data) {
  return {
    type: GET_LIST_SUB_CATE_AGRI_TECH_ACTION_SUCCESS,
    data,
  };
}
export function setIdNewsAgriTech(id) {
  return {
    type: ID_NEWS_AGRI_TECH_ACTION,
    id,
  };
}
export function getListNewsAgriTech(id,page) {
  return {
    type: GET_LIST_AGRI_TECH_ACTION,
    id,
    page,
  };
}
export function getListNewsAgriTechSuccess(listNews,total) {
  return {
    type: GET_LIST_AGRI_TECH_ACTION_SUCCESS,
    listNews,
    total,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
