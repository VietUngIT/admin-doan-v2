
import {
  DEFAULT_ACTION,
  GET_CATE_ACTION,
  GET_CATE_ACTION_SUCCESS,
  ADD_CATE_ACTION,
  ADD_CATE_ACTION_SUCCESS,
  DELETE_CATE_ACTION,
  DELETE_CATE_ACTION_SUCCESS,
} from './constants';


export function delCateMP(id) {
  return {
    type: DELETE_CATE_ACTION,
    id,
  };
}
export function delCateMPSuccess(id) {
  return {
    type: DELETE_CATE_ACTION_SUCCESS,
    id,
  };
}
export function addCateMP(nameCate,image) {
  return {
    type: ADD_CATE_ACTION,
    nameCate,
    image,
  };
}
export function addCateMPSuccess(cate) {
  return {
    type: ADD_CATE_ACTION_SUCCESS,
    cate,
  };
}
export function getListCateMP() {
  return {
    type: GET_CATE_ACTION,
  };
}
export function getListCateMPSuccess(data) {
  return {
    type: GET_CATE_ACTION_SUCCESS,
    data,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
