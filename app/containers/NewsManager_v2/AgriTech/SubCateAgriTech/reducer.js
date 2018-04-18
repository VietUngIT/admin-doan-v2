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
} from './constants';

const initialState = fromJS({
  idCate: false,
  listSubCate: [],
  idCateAdd: false,
  nameSubCateAdd: false,
  idSubCateDel: false,
});

function subCateAgriTechReducer(state = initialState, action) {
  switch (action.type) {
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
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default subCateAgriTechReducer;
