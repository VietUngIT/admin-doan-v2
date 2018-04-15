/*
 *
 * ManagerMarketInfo reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_CATE_NEWS_MK_ACTION,
  GET_LIST_CATE_NEWS_MK_ACTION_SUCCESS,
  NAME_GET_SUB_CATE_MK_BY_CATE_ACTION,
  ADD_CATE_NEWS_MK_ACTION,
  ADD_CATE_NEWS_MK_ACTION_SUCCESS,
  DEL_CATE_NEWS_MK_ACTION,
  DEL_CATE_NEWS_MK_ACTION_SUCCESS,
  EDIT_CATE_NEWS_MK_ACTION,
  EDIT_CATE_NEWS_MK_ACTION_SUCCESS,
} from './constants';

const initialState = fromJS({
  listCategoryNewsMK: [],
  nameCate: false,
  nameCateAdd: false,
  idCateDel: false,
  idCateEdit: false,
  nameCateEdit: false,
});

function managerMarketInfoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case EDIT_CATE_NEWS_MK_ACTION:
      return state
      .set("idCateEdit",action.id)
      .set("nameCateEdit",action.name)
    case EDIT_CATE_NEWS_MK_ACTION_SUCCESS:
      return state
      .set('listCategoryNewsMK', state.get('listCategoryNewsMK').map((item) => { return item.id === action.data.id?action.data:item}))
      .set("idCateEdit",false)
      .set("nameCateEdit",false)
    case ADD_CATE_NEWS_MK_ACTION:
      return state
      .set("nameCateAdd",action.nameCate)
    case ADD_CATE_NEWS_MK_ACTION_SUCCESS:
      return state
      .update('listCategoryNewsMK', listCategoryNewsMK => listCategoryNewsMK.concat(action.cate))
      .set("nameCateAdd",false)
    case DEL_CATE_NEWS_MK_ACTION:
      return state
      .set("idCateDel",action.id)
    case DEL_CATE_NEWS_MK_ACTION_SUCCESS:
      return state
      .set('listCategoryNewsMK', state.get('listCategoryNewsMK').filter((item) => { return item.id !== action.id}))
      .set("idCateDel",false)
    case GET_LIST_CATE_NEWS_MK_ACTION:
      return state
      .set("listCategoryNewsMK",[])
    case GET_LIST_CATE_NEWS_MK_ACTION_SUCCESS:
      return state
      .update('listCategoryNewsMK', listCategoryNewsMK => listCategoryNewsMK.concat(action.cateMK))
    case NAME_GET_SUB_CATE_MK_BY_CATE_ACTION:
      return state
      .set("nameCate",action.name)
    default:
      return state;
  }
}

export default managerMarketInfoReducer;
