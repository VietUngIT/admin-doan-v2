/*
 *
 * SubCateAgriTech actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_SUB_CATE_AGRI_TECH_ACTION,
  GET_LIST_SUB_CATE_AGRI_TECH_ACTION_SUCCESS,
  ADD_SUB_CATE_AGRI_TECH_ACTION,
  ADD_SUB_CATE_AGRI_TECH_ACTION_SUCCESS,
  DEL_SUB_CATE_AGRI_TECH_ACTION,
  DEL_SUB_CATE_AGRI_TECH_ACTION_SUCCESS,
  EDIT_SUB_CATE_AGRI_TECH_ACTION,
  EDIT_SUB_CATE_AGRI_TECH_ACTION_SUCCESS,
  NAME_GET_LIST_AGRI_TECH_ACTION,
} from './constants';

export function setSubCateName(name) {
  return {
    type: NAME_GET_LIST_AGRI_TECH_ACTION,
    name,
  };
}
export function editSubCate(id,name) {
  return {
    type: EDIT_SUB_CATE_AGRI_TECH_ACTION,
    id,
    name,
  };
}
export function editSubCateSuccess(data) {
  return {
    type: EDIT_SUB_CATE_AGRI_TECH_ACTION_SUCCESS,
    data,
  };
}

export function delSubCate(id) {
  return {
    type: DEL_SUB_CATE_AGRI_TECH_ACTION,
    id,
  };
}
export function delSubCateSuccess(id) {
  return {
    type: DEL_SUB_CATE_AGRI_TECH_ACTION_SUCCESS,
    id,
  };
}
export function addSubCate(id,name) {
  return {
    type: ADD_SUB_CATE_AGRI_TECH_ACTION,
    id,
    name,
  };
}
export function addSubCateSuccess(data) {
  return {
    type: ADD_SUB_CATE_AGRI_TECH_ACTION_SUCCESS,
    data,
  };
}
export function getListSubCate(id) {
  return {
    type: GET_LIST_SUB_CATE_AGRI_TECH_ACTION,
    id,
  };
}
export function getListSubCateSuccess(data) {
  return {
    type: GET_LIST_SUB_CATE_AGRI_TECH_ACTION_SUCCESS,
    data,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
