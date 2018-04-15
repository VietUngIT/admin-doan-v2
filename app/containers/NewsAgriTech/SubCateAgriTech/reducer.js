/*
 *
 * SubCateAgriTech reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_SUB_CATE_AGRI_TECH_ACTION,
  GET_LIST_SUB_CATE_AGRI_TECH_ACTION_SUCCESS,
  ADD_SUB_CATE_AGRI_TECH_ACTION,
  ADD_SUB_CATE_AGRI_TECH_ACTION_SUCCESS,
  DEL_SUB_CATE_AGRI_TECH_ACTION,
  DEL_SUB_CATE_AGRI_TECH_ACTION_SUCCESS,
  EDIT_SUB_CATE_AGRI_TECH_ACTION,
  EDIT_SUB_CATE_AGRI_TECH_ACTION_SUCCESS,
  NAME_GET_LIST_AGRI_TECH_ACTION,
} from './constants';

const initialState = fromJS({
  idCate: false,
  listSubCate: [],
  idCateAdd: false,
  nameSubCateAdd: false,
  idSubCateDel: false,
  idSubCateEdit: false,
  nameSubCateEdit: false,
  nameSubcate: false,
});

function subCateAgriTechReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case NAME_GET_LIST_AGRI_TECH_ACTION:
      return state
      .set("nameSubcate",action.name)
    case EDIT_SUB_CATE_AGRI_TECH_ACTION:
      return state
      .set("idSubCateEdit",action.id)
      .set("nameSubCateEdit",action.name)
    case EDIT_SUB_CATE_AGRI_TECH_ACTION_SUCCESS:
      return state
      .set('listSubCate', state.get('listSubCate').map((item) => { return item.id === action.data.id?action.data:item}))
      .set("idSubCateEdit",false)
      .set("nameSubCateEdit",false)
    case GET_LIST_SUB_CATE_AGRI_TECH_ACTION:
      return state
      .set("listSubCate",[])
      .set("idCate",action.id)
    case GET_LIST_SUB_CATE_AGRI_TECH_ACTION_SUCCESS:
      return state
      .update('listSubCate', listSubCate => listSubCate.concat(action.data))
      .set("idCate",false)
    case ADD_SUB_CATE_AGRI_TECH_ACTION:
      return state
      .set("nameSubCateAdd",action.name)
      .set("idCateAdd",action.id)
    case ADD_SUB_CATE_AGRI_TECH_ACTION_SUCCESS:
      return state
      .update('listSubCate', listSubCate => listSubCate.concat(action.data))
      .set("nameSubCateAdd",false)
      .set("idCateAdd",false)
    case DEL_SUB_CATE_AGRI_TECH_ACTION:
      return state
      .set("idSubCateDel",action.id)
    case DEL_SUB_CATE_AGRI_TECH_ACTION_SUCCESS:
      return state
      .set('listSubCate', state.get('listSubCate').filter((item) => { return item.id !== action.id}))
      .set("idSubCateDel",false)
    default:
      return state;
  }
}

export default subCateAgriTechReducer;
