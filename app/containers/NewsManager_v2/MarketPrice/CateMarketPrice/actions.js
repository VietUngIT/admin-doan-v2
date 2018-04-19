
import {
  DEFAULT_ACTION,
  GET_CATE_ACTION,
  GET_CATE_ACTION_SUCCESS,
} from './constants';

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
