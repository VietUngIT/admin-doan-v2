/*
 *
 * ListNews reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_NEWS_BY_CATE_ACTION,
  GET_LIST_NEWS_BY_CATE_ACTION_SUCCESS,
} from './constants';

const initialState = fromJS({
  listNewsByCate:[],
  idCate: false,
  page: 0,
  total: 0,
});

function listNewsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_LIST_NEWS_BY_CATE_ACTION:
      return state
      .set("listNewsByCate",[])
      .set("idCate",action.idcate)
      .set("page",action.page)
    case GET_LIST_NEWS_BY_CATE_ACTION_SUCCESS:
      return state
      .update('listNewsByCate', listNewsByCate => listNewsByCate.concat(action.listNews))
      .set("total",action.total)
    default:
      return state;
  }
}

export default listNewsReducer;
