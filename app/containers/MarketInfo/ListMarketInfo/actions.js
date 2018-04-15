/*
 *
 * ListMarketInfo actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_NEWS_MK_BY_CATE_ACTION,
  GET_LIST_NEWS_MK_BY_CATE_ACTION_SUCCESS,
} from './constants';

export function getListNewsMKByidCate(idcate,page) {
  return {
    type: GET_LIST_NEWS_MK_BY_CATE_ACTION,
    idcate,
    page,
  };
}
export function getListNewsByCateMKSuccess(listNews,total) {
  return {
    type: GET_LIST_NEWS_MK_BY_CATE_ACTION_SUCCESS,
    listNews,
    total,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
