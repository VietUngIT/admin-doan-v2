/*
 *
 * NewsDetail reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_NEWS_ACTION,
  GET_LIST_NEWS_ACTION_SUCCESS,
  EDIT_NEWS_ACTION,
  EDIT_NEWS_ACTION_SUCCESS,
  GET_LIST_CATE_ACTION,
  GET_LIST_CATE_ACTION_SUCCESS,
  EDIT_TAGS_NEWS_ACTION,
  EDIT_TAGS_NEWS_ACTION_SUCCESS,
  CHANGE_IMAGE_ACTION,
  EDIT_IMAGE_NEWS_ACTION,
  EDIT_IMAGE_NEWS_ACTION_SUCCESS,
  CHANGE_TITLE_ACTION,
  CHANGE_SHORT_DESC_ACTION,
  CHANGE_AUTHOR_ACTION,
  CHANGE_SOURCE_ACTION,
  CHANGE_ID_CATE_ACTION,
  CHANGE_CONTENT_ACTION,
  ID_NEWS_ACTION,
  DELETE_NEWS_ACTION,
  DELETE_NEWS_ACTION_SUCCESS,
  SUBMIT_EDIT_NEWS_ACTION,
  SUBMIT_EDIT_NEWS_ACTION_SUCCESS,
  ADD_NEWS_ACTION,
  ADD_NEWS_ACTION_SUCCESS,
  ADD_NEWS_NOT_DATA_ACTION_SUCCESS,
} from './constants';

const initialState = fromJS({
  idNewsEdit: false,
  listNewsByCate:[],
  listcategorynews: [],
  idCate: false,
  idnews:false,
  page: 0,
  total: 0,
  title: false,
  shortDesc: false,
  author: false,
  source: false,
  idcateedit: false,
  content: false,
  tags: [],
  idEdit: false,
  image: false,
  idNewsDel: false,
  editNews: {
    title: false,
    shortDesc: false,
    author: false,
    source: false,
    idcate: false,
    content: false,
  },
  addNews: {
    idCateLink: false,
    title: false,
    shortDesc: false,
    author: false,
    image: false,
    source: false,
    tags: false,
    idcate: false,
    content: false,
    errorCode: false,
  }
});

function newsDetailReducer(state = initialState, action) {
  switch (action.type) {
    case ID_NEWS_ACTION:
      return state
      .set('idnews', action.id)
    case EDIT_NEWS_ACTION:
      return state
      .setIn(['editNews', 'title'], action.title)
      .setIn(['editNews', 'shortDesc'], action.shortDesc)
      .setIn(['editNews', 'author'], action.author)
      .setIn(['editNews', 'source'], action.source)
      .setIn(['editNews', 'idcate'], action.idcate)
      .setIn(['editNews', 'content'], action.content)
    case CHANGE_TITLE_ACTION:
      return state
      .setIn(['editNews', 'title'], action.title)
    case CHANGE_SHORT_DESC_ACTION:
      return state
      .setIn(['editNews', 'shortDesc'], action.shortDesc)
    case CHANGE_AUTHOR_ACTION:
      return state
      .setIn(['editNews', 'author'], action.author)
    case CHANGE_SOURCE_ACTION:
      return state
      .setIn(['editNews', 'source'], action.source)
    case CHANGE_ID_CATE_ACTION:
      return state
      .setIn(['editNews', 'idcate'], action.idcate)
    case CHANGE_CONTENT_ACTION:
      return state
      .setIn(['editNews', 'content'], action.content)
    case CHANGE_IMAGE_ACTION:
      return state
      .set('image',action.image)
    case EDIT_IMAGE_NEWS_ACTION:
      return state
      .set("idEdit",action.id)      
    case EDIT_IMAGE_NEWS_ACTION_SUCCESS:
      return state
      .set('idEdit',false)
      .set('image', false)
      .set('listNewsByCate', state.get('listNewsByCate').map((item) => { return item.id === action.news.id?action.news:item}));
    case DEFAULT_ACTION:
      return state;
    case GET_LIST_NEWS_ACTION:
      return state
      .set("listNewsByCate",[])
      .set("idCate",action.idcate)
      .set("page",action.page)
    case GET_LIST_NEWS_ACTION_SUCCESS:
      return state
      .update('listNewsByCate', listNewsByCate => listNewsByCate.concat(action.listNews))
      .set("total",action.total)
      .set("idCate",false)
    case GET_LIST_CATE_ACTION:
      return state
      .set("listcategorynews",[])
    case GET_LIST_CATE_ACTION_SUCCESS:
      return state
      .update('listcategorynews', listcategorynews => listcategorynews.concat(action.categoryNews))
    case EDIT_TAGS_NEWS_ACTION:
      return state
      .set('idEdit',action.id)
      .update('tags', tags => tags.concat(action.tags))
    case EDIT_TAGS_NEWS_ACTION_SUCCESS:
      return state
      .set('idEdit',false)
      .set('tags', [])
      .set('listNewsByCate', state.get('listNewsByCate').map((item) => { return item.id === action.news.id?action.news:item}));
    case DELETE_NEWS_ACTION:
      return state
      .set("idNewsDel",action.id)
    case DELETE_NEWS_ACTION_SUCCESS:
      return state
      .set('listNewsByCate', state.get('listNewsByCate').filter((item) => { return item.id !== action.id}))
      .setIn(['editNews', 'title'], false)
      .setIn(['editNews', 'shortDesc'], false)
      .setIn(['editNews', 'author'], false)
      .setIn(['editNews', 'source'], false)
      .setIn(['editNews', 'idcate'], false)
      .setIn(['editNews', 'content'], false)
    case SUBMIT_EDIT_NEWS_ACTION:
      return state
      .set("idNewsEdit",action.id)
      .set("idcateedit",action.idcate)
    case SUBMIT_EDIT_NEWS_ACTION_SUCCESS:
      return state
      .set('listNewsByCate', state.get('listNewsByCate').map((item) => { return item.id === action.news.id?action.news:item}))
      .set("idNewsEdit",false)
      .set("idcateedit",false)
    case ADD_NEWS_ACTION:
      return state
      .setIn(['addNews', 'idCateLink'], action.idCateLink)
      .setIn(['addNews', 'title'], action.title)
      .setIn(['addNews', 'shortDesc'], action.shortDesc)
      .setIn(['addNews', 'author'], action.author)
      .setIn(['addNews', 'image'], action.image)
      .setIn(['addNews', 'source'], action.source)
      .setIn(['addNews', 'tags'], action.tags)
      .setIn(['addNews', 'idcate'], action.idcate)
      .setIn(['addNews', 'content'], action.content)
      .setIn(['addNews', 'errorCode'], false)
    case ADD_NEWS_ACTION_SUCCESS:
      return state
      .update('listNewsByCate', listNewsByCate => [].concat(action.news).concat(listNewsByCate))
      .setIn(['addNews', 'idCateLink'], false)
      .setIn(['addNews', 'title'], false)
      .setIn(['addNews', 'shortDesc'], false)
      .setIn(['addNews', 'author'], false)
      .setIn(['addNews', 'image'], false)
      .setIn(['addNews', 'source'], false)
      .setIn(['addNews', 'tags'], false)
      .setIn(['addNews', 'idcate'], false)
      .setIn(['addNews', 'content'], false)
      .setIn(['addNews', 'errorCode'], action.error)
    case ADD_NEWS_NOT_DATA_ACTION_SUCCESS:
      return state
      .setIn(['addNews', 'idCateLink'], false)
      .setIn(['addNews', 'title'], false)
      .setIn(['addNews', 'shortDesc'], false)
      .setIn(['addNews', 'author'], false)
      .setIn(['addNews', 'image'], false)
      .setIn(['addNews', 'source'], false)
      .setIn(['addNews', 'tags'], false)
      .setIn(['addNews', 'idcate'], false)
      .setIn(['addNews', 'content'], false)
      .setIn(['addNews', 'errorCode'], action.error)
    default:
      return state;
  }
}

export default newsDetailReducer;
