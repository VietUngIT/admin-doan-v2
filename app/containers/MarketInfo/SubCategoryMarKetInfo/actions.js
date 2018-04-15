/*
 *
 * SubCategoryMarKetInfo actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_SUB_CATE_MK_ACTION,
  GET_LIST_SUB_CATE_MK_ACTION_SUCCESS,
} from './constants';

export function getListSubCate(id) {
  return {
    type: GET_LIST_SUB_CATE_MK_ACTION,
    id,
  };
}
export function getListSubCateSuccess(subcate) {
  return {
    type: GET_LIST_SUB_CATE_MK_ACTION_SUCCESS,
    subcate,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
