/*
 *
 * CateNewsEvent reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  ADD_CATE_NEWS_ACTION,
  ADD_CATE_NEWS_ACTION_SUCCESS,
  GET_LIST_CATE_NEWS_ACTION,
  GET_LIST_CATE_NEWS_ACTION_SUCCESS,
  DEL_CATE_NEWS_ACTION,
  DEL_CATE_NEWS_ACTION_SUCCESS,
} from './constants';

const initialState = fromJS({
  categoryNews:false,
  listcategorynews: [],
  idCateDel: false,
});

function cateNewsEventReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ADD_CATE_NEWS_ACTION:
      return state
      .set("categoryNews",action.categoryNews)
    case ADD_CATE_NEWS_ACTION_SUCCESS:
      return state
      .update('listcategorynews', listcategorynews => listcategorynews.concat(action.addCateNews))
    case DEL_CATE_NEWS_ACTION:
      return state
      .set("idCateDel",action.id)
    case DEL_CATE_NEWS_ACTION_SUCCESS:
      return state
      .set('listcategorynews', state.get('listcategorynews').filter((item) => { return item.id !== action.id}));
    case GET_LIST_CATE_NEWS_ACTION:
      return state
      .set("listcategorynews",[])
    case GET_LIST_CATE_NEWS_ACTION_SUCCESS:
      return state
      .update('listcategorynews', listcategorynews => listcategorynews.concat(action.categoryNews))
    default:
      return state;
  }
}

export default cateNewsEventReducer;
