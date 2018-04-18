/*
 *
 * CateAgriTech actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_CATE_AGRI_TECH_ACTION,
  GET_LIST_CATE_AGRI_TECH_ACTION_SUCCESS,
  ADD_CATE_AGRI_TECH_ACTION,
  ADD_CATE_AGRI_TECH_ACTION_SUCCESS,
  DEL_CATE_AGRI_TECH_ACTION,
  DEL_CATE_AGRI_TECH_ACTION_SUCCESS,
} from './constants';

export function delCateAgriTech(id) {
  return {
    type: DEL_CATE_AGRI_TECH_ACTION,
    id,
  };
}
export function delCateAgriTechSuccess(id) {
  return {
    type: DEL_CATE_AGRI_TECH_ACTION_SUCCESS,
    id,
  };
}
export function addCateAgriTech(nameCate) {
  return {
    type: ADD_CATE_AGRI_TECH_ACTION,
    nameCate,
  };
}
export function addCateAgriTechSuccess(cate) {
  return {
    type: ADD_CATE_AGRI_TECH_ACTION_SUCCESS,
    cate,
  };
}
export function getListCateAgriTech() {
  return {
    type: GET_LIST_CATE_AGRI_TECH_ACTION,
  };
}
export function getListCateAgriTechSuccess(data) {
  return {
    type: GET_LIST_CATE_AGRI_TECH_ACTION_SUCCESS,
    data,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
