/*
 *
 * ListMarketInfo reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_NEWS_MK_BY_CATE_ACTION,
  GET_LIST_NEWS_MK_BY_CATE_ACTION_SUCCESS,
} from './constants';

const initialState = fromJS({
  listNewsMKByCate:[],
  idCate: false,
  page: 0,
  total: 0,
});

function listMarketInfoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_LIST_NEWS_MK_BY_CATE_ACTION:
      return state
      .set("listNewsMKByCate",[])
      .set("idCate",action.idcate)
      .set("page",action.page)
    case GET_LIST_NEWS_MK_BY_CATE_ACTION_SUCCESS:
      return state
      .update('listNewsMKByCate', listNewsMKByCate => listNewsMKByCate.concat(action.listNews))
      .set("total",action.total)
    default:
      return state;
  }
}

export default listMarketInfoReducer;
