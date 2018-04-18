
import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_CATE_AGRI_TECH_ACTION,
  GET_LIST_CATE_AGRI_TECH_ACTION_SUCCESS,
  GET_LIST_AGRI_TECH_ACTION,
  GET_LIST_AGRI_TECH_ACTION_SUCCESS,
  GET_LIST_SUB_CATE_AGRI_TECH_ACTION,
  GET_LIST_SUB_CATE_AGRI_TECH_ACTION_SUCCESS,
  DELETE_NEWS_AGRI_TECH_ACTION,
  DELETE_NEWS_AGRI_TECH_ACTION_SUCCESS,
  ADD_NEWS_AGRI_TECH_ACTION,
  ADD_NEWS_AGRI_TECH_ACTION_SUCCESS,
  ADD_NEWS_AGRI_TECH_NOT_DATA_ACTION_SUCCESS,
} from './constants';

const initialState = fromJS({
  listNewsAgriTech: [],
  listSubCate: [],
  listCateAgriTech: [],
  idSubCate: false,
  total: false,
  page: false,
  idCate: false,
  idDelNews: false,
  delNewsSuccess: false,
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

function listAgritechReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_NEWS_AGRI_TECH_ACTION:
      return state
      .set("idDelNews",action.id)
      .set("delNewsSuccess",false)
    case DELETE_NEWS_AGRI_TECH_ACTION_SUCCESS:
      return state
      .set('listNewsAgriTech', state.get('listNewsAgriTech').filter((item) => { return item.id !== action.id}))
      .set("delNewsSuccess",true)
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
    case GET_LIST_CATE_AGRI_TECH_ACTION:
      return state
      .set("listCateAgriTech",[])
    case GET_LIST_CATE_AGRI_TECH_ACTION_SUCCESS:
      return state
      .update('listCateAgriTech', listCateAgriTech => listCateAgriTech.concat(action.data))
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
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default listAgritechReducer;
