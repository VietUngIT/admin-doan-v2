/*
 *
 * ListMarketInfo reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_MK_ACTION,
  GET_LIST_MK_ACTION_SUCCESS,
  GET_LIST_CATE_MK_ACTION,
  GET_LIST_CATE_MK_ACTION_SUCCESS,
  DELETE_NEWS_MK_ACTION,
  DELETE_NEWS_MK_ACTION_SUCCESS,
  ADD_NEWS_MK_ACTION,
  ADD_NEWS_MK_ACTION_SUCCESS,
  ADD_NEWS_MK_NOT_DATA_ACTION_SUCCESS,
} from './constants';

const initialState = fromJS({
  listNewsMK: [],
  listcatenewsMK: [],
  idCate: false,
  total: false,
  page: false,
  idDelMK: false,
  delNewsSuccess: false,
  addNews: {
    idCateLink: false,
    title: false,
    author: false,
    image: false,
    source: false,
    tags: false,
    idcate: false,
    content: false,
    errorCode: false,
  }
});

function listMarketInfoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NEWS_MK_ACTION:
      return state
      .setIn(['addNews', 'idCateLink'], action.idCateLink)
      .setIn(['addNews', 'title'], action.title)
      .setIn(['addNews', 'author'], action.author)
      .setIn(['addNews', 'image'], action.image)
      .setIn(['addNews', 'source'], action.source)
      .setIn(['addNews', 'tags'], action.tags)
      .setIn(['addNews', 'idcate'], action.idcate)
      .setIn(['addNews', 'content'], action.content)
      .setIn(['addNews', 'errorCode'], false)
    case ADD_NEWS_MK_ACTION_SUCCESS:
      return state
      .update('listNewsMK', listNewsMK => [].concat(action.news).concat(listNewsMK))
      .setIn(['addNews', 'idCateLink'], false)
      .setIn(['addNews', 'title'], false)
      .setIn(['addNews', 'author'], false)
      .setIn(['addNews', 'image'], false)
      .setIn(['addNews', 'source'], false)
      .setIn(['addNews', 'tags'], false)
      .setIn(['addNews', 'idcate'], false)
      .setIn(['addNews', 'content'], false)
      .setIn(['addNews', 'errorCode'], action.error)
    case ADD_NEWS_MK_NOT_DATA_ACTION_SUCCESS:
      return state
      .setIn(['addNews', 'idCateLink'], false)
      .setIn(['addNews', 'title'], false)
      .setIn(['addNews', 'author'], false)
      .setIn(['addNews', 'image'], false)
      .setIn(['addNews', 'source'], false)
      .setIn(['addNews', 'tags'], false)
      .setIn(['addNews', 'idcate'], false)
      .setIn(['addNews', 'content'], false)
      .setIn(['addNews', 'errorCode'], action.error)
    case DELETE_NEWS_MK_ACTION:
      return state
      .set("idDelMK",action.id)
      .set("delNewsSuccess",false)
    case DELETE_NEWS_MK_ACTION_SUCCESS:
      return state
      .set('listNewsMK', state.get('listNewsMK').filter((item) => { return item.id !== action.id}))
      .set("delNewsSuccess",true)
    case GET_LIST_MK_ACTION:
      return state
      .set("listNewsMK",[])
      .set("idCate",action.idcate)
      .set("page",action.page)
    case GET_LIST_MK_ACTION_SUCCESS:
      return state
      .update('listNewsMK', listNewsMK => listNewsMK.concat(action.listNews))
      .set("total",action.total)
      .set("idCate",false)
    case GET_LIST_CATE_MK_ACTION:
      return state
      .set("listcatenewsMK",[])
    case GET_LIST_CATE_MK_ACTION_SUCCESS:
      return state
      .update('listcatenewsMK', listcatenewsMK => listcatenewsMK.concat(action.categoryNews))
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default listMarketInfoReducer;
