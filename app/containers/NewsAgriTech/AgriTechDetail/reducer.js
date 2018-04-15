/*
 *
 * AgriTechDetail reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  ID_NEWS_AGRI_TECH_ACTION,
  GET_LIST_AGRI_TECH_ACTION,
  GET_LIST_AGRI_TECH_ACTION_SUCCESS,
  GET_LIST_SUB_CATE_AGRI_TECH_ACTION,
  GET_LIST_SUB_CATE_AGRI_TECH_ACTION_SUCCESS,
  EDIT_NEWS_AGRI_TECH_ACTION,
  CHANGE_TITLE_AGRI_TECH_ACTION,
  CHANGE_AUTHOR_AGRI_TECH_ACTION,
  CHANGE_ID_SUB_CATE_AGRI_TECH_ACTION,
  CHANGE_CONTENT_AGRI_TECH_ACTION,
  EDIT_TAGS_NEWS_AGRI_TECH_ACTION,
  EDIT_TAGS_NEWS_AGRI_TECH_ACTION_SUCCESS,
  CHANGE_IMAGE_AGRI_TECH_ACTION,
  EDIT_IMAGE_NEWS_AGRI_TECH_ACTION,
  EDIT_IMAGE_NEWS_AGRI_TECH_ACTION_SUCCESS,
  DELETE_NEWS_AGRI_TECH_ACTION,
  DELETE_NEWS_AGRI_TECH_ACTION_SUCCESS,
  SUBMIT_EDIT_NEWS_AGRI_TECH_ACTION,
  SUBMIT_EDIT_NEWS_AGRI_TECH_ACTION_SUCCESS,
  ADD_NEWS_AGRI_TECH_ACTION,
  ADD_NEWS_AGRI_TECH_ACTION_SUCCESS,
  ADD_NEWS_AGRI_TECH_NOT_DATA_ACTION_SUCCESS,
} from './constants';

const initialState = fromJS({
  idNews: false,
  listNewsAgriTech: [],
  idSubCate: false,
  total: false,
  page: false,
  listSubCate: [],
  idCate: false,
  idEditNews: false,
  tags: [],
  image: false,
  idDelNews: false,
  idSubCatEdit: false,
  editNews: {
    title: false,
    author: false,
    idsubcate: false,
    content: false,
  },
  addNews: {
    idSubCateLink: false,
    title: false,
    author: false,
    image: false,
    tags: false,
    idsubcate: false,
    content: false,
    errorCode: false,
  }
});

function agriTechDetailReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ADD_NEWS_AGRI_TECH_ACTION:
      return state
      .setIn(['addNews', 'idSubCateLink'], action.idSubCateLink)
      .setIn(['addNews', 'title'], action.title)
      .setIn(['addNews', 'author'], action.author)
      .setIn(['addNews', 'image'], action.image)
      .setIn(['addNews', 'tags'], action.tags)
      .setIn(['addNews', 'idsubcate'], action.idsubcate)
      .setIn(['addNews', 'content'], action.content)
      .setIn(['addNews', 'errorCode'], false)
    case ADD_NEWS_AGRI_TECH_ACTION_SUCCESS:
      return state
      .update('listNewsAgriTech', listNewsAgriTech => [].concat(action.news).concat(listNewsAgriTech))
      .setIn(['addNews', 'idSubCateLink'], false)
      .setIn(['addNews', 'title'], false)
      .setIn(['addNews', 'author'], false)
      .setIn(['addNews', 'image'], false)
      .setIn(['addNews', 'tags'], false)
      .setIn(['addNews', 'idsubcate'], false)
      .setIn(['addNews', 'content'], false)
      .setIn(['addNews', 'errorCode'], action.error)
    case ADD_NEWS_AGRI_TECH_NOT_DATA_ACTION_SUCCESS:
      return state
      .setIn(['addNews', 'idSubCateLink'], false)
      .setIn(['addNews', 'title'], false)
      .setIn(['addNews', 'author'], false)
      .setIn(['addNews', 'image'], false)
      .setIn(['addNews', 'tags'], false)
      .setIn(['addNews', 'idsubcate'], false)
      .setIn(['addNews', 'content'], false)
      .setIn(['addNews', 'errorCode'], action.error)
    case SUBMIT_EDIT_NEWS_AGRI_TECH_ACTION:
      return state
      .set("idEditNews",action.id)
      .set("idSubCatEdit",action.idsubcate)
    case SUBMIT_EDIT_NEWS_AGRI_TECH_ACTION_SUCCESS:
      return state
      .set('listNewsAgriTech', state.get('listNewsAgriTech').map((item) => { return item.id === action.news.id?action.news:item}))
      .set("idEditNews",false)
      .set("idSubCatEdit",false)
    case DELETE_NEWS_AGRI_TECH_ACTION:
      return state
      .set("idDelNews",action.id)
    case SUBMIT_EDIT_NEWS_AGRI_TECH_ACTION_SUCCESS:
      return state
      .set('listNewsAgriTech', state.get('listNewsAgriTech').filter((item) => { return item.id !== action.id}))
      .set("idDelNews", false)
      .setIn(['editNews', 'title'], false)
      .setIn(['editNews', 'author'], false)
      .setIn(['editNews', 'idsubcate'], false)
      .setIn(['editNews', 'content'], false)
    case CHANGE_IMAGE_AGRI_TECH_ACTION:
      return state
      .set('image',action.image)
    case EDIT_IMAGE_NEWS_AGRI_TECH_ACTION:
      return state
      .set("idEditNews",action.id)      
    case EDIT_IMAGE_NEWS_AGRI_TECH_ACTION_SUCCESS:
      return state
      .set('idEditNews',false)
      .set('image', false)
      .set('listNewsAgriTech', state.get('listNewsAgriTech').map((item) => { return item.id === action.news.id?action.news:item}));
    case EDIT_TAGS_NEWS_AGRI_TECH_ACTION:
      return state
      .set('idEditNews',action.id)
      .update('tags', tags => tags.concat(action.tags))
    case EDIT_TAGS_NEWS_AGRI_TECH_ACTION_SUCCESS:
      return state
      .set('idEditNews',false)
      .set('tags', [])
      .set('listNewsAgriTech', state.get('listNewsAgriTech').map((item) => { return item.id === action.news.id?action.news:item}));
    case CHANGE_CONTENT_AGRI_TECH_ACTION:
      return state
      .setIn(['editNews', 'content'], action.content)
    case CHANGE_ID_SUB_CATE_AGRI_TECH_ACTION:
      return state
      .setIn(['editNews', 'idsubcate'], action.id)
    case CHANGE_AUTHOR_AGRI_TECH_ACTION:
      return state
      .setIn(['editNews', 'author'], action.author)
    case CHANGE_TITLE_AGRI_TECH_ACTION:
      return state
      .setIn(['editNews', 'title'], action.title)
    case EDIT_NEWS_AGRI_TECH_ACTION:
      return state
      .setIn(['editNews', 'title'], action.title)
      .setIn(['editNews', 'author'], action.author)
      .setIn(['editNews', 'idsubcate'], action.idsubcate)
      .setIn(['editNews', 'content'], action.content)
    case GET_LIST_SUB_CATE_AGRI_TECH_ACTION:
      return state
      .set("listSubCate",[])
      .set("idCate",action.id)
    case GET_LIST_SUB_CATE_AGRI_TECH_ACTION_SUCCESS:
      return state
      .update('listSubCate', listSubCate => listSubCate.concat(action.data))
      .set("idCate",false)
    case GET_LIST_AGRI_TECH_ACTION:
      return state
      .set("listNewsAgriTech",[])
      .set("idSubCate",action.id)
      .set("page",action.page)
    case GET_LIST_AGRI_TECH_ACTION_SUCCESS:
      return state
      .update('listNewsAgriTech', listNewsAgriTech => listNewsAgriTech.concat(action.listNews))
      .set("total",action.total)
      .set("idSubCate",false)
    case ID_NEWS_AGRI_TECH_ACTION:
      return state
      .set('idNews', action.id)
    default:
      return state;
  }
}

export default agriTechDetailReducer;
