/*
 *
 * CateMarketInfo reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_CATE_NEWS_MK_ACTION,
  GET_LIST_CATE_NEWS_MK_ACTION_SUCCESS,
  ADD_CATE_NEWS_MK_ACTION,
  ADD_CATE_NEWS_MK_ACTION_SUCCESS,
  DEL_CATE_NEWS_MK_ACTION,
  DEL_CATE_NEWS_MK_ACTION_SUCCESS,
} from './constants';

const initialState = fromJS({
  listCateMK: [],
  nameCateAdd: false,
  idCateDel: false,
});

function cateMarketInfoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CATE_NEWS_MK_ACTION:
      return state
      .set("nameCateAdd",action.nameCate)
    case ADD_CATE_NEWS_MK_ACTION_SUCCESS:
      return state
      .update('listCateMK', listCateMK => listCateMK.concat(action.cate))
      .set("nameCateAdd",false)
    case DEL_CATE_NEWS_MK_ACTION:
      return state
      .set("idCateDel",action.id)
    case DEL_CATE_NEWS_MK_ACTION_SUCCESS:
      return state
      .set('listCateMK', state.get('listCateMK').filter((item) => { return item.id !== action.id}))
      .set("idCateDel",false)
    case GET_LIST_CATE_NEWS_MK_ACTION:
      return state
      .set("listCateMK",[])
    case GET_LIST_CATE_NEWS_MK_ACTION_SUCCESS:
      return state
      .update('listCateMK', listCateMK => listCateMK.concat(action.cateMK))
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default cateMarketInfoReducer;
