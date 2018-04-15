/*
 *
 * MarketInfoDetail reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_MK_ACTION,
  GET_LIST_MK_ACTION_SUCCESS,
  ID_NEWS_MK_ACTION,
  EDIT_NEWS_MK_ACTION,
  GET_LIST_CATE_MK_ACTION,
  GET_LIST_CATE_MK_ACTION_SUCCESS,
  DELETE_NEWS_MK_ACTION,
  DELETE_NEWS_MK_ACTION_SUCCESS,
  CHANGE_TITLE_MK_ACTION,
  CHANGE_AUTHOR_MK_ACTION,
  CHANGE_SOURCE_MK_ACTION,
  CHANGE_ID_CATE_MK_ACTION,
  CHANGE_CONTENT_MK_ACTION,
  CHANGE_IMAGE_MK_ACTION,
  EDIT_IMAGE_NEWS_MK_ACTION,
  EDIT_IMAGE_NEWS_MK_ACTION_SUCCESS,
  EDIT_TAGS_NEWS_MK_ACTION,
  EDIT_TAGS_NEWS_MK_ACTION_SUCCESS,
  SUBMIT_EDIT_NEWS_MK_ACTION,
  SUBMIT_EDIT_NEWS_MK_ACTION_SUCCESS,
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
  idnewsMK: false,
  idEditMK: false,
  idDelMK: false,
  image: false,
  tags: [],
  idcateedit: false,
  editNews: {
    title: false,
    author: false,
    source: false,
    idcate: false,
    content: false,
  },
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

function marketInfoDetailReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
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
    case SUBMIT_EDIT_NEWS_MK_ACTION:
      return state
      .set("idEditMK",action.id)
      .set("idcateedit",action.idcate)
    case SUBMIT_EDIT_NEWS_MK_ACTION_SUCCESS:
      return state
      .set('listNewsMK', state.get('listNewsMK').map((item) => { return item.id === action.news.id?action.news:item}))
      .set("idEditMK",false)
      .set("idcateedit",false)
    case EDIT_TAGS_NEWS_MK_ACTION:
      return state
      .set('idEditMK',action.id)
      .update('tags', tags => tags.concat(action.tags))
    case EDIT_TAGS_NEWS_MK_ACTION_SUCCESS:
      return state
      .set('idEditMK',false)
      .set('tags', [])
      .set('listNewsMK', state.get('listNewsMK').map((item) => { return item.id === action.news.id?action.news:item}));
    case CHANGE_IMAGE_MK_ACTION:
      return state
      .set('image',action.image)
    case EDIT_IMAGE_NEWS_MK_ACTION:
      return state
      .set("idEditMK",action.id)      
    case EDIT_IMAGE_NEWS_MK_ACTION_SUCCESS:
      return state
      .set('idEditMK',false)
      .set('image', false)
      .set('listNewsMK', state.get('listNewsMK').map((item) => { return item.id === action.news.id?action.news:item}));
    case CHANGE_CONTENT_MK_ACTION:
      return state
      .setIn(['editNews', 'content'], action.content)
    case CHANGE_ID_CATE_MK_ACTION:
      return state
      .setIn(['editNews', 'idcate'], action.id)
    case CHANGE_SOURCE_MK_ACTION:
      return state
      .setIn(['editNews', 'source'], action.source)
    case CHANGE_AUTHOR_MK_ACTION:
      return state
      .setIn(['editNews', 'author'], action.author)
    case CHANGE_TITLE_MK_ACTION:
      return state
      .setIn(['editNews', 'title'], action.title)
    case DELETE_NEWS_MK_ACTION:
      return state
      .set("idDelMK",action.id)
    case DELETE_NEWS_MK_ACTION_SUCCESS:
      return state
      .set('listNewsMK', state.get('listNewsMK').filter((item) => { return item.id !== action.id}))
      .setIn(['editNews', 'title'], false)
      .setIn(['editNews', 'author'], false)
      .setIn(['editNews', 'source'], false)
      .setIn(['editNews', 'idcate'], false)
      .setIn(['editNews', 'content'], false)
    case GET_LIST_CATE_MK_ACTION:
      return state
      .set("listcatenewsMK",[])
    case GET_LIST_CATE_MK_ACTION_SUCCESS:
      return state
      .update('listcatenewsMK', listcatenewsMK => listcatenewsMK.concat(action.categoryNews))
    case ID_NEWS_MK_ACTION:
      return state
      .set('idnewsMK', action.id)
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
    case EDIT_NEWS_MK_ACTION:
      return state
      .setIn(['editNews', 'title'], action.title)
      .setIn(['editNews', 'author'], action.author)
      .setIn(['editNews', 'source'], action.source)
      .setIn(['editNews', 'idcate'], action.idcate)
      .setIn(['editNews', 'content'], action.content)
    default:
      return state;
  }
}

export default marketInfoDetailReducer;
