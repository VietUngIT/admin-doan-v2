/*
 *
 * ManagerAgriTech reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_CATE_AGRI_TECH_ACTION,
  GET_LIST_CATE_AGRI_TECH_ACTION_SUCCESS,
  ADD_CATE_AGRI_TECH_ACTION,
  ADD_CATE_AGRI_TECH_ACTION_SUCCESS,
  DEL_CATE_AGRI_TECH_ACTION,
  DEL_CATE_AGRI_TECH_ACTION_SUCCESS,
  EDIT_CATE_AGRI_TECH_ACTION,
  EDIT_CATE_AGRI_TECH_ACTION_SUCCESS,
  NAME_GET_SUB_CATE_AGRI_TECH_ACTION,
} from './constants';

const initialState = fromJS({
  listCateAgriTech: [],
  nameCate: false,
  nameCateAdd: false,
  idDelCate: false,
  nameCateEdit: false,
  idEditCate: false,
  nameGetSubCate: false,
});

function managerAgriTechReducer(state = initialState, action) {
  switch (action.type) {
    case NAME_GET_SUB_CATE_AGRI_TECH_ACTION:
      return state
      .set("nameGetSubCate",action.name)
    case EDIT_CATE_AGRI_TECH_ACTION:
      return state
      .set("idEditCate",action.id)
      .set("nameCateEdit",action.name)
    case EDIT_CATE_AGRI_TECH_ACTION_SUCCESS:
      return state
      .set('listCateAgriTech', state.get('listCateAgriTech').map((item) => { return item.id === action.data.id?action.data:item}))
      .set("idEditCate",false)
      .set("nameCateEdit",false)
    case ADD_CATE_AGRI_TECH_ACTION:
      return state
      .set("nameCateAdd",action.nameCate)
    case ADD_CATE_AGRI_TECH_ACTION_SUCCESS:
      return state
      .update('listCateAgriTech', listCateAgriTech => listCateAgriTech.concat(action.cate))
      .set("nameCateAdd",false)
    case GET_LIST_CATE_AGRI_TECH_ACTION:
      return state
      .set("listCateAgriTech",[])
    case GET_LIST_CATE_AGRI_TECH_ACTION_SUCCESS:
      return state
      .update('listCateAgriTech', listCateAgriTech => listCateAgriTech.concat(action.data))
    case DEL_CATE_AGRI_TECH_ACTION:
      return state
      .set("idDelCate",action.id)
    case DEL_CATE_AGRI_TECH_ACTION_SUCCESS:
      return state
      .set('listCateAgriTech', state.get('listCateAgriTech').filter((item) => { return item.id !== action.id}))
      .set("idDelCate",false)
    default:
      return state;
  }
}

export default managerAgriTechReducer;
